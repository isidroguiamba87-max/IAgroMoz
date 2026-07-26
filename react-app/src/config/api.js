// ─── Configuração central da API ─────────────────────────────────────────────
// URLs relativas — o proxy do Vite (dev) e do Vercel (prod) encaminham para o backend.
// ⚠️  Para mudar o servidor, altere o proxy em vite.config.js e vercel.json.

export const API_URL = '';
export const API_BASE = '/api';
export const API_MEDIA = '';

// Expor no window para acesso pelo ProtectedRoute sem criar dependência circular
if (typeof window !== 'undefined') {
  window.__API_BASE__ = API_BASE;
}

export default API_URL;
