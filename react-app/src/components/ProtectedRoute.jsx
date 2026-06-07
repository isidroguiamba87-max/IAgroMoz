import { Navigate, useLocation } from 'react-router-dom'

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
]

function ProtectedRoute({ children, adminOnly = false, allowedRoles = null }) {
  const isAuthenticated = !!localStorage.getItem('access_token')
  const userRole = localStorage.getItem('userRole') || 'guest'
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />
  }

  const dashboardPath = userRole === 'producer' ? '/producer/dashboard' : '/seller/dashboard'

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to={userRole === 'seller' || userRole === 'producer' ? dashboardPath : '/feed'} replace />
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'seller' || userRole === 'producer' ? dashboardPath : '/feed'} replace />
  }

  // Restrição adicional para sellers e producers: só podem aceder às rotas permitidas
  if (['seller', 'producer'].includes(userRole)) {
    const pathname = location.pathname
    const isAllowed = SELLER_ALLOWED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
    if (!isAllowed) {
      return <Navigate to={dashboardPath} replace />
    }
  }

  return children
}

export default ProtectedRoute
