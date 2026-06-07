import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { SectionHeader, Sparkline, StatCard } from './AdminComponents'

function AdminMetrics() {
  const [metrics, setMetrics] = useState(null)
  const [period, setPeriod] = useState('daily')
  const [days, setDays] = useState('30')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.getAdminMetrics({ period, days })
      setMetrics(data)
    } catch (err) {
      setMetrics(null)
      setError(err?.message || 'Erro ao carregar métricas.')
    } finally {
      setLoading(false)
    }
  }, [period, days])

  useEffect(() => { load() }, [load])

  const chartItems = [
    { key: 'new_users', label: 'Novos Utilizadores', color: '#16a34a' },
    { key: 'new_products', label: 'Novos Produtos', color: '#2563eb' },
    { key: 'new_posts', label: 'Novas Publicações', color: '#9333ea' },
    { key: 'new_transactions', label: 'Novas Transações', color: '#f97316' },
    { key: 'logins', label: 'Logins', color: '#0891b2' },
    { key: 'unique_visitors', label: 'Visitantes únicos', color: '#dc2626' },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader title="Relatórios / Métricas" subtitle="Explore tendências diárias ou mensais para todas as métricas principais." />

      <div className="grid gap-3 sm:grid-cols-3">
        <select value={period} onChange={e => setPeriod(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="daily">Diário</option>
          <option value="monthly">Mensal</option>
        </select>
        <select value={days} onChange={e => setDays(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="7">7 dias</option>
          <option value="30">30 dias</option>
          <option value="90">90 dias</option>
        </select>
        <button onClick={load} className="rounded-3xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800">Atualizar métricas</button>
      </div>

      {error && <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-24"><div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-500 mb-3">Visão Geral</p>
              <div className="grid grid-cols-2 gap-4">
                <StatCard icon="bi-people-fill" label="Utilizadores novos" value={(metrics?.new_users || []).reduce((sum, item) => sum + (item.count || 0), 0)} color="green" />
                <StatCard icon="bi-box-seam" label="Produtos novos" value={(metrics?.new_products || []).reduce((sum, item) => sum + (item.count || 0), 0)} color="blue" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {chartItems.map(chart => (
                <div key={chart.key} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-500">{chart.label}</p>
                    <span className="text-sm font-black" style={{ color: chart.color }}>{(metrics?.[chart.key] || []).reduce((sum, item) => sum + (item.count || 0), 0)}</span>
                  </div>
                  <Sparkline data={metrics?.[chart.key]} color={chart.color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMetrics
