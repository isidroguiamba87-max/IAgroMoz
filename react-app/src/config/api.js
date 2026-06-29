// ─── Configuração central da API ─────────────────────────────────────────────
// ⚠️  Para mudar o servidor, altere APENAS a linha abaixo:

export const API_URL = 'https://iagromoz.onrender.com';
export const API_BASE = `${API_URL}/api`;
export const API_MEDIA = `${API_URL}/`;

// Expor no window para acesso pelo ProtectedRoute sem criar dependência circular
if (typeof window !== 'undefined') {
  window.__API_BASE__ = API_BASE;
}

export default API_URL;
