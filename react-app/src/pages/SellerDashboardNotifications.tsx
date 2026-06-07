import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const ICON_MAP = {
  transaction: 'bi-bag',
  payment: 'bi-currency-exchange',
  rating: 'bi-star',
  default: 'bi-bell',
}

function SellerDashboardNotifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.getNotifications()
      const list = Array.isArray(data) ? data : data.results || []
      setNotifications(list)
    } catch (err) {
      setError('Não foi possível carregar as notificações.')
    } finally {
      setLoading(false)
    }
  }

  const extractTransactionId = (notification) => {
    if (!notification) return null
    return notification.transaction || notification.transaction_id || notification.data?.transaction_id || notification.data?.transaction || notification.object_id || null
  }

  const handleNavigate = (notification) => {
    const txId = extractTransactionId(notification)
    if (txId) {
      navigate(`/transactions/${txId}`)
      return
    }
    if (notification.url) {
      window.location.assign(notification.url)
      return
    }
  }

  if (loading) {
    return <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">Carregando notificações...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notificações</h2>
          <p className="text-sm text-gray-500">Notificações de pedido e status de transações.</p>
        </div>
        <button onClick={loadNotifications}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
          <i className="bi bi-arrow-clockwise"></i> Atualizar
        </button>
      </div>

      {error && <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {notifications.length === 0 ? (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          Sem notificações por enquanto.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const icon = ICON_MAP[notification.type] || ICON_MAP.default
            const txId = extractTransactionId(notification)
            return (
              <button key={notification.id || JSON.stringify(notification)}
                onClick={() => handleNavigate(notification)}
                className="w-full rounded-3xl border border-gray-100 bg-white p-4 text-left hover:bg-green-50 transition">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                    <i className={`bi ${icon} text-lg`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{notification.title || notification.message || 'Nova notificação'}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message || notification.detail || 'Clique para ver detalhes.'}</p>
                  </div>
                  <span className="text-xs text-gray-400">{notification.date || ''}</span>
                </div>
                {txId && <p className="mt-3 text-xs text-green-700 font-semibold">Ir para transação #{txId}</p>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SellerDashboardNotifications
