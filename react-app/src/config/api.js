// ─── Configuração central da API ─────────────────────────────────────────────
// Lê VITE_API_BASE_URL do ambiente; cai em '/api' (proxy) se não definido.
// Para mudar o servidor, defina VITE_API_BASE_URL em .env ou nas env vars do Vercel.

export const API_URL = '';
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
export const API_MEDIA = '';

// Expor no window para acesso pelo ProtectedRoute sem criar dependência circular
if (typeof window !== 'undefined') {
  window.__API_BASE__ = API_BASE;
}

export default API_URL;
