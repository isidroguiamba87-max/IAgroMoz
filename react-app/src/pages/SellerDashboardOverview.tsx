import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Avatar from '../components/Avatar'
import { useSellerProfile } from '../context/SellerProfileContext'
import { getDashboardPath } from '../utils/dashboardPaths'
import { resolveMediaUrl } from '../utils/normalizers'

// ─── Estado da transação → pill colorida (mesmo vocabulário do TransactionCard) ──
const STATUS_STYLE = {
  RESERVED:              { label: 'Reservado',            color: 'bg-amber-100 text-amber-800' },
  AWAITING_CONFIRMATION: { label: 'A confirmar',           color: 'bg-blue-100 text-blue-800' },
  AWAITING_PAYMENT:      { label: 'A confirmar',           color: 'bg-blue-100 text-blue-800' },
  PROCESSING:            { label: 'Em processamento',      color: 'bg-cyan-100 text-cyan-800' },
  IN_TRANSIT:            { label: 'A caminho',             color: 'bg-purple-100 text-purple-800' },
  COMPLETED:             { label: 'Concluído',             color: 'bg-gray-100 text-gray-600' },
  CANCELLED:             { label: 'Cancelado',             color: 'bg-red-100 text-red-700' },
}

function StatusPill({ status }) {
  const style = STATUS_STYLE[status] || { label: status || '—', color: 'bg-gray-100 text-gray-600' }
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style.color}`}>{style.label}</span>
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-3.5">
      <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
        <i className={`bi ${icon} text-sm`}></i>
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <p className="text-lg font-black text-gray-900 truncate">{value}</p>
    </div>
  )
}

const HELP_TIPS = [
  { icon: 'bi-box-seam',      text: 'Adicione fotos nítidas e um preço claro para atrair mais compradores.' },
  { icon: 'bi-lightning-charge', text: 'Responda aos pedidos rapidamente — reservas paradas há muito tempo podem ser canceladas pelo comprador.' },
  { icon: 'bi-star',          text: 'Boas avaliações vêm de entregas dentro do prazo combinado.' },
]

function SellerDashboardOverview() {
  const navigate = useNavigate()
  const profile = useSellerProfile()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [myProducts, setMyProducts] = useState([])
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    loadDashboard()
    loadMyProducts()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api.getSellerDashboard()
      setData(result)
    } catch (err) {
      setError('Não foi possível carregar o painel. Tente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const loadMyProducts = async () => {
    try {
      const list = await api.getProducts({ seller: userId })
      const items = Array.isArray(list) ? list : list.results || []
      setMyProducts(items.filter(p => String(p.seller_id || p.seller?.id || p.user_id) === String(userId)))
    } catch (_) {
      // painel continua útil sem a grelha de produtos
    }
  }

  const formatMoney = (value) => {
    const number = Number(value || 0)
    return number.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-gray-500">Carregando overview...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 border border-red-200 shadow-sm p-6 text-center text-red-700">
        {error}
      </div>
    )
  }

  const products = data.products || {}
  const transactions = data.transactions || {}
  const payments = data.payments || {}
  const ratings = data.ratings || {}

  const userRole = (profile?.role || localStorage.getItem('userRole') || 'seller').toLowerCase()
  const detailLabel = userRole === 'producer' ? 'exploração' : 'loja'
  const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || profile?.username || 'Utilizador'

  const pendingCount = Object.entries(transactions.by_status || {})
    .filter(([status]) => /RESERVED|PENDING|AWAITING/i.test(status))
    .reduce((sum, [, count]) => sum + count, 0)

  return (
    <div className="space-y-4">
      {/* ── Saudação ── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <Avatar name={fullName} foto={profile?.profile_photo} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-xl font-black text-gray-900 truncate">Olá, {profile?.first_name || fullName}! 👋</p>
            <p className="text-sm text-gray-500 mt-0.5">Gerencie a sua {detailLabel} e aumente as suas vendas.</p>
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mt-2">
              {parseFloat(ratings.average_as_seller || 0).toFixed(1)} <i className="bi bi-star-fill text-amber-400 text-sm"></i>
              <span className="text-xs font-normal text-gray-400">({ratings.total_as_seller ?? 0} avaliações)</span>
            </p>
          </div>
          {userRole === 'producer' && (
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button onClick={() => navigate(getDashboardPath(''))}
                className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition">
                <i className="bi bi-grid-3x3-gap text-lg"></i>
                Visão Geral
              </button>
              <button onClick={() => navigate('/feed')}
                className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition">
                <i className="bi bi-arrow-left-short text-lg"></i>
                Voltar ao Feed
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Estatísticas ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-green-700 text-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-2">Receita total</p>
          <p className="text-2xl font-black">{formatMoney(payments.total_received)} MZN</p>
          <p className="text-xs opacity-70 mt-1">Valor recebido até agora</p>
        </div>
        <button onClick={() => navigate(getDashboardPath('/pedidos'))}
          className="text-left rounded-3xl bg-amber-50 border border-amber-100 p-5 hover:bg-amber-100/60 transition-colors">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700 mb-2">Pedidos pendentes</p>
          <p className="text-2xl font-black text-amber-900">{pendingCount}</p>
          <p className="text-xs text-amber-700 font-semibold mt-1">Ver pedidos →</p>
        </button>
        <button onClick={() => navigate(getDashboardPath('/produtos'))}
          className="text-left rounded-3xl bg-blue-50 border border-blue-100 p-5 hover:bg-blue-100/60 transition-colors">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 mb-2">Produtos ativos</p>
          <p className="text-2xl font-black text-blue-900">{products.total ?? 0}</p>
          <p className="text-xs text-blue-700 font-semibold mt-1">Ver produtos →</p>
        </button>
        <div className="rounded-3xl bg-purple-50 border border-purple-100 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-700 mb-2">Total de pedidos</p>
          <p className="text-2xl font-black text-purple-900">{transactions.total ?? 0}</p>
          <p className="text-xs text-purple-600 mt-1">Desde o início</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {/* ── Pedidos recentes ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-gray-900">Pedidos recentes</h3>
                <p className="text-sm text-gray-500">Últimas reservas e vendas.</p>
              </div>
              <button onClick={() => navigate(getDashboardPath('/pedidos'))} className="text-sm text-green-600 font-semibold hover:underline flex-shrink-0">Ver todos</button>
            </div>
            {transactions.recent?.length > 0 ? (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="text-left text-[11px] text-gray-400 uppercase tracking-wide">
                      <th className="px-2 pb-3 font-semibold">Produto</th>
                      <th className="px-2 pb-3 font-semibold">Cliente</th>
                      <th className="px-2 pb-3 font-semibold">Valor</th>
                      <th className="px-2 pb-3 font-semibold">Estado</th>
                      <th className="px-2 pb-3 font-semibold text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {transactions.recent.slice(0, 5).map(tx => (
                      <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-2 py-3 min-w-0">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {(tx.product_image || tx.imagem || tx.image) ? (
                                <img src={resolveMediaUrl(tx.product_image || tx.imagem || tx.image)} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <i className="bi bi-box-seam text-gray-300"></i>
                              )}
                            </div>
                            <span className="font-semibold text-gray-900 truncate">{tx.product_name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-gray-600 truncate max-w-[9rem]">{tx.buyer_name}</td>
                        <td className="px-2 py-3 font-bold text-green-700 whitespace-nowrap">{Number(tx.amount || 0).toFixed(2)} MZN</td>
                        <td className="px-2 py-3"><StatusPill status={tx.status} /></td>
                        <td className="px-2 py-3 text-right">
                          <button onClick={() => navigate(`/transactions/${tx.id}`)}
                            className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Nenhum pedido recente encontrado.</p>
            )}
          </div>

          {/* ── Meus produtos ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Meus produtos</h3>
              <button onClick={() => navigate(getDashboardPath('/produtos'))} className="text-sm text-green-600 font-semibold hover:underline">Ver todos</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {myProducts.slice(0, 4).map(p => (
                <button key={p.id} onClick={() => navigate(`/product/${p.id}`)}
                  className="text-left rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-24 bg-gray-100 flex items-center justify-center">
                    {(p.photo || p.foto) ? (
                      <img src={resolveMediaUrl(p.photo || p.foto)} alt={p.name || p.nome} className="w-full h-full object-cover" />
                    ) : (
                      <i className="bi bi-box-seam text-2xl text-gray-300"></i>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-900 truncate">{p.name || p.nome || 'Produto'}</p>
                    <p className="text-xs text-green-700 font-black mt-0.5">{p.price || p.preco || '0'} MZN</p>
                  </div>
                </button>
              ))}
              <button onClick={() => navigate(getDashboardPath('/anunciar'))}
                className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors flex flex-col items-center justify-center gap-1 min-h-[7.5rem] text-gray-400 hover:text-green-600">
                <i className="bi bi-plus-circle text-xl"></i>
                <span className="text-xs font-semibold">Adicionar</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Coluna direita ── */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Desempenho</h3>
            <div className="grid grid-cols-2 gap-3">
              <MiniStat icon="bi-graph-up-arrow" label="Vendas" value={`${formatMoney(payments.total_received)} MZN`} />
              <MiniStat icon="bi-box-seam" label="Produtos" value={products.total ?? 0} />
              <MiniStat icon="bi-receipt" label="Pedidos" value={transactions.total ?? 0} />
              <MiniStat icon="bi-star-fill" label="Avaliação" value={parseFloat(ratings.average_as_seller || 0).toFixed(1)} />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Dicas para vender mais</h3>
            <div className="space-y-3">
              {HELP_TIPS.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <i className={`bi ${tip.icon} text-green-600 text-sm`}></i>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>

          {products.low_stock?.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Stock baixo</h3>
              <div className="space-y-3">
                {products.low_stock.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-gray-100 p-3 bg-amber-50/60">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.stock_quantity} {item.unit_name || item.base_unit || 'un'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardOverview
