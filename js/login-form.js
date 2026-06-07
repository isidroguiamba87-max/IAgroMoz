// Script para o formulário de login
import { handleLogin } from './auth-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validação básica
            if (!email || !password) {
                showError('Por favor, preencha todos os campos');
                return;
            }

            // Mostrar loading
            showLoading(true);

            // Fazer login
            const result = await handleLogin(email, password);

            showLoading(false);

            if (result.success) {
                showSuccess('Login realizado com sucesso!');
                // Redirecionar será feito automaticamente pelo handleLogin
            } else {
                showError(result.message);
            }
        });
    }
});

// Mostrar loading
function showLoading(show) {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = show;
        submitBtn.textContent = show ? 'Entrando...' : 'Entrar';
    }
}

// Mostrar erro
function showError(message) {
    alert('Erro: ' + message);
}

// Mostrar sucesso
function showSuccess(message) {
    alert(message);
}
