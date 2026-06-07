import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useSellerProfile } from '../context/SellerProfileContext'
import { getDashboardPath } from '../utils/dashboardPaths'

function StatBlock({ title, value, description, color = 'text-green-700' }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-3">{title}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
    </div>
  )
}

function SellerDashboardOverview() {
  const navigate = useNavigate()
  const profile = useSellerProfile()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
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

  const seller = data.seller || {}
  const products = data.products || {}
  const transactions = data.transactions || {}
  const payments = data.payments || {}
  const ratings = data.ratings || {}

  const userRole = (profile?.role || localStorage.getItem('userRole') || 'seller').toLowerCase()
  const roleLabel = userRole === 'producer' ? 'Produtor' : userRole === 'seller' ? 'Vendedor' : 'Utilizador'
  const detailLabel = userRole === 'producer' ? 'Exploração' : 'Loja'
  const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || seller.name || 'Vendedor'
  const email = profile?.email || localStorage.getItem('userEmail') || seller.email || ''
  const location = profile?.district?.name || profile?.farm_address || profile?.location || 'Localização não definida'
  const storeName = profile?.store_name || (userRole === 'producer' ? 'Minha Exploração' : 'Minha Loja')
  const storeType = profile?.seller_type || roleLabel

  return (
    <div className="space-y-6">
      {/* Top header similar to mobile mockup */}
      <div className="bg-green-700 text-white rounded-3xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
            { (profile?.first_name || fullName)?.charAt(0)?.toUpperCase() || 'V' }
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Olá, <span className="font-bold">{profile?.first_name || fullName}</span> 👋</p>
                <p className="text-xs opacity-80">{roleLabel} desde {seller.registered_at ? new Date(seller.registered_at).toLocaleString('pt-PT', { month: 'short', year: 'numeric' }) : '—'}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold">{parseFloat(ratings.average_as_seller || 0).toFixed(1)} ⭐</p>
                  <p className="text-xs opacity-80">{ratings.total_as_seller ?? 0} avaliações</p>
                </div>
                <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <i className="bi bi-bell text-white"></i>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="bg-white/8 rounded-xl p-2 text-center">
                  <p className="font-semibold">{data.summary?.new_orders ?? (transactions.recent?.length ?? 0)}</p>
                  <p className="opacity-80 text-xs">Novos</p>
                </div>
                <div className="bg-white/8 rounded-xl p-2 text-center">
                  <p className="font-semibold">{data.summary?.messages ?? 0}</p>
                  <p className="opacity-80 text-xs">Mensagens</p>
                </div>
                <div className="bg-white/8 rounded-xl p-2 text-center">
                  <p className="font-semibold">{data.summary?.product_views ?? 0}</p>
                  <p className="opacity-80 text-xs">Visualizações</p>
                </div>
                <div className="bg-white/8 rounded-xl p-2 text-center">
                  <p className="font-semibold">{data.summary?.sales_today ? formatMoney(data.summary.sales_today) : '0.00'}</p>
                  <p className="opacity-80 text-xs">Vendas hoje</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <StatBlock title="Total de produtos" value={products.total ?? 0} description="Produtos publicados" />
        <StatBlock title="Total de transações" value={transactions.total ?? 0} description="Pedidos" />
        <StatBlock title="Receita total" value={`${formatMoney(payments.total_received)} MZN`} description="Valor recebido" />
        <StatBlock title="Avaliação média" value={parseFloat(ratings.average_as_seller || 0).toFixed(1)} description={`${ratings.total_as_seller ?? 0} avaliações`} />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Visão geral das vendas</h2>
            <p className="text-sm text-gray-500">Acompanhe o desempenho e os estados das transações.</p>
          </div>
          <button onClick={() => navigate('/create-product')}
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition">
            <i className="bi bi-plus-lg"></i> Publicar Novo Produto
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(transactions.by_status || {}).map(([status, count]) => (
            <div key={status} className="rounded-3xl bg-green-50 p-4 border border-green-100">
              <p className="text-xs uppercase tracking-[0.2em] text-green-700 mb-2">{status.replace('_', ' ')}</p>
              <p className="text-2xl font-black text-green-900">{count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Vendas recentes</h3>
              <p className="text-sm text-gray-500">Últimos pedidos de transações.</p>
            </div>
            <button onClick={() => navigate(getDashboardPath('/vendas'))} className="text-sm text-green-600 font-semibold hover:underline">Ver tudo</button>
          </div>
          {transactions.recent?.length > 0 ? (
            <div className="space-y-3">
              {transactions.recent.slice(0, 5).map(tx => (
                <button key={tx.id} onClick={() => navigate(`/transactions/${tx.id}`)}
                  className="w-full rounded-3xl border border-gray-100 p-3 text-left hover:bg-gray-50 transition flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={tx.product_image || tx.imagem || tx.image || tx.product_image_url || '/placeholder.png'} alt={tx.product_name}
                      className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{tx.product_name}</p>
                    <p className="text-xs text-gray-500 truncate">{tx.buyer_name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${tx.status === 'PENDING' || tx.status === 'Pendente' ? 'bg-yellow-50 text-yellow-700' : tx.status === 'CONFIRMED' || tx.status === 'Confirmado' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                        {tx.status || tx.estado || 'Pendente'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-green-700">{Number(tx.amount || 0).toFixed(2)} MZN</span>
                    <p className="text-xs text-gray-400">{tx.updated_at ? new Date(tx.updated_at).toLocaleDateString() : ''}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Nenhuma venda recente encontrada.</p>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Produtos com stock baixo</h3>
          {products.low_stock?.length > 0 ? (
            <div className="space-y-3">
              {products.low_stock.map((item) => (
                <div key={item.id} className="rounded-3xl border border-gray-100 p-4 bg-green-50">
                  <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.stock_quantity} {item.unit_name || item.base_unit || 'un'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aqui aparecerão os produtos que precisam reposição.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardOverview
