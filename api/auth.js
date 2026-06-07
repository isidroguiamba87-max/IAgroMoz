// Gerenciamento de Autenticação
class AuthManager {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.loadTokens();
    }

    // Carregar tokens do localStorage
    loadTokens() {
        this.accessToken = localStorage.getItem('access_token');
        this.refreshToken = localStorage.getItem('refresh_token');
    }

    // Salvar tokens
    saveTokens(access, refresh) {
        this.accessToken = access;
        this.refreshToken = refresh;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }

    // Limpar tokens (logout)
    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.accessToken;
    }

    // Obter token de acesso
    getAccessToken() {
        return this.accessToken;
    }

    // Obter token de refresh
    getRefreshToken() {
        return this.refreshToken;
    }

    // Obter headers com autenticação
    getAuthHeaders() {
        if (!this.accessToken) {
            return {};
        }
        return {
            'Authorization': `Bearer ${this.accessToken}`
        };
    }
}

// Instância única
const authManager = new AuthManager();

export default authManager;
