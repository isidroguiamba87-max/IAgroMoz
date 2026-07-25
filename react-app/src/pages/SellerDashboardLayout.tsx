import { useEffect, useState } from 'react'
import { NavLink, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { SellerProfileProvider } from '../context/SellerProfileContext'
import { getDashboardPath, getDashboardLabel } from '../utils/dashboardPaths'

const formatRole = (role = '') => {
  const normalized = String(role || '').toLowerCase()
  if (normalized === 'seller') return 'Vendedor'
  if (normalized === 'producer') return 'Produtor'
  return 'Utilizador'
}

function SellerDashboardLayout() {
  const userRole = localStorage.getItem('userRole') || 'seller'
  const dashboardBase = getDashboardPath('', userRole)
  const dashboardLabel = getDashboardLabel(userRole)
  const isProducerDashboard = userRole === 'producer' || dashboardLabel.toLowerCase().includes('produtor')
  const SECTIONS = [
    { label: 'Pedidos', path: `${dashboardBase}/pedidos`, icon: 'bi-receipt' },
    { label: 'Meus Produtos', path: `${dashboardBase}/produtos`, icon: 'bi-box-seam' },
    { label: 'Meus Anúncios', path: `${dashboardBase}/anuncios`, icon: 'bi-megaphone' },
    { label: 'Notificações', path: `${dashboardBase}/notificacoes`, icon: 'bi-bell' },
    { label: 'Meu Perfil', path: `${dashboardBase}/perfil`, icon: 'bi-person-circle' },
  ]
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)
  const [deniedReason, setDeniedReason] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // Limpar localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userCanSell')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    // Redirecionar para login
    navigate('/login')
  }

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      try {
        // Verificar role já guardado no localStorage após login
        const userRole = localStorage.getItem('userRole') || ''
        const canSellStr = localStorage.getItem('userCanSell') || 'false'
        const canSell = canSellStr === 'true' || canSellStr === true
        
        // Se role não é seller/producer, negar acesso imediatamente
        if (!['seller', 'producer'].includes(userRole.toLowerCase())) {
          setDeniedReason('A sua conta não é do tipo vendedor ou produtor.')
          setUnauthorized(true)
          setLoading(false)
          return
        }

        // Tentar buscar dados completos do perfil para confirmação
        let fullProfile = null
        try {
          fullProfile = await api.getFullProfile()
        } catch (err) {
          // Se não conseguir, usar dados do localStorage
          fullProfile = {
            role: userRole.toUpperCase(),
            can_sell: canSell
          }
        }

        // Verificar se tem permissão de venda
        const role = (fullProfile?.role || userRole).toUpperCase()
        const hasSellPermission = fullProfile?.can_sell === true || fullProfile?.can_sell === 'true' || canSell
        
        if (!['SELLER', 'PRODUCER'].includes(role)) {
          setDeniedReason('A sua conta não é do tipo vendedor ou produtor.')
          setUnauthorized(true)
          setLoading(false)
          return
        }

        if (!hasSellPermission) {
          setDeniedReason('A sua conta não tem a permissão de venda ativada (can_sell=false).')
          setUnauthorized(true)
          setLoading(false)
          return
        }

        setProfile(fullProfile || { 
          role: userRole.toUpperCase(), 
          can_sell: true,
          first_name: localStorage.getItem('userName') || 'Utilizador',
          email: localStorage.getItem('userEmail') || ''
        })
      } catch (err) {
        setDeniedReason('Erro ao verificar o perfil. Por favor, faça login novamente ou contacte suporte.')
        setUnauthorized(true)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8] px-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-3xl bg-green-100 mx-auto mb-4 flex items-center justify-center">
            <i className="bi bi-gear-wide-connected text-3xl text-green-700"></i>
          </div>
          <p className="text-gray-600">Carregando {dashboardLabel.toLowerCase()}...</p>
        </div>
      </div>
    )
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8] px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mx-auto mb-4">
            <i className="bi bi-shield-lock-fill text-2xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">Acesso negado ao {dashboardLabel}</h1>
          <p className="text-sm text-gray-500 mb-6">{deniedReason || 'Você não tem permissão para acessar esta área.'}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="/feed" className="inline-flex items-center justify-center rounded-3xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Voltar ao Feed</a>
            <a href="/marketplace" className="inline-flex items-center justify-center rounded-3xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition">Ir ao Marketplace</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col lg:flex-row">
      <aside className="hidden lg:flex lg:w-72 xl:w-80 flex-col border-r border-gray-100 bg-white px-5 py-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-3xl bg-green-50 flex items-center justify-center text-green-700 text-2xl">
              <i className="bi bi-shop"></i>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500">{profile?.role?.toLowerCase() === 'producer' ? 'Exploração' : 'Loja'}</p>
              <h2 className="text-lg font-black text-gray-900 truncate">{profile?.store_name || (profile?.role?.toLowerCase() === 'producer' ? 'Minha Exploração' : 'Minha Loja')}</h2>
            </div>
          </div>
          <div className="rounded-3xl bg-green-50 p-4 space-y-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-bold mb-1">Proprietário</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || profile?.username || 'Utilizador'}</p>
            </div>
            {profile?.store_address && profile?.role?.toLowerCase() === 'seller' && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-bold mb-1">Localização</p>
                <p className="text-xs text-gray-600 truncate">{profile.store_address}</p>
              </div>
            )}
            {profile?.farm_address && profile?.role?.toLowerCase() === 'producer' && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-bold mb-1">Exploração</p>
                <p className="text-xs text-gray-600 truncate">{profile.farm_address}</p>
              </div>
            )}
            {profile?.contact && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-bold mb-1">Contacto</p>
                <p className="text-xs text-gray-600">{profile.contact}</p>
              </div>
            )}
            {!profile?.store_address && !profile?.farm_address && profile?.district?.name && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-bold mb-1">Distrito</p>
                <p className="text-xs text-gray-600">{profile.district.name}</p>
              </div>
            )}
            <p className="text-xs text-gray-500 pt-2 border-t border-green-200">{formatRole(profile?.role)}</p>
            {profile?.can_sell === false && <p className="text-xs text-red-600 font-semibold">Acesso de venda desativado</p>}
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {SECTIONS.map(section => (
            <NavLink key={section.path} to={section.path}
              className={({ isActive }) => `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'text-gray-600 hover:bg-gray-50'}`}>
              <i className={`${section.icon} text-lg`} />
              <span>{section.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Acesso rápido</p>
          <button onClick={() => window.location.assign('/create-product')}
            className="w-full rounded-3xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition mb-3">
            Publicar Novo Produto
          </button>
          <button onClick={handleLogout}
            className="w-full rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition flex items-center justify-center gap-2">
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600">
                <i className="bi bi-list text-2xl"></i>
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{dashboardLabel}</h1>
                <p className="text-sm text-gray-500">Acompanhe estatísticas, pedidos e produtos em um só lugar.</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              {isProducerDashboard ? (
                <>
                  <button onClick={() => navigate(dashboardBase)}
                    className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition">
                    <i className="bi bi-grid-3x3-gap text-lg"></i>
                    Visão Geral
                  </button>
                  <button onClick={() => navigate('/feed')}
                    className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition">
                    <i className="bi bi-arrow-left-short text-lg"></i>
                    Voltar ao Feed
                  </button>
                </>
              ) : (
                <>
                  <span className="rounded-full bg-green-50 px-3 py-2 font-semibold text-green-700">{formatRole(profile.role)}</span>
                  <span className="text-gray-400">{profile.email}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-80 max-w-[85%] h-full bg-white shadow-lg p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-3xl bg-green-50 flex items-center justify-center text-green-700 text-2xl">
                    <i className="bi bi-shop"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{profile?.store_name || 'Minha Loja'}</p>
                    <p className="text-xs text-gray-500 truncate">{`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()}</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-600 rounded-lg">
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
              <nav className="space-y-2">
                {SECTIONS.map(section => (
                  <NavLink key={section.path} to={section.path} onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <i className={`${section.icon} text-lg`} />
                    <span>{section.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button onClick={() => { setMobileMenuOpen(false); navigate('/create-product') }}
                  className="w-full rounded-3xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition mb-3">
                  Publicar Novo Produto
                </button>
                <button onClick={() => { setMobileMenuOpen(false); handleLogout() }}
                  className="w-full rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition flex items-center justify-center gap-2">
                  <i className="bi bi-box-arrow-right"></i> Sair
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="px-4 py-6 lg:px-6">
          <SellerProfileProvider profile={profile}>
            <Outlet />
          </SellerProfileProvider>
        </main>
      </div>
    </div>
  )
}

export default SellerDashboardLayout
