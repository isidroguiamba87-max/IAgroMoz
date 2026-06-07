import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import api from '../services/api'

const STATUS_LABELS = {
  RESERVED:         { label: 'Reservado',         color: 'bg-yellow-100 text-yellow-800' },
  AWAITING_CONFIRMATION: { label: 'Ag. Confirmação', color: 'bg-blue-100 text-blue-800' },
  PROCESSING:            { label: 'Em Processamento', color: 'bg-cyan-100 text-cyan-800' },
  IN_TRANSIT:            { label: 'A Caminho',        color: 'bg-purple-100 text-purple-800' },
  COMPLETED:        { label: 'Concluído',         color: 'bg-gray-100 text-gray-600' },
  CANCELLED:        { label: 'Cancelado',         color: 'bg-red-100 text-red-700' },
}

function StatCard({ icon, label, value, sub, color = 'text-green-700' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
          <i className={`bi ${icon} text-green-600 text-lg`}></i>
        </div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

function SellerDashboard() {
  const navigate = useNavigate()
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true); setError('')
    try {
      const result = await api.getSellerDashboard()
      setData(result)
    } catch (err) {
      if (err?.status === 403) {
        setError('Não tens permissão para aceder ao painel de vendedor.')
      } else {
        setError('Não foi possível carregar o painel.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fmt = (n) => parseFloat(n || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3 max-w-4xl mx-auto w-full">
            <div className="flex-1">
              <h1 className="text-xl font-black text-gray-900">Painel do Vendedor</h1>
              <p className="text-xs text-gray-400">Resumo da tua atividade</p>
            </div>
            <button onClick={loadDashboard}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
              <i className="bi bi-arrow-clockwise text-lg"></i>
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 max-w-4xl mx-auto w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80 mb-3" />
              <div className="flex items-center gap-1.5">
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-green-500"
                    style={{ animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-8px);opacity:1}}`}</style>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <i className="bi bi-exclamation-circle text-5xl text-red-300"></i>
              <p className="text-gray-600 mt-3 mb-4">{error}</p>
              <button onClick={() => navigate('/marketplace')}
                className="btn-primary text-white px-6 py-2 rounded-xl text-sm">
                Ir ao Mercado
              </button>
            </div>
          ) : data && (
            <div className="space-y-5">

              {/* ── Produtos ── */}
              <section>
                <h2 className="font-bold text-gray-700 text-sm mb-3 px-1">Produtos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <StatCard icon="bi-box-seam" label="Total de produtos" value={data.products?.total ?? 0} />
                  <StatCard icon="bi-plus-circle" label="Novos (30 dias)" value={data.products?.new_last_30_days ?? 0} />
                  <div className="col-span-2 md:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <i className="bi bi-exclamation-triangle text-orange-500 text-lg"></i>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">Stock baixo</p>
                    </div>
                    {data.products?.low_stock?.length > 0 ? (
                      <div className="space-y-1.5 mt-1">
                        {data.products.low_stock.map(p => (
                          <div key={p.id}
                            onClick={() => navigate(`/product/${p.id}`)}
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg px-1 py-0.5">
                            <span className="text-xs text-gray-700 truncate">{p.name}</span>
                            <span className="text-xs font-bold text-orange-600 ml-2 flex-shrink-0">
                              {parseFloat(p.stock_quantity || 0).toFixed(0)} {p.base_unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">Sem produtos com stock baixo</p>
                    )}
                  </div>
                </div>
              </section>

              {/* ── Transações ── */}
              <section>
                <h2 className="font-bold text-gray-700 text-sm mb-3 px-1">Transações</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <StatCard icon="bi-bag" label="Total" value={data.transactions?.total ?? 0} />
                  <StatCard icon="bi-calendar-week" label="Novas (7 dias)" value={data.transactions?.new_last_7_days ?? 0} />
                  <StatCard icon="bi-currency-exchange" label="Receita total" value={`${fmt(data.transactions?.revenue_completed)} MZN`} color="text-green-700" />
                  <StatCard icon="bi-graph-up" label="Receita (30 dias)" value={`${fmt(data.transactions?.revenue_last_30_days)} MZN`} color="text-green-600" />
                </div>

                {/* Estados das transações */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
                  <p className="text-xs font-bold text-gray-500 mb-3">Por estado</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(data.transactions?.by_status || {}).map(([status, count]) => {
                      const cfg = STATUS_LABELS[status] || { label: status, color: 'bg-gray-100 text-gray-600' }
                      return (
                        <span key={status} className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.color}`}>
                          {cfg.label}: {count}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Transações recentes */}
                {data.transactions?.recent?.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-500">Recentes</p>
                      <button onClick={() => navigate('/minhas-reservas')}  
                        className="text-xs text-green-600 font-semibold hover:underline">
                        Ver todas
                      </button>
                    </div>
                    <div className="space-y-2">
                      {data.transactions.recent.slice(0, 5).map(tx => {
                        const cfg = STATUS_LABELS[tx.status] || { label: tx.status, color: 'bg-gray-100 text-gray-600' }
                        return (
                          <div key={tx.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">{tx.product_name}</p>
                              <p className="text-xs text-gray-400">{tx.buyer_name}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                              <span className="text-sm font-black text-green-700">{fmt(tx.amount)} MZN</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.color}`}>{cfg.label}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </section>

              {/* ── Pagamentos ── */}
              <section>
                <h2 className="font-bold text-gray-700 text-sm mb-3 px-1">Pagamentos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <StatCard icon="bi-cash-stack" label="Total recebido" value={`${fmt(data.payments?.total_received)} MZN`} color="text-green-700" />
                  <StatCard icon="bi-calendar-month" label="Recebido (30 dias)" value={`${fmt(data.payments?.received_last_30_days)} MZN`} />
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs font-bold text-gray-500 mb-2">Por método</p>
                    <div className="space-y-1">
                      {Object.entries(data.payments?.by_method || {}).filter(([, v]) => v > 0).map(([method, count]) => (
                        <div key={method} className="flex justify-between text-xs">
                          <span className="text-gray-600">{method}</span>
                          <span className="font-bold text-gray-800">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Avaliações ── */}
              <section>
                <h2 className="font-bold text-gray-700 text-sm mb-3 px-1">Avaliações</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs text-gray-500 mb-1">Como vendedor</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-yellow-500">
                        {parseFloat(data.ratings?.average_as_seller || 0).toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm mb-0.5">/ 5</span>
                    </div>
                    <p className="text-xs text-gray-400">{data.ratings?.total_as_seller ?? 0} avaliações</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs text-gray-500 mb-1">Produtos</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-yellow-500">
                        {parseFloat(data.ratings?.average_products || 0).toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm mb-0.5">/ 5</span>
                    </div>
                    <p className="text-xs text-gray-400">{data.ratings?.total_products_rated ?? 0} avaliações</p>
                  </div>
                </div>
              </section>

            </div>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}

export default SellerDashboard
