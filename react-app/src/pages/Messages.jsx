import { useEffect, useState } from 'react'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import Avatar from '../components/Avatar'
import NegotiationChatThread from '../components/NegotiationChatThread'
import api from '../services/api'
import { normNegotiationChat, extractApiErrorMessage } from '../utils/normalizers'

const POLL_MS = 15000

// Chat de negociação (ligado às reservas) para compradores e vendedores
// fora do painel — mesma lista + thread do painel do produtor, mas com o
// chrome de página normal (DesktopSidebar + MobileNav).
function Messages() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeId, setActiveId] = useState(null)
  const [search, setSearch] = useState('')

  const load = async (silent = false) => {
    if (!silent) setLoading(true)
    setError('')
    try {
      const data = await api.getNegotiationChats()
      const list = Array.isArray(data) ? data : (data.results || [])
      setConversations(list.map(normNegotiationChat))
    } catch (err) {
      if (!silent) setError(extractApiErrorMessage(err, 'Não foi possível carregar as conversas.'))
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(() => load(true), POLL_MS)
    return () => clearInterval(interval)
  }, [])

  const activeConversation = conversations.find(c => c.id === activeId) || null
  const filtered = search.trim()
    ? conversations.filter(c => c.otherName.toLowerCase().includes(search.trim().toLowerCase()))
    : conversations

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100 lg:hidden">
          <div className="px-4 py-3">
            <h1 className="text-xl font-black text-gray-900">Mensagens</h1>
            <p className="text-xs text-gray-500">Converse com quem reservou ou vendeu consigo</p>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 max-w-5xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex h-[calc(100vh-9rem)] lg:h-[calc(100vh-4rem)] min-h-[26rem]">
              {/* Lista de conversas */}
              <div className={`w-full sm:w-80 flex-shrink-0 border-r border-gray-100 flex flex-col ${activeConversation ? 'hidden sm:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100">
                  <h2 className="hidden lg:block text-lg font-black text-gray-900 mb-3">Mensagens</h2>
                  <div className="relative">
                    <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Pesquisar conversas..."
                      className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <p className="text-center text-sm text-gray-400 mt-8">A carregar...</p>
                  ) : error ? (
                    <div className="m-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
                  ) : filtered.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6 py-10">
                      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
                        <i className="bi bi-chat-dots text-2xl text-green-600"></i>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Sem conversas por enquanto</p>
                      <p className="text-xs text-gray-400 mt-1">Assim que reservar um produto, a conversa com o vendedor aparece aqui.</p>
                    </div>
                  ) : (
                    filtered.map(c => (
                      <button key={c.id} onClick={() => setActiveId(c.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 hover:bg-gray-50 transition ${activeId === c.id ? 'bg-green-50' : ''}`}>
                        <Avatar name={c.otherName} foto={c.otherPhoto} size="md" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-gray-900 truncate">{c.otherName}</p>
                            {c.unreadCount > 0 && (
                              <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                {c.unreadCount > 9 ? '9+' : c.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate">{c.lastMessage || (c.productName ? `Sobre: ${c.productName}` : 'Sem mensagens')}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Thread */}
              <div className={`flex-1 min-w-0 flex-col ${activeConversation ? 'flex' : 'hidden sm:flex'}`}>
                {activeConversation ? (
                  <NegotiationChatThread
                    chatId={activeConversation.id}
                    title={activeConversation.otherName}
                    subtitle={activeConversation.productName ? `Sobre: ${activeConversation.productName}` : undefined}
                    onBack={() => setActiveId(null)}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                      <i className="bi bi-chat-square-text text-3xl text-green-600"></i>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Selecione uma conversa</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">As conversas são criadas automaticamente quando reserva um produto.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default Messages
