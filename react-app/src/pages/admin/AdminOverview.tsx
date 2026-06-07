import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Sparkline, StatCard } from './AdminComponents'

function AdminOverview() {
  const [dashboard, setDashboard] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [data, metricsData] = await Promise.all([
          api.getAdminDashboard(),
          api.getAdminMetrics({ period: 'daily', days: 30 }).catch((e) => { console.debug('getAdminMetrics failed', e); return null }),
        ])
        setDashboard(data)
        setMetrics(metricsData)
        console.debug('AdminOverview: dashboard', data)
        console.debug('AdminOverview: metrics', metricsData)
      } catch (err) {
        console.debug('AdminOverview: getAdminDashboard error', err)
        setError(err?.message || 'Erro ao carregar o dashboard.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="rounded-3xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700">Tentar novamente</button>
      </div>
    )
  }

  const users = dashboard?.users || {}
  const marketplace = dashboard?.marketplace || {}
  const feed = dashboard?.feed || {}
  const techniques = dashboard?.techniques || {}
  const upgrades = dashboard?.upgrade_requests || {}
  const activity = dashboard?.activity || {}

  const buildTrend = (key, label, color) => {
    const data = metrics?.[key] || []
    const total = data.reduce((acc, item) => acc + (item.count || 0), 0)
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-500">{label}</span>
          <span className="text-lg font-black" style={{ color }}>{total}</span>
        </div>
        <Sparkline data={data} color={color} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="bi-people-fill" label="Utilizadores" value={users.total || 0} sub={`+${users.new_last_7_days || 0} nos últimos 7 dias`} color="green" />
        <StatCard icon="bi-file-text-fill" label="Publicações" value={feed.total_posts || 0} sub={`+${feed.posts_last_7_days || 0} nos últimos 7 dias`} color="blue" />
        <StatCard icon="bi-box-seam" label="Produtos" value={marketplace.total_products || 0} sub={`+${marketplace.products_last_30_days || 0} últimos 30 dias`} color="orange" />
        <StatCard icon="bi-credit-card-fill" label="Transações" value={marketplace.total_transactions || 0} sub={`Receita ${marketplace.completed_revenue ? Number(marketplace.completed_revenue).toLocaleString('pt-MZ') : 0} MT`} color="purple" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Crescimento de Utilizadores</p>
              <h2 className="text-xl font-black text-gray-900">Últimos 30 dias</h2>
            </div>
          </div>
          {metrics?.new_users?.length > 0 ? (
            <Sparkline data={metrics.new_users} color="#16a34a" />
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-400">Sem dados de métricas.</div>
          )}
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm font-semibold text-gray-500 mb-3">Utilizadores por papel</p>
            <div className="space-y-3">
              {['NORMAL', 'PRODUCER', 'SELLER', 'ADMIN'].map(role => {
                const count = users.by_role?.[role] || 0
                const pct = users.total ? Math.round((count / users.total) * 100) : 0
                const colorClass = role === 'ADMIN' ? 'bg-red-500' : role === 'SELLER' ? 'bg-blue-500' : role === 'PRODUCER' ? 'bg-green-500' : 'bg-gray-400'
                return (
                  <div key={role} className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{role}</span>
                      <span className="font-semibold text-gray-900">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className={`${colorClass} h-full`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm font-semibold text-gray-500 mb-3">Pedidos de Upgrade</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="rounded-3xl bg-green-50 p-4">
                <p className="text-3xl font-black text-green-700">{upgrades.total || 0}</p>
                <p className="text-xs uppercase text-gray-500 mt-1">Total</p>
              </div>
              <div className="rounded-3xl bg-yellow-50 p-4">
                <p className="text-3xl font-black text-yellow-700">{upgrades.pending || 0}</p>
                <p className="text-xs uppercase text-gray-500 mt-1">Pendentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Mercado</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between"><span>Total Produtos</span><span className="font-semibold">{marketplace.total_products || 0}</span></div>
            <div className="flex justify-between"><span>Transações</span><span className="font-semibold">{marketplace.total_transactions || 0}</span></div>
            <div className="flex justify-between"><span>Receita</span><span className="font-semibold">{marketplace.completed_revenue ? Number(marketplace.completed_revenue).toLocaleString('pt-MZ') + ' MT' : '0 MT'}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Feed</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between"><span>Posts</span><span className="font-semibold">{feed.total_posts || 0}</span></div>
            <div className="flex justify-between"><span>Comentários</span><span className="font-semibold">{feed.total_comments || 0}</span></div>
            <div className="flex justify-between"><span>Posts 30d</span><span className="font-semibold">{feed.posts_last_30_days || 0}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Atividade</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between"><span>Logs 30d</span><span className="font-semibold">{activity.logs_last_30_days || 0}</span></div>
            <div className="flex justify-between"><span>Logins 30d</span><span className="font-semibold">{activity.logins_last_30_days || 0}</span></div>
            <div className="flex justify-between"><span>Visitantes Hoje</span><span className="font-semibold">{activity.unique_visitors_today || 0}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {buildTrend('new_products', 'Novos Produtos', '#2563eb')}
        {buildTrend('new_transactions', 'Novas Transações', '#f97316')}
      </div>
    </div>
  )
}

export default AdminOverview
