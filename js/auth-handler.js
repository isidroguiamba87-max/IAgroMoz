// Handler para formulários de autenticação
import apiService from '../api/apiService.js';

// Gerenciar Login
export async function handleLogin(email, password) {
    try {
        const response = await apiService.login(email, password);
        
        // Redirecionar para dashboard ou página principal
        window.location.href = '/index.html';
        
        return { success: true, data: response };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Erro ao fazer login'
        };
    }
}

// Gerenciar Registro
export async function handleRegister(formData) {
    try {
        // Validar senha
        if (formData.password !== formData.confirmPassword) {
            throw new Error('As senhas não coincidem');
        }

        // Preparar dados para API
        const userData = {
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            password: formData.password,
            id_distrito: parseInt(formData.districtId),
            tipos: ["agricultor"]
        };

        const response = await apiService.register(userData);
        
        // Fazer login automático após registro
        await apiService.login(formData.email, formData.password);
        
        return { success: true, data: response };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Erro ao registrar'
        };
    }
}

// Gerenciar Logout
export async function handleLogout() {
    try {
        await apiService.logout();
        window.location.href = '/login.html';
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Erro ao fazer logout'
        };
    }
}

// Verificar se usuário está autenticado
export function checkAuth() {
    return apiService.isAuthenticated();
}

// Redirecionar se não autenticado
export function requireAuth() {
    if (!checkAuth()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}
