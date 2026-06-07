// Script para o formulário de registro
import { handleRegister } from './auth-handler.js';
import LocationHandler from './location-handler.js';

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar handler de localização
    const locationHandler = new LocationHandler('province', 'district');
    locationHandler.init();

    // Gerenciar formulário
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validar localização
            if (!locationHandler.validate()) {
                return;
            }

            // Coletar dados do formulário
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value,
                districtId: locationHandler.getSelectedDistrict()
            };

            // Validar senha
            if (!validatePassword(formData.password)) {
                showError('A senha não atende aos requisitos mínimos');
                return;
            }

            // Mostrar loading
            showLoading(true);

            // Enviar registro
            const result = await handleRegister(formData);

            showLoading(false);

            if (result.success) {
                showSuccess('Registro realizado com sucesso! Redirecionando...');
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            } else {
                showError(result.message);
            }
        });
    }

    // Validação em tempo real da senha
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            const isValid = validatePassword(e.target.value);
            e.target.classList.toggle('success', isValid);
            e.target.classList.toggle('error', !isValid);
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', (e) => {
            const password = passwordInput.value;
            const matches = e.target.value === password;
            e.target.classList.toggle('success', matches && e.target.value.length > 0);
            e.target.classList.toggle('error', !matches && e.target.value.length > 0);
        });
    }
});

// Validar senha
function validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumber;
}

// Mostrar loading
function showLoading(show) {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = show;
        submitBtn.textContent = show ? 'Registrando...' : 'Registrar';
    }
}

// Mostrar erro
function showError(message) {
    // Você pode substituir por um toast ou modal mais elegante
    alert('Erro: ' + message);
}

// Mostrar sucesso
function showSuccess(message) {
    // Você pode substituir por um toast ou modal mais elegante
    alert(message);
}
