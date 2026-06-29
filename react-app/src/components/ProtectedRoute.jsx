import { Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Rotas permitidas para papel seller e producer
const SELLER_ALLOWED_ROUTES = [
  '/seller/dashboard',
  '/producer/dashboard',
  '/seller-dashboard',
  '/producer-dashboard',
  '/profile',
  '/transactions',
  '/minhas-reservas',
  '/marketplace',
  '/notifications',
  '/chat',
  '/create-post',
  '/techniques',
  '/technique',
  '/create-product',
  '/product',  // detalhe e gestão de produtos (/product/:id e /product/:id/units)
  '/dashboard', // vendedor/produtor tem acesso ao dashboard
]

function ProtectedRoute({ children, adminOnly = false, allowedRoles = null }) {
  const [authState, setAuthState] = useState('checking') // 'checking' | 'ok' | 'fail'
  const location = useLocation()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (!accessToken && !refreshToken) {
      setAuthState('fail')
      return
    }

    if (!accessToken && refreshToken) {
      // Só tem refresh — tenta renovar
      tryRefresh(refreshToken)
      return
    }

    if (accessToken) {
      // Verificar se o token ainda é válido (não expirado)
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        const exp = payload.exp ? payload.exp * 1000 : null
        const msLeft = exp ? exp - Date.now() : null

        if (msLeft !== null && msLeft < 10_000) {
          // Token expirado ou a expirar em menos de 10s — tentar refresh proativamente
          if (refreshToken) {
            tryRefresh(refreshToken)
          } else {
            setAuthState('fail')
          }
        } else {
          setAuthState('ok')
        }
      } catch (_) {
        // Token malformado — tentar refresh
        if (refreshToken) {
          tryRefresh(refreshToken)
        } else {
          setAuthState('fail')
        }
      }
    }
  }, [location.pathname])

  const tryRefresh = async (refreshToken) => {
    try {
      const apiBase = localStorage.getItem('apiBase') ||
        (window.__API_BASE__ || 'https://iagromoz.onrender.com/api')
      const res = await fetch(`${apiBase}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('access_token', data.access)
        if (data.refresh) localStorage.setItem('refresh_token', data.refresh)
        setAuthState('ok')
      } else {
        // Refresh inválido — limpar tudo
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setAuthState('fail')
      }
    } catch (_) {
      // Erro de rede — se há token, deixa passar (a API vai retornar 401 se precisar)
      const accessToken = localStorage.getItem('access_token')
      setAuthState(accessToken ? 'ok' : 'fail')
    }
  }

  if (authState === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (authState === 'fail') {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />
  }

  const userRole = localStorage.getItem('userRole') || 'guest'
  const dashboardPath = userRole === 'producer' ? '/producer/dashboard' : '/seller/dashboard'

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to={userRole === 'seller' || userRole === 'producer' ? dashboardPath : '/feed'} replace />
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'seller' || userRole === 'producer' ? dashboardPath : '/feed'} replace />
  }

  // Restrição adicional para sellers e producers: só podem aceder às rotas permitidas
  if (['seller', 'producer'].includes(userRole)) {
    const pathname = location.pathname.replace(/\/+$/, '') || '/'
    const isAllowed = SELLER_ALLOWED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
    if (!isAllowed) {
      return <Navigate to={dashboardPath} replace />
    }
  }

  return children
}

export default ProtectedRoute
