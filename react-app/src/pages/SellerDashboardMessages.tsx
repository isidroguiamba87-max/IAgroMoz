import { useState } from 'react'
import Avatar from '../components/Avatar'

// Funcionalidade em preparação: o backend de mensagens ainda não tem endpoints.
// Este ecrã já traz a interface pronta (lista de conversas + thread, estilo WhatsApp)
// seguindo os padrões visuais da plataforma (.chat-ai-message / .chat-user-message).
// Quando os endpoints estiverem disponíveis, basta ligar os dados reais aqui.
function SellerDashboardMessages() {
  const [conversations] = useState<any[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [draft, setDraft] = useState('')

  const activeConversation = conversations.find(c => c.id === activeId) || null

  return (
    <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex h-[calc(100vh-11rem)] min-h-[26rem]">
        {/* Lista de conversas */}
        <div className={`w-full sm:w-80 flex-shrink-0 border-r border-gray-100 flex flex-col ${activeConversation ? 'hidden sm:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-black text-gray-900">Mensagens</h2>
            <p className="text-xs text-gray-500 mt-0.5">Converse com os seus clientes</p>
            <div className="mt-3 relative">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input type="text" disabled placeholder="Pesquisar conversas..."
                className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-500 placeholder:text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6 py-10">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <i className="bi bi-chat-dots text-2xl text-green-600"></i>
                </div>
                <p className="text-sm font-semibold text-gray-700">Sem conversas por enquanto</p>
                <p className="text-xs text-gray-400 mt-1">As mensagens dos seus clientes vão aparecer aqui assim que esta funcionalidade estiver ligada ao servidor.</p>
              </div>
            ) : (
              conversations.map(c => (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 hover:bg-gray-50 transition ${activeId === c.id ? 'bg-green-50' : ''}`}>
                  <Avatar name={c.name} foto={c.photo} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400 truncate">{c.lastMessage}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Thread */}
        <div className={`flex-1 min-w-0 flex-col ${activeConversation ? 'flex' : 'hidden sm:flex'}`}>
          {activeConversation ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <button onClick={() => setActiveId(null)} className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
                  <i className="bi bi-arrow-left"></i>
                </button>
                <Avatar name={activeConversation.name} foto={activeConversation.photo} size="sm" />
                <p className="text-sm font-bold text-gray-900">{activeConversation.name}</p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 soil-texture">
                {(activeConversation.messages || []).map((m: any, i: number) => (
                  <div key={i} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] text-sm ${m.fromMe ? 'chat-user-message' : 'chat-ai-message'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={e => { e.preventDefault(); setDraft('') }} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
                <input type="text" value={draft} onChange={e => setDraft(e.target.value)}
                  placeholder="Escreva uma mensagem..."
                  className="form-input flex-1 px-4 py-2.5 rounded-full text-sm" />
                <button type="submit" className="w-10 h-10 flex-shrink-0 rounded-full btn-primary text-white flex items-center justify-center">
                  <i className="bi bi-send-fill text-sm"></i>
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <i className="bi bi-chat-square-text text-3xl text-green-600"></i>
              </div>
              <p className="text-sm font-semibold text-gray-700">Selecione uma conversa</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">Esta funcionalidade está a ser preparada junto com o servidor. Em breve poderá conversar aqui diretamente com os seus clientes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardMessages
