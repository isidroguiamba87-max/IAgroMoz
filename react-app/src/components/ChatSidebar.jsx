import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Avatar from './Avatar'

function ChatSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState('user')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole') || 'user')
    setIsLoggedIn(!!localStorage.getItem('access_token'))
    setUserName(localStorage.getItem('userName') || '')
  }, [])

  const navItems = [
    { path: '/feed',        icon: 'bi-house-fill',     label: 'Início',    roles: ['user', 'seller', 'admin', 'guest'] },
    { path: '/marketplace', icon: 'bi-shop-window',    label: 'Mercado',   roles: ['user', 'seller', 'admin'] },
    { path: '/techniques',  icon: 'bi-lightbulb-fill', label: 'Técnicas',  roles: ['user', 'seller', 'admin'] },
    { path: '/chat',        icon: 'bi-robot',          label: 'Chat IA',   roles: ['user', 'seller', 'admin'] },
    { path: '/profile',     icon: 'bi-person-circle',  label: 'Perfil',    roles: ['user', 'seller', 'admin'] },
    { path: '/dashboard',   icon: 'bi-graph-up',       label: 'Dashboard', roles: ['admin'] },
  ]

  const visibleItems = navItems.filter(item => item.roles.includes(userRole))

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <aside className="hidden lg:flex flex-col w-16 h-screen sticky top-0 flex-shrink-0"
      style={{ background: '#16213e', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Logo */}
      <div className="flex items-center justify-center py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Link to="/feed" title="IAgroMOZ">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <img src="/logo.png" alt="IAgroMOZ" className="w-7 h-7 object-contain" />
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-4 px-2">
        {visibleItems.map(item => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <Link key={item.path} to={item.path} title={item.label}
              className="relative group w-10 h-10 flex items-center justify-center rounded-xl transition-all"
              style={{
                background: isActive ? 'rgba(0,200,83,0.18)' : 'transparent',
                color: isActive ? '#00C853' : 'rgba(255,255,255,0.4)',
              }}>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-green-400" />
              )}
              <i className={`${item.icon} text-xl`}></i>
              {/* Tooltip */}
              <span className="absolute left-12 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-2 py-4 px-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {isLoggedIn ? (
          <>
            <Link to="/profile" title={userName || 'Perfil'}
              className="block"
              style={{ boxShadow: '0 0 0 2px rgba(0,200,83,0.5)', borderRadius: '50%' }}>
              <Avatar name={userName} size="sm" />
            </Link>
            <button onClick={handleLogout} title="Sair"
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all"
              style={{ color: 'rgba(255,255,255,0.3)', background: 'transparent' }}>
              <i className="bi bi-box-arrow-right text-lg"></i>
            </button>
          </>
        ) : (
          <Link to="/login" title="Entrar"
            className="w-10 h-10 flex items-center justify-center rounded-xl"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            <i className="bi bi-person-circle text-xl"></i>
          </Link>
        )}
      </div>
    </aside>
  )
}

export default ChatSidebar
