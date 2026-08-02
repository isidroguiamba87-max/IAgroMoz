import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'

import { API_BASE } from '../config/api'
import { resolveMediaUrl } from '../utils/normalizers'

// Gestão de conexões via localStorage
export const getConnections = () => {
  try { return JSON.parse(localStorage.getItem('connections') || '[]') } catch { return [] }
}
export const addConnection = (user) => {
  const conns = getConnections()
  if (!conns.find(c => c.id === user.id)) {
    conns.push(user)
    localStorage.setItem('connections', JSON.stringify(conns))
  }
}
export const removeConnection = (userId) => {
  const conns = getConnections().filter(c => c.id !== userId)
  localStorage.setItem('connections', JSON.stringify(conns))
}
export const isConnected = (userId) => getConnections().some(c => c.id === userId)

// Pedidos de conexão pendentes
export const getConnectionRequests = () => {
  try { return JSON.parse(localStorage.getItem('connection_requests') || '[]') } catch { return [] }
}
export const sendConnectionRequest = (fromUser, toUserId) => {
  const reqs = getConnectionRequests()
  if (!reqs.find(r => r.fromId === fromUser.id && r.toId === toUserId)) {
    reqs.push({ id: Date.now(), fromId: fromUser.id, fromName: fromUser.nome, toId: toUserId, status: 'pending' })
    localStorage.setItem('connection_requests', JSON.stringify(reqs))

    const myId = localStorage.getItem('userId')
    if (String(toUserId) === String(myId)) {
      try {
        const notifs = JSON.parse(localStorage.getItem('app_notifications') || '[]')
        notifs.unshift({
          id: Date.now() + 1,
          type: 'connection',
          icon: 'bi-person-plus-fill',
          message: `${fromUser.nome} quer conectar contigo`,
          read: false,
          time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString('pt-PT')
        })
        localStorage.setItem('app_notifications', JSON.stringify(notifs.slice(0, 50)))
      } catch (e) {}
    } else {
      try {
        const key = `app_notifications_${toUserId}`
        const notifs = JSON.parse(localStorage.getItem(key) || '[]')
        notifs.unshift({
          id: Date.now() + 1,
          type: 'connection',
          icon: 'bi-person-plus-fill',
          message: `${fromUser.nome} quer conectar contigo`,
          read: false,
          time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString('pt-PT')
        })
        localStorage.setItem(key, JSON.stringify(notifs.slice(0, 50)))
      } catch (e) {}
    }
  }
}
export const acceptConnectionRequest = (reqId) => {
  const reqs = getConnectionRequests()
  const req = reqs.find(r => r.id === reqId)
  if (req) {
    addConnection({ id: req.fromId, nome: req.fromName, tipos: '', distrito: '' })
    const updated = reqs.filter(r => r.id !== reqId)
    localStorage.setItem('connection_requests', JSON.stringify(updated))

    const myId = localStorage.getItem('userId')
    const myName = localStorage.getItem('userName') || 'Utilizador'
    try {
      const key = `app_notifications_${req.fromId}`
      const notifs = JSON.parse(localStorage.getItem(key) || '[]')
      notifs.unshift({
        id: Date.now() + 2,
        type: 'connection_accepted',
        icon: 'bi-people-fill',
        message: `${myName} aceitou o teu pedido de conexão e agora são amigos! 🤝`,
        read: false,
        time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('pt-PT')
      })
      localStorage.setItem(key, JSON.stringify(notifs.slice(0, 50)))
    } catch (e) {}

    try {
      const key = `connections_${req.fromId}`
      const conns = JSON.parse(localStorage.getItem(key) || '[]')
      if (!conns.find(c => String(c.id) === String(myId))) {
        conns.push({ id: myId, nome: myName, tipos: '', distrito: '' })
        localStorage.setItem(key, JSON.stringify(conns))
      }
    } catch (e) {}
  }
}
export const rejectConnectionRequest = (reqId) => {
  const reqs = getConnectionRequests().filter(r => r.id !== reqId)
  localStorage.setItem('connection_requests', JSON.stringify(reqs))
}
export const getPendingRequestsForMe = () => {
  const myId = localStorage.getItem('userId')
  return getConnectionRequests().filter(r => String(r.toId) === String(myId) && r.status === 'pending')
}


function StarRow({ value, max = 5 }) {
  const stars = []
  for (let i = 1; i <= max; i++) {
    if (value >= i) stars.push('bi-star-fill')
    else if (value >= i - 0.5) stars.push('bi-star-half')
    else stars.push('bi-star')
  }
  return (
    <span className="flex items-center gap-0.5">
      {stars.map((cls, i) => (
        <i key={i} className={`bi ${cls} text-yellow-400 text-[10px]`}></i>
      ))}
    </span>
  )
}

function FeedRightPanel({ isLoggedIn }) {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || ''
  const userRole = localStorage.getItem('userRole') || 'user'

  const [topProdutos, setTopProdutos] = useState([])

  useEffect(() => {
    loadTopProdutos()
  }, [])

  const loadTopProdutos = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const res = await fetch(`${API_BASE}/marketplace/products/`, { headers })
      if (!res.ok) return
      const data = await res.json()
      const list = Array.isArray(data) ? data : (data.results || [])

      const normalized = list.map(p => ({
        id: p.id,
        nome: p.name || p.nome || '',
        preco: p.price || p.preco || '0',
        foto: resolveMediaUrl(p.photo || p.foto || p.imagem),
        media: parseFloat(p.average_rating || p.media_avaliacao || 0),
        totalAvaliacoes: p.ratings_count || p.total_avaliacoes || p.total_ratings || 0,
      }))

      const sorted = normalized
        .sort((a, b) => {
          // Com avaliações primeiro, depois por média, depois por total
          if (b.media !== a.media) return b.media - a.media
          return b.totalAvaliacoes - a.totalAvaliacoes
        })
        .slice(0, 5)

      setTopProdutos(sorted)
    } catch (_) {}
  }

  return (
    <aside className="hidden xl:flex flex-col w-80 flex-shrink-0 sticky top-[90px] h-[calc(100vh-90px)] overflow-y-auto py-6 pl-6 scrollbar-hide">
      {/* Perfil rápido */}
      {isLoggedIn ? (
        <div className="flex items-center gap-3 mb-6">
          <Avatar name={userName} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{userName || 'Utilizador'}</p>
            <p className="text-xs text-gray-400 capitalize">{userRole}</p>
          </div>
          <button onClick={() => navigate('/profile')}
            className="text-green-600 text-xs font-bold hover:text-green-700">
            Ver perfil
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-2xl p-4 mb-6 text-white">
          <p className="font-bold text-base mb-1">Junte-se à comunidade 🌱</p>
          <p className="text-green-100 text-xs mb-3">Partilhe experiências com agricultores de Moçambique.</p>
          <div className="flex gap-2">
            <button onClick={() => navigate('/register')}
              className="flex-1 bg-white text-green-700 py-2 rounded-xl text-xs font-bold">
              Criar conta
            </button>
            <button onClick={() => navigate('/login')}
              className="flex-1 border border-white text-white py-2 rounded-xl text-xs font-semibold">
              Entrar
            </button>
          </div>
        </div>
      )}

      {/* Top 5 Produtos em Destaque */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-900 text-sm">🛒 Produtos em Destaque</p>
          <button onClick={() => navigate('/marketplace')}
            className="text-xs text-green-600 font-semibold hover:text-green-700">
            Ver mercado
          </button>
        </div>

        {topProdutos.length === 0 ? (
          <p className="text-gray-400 text-xs text-center py-4">Sem produtos ainda</p>
        ) : (
          <div className="space-y-2">
            {topProdutos.map((p, i) => {
              const medals = ['🥇', '🥈', '🥉', '4.', '5.']
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="w-full flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-300 hover:shadow-md transition-all text-left group"
                >
                  <span className="text-base flex-shrink-0 w-6 text-center">{medals[i]}</span>

                  {/* Foto do produto */}
                  {p.foto ? (
                    <img
                      src={p.foto}
                      alt={p.nome}
                      className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-gray-100 group-hover:scale-105 transition-transform"
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                    />
                  ) : null}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex-shrink-0 items-center justify-center ${p.foto ? 'hidden' : 'flex'}`}>
                    <i className="bi bi-bag text-green-400 text-sm"></i>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-xs truncate leading-tight">{p.nome}</p>
                    <p className="text-green-700 font-bold text-[11px] mt-0.5">{p.preco} MZN</p>
                    {p.media > 0 ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <StarRow value={p.media} />
                        <span className="text-[10px] text-gray-400">
                          {p.media.toFixed(1)}
                          {p.totalAvaliacoes > 0 ? ` (${p.totalAvaliacoes})` : ''}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-300">Novo</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="text-xs text-gray-400 leading-relaxed mt-auto pt-4">
        <p className="flex flex-wrap gap-x-2 gap-y-1">
          {['Sobre', 'Ajuda', 'Privacidade', 'Termos'].map(l => (
            <span key={l} className="hover:underline cursor-pointer">{l}</span>
          ))}
        </p>
        <p className="mt-2">© 2026 IAgroMOZ – Agricultura Inteligente</p>
      </div>
    </aside>
  )
}

export default FeedRightPanel
