// ─── Configuração central da API ─────────────────────────────────────────────
// Usa VITE_API_BASE_URL se definido (produção/Vercel); cai em proxy local (dev).

export const API_URL = '';
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://api.iagromoz.com/api').replace(/\/+$/, '');
export const API_MEDIA = '';

// Expor no window para acesso pelo ProtectedRoute sem criar dependência circular
if (typeof window !== 'undefined') {
  window.__API_BASE__ = API_BASE;
}

export default API_URL;
