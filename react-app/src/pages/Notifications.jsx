import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import api from '../services/api'
import { getPendingRequestsForMe, acceptConnectionRequest, rejectConnectionRequest } from '../components/FeedRightPanel'

// Helpers para notificações gerais
const getSavedNotifications = () => {
  try {
    const myId = localStorage.getItem('userId')
    const general = JSON.parse(localStorage.getItem('app_notifications') || '[]')
    const personal = myId ? JSON.parse(localStorage.getItem(`app_notifications_${myId}`) || '[]') : []
    const all = [...general, ...personal].sort((a, b) => b.id - a.id)
    const seen = new Set()
    return all.filter(n => { if (seen.has(n.id)) return false; seen.add(n.id); return true })
  } catch { return [] }
}
export const addNotification = (notif, personal = false) => {
  const myId = localStorage.getItem('userId')
  const key = personal && myId ? `app_notifications_${myId}` : 'app_notifications'
  const notifs = JSON.parse(localStorage.getItem(key) || '[]')
  notifs.unshift({
    id: Date.now(),
    read: false,
    time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString('pt-PT'),
    ...notif,
  })
  localStorage.setItem(key, JSON.stringify(notifs.slice(0, 50)))
  window.dispatchEvent(new Event('app-notifications-updated'))
}
const saveAllRead = () => {
  const myId = localStorage.getItem('userId')
  const notifs = JSON.parse(localStorage.getItem('app_notifications') || '[]').map(n => ({ ...n, read: true }))
  localStorage.setItem('app_notifications', JSON.stringify(notifs))
  if (myId) {
    const personal = JSON.parse(localStorage.getItem(`app_notifications_${myId}`) || '[]').map(n => ({ ...n, read: true }))
    localStorage.setItem(`app_notifications_${myId}`, JSON.stringify(personal))
  }
  window.dispatchEvent(new Event('app-notifications-updated'))
}
// Notificações reais do backend só trazem { id, message, is_read, created_at }
// — sem type/icon/date/time como as locais. Preenche esses campos aqui para o
// resto do ecrã (ICON_MAP, "{date} · {time}") continuar a funcionar sem saber
// a origem de cada notificação.
const formatNotifDate = (createdAt) => {
  if (!createdAt) return { date: '', time: '' }
  const d = new Date(createdAt)
  if (Number.isNaN(d.getTime())) return { date: '', time: '' }
  return {
    date: d.toLocaleDateString('pt-PT'),
    time: d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
  }
}

const loadNotifications = async (setNotifs) => {
  try {
    const data = await api.getNotifications()
    const list = Array.isArray(data) ? data : data?.results || []
    const local = getSavedNotifications()
    const remote = list.map(n => ({
      ...formatNotifDate(n.created_at),
      ...n,
      read: n.is_read ?? n.read ?? false,
    }))
    // Junta as reais (backend) com as locais (feedback imediato de acções
    // próprias, ex: "conexão aceite") sem duplicar por id.
    const seen = new Set(remote.map(n => n.id))
    const merged = [...remote, ...local.filter(n => !seen.has(n.id))]
    setNotifs(merged)
  } catch (err) {
    console.warn('Notifications: fallback to saved notifications', err)
    setNotifs(getSavedNotifications())
  }
}
const markAllRead = async (notifs, setNotifs) => {
  if (!Array.isArray(notifs) || notifs.length === 0) return
  const unread = notifs.filter(n => !n.read)
  if (unread.length > 0) {
    await Promise.allSettled(unread.map(n => api.markNotificationRead(n.id)))
  }
  const updated = notifs.map(n => ({ ...n, read: true }))
  setNotifs(updated)
  saveAllRead()
}

const ICON_MAP = {
  connection: { icon: 'bi-person-plus-fill', bg: 'bg-green-100', color: 'text-green-600' },
  connection_accepted: { icon: 'bi-people-fill', bg: 'bg-green-100', color: 'text-green-600' },
  like: { icon: 'bi-heart-fill', bg: 'bg-red-100', color: 'text-red-500' },
  product_view: { icon: 'bi-eye-fill', bg: 'bg-blue-100', color: 'text-blue-600' },
  rating: { icon: 'bi-star-fill', bg: 'bg-yellow-100', color: 'text-yellow-500' },
  purchase: { icon: 'bi-bag-check-fill', bg: 'bg-purple-100', color: 'text-purple-600' },
  comment: { icon: 'bi-chat-fill', bg: 'bg-teal-100', color: 'text-teal-600' },
  upgrade_request: { icon: 'bi-arrow-up-circle', bg: 'bg-amber-100', color: 'text-amber-700' },
  role_approved: { icon: 'bi-patch-check-fill', bg: 'bg-green-100', color: 'text-green-700' },
  payment: { icon: 'bi-currency-exchange', bg: 'bg-indigo-100', color: 'text-indigo-700' },
  transaction: { icon: 'bi-receipt-cutoff', bg: 'bg-cyan-100', color: 'text-cyan-700' },
  default: { icon: 'bi-bell-fill', bg: 'bg-gray-100', color: 'text-gray-500' },
}

function Notifications() {
  const navigate = useNavigate()
  const [pendingReqs, setPendingReqs] = useState([])
  const [notifs, setNotifs] = useState([])
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    setPendingReqs(getPendingRequestsForMe())
    loadNotifications(setNotifs)
  }, [])

  const handleAccept = async (reqId) => {
    acceptConnectionRequest(reqId)
    setPendingReqs(getPendingRequestsForMe())
    addNotification({ type: 'connection', message: 'Conexão aceite com sucesso!', icon: 'bi-people-fill' })
    await loadNotifications(setNotifs)
  }

  const handleReject = (reqId) => {
    rejectConnectionRequest(reqId)
    setPendingReqs(getPendingRequestsForMe())
  }

  const handleTransactionConfirmation = async (transactionId, confirm) => {
    try {
      if (confirm) {
        await api.confirmTransaction(transactionId)
      } else {
        await api.cancelTransaction(transactionId)
      }
      await loadNotifications(setNotifs)
      addNotification({
        type: 'transaction',
        message: confirm ? 'Reserva confirmada com sucesso!' : 'Reserva rejeitada.',
        icon: 'bi-receipt-cutoff',
        transaction_id: transactionId,
        transaction_status: confirm ? 'AWAITING_PAYMENT' : 'CANCELLED',
      }, true)
    } catch (err) {
      console.error('Erro ao processar confirmação:', err)
      addNotification({
        type: 'transaction',
        message: 'Erro ao processar resposta.',
        icon: 'bi-exclamation-circle'
      }, true)
    }
  }

  const allItems = [
    ...pendingReqs.map(r => ({ ...r, _type: 'request' })),
    ...notifs
  ]

  const filtered = activeTab === 'all' ? allItems
    : activeTab === 'connections' ? allItems.filter(n => n._type === 'request' || n.type === 'connection')
    : activeTab === 'products' ? allItems.filter(n => ['product_view', 'purchase', 'rating'].includes(n.type))
    : allItems.filter(n => ['like', 'comment'].includes(n.type))

  const unreadCount = pendingReqs.length + notifs.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex">
      <DesktopSidebar />

      <div className="flex-1 min-w-0 pb-20 lg:pb-0">
        {/* Header */}
        <header className="glass-effect sticky top-0 z-40 border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                <i className="bi bi-bell-fill text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">Notificações</h1>
                {unreadCount > 0 && <p className="text-xs text-green-600 font-semibold">{unreadCount} novas</p>}
              </div>
            </div>
            <button onClick={() => markAllRead(notifs, setNotifs)}
              className="text-xs text-green-600 font-semibold hover:underline">
              Marcar todas como lidas
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'connections', label: 'Conexões' },
              { id: 'products', label: 'Produtos' },
              { id: 'social', label: 'Social' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lista */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-bell-slash text-3xl text-gray-300"></i>
              </div>
              <p className="text-gray-500 font-semibold">Sem notificações</p>
              <p className="text-gray-400 text-sm mt-1">As tuas notificações aparecerão aqui</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Pedidos de conexão pendentes */}
              {filtered.filter(n => n._type === 'request').map(req => (
                <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <i className="bi bi-person-plus-fill text-green-600 text-lg"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-bold text-green-700">{req.fromName}</span> quer conectar contigo
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Pedido de conexão pendente</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleAccept(req.id)}
                          className="flex-1 py-2 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors">
                          <i className="bi bi-check-lg mr-1"></i>Aceitar
                        </button>
                        <button onClick={() => handleReject(req.id)}
                          className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors">
                          <i className="bi bi-x-lg mr-1"></i>Recusar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Notificações de reserva com ações */}
              {filtered.filter(n => {
                const status = n.transaction_status || n.status || n.data?.status
                const txId = n.transaction_id || n.transaction || n.data?.transaction_id || n.data?.transaction
                return n.type === 'transaction' && status === 'RESERVED' && txId
              }).map(notif => {
                const txId = notif.transaction_id || notif.transaction || notif.data?.transaction_id || notif.data?.transaction
                if (!txId) return null
                return (
                  <div key={notif.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 bg-amber-50/30 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <i className="bi bi-bag-check-fill text-amber-600 text-lg"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-semibold">{notif.message}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          <i className="bi bi-box mr-1"></i>
                          {notif.product_name} · {notif.quantity} {notif.unit_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{notif.date} · {notif.time}</p>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <button onClick={() => handleTransactionConfirmation(txId, true)}
                            className="py-2 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                            <i className="bi bi-check-circle"></i>Confirmar (SIM)
                          </button>
                          <button onClick={() => handleTransactionConfirmation(txId, false)}
                            className="py-2 rounded-xl border-2 border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-1">
                            <i className="bi bi-x-circle"></i>Rejeitar (NÃO)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Notificações gerais */}
              {filtered.filter(n => !n._type).map(notif => {
                const style = ICON_MAP[notif.type] || ICON_MAP.default
                return (
                  <div key={notif.id}
                    className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${notif.read ? 'border-gray-100' : 'border-green-200 bg-green-50/30'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center flex-shrink-0`}>
                        <i className={`${notif.icon || style.icon} ${style.color} text-lg`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-relaxed">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.date} · {notif.time}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Dica — como gerar notificações */}
          {filtered.length === 0 && activeTab === 'all' && (
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-xs text-blue-700 font-semibold mb-1">Como receber notificações?</p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• Quando alguém te pede conexão</li>
                <li>• Quando alguém gosta dos teus posts</li>
                <li>• Quando alguém vê ou compra os teus produtos</li>
                <li>• Quando alguém te classifica</li>
              </ul>
            </div>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}

export default Notifications
