// ─── Configuração da API (sistema legado — não usado pelo React) ──────────────
// O React usa: react-app/src/config/api.js + react-app/src/services/api.js
// ⚠️  Para mudar o servidor, altere APENAS react-app/src/config/api.js

const API_CONFIG = {
    baseURL: 'http://192.168.88.67:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Endpoints corretos conforme documentação da API (em inglês)
const API_ENDPOINTS = {
    // Autenticação
    login:          '/token/',
    refresh:        '/token/refresh/',
    logout:         '/users/logout/',

    // Utilizadores
    registerNormal:   '/users/register/normal/',
    registerProducer: '/users/register/producer/',
    registerSeller:   '/users/register/seller/',
    changePassword:   '/users/change-password/',
    userProfile:      '/users/me/',
    userUpdate:       '/users/me/update/',
    upgradeProducer:  '/users/upgrade-to-producer/',

    // Localização
    provinces: '/provinces/',
    districts: '/districts/',

    // Feed
    feedPosts:    '/feed/posts/',
    feedComments: '/feed/comments/',

    // Chat IA
    chatSessions: '/chat/sessions/',
    chatMessages: '/chat/messages/',

    // Marketplace
    products:          '/marketplace/products/',
    productUnits:      '/marketplace/product-units/',
    transactions:      '/marketplace/transactions/',
    ratings:           '/marketplace/ratings/',

    // Pagamentos
    payments:          '/payments/',
    paymentsInitiate:  '/payments/initiate/',

    // Técnicas
    techniques:        '/techniques/',
    voteTechnique:     (id) => `/techniques/${id}/vote/`,

    // Notificações
    notifications:     '/notifications/',

    // Admin
    adminDashboard:    '/admin-dashboard/',
    auditLogs:         '/audit-logs/',
    enums:             '/enums/',
};

export { API_CONFIG, API_ENDPOINTS };
