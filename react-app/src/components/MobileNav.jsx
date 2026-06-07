import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDashboardPath } from '../utils/dashboardPaths'

function MobileNav() {
  const location = useLocation()
  const [userRole, setUserRole] = useState('user')

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole') || 'user')
  }, [])

  const dashboardBase = getDashboardPath('', userRole)

  // Nav do vendedor/produtor — 5 itens com "+" central
  const sellerNavItems = [
    { path: dashboardBase,       icon: 'bi-house-fill',   label: 'Início' },
    { path: '/marketplace',      icon: 'bi-box-seam',     label: 'Produtos' },
    { path: '/create-product',   icon: null,              label: 'Publicar', isPlus: true },
    { path: '/minhas-reservas',  icon: 'bi-receipt',      label: 'Pedidos' },
    { path: '/profile',          icon: 'bi-list',         label: 'Menu' },
  ]

  const producerNavItems = [
    { path: '/feed',             icon: 'bi-house-fill',   label: 'Início' },
    { path: '/marketplace',      icon: 'bi-box-seam',     label: 'Produtos' },
    { path: '/create-post',      icon: null,              label: 'Publicar', isPlus: true },
    { path: '/minhas-reservas',  icon: 'bi-receipt',      label: 'Pedidos' },
    { path: '/profile',          icon: 'bi-list',         label: 'Menu' },
  ]

  const defaultNavItems = [
    { path: '/feed',         icon: 'bi-house-fill',     label: 'Feed',          roles: ['user', 'admin', 'guest'] },
    { path: '/chat',         icon: 'bi-robot',          label: 'IA',            roles: ['user', 'admin'] },
    { path: '/marketplace',  icon: 'bi-shop-window',    label: 'Mercado',       roles: ['user', 'admin'] },
    { path: '/dashboard',    icon: 'bi-graph-up',       label: 'Admin',         roles: ['admin'] },
  ]

  const isSeller = userRole === 'seller'
  const isProducer = userRole === 'producer'

  const visibleItems = isSeller
    ? sellerNavItems
    : isProducer
      ? producerNavItems
      : defaultNavItems.filter(item => item.roles.includes(userRole))

  const isSellerOrProducer = isSeller || isProducer

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className={`${isSellerOrProducer ? 'bg-white border-t border-gray-100 shadow-lg' : 'bottom-nav'} flex items-center max-w-full mx-auto px-1 py-1`}>
        {visibleItems.map((item) => {
          const currentPath = location.pathname + location.search
          const isActive = !item.isPlus && (currentPath === item.path || location.pathname === item.path || location.pathname.startsWith(item.path + '/'))

          if (item.isPlus) {
            return (
              <Link key="plus" to={item.path} className="flex-1 flex flex-col items-center gap-0.5 py-1">
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-200 -mt-5 border-4 border-white">
                  <i className="bi bi-plus text-white text-3xl leading-none"></i>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 -mt-1">{item.label}</span>
              </Link>
            )
          }

          if (isSellerOrProducer) {
            return (
              <Link key={item.path + item.label} to={item.path}
                className="flex-1 flex flex-col items-center gap-0.5 px-1 py-2 relative">
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full bg-green-600" />
                )}
                <i className={`${item.icon} text-xl ${isActive ? 'text-green-700' : 'text-gray-400'}`}></i>
                <span className={`text-[10px] font-semibold ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </Link>
            )
          }

          return (
            <Link key={item.path + item.label} to={item.path}
              className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 relative group">
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full bg-green-500" />
              )}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-green-700 to-green-500 shadow-lg shadow-green-200'
                  : 'bg-transparent group-hover:bg-green-50'
              }`}>
                <i className={`${item.icon} text-xl ${isActive ? 'text-white' : 'text-gray-500'}`}></i>
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNav
