import { API_CONFIG, API_ENDPOINTS } from './config.js';
import authManager from './auth.js';

// Serviço principal da API
class APIService {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.timeout = API_CONFIG.timeout;
    }

    // Método genérico para fazer requisições
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            ...options,
            headers: {
                ...API_CONFIG.headers,
                ...authManager.getAuthHeaders(),
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            // Se token expirou, tentar renovar
            if (response.status === 401 && authManager.getRefreshToken()) {
                const renewed = await this.refreshToken();
                if (renewed) {
                    // Tentar novamente com novo token
                    config.headers = {
                        ...config.headers,
                        ...authManager.getAuthHeaders()
                    };
                    const retryResponse = await fetch(url, config);
                    return await this.handleResponse(retryResponse);
                }
            }

            return await this.handleResponse(response);
        } catch (error) {
            throw new Error(`Erro de rede: ${error.message}`);
        }
    }

    // Processar resposta
    async handleResponse(response) {
        const data = await response.json().catch(() => null);
        
        if (!response.ok) {
            throw {
                status: response.status,
                message: data?.detail || data?.message || 'Erro na requisição',
                data: data
            };
        }

        return data;
    }

    // GET
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        return this.request(url, {
            method: 'GET'
        });
    }

    // POST
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

    // ========== AUTENTICAÇÃO ==========
    
    async login(email, password) {
        const data = await this.post(API_ENDPOINTS.login, { email, password });
        authManager.saveTokens(data.access, data.refresh);
        return data;
    }

    async refreshToken() {
        try {
            const data = await this.post(API_ENDPOINTS.refresh, {
                refresh: authManager.getRefreshToken()
            });
            authManager.saveTokens(data.access, authManager.getRefreshToken());
            return true;
        } catch (error) {
            authManager.clearTokens();
            return false;
        }
    }

    async logout() {
        try {
            await this.post(API_ENDPOINTS.logout, {
                refresh: authManager.getRefreshToken()
            });
        } finally {
            authManager.clearTokens();
        }
    }

    async register(userData) {
        return this.post(API_ENDPOINTS.register, userData);
    }

    async changePassword(oldPassword, newPassword) {
        return this.put(API_ENDPOINTS.changePassword, {
            old_password: oldPassword,
            new_password: newPassword
        });
    }

    // ========== LOCALIZAÇÃO ==========
    
    async getProvinces() {
        return this.get(API_ENDPOINTS.provinces);
    }

    async getDistricts(provinceId = null) {
        const params = provinceId ? { id_provincia: provinceId } : {};
        return this.get(API_ENDPOINTS.districts, params);
    }

    // ========== CHAT ==========
    
    async createChatSession(title) {
        return this.post(API_ENDPOINTS.chatSessions, { titulo: title });
    }

    async sendChatMessage(sessionId, message) {
        return this.post(API_ENDPOINTS.chatMessages, {
            session_id: sessionId,
            mensagem: message
        });
    }

    async getChatMessages(sessionId) {
        return this.get(API_ENDPOINTS.chatMessages, { session_id: sessionId });
    }

    // ========== COMUNIDADE ==========
    
    async createCommunitySession(title, firstMessage) {
        return this.post(API_ENDPOINTS.communitySessions, {
            titulo: title,
            primeira_mensagem: firstMessage
        });
    }

    async sendCommunityMessage(sessionId, message, parentMessageId = null) {
        const data = {
            sessao: sessionId,
            mensagem: message
        };
        if (parentMessageId) {
            data.parent_message = parentMessageId;
        }
        return this.post(API_ENDPOINTS.communityMessages, data);
    }

    async getCommunitySessions() {
        return this.get(API_ENDPOINTS.communitySessions);
    }

    // ========== MARKETPLACE ==========
    
    async requestSeller(contact, message) {
        return this.post(API_ENDPOINTS.sellerRequest, {
            contacto: contact,
            mensagem: message
        });
    }

    async getMySellerRequest() {
        return this.get(API_ENDPOINTS.myRequest);
    }

    async createProduct(productData) {
        return this.post(API_ENDPOINTS.products, productData);
    }

    async getProducts() {
        return this.get(API_ENDPOINTS.products);
    }

    // ========== TÉCNICAS ==========
    
    async getTechniques() {
        return this.get(API_ENDPOINTS.techniques);
    }

    async createTechnique(title, description) {
        return this.post(API_ENDPOINTS.techniques, {
            titulo: title,
            descricao: description
        });
    }

    async voteTechnique(techniqueId, vote) {
        return this.post(API_ENDPOINTS.voteTechnique(techniqueId), {
            voto: vote // "APROVA" ou "REPROVA"
        });
    }
}

// Instância única
const apiService = new APIService();

export default apiService;
