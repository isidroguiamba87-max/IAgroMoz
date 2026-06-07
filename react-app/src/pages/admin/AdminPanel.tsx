import { useMemo } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import AdminOverview from './AdminOverview'
import AdminUsers from './AdminUsers'
import AdminProducts from './AdminProducts'
import AdminPosts from './AdminPosts'
import AdminTechniques from './AdminTechniques'
import AdminTransactions from './AdminTransactions'
import AdminMetrics from './AdminMetrics'
import AdminAudit from './AdminAudit'
import AdminSettings from './AdminSettings'

const MENU_ITEMS = [
  { to: 'overview', label: 'Dashboard', icon: 'bi-grid-fill' },
  { to: 'users', label: 'Utilizadores', icon: 'bi-people-fill' },
  { to: 'products', label: 'Mercado (Produtos)', icon: 'bi-box-seam' },
  { to: 'posts', label: 'Feed & Conteúdo', icon: 'bi-file-text-fill' },
  { to: 'techniques', label: 'Técnicas Agrícolas', icon: 'bi-book-fill' },
  { to: 'transactions', label: 'Transações', icon: 'bi-credit-card-fill' },
  { to: 'metrics', label: 'Relatórios / Métricas', icon: 'bi-bar-chart-fill' },
  { to: 'audit', label: 'Audit Logs', icon: 'bi-shield-check' },
  { to: 'settings', label: 'Configurações', icon: 'bi-gear-fill' },
]

function AdminPanel() {
  const navigate = useNavigate()
  const location = useLocation()
  const userName = localStorage.getItem('userName') || 'Administrador'

  const activeItem = useMemo(() => {
    const path = location.pathname.replace(/\/+/g, '/').replace('/admin/', '')
    return MENU_ITEMS.find(item => path.startsWith(item.to)) || MENU_ITEMS[0]
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-3xl bg-green-950 flex items-center justify-center text-white text-lg font-black">iA</div>
            <div>
              <p className="text-sm font-bold text-gray-900">Admin iAgroMOZ</p>
              <p className="text-xs text-gray-500">Gestão da plataforma</p>
            </div>
          </div>
          <div className="rounded-3xl bg-green-50 border border-green-100 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-green-700">Bem-vindo</p>
            <p className="mt-2 font-semibold text-gray-900 truncate">{userName}</p>
            <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">ADMIN</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-5 space-y-2">
          {MENU_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={`/admin/${item.to}`}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-3xl text-sm font-semibold transition ${isActive ? 'bg-green-950 text-white shadow' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <i className={`${item.icon} text-lg`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => { localStorage.clear(); navigate('/login') }}
            className="w-full flex items-center justify-center gap-2 rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition">
            <i className="bi bi-box-arrow-right text-lg" />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Admin Panel</p>
            <p className="text-sm text-gray-500 max-w-2xl">Acesso exclusivo de administrador. Todas as secções abaixo usam os endpoints admin da API.</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="techniques" element={<AdminTechniques />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="metrics" element={<AdminMetrics />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">Secção não encontrada.</div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
