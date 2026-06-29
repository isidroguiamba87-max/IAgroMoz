// Serviço de API para React — IAgroMOZ
// ⚠️  Para mudar o servidor, edite APENAS: react-app/src/config/api.js
import { API_BASE as API_BASE_URL } from '../config/api';

// Decodifica payload JWT sem verificar assinatura (só para ler exp)
function _jwtExp(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null; // ms
  } catch (e) { return null; }
}

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this._refreshing = null; // lock: Promise em curso ou null
    this._firstRequest = true; // flag para mostrar loading no primeiro request
  }

  // ─── Auth headers ────────────────────────────────────────────────────────────

  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Authorization é sempre lido do localStorage no momento da chamada,
  // garantindo que o retry usa o token novo e não o antigo.
  _buildConfig(options) {
    const isFormData = options.body instanceof FormData;
    const { headers: optHeaders = {}, ...rest } = options;
    const { Authorization: _drop, ...safeHeaders } = optHeaders;
    return {
      ...rest,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...safeHeaders,
        ...this.getAuthHeaders(),
      },
    };
  }

  // ─── Refresh preventivo ──────────────────────────────────────────────────────

  // Antes de mutações (POST/PUT/PATCH/DELETE), verifica se o token expira
  // nos próximos 30s e faz refresh antecipado para evitar 401 desnecessário.
  async _ensureFreshToken() {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    const exp = _jwtExp(token);
    if (!exp) return;
    const msLeft = exp - Date.now();
    if (msLeft < 30_000) {
      // Token expira em menos de 30s — refresh preventivo
      await this._refreshOnce();
    }
  }

  // ─── Core request ────────────────────────────────────────────────────────────

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const isTokenEndpoint = endpoint.includes('/token/');
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes((options.method || 'GET').toUpperCase());

    // Refresh preventivo antes de mutações autenticadas
    if (isMutation && !isTokenEndpoint && localStorage.getItem('access_token')) {
      await this._ensureFreshToken();
    }

    // Mostrar loading overlay no primeiro request da sessão
    const isFirst = this._firstRequest
    if (isFirst) {
      this._firstRequest = false
      window.dispatchEvent(new CustomEvent('server-loading-start'))
    }

    try {
      const response = await fetch(url, this._buildConfig(options));

      if (isFirst) window.dispatchEvent(new CustomEvent('server-loading-end'))

      // 401 → access token expirou → tentar refresh e repetir
      if (response.status === 401 && !isTokenEndpoint) {
        const renewed = await this._refreshOnce();

        if (!renewed) {
          // Aguarda 1s antes de mostrar erro — dá tempo ao Render de processar
          await new Promise(r => setTimeout(r, 1000));
          throw { status: 401, message: 'Sessão expirada. Faça login novamente.', data: null };
        }

        // Retry com novo access token
        const retry = await fetch(url, this._buildConfig(options));
        if (retry.status === 401) {
          this._clearAuth();
          await new Promise(r => setTimeout(r, 1000));
          throw { status: 401, message: 'Sessão expirada. Faça login novamente.', data: null };
        }
        return this._handleResponse(retry);
      }

      return this._handleResponse(response);
    } catch (err) {
      if (isFirst) window.dispatchEvent(new CustomEvent('server-loading-end'))
      if (err && err.status) throw err;
      // Só mostrar modal se for mesmo falha de rede (servidor inacessível)
      // TypeError: Failed to fetch = sem ligação ao servidor
      const isNetworkFailure = err instanceof TypeError && (
        err.message === 'Failed to fetch' ||
        err.message === 'NetworkError when attempting to fetch resource.' ||
        err.message.includes('net::ERR_') ||
        err.message.includes('Network request failed')
      )
      if (isNetworkFailure) {
        window.dispatchEvent(new CustomEvent('network-error', {
          detail: 'Não foi possível contactar o servidor. O servidor pode estar a iniciar após inatividade — aguarda 30 segundos e tenta novamente.'
        }))
      }
      throw new Error(`Erro de rede: ${err.message}`);
    }
  }

  // ─── Refresh lock ────────────────────────────────────────────────────────────

  // Garante que apenas 1 refresh corre de cada vez.
  // Chamadas simultâneas aguardam o mesmo Promise.
  _refreshOnce() {
    if (this._refreshing) return this._refreshing;
    this._refreshing = this._doRefresh().finally(() => {
      this._refreshing = null;
    });
    return this._refreshing;
  }

  async _doRefresh() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
      this._clearAuth();
      return false;
    }

    try {
      const res = await fetch(`${this.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) {
        // Refresh token inválido/expirado/blacklisted
        this._clearAuth();
        return false;
      }

      const data = await res.json();
      localStorage.setItem('access_token', data.access);
      // Guardar novo refresh token se vier (ROTATE_REFRESH_TOKENS=True)
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
      return true;
    } catch (e) {
      // Erro de rede — não limpar sessão, pode ser temporário
      return false;
    }
  }

  // ─── Response handler ────────────────────────────────────────────────────────

  async _handleResponse(response) {
    const text = await response.text().catch(() => '');
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = null; }
    if (!response.ok) {
      if (response.status === 403) {
        const message = data?.detail || data?.message || 'Acesso negado. Você não tem permissão para esta ação.'
        window.dispatchEvent(new CustomEvent('api-forbidden', { detail: { status: 403, message } }))
      }
      throw {
        status: response.status,
        message: data?.detail || data?.message || `Erro ${response.status}`,
        data,
      };
    }
    return data;
  }

  handleResponse(response) {
    return this._handleResponse(response);
  }

  // ─── Clear auth ──────────────────────────────────────────────────────────────

  _clearAuth() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  // ─── HTTP helpers ────────────────────────────────────────────────────────────

  get(endpoint, params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request(qs ? `${endpoint}?${qs}` : endpoint, { method: 'GET' });
  }

  post(endpoint, data = {}) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  }

  put(endpoint, data = {}) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // ─── Auth methods ────────────────────────────────────────────────────────────

  async login(email, password) {
    const data = await this.post('/token/', { email, password });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    if (data.user?.id) localStorage.setItem('userId', data.user.id);
    // Após login, buscar perfil completo para guardar nome e role
    try { await this.getUserProfile(); } catch (e) {}
    return data;
  }

  refreshToken() {
    return this._refreshOnce();
  }

  async logout() {
    try {
      const refresh = localStorage.getItem('refresh_token');
      await this.post('/users/logout/', { refresh });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userRole');
    }
  }

  // ─── Registo (3 endpoints separados) ────────────────────────────────────────

  registerNormal(data) {
    // { email, password, first_name, last_name, district_id, gender }
    return this.post('/users/register/normal/', data);
  }

  registerProducer(data) {
    // { email, password, first_name, last_name, district_id, gender, contact, farm_address }
    return this.post('/users/register/producer/', data);
  }

  registerSeller(data) {
    // { email, password, first_name, last_name, district_id, gender, seller_type, store_name, nuit, contact, store_address }
    return this.post('/users/register/seller/', data);
  }

  // Alias de compatibilidade
  async register(userData) {
    return this.registerNormal(userData);
  }

  // ─── Perfil do Utilizador ────────────────────────────────────────────────────

  async getUserProfile() {
    // GET /users/me/
    const profile = await this.get('/users/me/')
    if (profile) {
      // Guardar ID
      if (profile.id) localStorage.setItem('userId', String(profile.id))

      // Nome: API retorna first_name + last_name
      const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
        || profile.username || ''
      if (fullName) localStorage.setItem('userName', fullName)

      // Foto de perfil — campo é profile_photo
      const foto = profile.profile_photo || profile.foto_perfil
      if (foto) localStorage.setItem('userFoto', foto)
      else localStorage.removeItem('userFoto')

      // Role: API retorna role = NORMAL/PRODUCER/SELLER/ADMIN
      const prevRole = localStorage.getItem('userRole')
      const role = (profile.role || '').toUpperCase()
      if (role === 'ADMIN') {
        localStorage.setItem('userRole', 'admin')
      } else if (role === 'PRODUCER') {
        localStorage.setItem('userRole', 'producer')
      } else if (role === 'SELLER') {
        localStorage.setItem('userRole', 'seller')
      } else {
        localStorage.setItem('userRole', 'user')
      }

      // Guardar can_sell (permissão de venda)
      const canSell = profile.can_sell === true || profile.can_sell === 'true'
      localStorage.setItem('userCanSell', canSell ? 'true' : 'false')

      // Notificação de aprovação — se passou de 'user' para 'seller'/'producer'/'admin'
      const newRole = localStorage.getItem('userRole')
      if (prevRole === 'user' && (newRole === 'seller' || newRole === 'producer' || newRole === 'admin')) {
        try {
          const myId = String(profile.id)
          const key = `app_notifications_${myId}`
          const notifs = JSON.parse(localStorage.getItem(key) || '[]')
          const alreadyNotified = notifs.some(n => n.type === 'role_approved')
          if (!alreadyNotified) {
            notifs.unshift({
              id: Date.now(),
              type: 'role_approved',
              icon: 'bi-patch-check-fill',
              message: newRole === 'admin'
                ? 'Foste aprovado como Administrador! Tens acesso total à plataforma. 🎉'
                : 'Foste aprovado como Produtor/Vendedor certificado! Já podes publicar produtos e técnicas. 🌱',
              read: false,
              time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
              date: new Date().toLocaleDateString('pt-PT')
            })
            localStorage.setItem(key, JSON.stringify(notifs.slice(0, 50)))
          }
        } catch (_) {}
      }
    }
    return profile
  }

  // Verifica se o utilizador logado tem permissão para publicar (produto/técnica)
  async checkPublishPermission() {
    const token = localStorage.getItem('access_token')
    if (!token) return { allowed: false, reason: 'not_logged_in' }
    try {
      const profile = await this.get('/users/me/')
      if (!profile) return { allowed: false, reason: 'no_profile' }
      const role = (profile.role || '').toUpperCase()
      const allowed = ['PRODUCER', 'SELLER', 'ADMIN'].includes(role)
      // Atualizar localStorage com dados frescos
      if (role === 'ADMIN') localStorage.setItem('userRole', 'admin')
      else if (role === 'PRODUCER') localStorage.setItem('userRole', 'producer')
      else if (role === 'SELLER') localStorage.setItem('userRole', 'seller')
      return { allowed, profile }
    } catch (_) {
      // Fallback para localStorage se API falhar
      const r = localStorage.getItem('userRole') || ''
      const allowed = ['admin', 'seller', 'producer'].includes(r)
      return { allowed, reason: 'offline_check' }
    }
  }

  // PATCH /users/me/update/  — não precisa de ID
  updateUserProfile(idOrData, userData) {
    // Suporta chamada antiga updateUserProfile(id, data) e nova updateUserProfile(data)
    const data = userData !== undefined ? userData : idOrData
    const isFormData = data instanceof FormData
    if (isFormData) {
      return this.request('/users/me/update/', {
        method: 'PATCH',
        body: data,
        headers: { ...this.getAuthHeaders() }
      })
    }
    return this.request('/users/me/update/', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    })
  }

  // GET /users/{id}/public-profile/
  getUserPublicProfile(id) {
    return this.get(`/users/${id}/public-profile/`)
  }

  changePassword(oldPassword, newPassword) {
    return this.post('/users/change-password/', {
      old_password: oldPassword,
      new_password: newPassword
    })
  }

  // ─── Users CRUD (generic) ───────────────────────────────────────────────────

  // GET /users/  (requires auth)
  getUsers(params = {}) {
    return this.get('/users/', params)
  }

  // GET /users/{id}/
  getUser(id) {
    return this.get(`/users/${id}/`)
  }

  // PATCH /users/{id}/
  updateUserById(id, data) {
    return this.request(`/users/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    })
  }

  // DELETE /users/{id}/
  deleteUserById(id) {
    return this.delete(`/users/${id}/`)
  }

  // ─── Perfil completo / produtor / vendedor ───────────────────────────────────

  getFullProfile() {
    return this.get('/users/me/full-profile/')
  }

  getProducerProfile() {
    return this.get('/users/me/producer-profile/')
  }

  updateProducerProfile(data) {
    return this.request('/users/me/producer-profile/update/', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    })
  }

  getSellerProfile() {
    return this.get('/users/me/seller-profile/')
  }

  updateSellerProfile(data) {
    return this.request('/users/me/seller-profile/update/', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    })
  }

  // ─── Localização — endpoints públicos (sem autenticação) ────────────────────

  async getProvinces() {
    const res = await fetch(`${this.baseURL}/provinces/`)
    const data = await res.json()
    return Array.isArray(data) ? data : (data.results || [])
  }

  getProvince(id) {
    return this.get(`/provinces/${id}/`);
  }

  createProvince(name) {
    return this.post('/provinces/', { name });
  }

  updateProvince(id, data) {
    return this.put(`/provinces/${id}/`, data);
  }

  deleteProvince(id) {
    return this.delete(`/provinces/${id}/`);
  }

  async getDistricts(provinceId) {
    const url = provinceId
      ? `${this.baseURL}/districts/?id=${provinceId}`
      : `${this.baseURL}/districts/`
    const res = await fetch(url)
    const data = await res.json()
    return Array.isArray(data) ? data : (data.results || [])
  }

  getDistrict(id) {
    return this.get(`/districts/${id}/`);
  }

  createDistrict(name, provinceId) {
    return this.post('/districts/', { name, province_id: provinceId });
  }

  updateDistrict(id, data) {
    return this.put(`/districts/${id}/`, data);
  }

  deleteDistrict(id) {
    return this.delete(`/districts/${id}/`);
  }

  // ─── Técnicas ────────────────────────────────────────────────────────────────

  getTechniques() {
    return this.get('/techniques/');
  }

  getTechnique(id) {
    return this.get(`/techniques/${id}/`);
  }

  createTechnique(techniqueData) {
    if (techniqueData instanceof FormData) {
      return this.request('/techniques/', {
        method: 'POST',
        body: techniqueData,
        headers: { ...this.getAuthHeaders() }
      });
    }
    return this.post('/techniques/', techniqueData);
  }

  updateTechnique(id, techniqueData) {
    if (techniqueData instanceof FormData) {
      return this.request(`/techniques/${id}/`, {
        method: 'PATCH',
        body: techniqueData,
        headers: { ...this.getAuthHeaders() }
      });
    }
    return this.request(`/techniques/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(techniqueData),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    });
  }

  deleteTechnique(id) {
    return this.delete(`/techniques/${id}/`);
  }

  // vote: "APPROVE" | "REJECT"
  voteTechnique(techniqueId, vote) {
    return this.post(`/techniques/${techniqueId}/vote/`, { vote });
  }

  // ─── Marketplace — Produtos ──────────────────────────────────────────────────

  getMyProducts() {
    return this.get('/marketplace/products/');
  }

  getProducts(params = {}) {
    return this.get('/marketplace/products/', params);
  }

  getProduct(id) {
    return this.get(`/marketplace/products/${id}/`);
  }

  createProduct(productData) {
    return this.request('/marketplace/products/', {
      method: 'POST',
      body: productData,
      headers: { ...this.getAuthHeaders() }
    });
  }

  updateProduct(id, productData) {
    if (productData instanceof FormData) {
      return this.request(`/marketplace/products/${id}/`, {
        method: 'PATCH',
        body: productData,
        headers: { ...this.getAuthHeaders() }
      });
    }
    return this.request(`/marketplace/products/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    });
  }

  deleteProduct(id) {
    return this.delete(`/marketplace/products/${id}/`);
  }

  getProductCategories() {
    return this.get('/marketplace/products/categories/');
  }

  // GET /marketplace/products/base_units/
  // Lista as unidades base disponíveis (KG, TON, LITER, UNIT, etc.)
  getBaseUnits() {
    return this.get('/marketplace/products/base_units/');
  }

  // POST /marketplace/products/{id}/buy/
  // Aceita unit_id e quantity no body
  buyProduct(id, unitId = null, quantity = 1) {
    const data = { quantity }
    if (unitId) data.unit_id = unitId
    return this.post(`/marketplace/products/${id}/buy/`, data)
  }

  // GET /marketplace/products/{id}/transactions/
  getProductTransactions(id) {
    return this.get(`/marketplace/products/${id}/transactions/`);
  }

  // ─── Marketplace — Unidades de venda (ProductUnit) ───────────────────────────

  // GET /marketplace/product-units/sale_unit_choices/
  getSaleUnitChoices() {
    return this.get('/marketplace/product-units/sale_unit_choices/')
  }

  // GET /marketplace/product-units/  (lista as unidades do vendedor autenticado)
  getMyProductUnits() {
    return this.get('/marketplace/product-units/')
  }

  // GET /marketplace/product-units/{id}/
  getProductUnit(id) {
    return this.get(`/marketplace/product-units/${id}/`)
  }

  // POST /marketplace/product-units/
  // Body: { product_id, unit_type, custom_unit_name, multiplier, price, is_active }
  createProductUnit(data) {
    return this.post('/marketplace/product-units/', data)
  }

  // PATCH /marketplace/product-units/{id}/
  updateProductUnit(id, data) {
    return this.request(`/marketplace/product-units/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    })
  }

  // DELETE /marketplace/product-units/{id}/
  deleteProductUnit(id) {
    return this.delete(`/marketplace/product-units/${id}/`)
  }

  // ─── Marketplace — Avaliações ────────────────────────────────────────────────

  // POST /api/marketplace/ratings/{product_id}/rate_product/
  // Body: { score: 4.5, comment: "Muito bom!" }
  // Erros: 400 se auto-avaliação, duplicado, ou score fora de [1.0, 5.0]
  rateProduct(productId, score, comment = '') {
    return this.post(`/marketplace/ratings/${productId}/rate_product/`, { score, comment });
  }

  // POST /api/marketplace/ratings/{seller_id}/rate_seller/
  // Body: { score: 3.0, comment: "Entrega rápida" }
  rateVendedor(sellerId, score, comment = '') {
    return this.post(`/marketplace/ratings/${sellerId}/rate_seller/`, { score, comment });
  }

  // Compatibilidade — getProductRatings
  getProductRatings(productId) {
    return this.get(`/products/${productId}/`).then(p => ({
      average_rating: p.average_rating,
      total_ratings: p.total_ratings,
      // aliases antigos
      media_avaliacao: p.average_rating,
      total_avaliacoes: p.total_ratings,
    })).catch(() => ({}))
  }

  // Compatibilidade — getProductAvaliacoes
  getProductAvaliacoes(productId) {
    // Primeiro tentar obter o produto e extrair avaliações embutidas (algumas APIs retornam as avaliações
    // junto com o detalhe do produto). Se não existirem, tentar o endpoint dedicado /ratings/.
    return this.get(`/products/${productId}/`).then(p => {
      const candidates = p?.ratings || p?.avaliacoes || p?.product_ratings || p?.reviews || p?.ratings_list
      if (Array.isArray(candidates)) return candidates
      return []
    }).catch(() => {
      return this.get(`/products/${productId}/ratings/`)
        .then(data => Array.isArray(data) ? data : (data?.results || []))
        .catch(() => [])
    })
  }

  // Compatibilidade — getSellerAvaliacoes
  getSellerAvaliacoes(sellerId) {
    return this.get('/seller-ratings/', { seller: sellerId })
      .then(data => Array.isArray(data) ? data : (data?.results || []))
      .catch(() => [])
  }

  // ─── Marketplace — Transações ────────────────────────────────────────────────

  getTransactions() {
    return this.get('/marketplace/transactions/');
  }

  getTransaction(id) {
    return this.get(`/marketplace/transactions/${id}/`);
  }

  confirmTransaction(id) {
    return this.post(`/marketplace/transactions/${id}/confirm/`);
  }

  cancelTransaction(id) {
    return this.post(`/marketplace/transactions/${id}/cancel/`);
  }

  concludeTransaction(id) {
    return this.post(`/marketplace/transactions/${id}/conclude/`);
  }

  updateTransaction(id, data) {
    return this.put(`/marketplace/transactions/${id}/`, data);
  }

  // ─── Pagamentos ──────────────────────────────────────────────────────────────

  // POST /payments/initiate/  { transaction_id, method, provider, phone_number }
  initiatePayment(transactionId, method, provider = 'MOCK', phoneNumber) {
    return this.post('/payments/initiate/', {
      transaction_id: transactionId,
      method,
      provider,
      phone_number: phoneNumber,
    })
  }

  // GET /payments/
  getPayments() {
    return this.get('/payments/')
  }

  // GET /payments/{uuid}/
  getPaymentDetail(uuid) {
    return this.get(`/payments/${uuid}/`)
  }

  // POST /payments/{uuid}/verify/
  verifyPayment(uuid) {
    return this.post(`/payments/${uuid}/verify/`)
  }

  // ─── Upgrade para Produtor ───────────────────────────────────────────────────

  // POST /users/upgrade-to-producer/  { contact, farm_address }
  requestUpgradeToProducer(contact, farmAddress) {
    return this.post('/users/upgrade-to-producer/', { contact, farm_address: farmAddress })
  }

  // GET /users/upgrade-to-producer/status/
  async getUpgradeStatus() {
    try {
      return await this.get('/users/upgrade-to-producer/status/')
    } catch (err) {
      if (err?.status === 404) {
        return null
      }
      throw err
    }
  }

  // Compatibilidade — getMySellerRequest
  getMySellerRequest() {
    return this.getUpgradeStatus()
  }

  // ─── Admin Dashboard ─────────────────────────────────────────────────────────

  // GET /admin-dashboard/
  getAdminDashboard() {
    return this.get('/admin-dashboard/')
  }

  // GET /admin-dashboard/users/  ?role=  ?is_active=
  getAdminUsers(params = {}) {
    return this.get('/admin-dashboard/users/', params)
  }

  // POST /admin-dashboard/users/{id}/deactivate/
  deactivateUser(id) {
    return this.post(`/admin-dashboard/users/${id}/deactivate/`)
  }

  // POST /admin-dashboard/users/{id}/activate/
  activateUser(id) {
    return this.post(`/admin-dashboard/users/${id}/activate/`)
  }

  // DELETE /admin-dashboard/users/{id}/delete/
  deleteUser(id) {
    return this.delete(`/admin-dashboard/users/${id}/delete/`)
  }

  // GET /admin-dashboard/users/upgrade-requests/  ?status=PENDING|APPROVED|REJECTED
  getUpgradeRequests(params = {}) {
    return this.get('/admin-dashboard/users/upgrade-requests/', params)
  }

  // POST /users/{user_id}/approve-upgrade/  { decision: "APPROVED"|"REJECTED" }
  approveUpgrade(userId, decision) {
    return this.post(`/users/${userId}/approve-upgrade/`, { decision })
  }

  // GET /admin-dashboard/products/  ?category=  ?seller=
  getAdminProducts(params = {}) {
    return this.get('/admin-dashboard/products/', params)
  }

  // GET /admin-dashboard/posts/  ?category=
  getAdminPosts(params = {}) {
    return this.get('/admin-dashboard/posts/', params)
  }

  // GET /admin-dashboard/techniques/  ?status=
  getAdminTechniques(params = {}) {
    return this.get('/admin-dashboard/techniques/', params)
  }

  // POST /admin-dashboard/techniques/{id}/validate/
  validateTechnique(id) {
    return this.post(`/admin-dashboard/techniques/${id}/validate/`)
  }

  // POST /admin-dashboard/techniques/{id}/discard/
  discardTechnique(id) {
    return this.post(`/admin-dashboard/techniques/${id}/discard/`)
  }

  // GET /admin-dashboard/transactions/  ?status=
  getAdminTransactions(params = {}) {
    return this.get('/admin-dashboard/transactions/', params)
  }

  // GET /admin-dashboard/metrics/  ?period=daily|monthly  ?days=7|30|90
  getAdminMetrics(params = {}) {
    return this.get('/admin-dashboard/metrics/', params)
  }

  // GET /audit-logs/  ?user_email= ?action= ?resource= ?status= ?date_from= ?date_to=
  getAuditLogs(params = {}) {
    return this.get('/audit-logs/', params)
  }

  // ─── Seller Dashboard ────────────────────────────────────────────────────────

  // GET /seller-dashboard/  (role = SELLER ou PRODUCER, can_sell = true)
  getSellerDashboard() {
    return this.get('/seller-dashboard/')
  }

  // ─── Chat IA ─────────────────────────────────────────────────────────────────

  getChatSessions() {
    return this.get('/chat/sessions/');
  }

  createChatSession(title = 'Nova Conversa') {
    return this.post('/chat/sessions/', { title });
  }

  updateChatSessionTitle(sessionId, title) {
    return this.request(`/chat/sessions/${sessionId}/`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    });
  }

  getChatMessages(sessionId) {
    return this.get('/chat/messages/', { session_id: sessionId });
  }

  sendChatMessage(message, sessionId = null, photo = null) {
    if (photo) {
      const formData = new FormData();
      formData.append('message', message);
      if (sessionId) formData.append('session_id', sessionId);
      formData.append('photo', photo);
      return this.request('/chat/messages/', {
        method: 'POST',
        body: formData,
        headers: { ...this.getAuthHeaders() }
      });
    } else {
      const data = { message };
      if (sessionId) data.session_id = sessionId;
      return this.post('/chat/messages/', data);
    }
  }

  // ─── Notificações ────────────────────────────────────────────────────────────

  getNotifications() {
    return this.get('/notifications/');
  }

  markNotificationRead(id) {
    return this.post(`/notifications/${id}/read/`);
  }

  // ─── Enums ───────────────────────────────────────────────────────────────────

  getEnums() {
    return this.get('/enums/');
  }

  // ─── Feed — Likes ────────────────────────────────────────────────────────────

  // POST /feed/posts/{id}/like/ → retorna {status: "liked"/"unliked"}
  likeFeedPost(postId) {
    return this.post(`/feed/posts/${postId}/like/`);
  }

  // ─── Feed — Posts ─────────────────────────────────────────────────────────────

  getFeedPosts(params = {}) {
    return this.get('/feed/posts/', params);
  }

  getFeedPost(id) {
    return this.get(`/feed/posts/${id}/`);
  }

  createFeedPost(data) {
    if (data instanceof FormData) {
      return this.request('/feed/posts/', {
        method: 'POST',
        body: data,
        headers: { ...this.getAuthHeaders() }
      });
    }
    return this.post('/feed/posts/', data);
  }

  updateFeedPost(id, data) {
    if (data instanceof FormData) {
      return this.request(`/feed/posts/${id}/`, {
        method: 'PATCH',
        body: data,
        headers: { ...this.getAuthHeaders() }
      });
    }
    return this.request(`/feed/posts/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    });
  }

  deleteFeedPost(id) {
    return this.delete(`/feed/posts/${id}/`);
  }

  // ─── Feed — Comentários ───────────────────────────────────────────────────────

  getFeedComments(postId) {
    return this.get('/feed/comments/', { post: postId });
  }

  // { post, message, parent }
  createFeedComment(postId, message, parentId = null) {
    const data = { post: postId, message };
    if (parentId !== null && parentId !== undefined) data.parent = parentId;
    return this.post('/feed/comments/', data);
  }

  updateFeedComment(id, message) {
    return this.request(`/feed/comments/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() }
    });
  }

  deleteFeedComment(id) {
    return this.delete(`/feed/comments/${id}/`);
  }

  // ─── Aliases de compatibilidade ───────────────────────────────────────────────

  getCommunitySessions() {
    return this.getFeedPosts();
  }

  createCommunitySession(title, content, image = null) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    return this.request('/feed/posts/', {
      method: 'POST',
      body: formData,
      headers: { ...this.getAuthHeaders() }
    });
  }

  deleteCommunitySession(id) {
    return this.deleteFeedPost(id);
  }

  getCommunityMessages(postId) {
    return this.getFeedComments(postId);
  }

  sendCommunityMessage(postId, message, parentId = null) {
    return this.createFeedComment(postId, message, parentId);
  }

  updateCommunityMessage(id, message) {
    return this.updateFeedComment(id, message);
  }

  deleteCommunityMessage(id) {
    return this.deleteFeedComment(id);
  }

}

export default new APIService();
