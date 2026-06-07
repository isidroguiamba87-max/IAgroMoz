import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import Avatar from '../components/Avatar'
import { getConnections, getPendingRequestsForMe, acceptConnectionRequest, rejectConnectionRequest } from '../components/FeedRightPanel'

const getChats = () => { try { return JSON.parse(localStorage.getItem('user_chats') || '{}') } catch { return {} } }
const saveChats = (c) => localStorage.setItem('user_chats', JSON.stringify(c))
const getChatKey = (a, b) => [String(a), String(b)].sort().join('_')

export default function Messages() {
  const navigate = useNavigate()
  const { userId: paramUserId } = useParams()
  const myId = localStorage.getItem('userId') || 'me'
  const myName = localStorage.getItem('userName') || 'Eu'

  const [connections, setConnections] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [pendingReqs, setPendingReqs] = useState([])
  const [showNotif, setShowNotif] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const conns = getConnections()
    setConnections(conns)
    setPendingReqs(getPendingRequestsForMe())
    if (paramUserId) {
      const user = conns.find(c => String(c.id) === String(paramUserId))
      if (user) openChat(user)
    }
  }, [paramUserId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const openChat = (user) => {
    setActiveChat(user)
    const key = getChatKey(myId, user.id)
    const chats = getChats()
    setMessages(chats[key] || [])
  }

  const sendMessage = (e) => {
    e?.preventDefault()
    if (!input.trim() || !activeChat) return
    const msg = {
      id: Date.now(), from: myId, fromName: myName,
      text: input.trim(),
      time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('pt-PT')
    }
    const key = getChatKey(myId, activeChat.id)
    const chats = getChats()
    const updated = [...(chats[key] || []), msg]
    chats[key] = updated
    saveChats(chats)
    setMessages(updated)
    setInput('')
  }

  const getLastMsg = (userId) => {
    const key = getChatKey(myId, userId)
    const msgs = (getChats()[key] || [])
    return msgs[msgs.length - 1] || null
  }

  const filtered = connections.filter(c => c.nome?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAF8]">

      {/* COL 1 — DesktopSidebar (ícones de navegação) */}
      <DesktopSidebar />

      {/* COL 2 — Lista de conversas */}
      <aside className={`w-80 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 ${activeChat ? 'hidden lg:flex' : 'flex'}`}>

        {/* Header */}
        <div className="px-4 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-black text-gray-900">Mensagens</h1>
            <div className="flex items-center gap-1">
              {/* Notificações */}
              <div className="relative">
                <button onClick={() => { setPendingReqs(getPendingRequestsForMe()); setShowNotif(o => !o) }}
                  className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 relative">
                  <i className="bi bi-bell text-lg"></i>
                  {pendingReqs.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {pendingReqs.length}
                    </span>
                  )}
                </button>
                {showNotif && (
                  <div className="absolute left-0 top-11 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <p className="font-bold text-gray-900 text-sm">Pedidos de conexão</p>
                      <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600">
                        <i className="bi bi-x-lg text-sm"></i>
                      </button>
                    </div>
                    {pendingReqs.length === 0 ? (
                      <p className="text-gray-400 text-xs text-center py-5">Sem pedidos pendentes</p>
                    ) : pendingReqs.map(req => (
                      <div key={req.id} className="px-4 py-3 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar name={req.fromName} size="sm" />
                          <p className="text-sm text-gray-800">
                            <span className="font-bold text-green-700">{req.fromName}</span> quer conectar contigo
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            acceptConnectionRequest(req.id)
                            setPendingReqs(getPendingRequestsForMe())
                            setConnections(getConnections())
                          }} className="flex-1 py-1.5 rounded-xl bg-green-600 text-white text-xs font-bold">
                            Aceitar
                          </button>
                          <button onClick={() => {
                            rejectConnectionRequest(req.id)
                            setPendingReqs(getPendingRequestsForMe())
                          }} className="flex-1 py-1.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold">
                            Recusar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2">
            <i className="bi bi-search text-gray-400 text-sm"></i>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none" />
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <i className="bi bi-chat-dots text-3xl text-gray-300"></i>
              </div>
              <p className="text-gray-500 text-sm font-semibold">Sem conexões ainda</p>
              <p className="text-gray-400 text-xs mt-1">Segue utilizadores no Feed para iniciar conversas</p>
              <button onClick={() => navigate('/feed')}
                className="mt-3 btn-primary text-white px-4 py-2 rounded-xl text-xs font-bold">
                Ir ao Feed
              </button>
            </div>
          ) : filtered.map(c => {
            const last = getLastMsg(c.id)
            const isActive = activeChat?.id === c.id
            return (
              <button key={c.id} onClick={() => openChat(c)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${isActive ? 'bg-green-50 border-l-2 border-l-green-500' : ''}`}>
                <Avatar name={c.nome} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900 text-sm truncate">{c.nome}</p>
                    {last && <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">{last.time}</span>}
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {last ? (last.from === myId ? `Você: ${last.text}` : last.text) : 'Iniciar conversa...'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      {/* COL 3 — Área de chat */}
      <div className={`flex-1 min-w-0 flex flex-col overflow-hidden ${!activeChat ? 'hidden lg:flex' : 'flex'}`}>
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center chat-bg text-center px-6">
            <div className="w-24 h-24 rounded-full bg-white/80 shadow-xl flex items-center justify-center mb-4 overflow-hidden">
              <img src="/logo.png" alt="IAgroMOZ" className="w-20 h-20 object-contain" />
            </div>
            <h2 className="text-xl font-black text-gray-700 mb-1">IAgroMOZ Mensagens</h2>
            <p className="text-gray-500 text-sm max-w-xs">Seleciona uma conversa para comunicar com outros agricultores</p>
          </div>
        ) : (
          <>
            {/* Header do chat */}
            <div className="glass-effect border-b border-gray-100 flex-shrink-0">
              <div className="px-4 py-3 flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="lg:hidden text-gray-500 mr-1">
                  <i className="bi bi-arrow-left text-xl"></i>
                </button>
                <div className="cursor-pointer flex-shrink-0" onClick={() => navigate(`/profile/${activeChat.id}`)}>
                  <Avatar name={activeChat.nome} size="md" />
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/profile/${activeChat.id}`)}>
                  <p className="font-bold text-gray-900 text-sm">{activeChat.nome}</p>
                  <p className="text-xs text-green-600">{activeChat.tipos || 'Utilizador'}{activeChat.distrito ? ` · ${activeChat.distrito}` : ''}</p>
                </div>
                <button onClick={() => navigate(`/profile/${activeChat.id}`)}
                  className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                  <i className="bi bi-person text-lg"></i>
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <main className="flex-1 overflow-y-auto px-4 py-4 chat-bg">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-white/80 rounded-2xl px-6 py-4 shadow-sm">
                    <p className="text-gray-500 text-sm">Início da conversa com <span className="font-bold text-green-700">{activeChat.nome}</span></p>
                    <p className="text-gray-400 text-xs mt-1">As mensagens são guardadas localmente</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-1">
                  {messages.map((msg, i) => {
                    const isMe = msg.from === myId
                    const showDate = i === 0 || messages[i-1]?.date !== msg.date
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="flex justify-center my-3">
                            <span className="bg-white/80 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">{msg.date}</span>
                          </div>
                        )}
                        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1`}>
                          <div className={`max-w-[68%] px-4 py-2.5 shadow-sm ${
                            isMe
                              ? 'bg-green-600 text-white rounded-2xl rounded-br-sm'
                              : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-green-200' : 'text-gray-400'}`}>
                              {msg.time}{isMe && <i className="bi bi-check2-all ml-1"></i>}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </main>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-gray-50 rounded-3xl px-4 py-2.5 border border-gray-200 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
                  <input type="text" value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Escreve uma mensagem..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none" />
                </div>
                <button type="submit" disabled={!input.trim()}
                  className="w-11 h-11 rounded-full btn-primary text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40">
                  <i className="bi bi-send-fill text-sm"></i>
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      <MobileNav />
    </div>
  )
}
