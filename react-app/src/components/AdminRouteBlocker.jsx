import { Navigate, useLocation } from 'react-router-dom'

function AdminRouteBlocker({ children }) {
  const userRole = localStorage.getItem('userRole') || 'guest'
  const location = useLocation()
  const pathname = location.pathname.toLowerCase()

  if (userRole === 'admin' && !pathname.startsWith('/admin') && pathname !== '/dashboard') {
    return <Navigate to="/admin/overview" replace />
  }

  return children
}

export default AdminRouteBlocker
