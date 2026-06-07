import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'

import { API_BASE } from '../config/api'

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

    // Criar notificação para o destinatário
    const myId = localStorage.getItem('userId')
    if (String(toUserId) === String(myId)) {
      // É para mim mesmo — adicionar à lista de notificações
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
      // Guardar notificação para o utilizador destino (chave separada por userId)
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
    // Adicionar conexão mútua
    addConnection({ id: req.fromId, nome: req.fromName, tipos: '', distrito: '' })
    const updated = reqs.filter(r => r.id !== reqId)
    localStorage.setItem('connection_requests', JSON.stringify(updated))

    // Notificar o remetente que foi aceite (guarda na chave do remetente)
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

    // Também adicionar o utilizador que aceitou como conexão do remetente
    // (conexão mútua — ambos ficam conectados)
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

function FeedRightPanel({ isLoggedIn }) {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || ''
  const userRole = localStorage.getItem('userRole') || 'user'

  const [topVendedores, setTopVendedores] = useState([])

  useEffect(() => {
    loadTopVendedores()
  }, [])

  const loadTopVendedores = async () => {
    try {
      // Só carregar se o utilizador estiver logado (endpoint requer autenticação)
      const token = localStorage.getItem('access_token')
      if (!token) return
      const res = await fetch(`${API_BASE}/marketplace/products/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) return
      const data = await res.json()
      const list = Array.isArray(data) ? data : (data.results || [])
      const vendedorMap = {}
      list.forEach(p => {
        const nome = p.vendedor || ''
        if (!nome) return
        // Tentar obter o ID do vendedor de vários campos possíveis
        const vid = p.vendedor_id || p.autor_id || p.user_id || null
        if (!vendedorMap[nome]) {
          vendedorMap[nome] = { nome, vendedorId: vid, totalNota: 0, count: 0, totalAvaliacoes: 0, numProdutos: 0 }
        }
        // Guardar ID se ainda não temos
        if (!vendedorMap[nome].vendedorId && vid) vendedorMap[nome].vendedorId = vid
        vendedorMap[nome].numProdutos += 1
        if (p.media_avaliacao && parseFloat(p.media_avaliacao) > 0) {
          vendedorMap[nome].totalNota += parseFloat(p.media_avaliacao)
          vendedorMap[nome].count += 1
        }
        vendedorMap[nome].totalAvaliacoes += p.total_avaliacoes || 0
      })
      const sorted = Object.values(vendedorMap)
        .sort((a, b) => {
          const mediaA = a.count > 0 ? a.totalNota / a.count : 0
          const mediaB = b.count > 0 ? b.totalNota / b.count : 0
          if (mediaB !== mediaA) return mediaB - mediaA
          return b.numProdutos - a.numProdutos
        })
        .slice(0, 5)
      setTopVendedores(sorted)
    } catch (_) {}
  }

  return (
    <aside className="hidden xl:flex flex-col w-80 flex-shrink-0 py-6 pl-6">
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

      {/* Sugestões de conexões — removido */}

      {/* Top 5 Vendedores */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-900 text-sm">🏆 Top Vendedores</p>
          <button onClick={() => navigate('/marketplace')}
            className="text-xs text-green-600 font-semibold hover:text-green-700">
            Ver mercado
          </button>
        </div>
        {topVendedores.length === 0 ? (
          <p className="text-gray-400 text-xs text-center py-4">Sem vendedores ainda</p>
        ) : (
          <div className="space-y-2">
            {topVendedores.map((v, i) => {
              const media = v.count > 0 ? (v.totalNota / v.count).toFixed(1) : null
              const medals = ['🥇', '🥈', '🥉', '4.', '5.']
              const handleClick = () => {
                if (v.vendedorId) navigate(`/profile/${v.vendedorId}`)
                else navigate('/marketplace')
              }
              return (
                <button key={v.nome} onClick={handleClick}
                  className="w-full flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-300 hover:shadow-md transition-all text-left">
                  <span className="text-base flex-shrink-0 w-6 text-center">{medals[i]}</span>
                  <Avatar name={v.nome} foto={null} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-xs truncate">{v.nome}</p>
                    <p className="text-gray-400 text-[11px]">
                      {v.numProdutos} produto{v.numProdutos !== 1 ? 's' : ''}
                      {v.totalAvaliacoes > 0 ? ` · ${v.totalAvaliacoes} aval.` : ''}
                    </p>
                  </div>
                  {media ? (
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <i className="bi bi-star-fill text-yellow-400 text-xs"></i>
                      <span className="text-xs font-bold text-gray-700">{media}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-300 flex-shrink-0">Novo</span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="text-xs text-gray-400 leading-relaxed mt-auto">
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
