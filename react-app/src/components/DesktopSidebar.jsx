import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Avatar from './Avatar'
import { getDashboardPath, getDashboardLabel } from '../utils/dashboardPaths'

function DesktopSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState('user')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [unreadNotif, setUnreadNotif] = useState(0)
  const [unreadMsg, setUnreadMsg] = useState(0)
  const [activeReservations, setActiveReservations] = useState(0)

  useEffect(() => {
    const refreshState = () => {
      setUserRole(localStorage.getItem('userRole') || 'user')
      setIsLoggedIn(!!localStorage.getItem('access_token'))
      setUserName(localStorage.getItem('userName') || '')
      const myId = localStorage.getItem('userId')
      try {
        const notifs = JSON.parse(localStorage.getItem(`app_notifications_${myId}`) || '[]')
        setUnreadNotif(notifs.filter(n => !n.read).length)
      } catch (_) {
        setUnreadNotif(0)
      }
    }

    refreshState()
    window.addEventListener('app-notifications-updated', refreshState)
    return () => window.removeEventListener('app-notifications-updated', refreshState)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('access_token')) return
    import('../services/api').then(({ default: api }) => {
      api.getTransactions().then(data => {
        const list = Array.isArray(data) ? data : (data.results || [])
        setActiveReservations(list.filter(tx => !['COMPLETED', 'CANCELLED'].includes(tx.status)).length)
      }).catch(() => {})
    })
  }, [])

  const dashboardPath = getDashboardPath('', userRole)
  const dashboardLabel = getDashboardLabel(userRole)

  // Grupo 1 — navegação principal
  const mainItems = [
    { path: '/feed',        icon: 'bi-house-fill',     label: 'Feed',            roles: ['user', 'producer', 'admin', 'guest'] },
    { path: '/chat',        icon: 'bi-robot',          label: 'IA – Assistente', roles: ['user', 'seller', 'producer', 'admin'] },
    { path: '/techniques',  icon: 'bi-geo-alt-fill',   label: 'Recomendações',   roles: ['user', 'producer', 'admin'] },
    { path: '/marketplace', icon: 'bi-cart3',          label: 'Mercado',         roles: ['user', 'seller', 'producer', 'admin'] },
  ]

  // Grupo 2 — social e perfil
  const secondaryItems = [
    { path: '/notifications',   icon: 'bi-bell-fill',  label: 'Notificações',    badge: unreadNotif,       roles: ['user', 'seller', 'producer', 'admin'] },
    { path: '/minhas-reservas', icon: 'bi-cart3',      label: 'Minhas Reservas', badge: activeReservations, roles: ['user', 'seller', 'producer', 'admin'] },
    { path: dashboardPath,     icon: 'bi-speedometer2', label: dashboardLabel, roles: ['seller', 'producer'] },
    { path: '/profile',        icon: 'bi-person-fill',   label: 'Meu Perfil',    roles: ['user', 'seller', 'producer', 'admin'] },
    { path: '/dashboard',      icon: 'bi-graph-up',      label: 'Dashboard',     roles: ['admin'] },
  ]
  const filterByRole = (items) => items.filter(i => i.roles.includes(userRole))

  const NavItem = ({ item }) => {
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/'
    const isActive = normalizedPath === item.path || normalizedPath.startsWith(item.path + '/')
    return (
      <Link to={item.path}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[15px] group ${
          isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}>
        <i className={`${item.icon} text-lg ${isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'}`}></i>
        <span className="flex-1">{item.label}</span>
        {item.badge > 0 && (
          <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {item.badge > 9 ? '9+' : item.badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen sticky top-0 border-r border-gray-100 bg-white px-4 py-6 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-6">
        <img src="/logo.png" alt="IAgroMOZ" className="w-8 h-8 object-contain" />
        <span className="text-xl font-black text-gradient">IAgroMOZ</span>
        {isLoggedIn && (
          <Link to="/profile" className="ml-auto flex-shrink-0" title={userName || 'Perfil'}>
            <Avatar name={userName} size="sm" />
          </Link>
        )}
      </div>

      {/* Grupo 1 */}
      <nav className="space-y-0.5 mb-2">
        {filterByRole(mainItems).map((item, idx) => <NavItem key={`main-${idx}`} item={item} />)}
      </nav>

      {/* Divisor */}
      <div className="border-t border-gray-100 my-3" />

      {/* Grupo 2 */}
      <nav className="space-y-0.5 flex-1">
        {filterByRole(secondaryItems).map((item, idx) => <NavItem key={`sec-${idx}`} item={item} />)}
      </nav>

      {/* Card Assistente IA */}
      {['user', 'admin'].includes(userRole) && (
        <div className="mt-4 rounded-2xl p-4" style={{ background: '#f0f7f0' }}>
          <p className="font-bold text-green-800 text-sm mb-1">Assistente IA</p>
          <p className="text-green-700 text-xs mb-3 leading-relaxed">
            Tire suas dúvidas e receba orientações personalizadas
          </p>
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center">
              <i className="bi bi-robot text-green-600 text-2xl"></i>
            </div>
          </div>
          <Link to="/chat"
            className="block w-full text-center py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-bold transition-colors">
            Conversar agora
          </Link>
        </div>
      )}

      {/* Logout */}
      {isLoggedIn && (
        <button onClick={() => { localStorage.clear(); navigate('/login') }}
          className="mt-3 flex items-center gap-2 px-3 py-2 w-full text-gray-400 hover:text-red-500 text-sm transition-colors">
          <i className="bi bi-box-arrow-right text-lg"></i>
          <span>Sair</span>
        </button>
      )}
      {!isLoggedIn && (
        <div className="mt-3 space-y-2">
          <Link to="/login" className="flex items-center justify-center w-full py-2.5 rounded-xl btn-primary text-white font-bold text-sm">
            Entrar
          </Link>
          <Link to="/register" className="flex items-center justify-center w-full py-2.5 rounded-xl border-2 border-green-600 text-green-700 font-bold text-sm hover:bg-green-50">
            Criar conta
          </Link>
        </div>
      )}
    </aside>
  )
}

export default DesktopSidebar
