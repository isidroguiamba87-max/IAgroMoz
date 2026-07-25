// Camada de abstração para localStorage — evita acesso direto espalhado pelo código

const KEYS = {
  ACCESS_TOKEN:   'access_token',
  REFRESH_TOKEN:  'refresh_token',
  USER_ID:        'userId',
  USER_NAME:      'userName',
  USER_ROLE:      'userRole',
  USER_FOTO:      'userFoto',
  USER_EMAIL:     'userEmail',
  USER_CAN_SELL:  'userCanSell',
  THEME:          'theme',
  API_BASE:       'apiBase',
}

// ─── Getters ──────────────────────────────────────────────────────────────────

export const getAccessToken  = () => localStorage.getItem(KEYS.ACCESS_TOKEN)
export const getRefreshToken = () => localStorage.getItem(KEYS.REFRESH_TOKEN)
export const getUserId       = () => localStorage.getItem(KEYS.USER_ID)
export const getUserName     = () => localStorage.getItem(KEYS.USER_NAME) || ''
export const getUserRole     = () => localStorage.getItem(KEYS.USER_ROLE) || 'user'
export const getUserFoto     = () => localStorage.getItem(KEYS.USER_FOTO) || null
export const getUserEmail    = () => localStorage.getItem(KEYS.USER_EMAIL) || ''
export const getUserCanSell  = () => localStorage.getItem(KEYS.USER_CAN_SELL) === 'true'
export const getTheme        = () => localStorage.getItem(KEYS.THEME) || 'light'
export const isLoggedIn      = () => Boolean(getAccessToken())

// ─── Setters ──────────────────────────────────────────────────────────────────

export const setAccessToken  = (v) => localStorage.setItem(KEYS.ACCESS_TOKEN, v)
export const setRefreshToken = (v) => localStorage.setItem(KEYS.REFRESH_TOKEN, v)
export const setUserId       = (v) => localStorage.setItem(KEYS.USER_ID, String(v))
export const setUserName     = (v) => localStorage.setItem(KEYS.USER_NAME, v)
export const setUserRole     = (v) => localStorage.setItem(KEYS.USER_ROLE, v)
export const setUserFoto     = (v) => v ? localStorage.setItem(KEYS.USER_FOTO, v) : localStorage.removeItem(KEYS.USER_FOTO)
export const setUserEmail    = (v) => localStorage.setItem(KEYS.USER_EMAIL, v)
export const setUserCanSell  = (v) => localStorage.setItem(KEYS.USER_CAN_SELL, v ? 'true' : 'false')
export const setTheme        = (v) => localStorage.setItem(KEYS.THEME, v)

// ─── Notificações por utilizador ──────────────────────────────────────────────

export function getNotifications(userId) {
  try {
    return JSON.parse(localStorage.getItem(`app_notifications_${userId}`) || '[]')
  } catch {
    return []
  }
}

export function saveNotifications(userId, list) {
  localStorage.setItem(`app_notifications_${userId}`, JSON.stringify(list.slice(0, 50)))
}

// ─── Clear auth ───────────────────────────────────────────────────────────────

export function clearAuth() {
  localStorage.removeItem(KEYS.ACCESS_TOKEN)
  localStorage.removeItem(KEYS.REFRESH_TOKEN)
  localStorage.removeItem(KEYS.USER_ID)
  localStorage.removeItem(KEYS.USER_NAME)
  localStorage.removeItem(KEYS.USER_ROLE)
  localStorage.removeItem(KEYS.USER_FOTO)
  localStorage.removeItem(KEYS.USER_EMAIL)
  localStorage.removeItem(KEYS.USER_CAN_SELL)
}
