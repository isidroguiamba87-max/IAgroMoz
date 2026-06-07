import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ChatMessage from "../components/ChatMessage"
import TypingIndicator from "../components/TypingIndicator"
import DesktopSidebar from "../components/DesktopSidebar"
import MobileNav from "../components/MobileNav"
import api from "../services/api"

const TIPS = [
  { icon: "bi-flower1", text: "Como plantar milho?" },
  { icon: "bi-bug", text: "Pragas na mandioca" },
  { icon: "bi-droplet", text: "Irrigação eficiente" },
  { icon: "bi-tree", text: "Adubação orgânica" },
]

function ChatAI() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const userName = localStorage.getItem("userName") || "Utilizador"

  useEffect(() => { loadSessions() }, [])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const loadSessions = async () => {
    try {
      const data = await api.getChatSessions()
      setSessions(Array.isArray(data) ? data : (data.results || []))
    } catch (e) { console.error(e) }
  }

  const loadSession = async (id) => {
    setLoading(true)
    try {
      const data = await api.getChatMessages(id)
      setMessages(Array.isArray(data) ? data : (data.results || []))
      setCurrentSession(id)
      setHistoryOpen(false)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleNewChat = async () => {
    try {
      const s = await api.createChatSession("Nova Conversa")
      setSessions(p => [s, ...p])
      setCurrentSession(s.session_id)
      setMessages([])
    } catch (e) { console.error(e) }
  }

  const doSend = async (text) => {
    const msg = text || input
    if (!msg.trim() && !selectedImage) return
    let sid = currentSession
    if (!sid) {
      try {
        const s = await api.createChatSession("Nova Conversa")
        setSessions(p => [s, ...p])
        setCurrentSession(s.session_id)
        sid = s.session_id
      } catch { return }
    }
    const img = selectedImage
    setMessages(p => [...p, {
      message_id: Date.now(), message: msg,
      photo: img, is_bot: false, timestamp: new Date().toISOString()
    }])
    setInput("")
    setSelectedImage(null)
    setIsTyping(true)
    if (messages.length === 0 && msg.trim()) {
      const t = msg.trim().split(/\s+/).slice(0, 8).join(" ")
      // Atualizar título localmente; não chamar o endpoint de patch (alguns backends não expõem PATCH)
      setSessions(p => p.map(s => s.session_id === sid ? { ...s, title: t } : s))
    }
    try {
      const blob = img ? await fetch(img).then(r => r.blob()) : null
      const res = await api.sendChatMessage(msg || "Analisando imagem...", sid, blob)
      const bot = Array.isArray(res) ? res.find(m => m.is_bot) : (res && res.is_bot !== undefined ? res : null)
      if (bot) setMessages(p => [...p, bot])
    } catch (e) { console.error(e) }
    finally { setIsTyping(false) }
  }

  const handleImg = (e) => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onloadend = () => setSelectedImage(r.result)
    r.readAsDataURL(f)
  }

  const title = sessions.find(s => s.session_id === currentSession)?.titulo || "Chat IA"

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAF8]">

      {/* ESQUERDA: navegação global */}
      <DesktopSidebar />

      {/* CENTRO: área de chat */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">

        {/* Header */}
        <header className="glass-effect border-b border-gray-100 flex-shrink-0">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/logo.png" alt="IAgroMOZ" className="w-6 h-6 object-contain lg:hidden" />
              <p className="font-black text-gray-900 text-base tracking-tight">AI Agro</p>
            </div>
            <button onClick={handleNewChat}
              className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100">
              <i className="bi bi-plus-lg text-lg"></i>
            </button>
            <button onClick={() => setHistoryOpen(o => !o)}
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <i className="bi bi-list text-xl"></i>
            </button>
          </div>
        </header>

        {/* Mensagens */}
        <main className="flex-1 overflow-y-auto px-4 py-6 chat-bg flex flex-col">
          <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
            {!loading && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 text-center min-h-[60vh] lg:min-h-0 py-8">
                <div className="w-24 h-24 rounded-full bg-white shadow-xl border-4 border-green-100 flex items-center justify-center mb-4 overflow-hidden">
                  <img src="/logo.png" alt="IAgroMOZ" className="w-20 h-20 object-contain" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-1">Olá, {userName.split(" ")[0]}! <i className="bi bi-hand-wave text-yellow-500"></i></h2>
                <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
                  Sou o assistente IA da IAgroMOZ. Pergunta-me sobre agricultura, culturas, pragas ou envia uma foto da tua planta.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {TIPS.map((s, i) => (
                    <button key={i} onClick={() => doSend(s.text)}
                      className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-green-400 hover:shadow-md transition-all text-left">
                      <i className={`bi ${s.icon} text-green-600 text-lg flex-shrink-0`}></i>
                      <span className="text-xs font-semibold text-gray-700 leading-tight">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-16 flex-1">
                <div className="w-10 h-10 rounded-full border-4 border-green-200 border-t-green-600 animate-spin mb-3"></div>
                <p className="text-gray-400 text-sm">A carregar...</p>
              </div>
            )}

            {!loading && messages.length > 0 && (
              <>
                {messages.map(msg => (
                  <ChatMessage 
                    key={msg.message_id || msg.id} 
                    message={msg.message || msg.mensagem} 
                    isAI={msg.is_bot}
                    timestamp={new Date(msg.timestamp).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
                    image={msg.photo || msg.fotografia} 
                  />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </main>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0 pb-safe">
          <div className="max-w-2xl mx-auto">
            {selectedImage && (
              <div className="mb-2 relative inline-block">
                <img src={selectedImage} alt="Preview" className="h-14 w-14 object-cover rounded-xl border-2 border-green-400" />
                <button onClick={() => setSelectedImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  <i className="bi bi-x"></i>
                </button>
              </div>
            )}
            <div className="flex items-end gap-2 bg-gray-50 rounded-3xl px-4 py-2 border border-gray-200 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImg} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()}
                className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 flex-shrink-0 mb-0.5">
                <i className="bi bi-camera text-sm"></i>
              </button>
              <textarea 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSend() } }}
                placeholder="Pergunta sobre agricultura..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none py-1.5"
                rows={1} 
                style={{ minHeight: "36px", maxHeight: "100px" }} 
              />
              <button 
                onClick={() => doSend()} 
                disabled={!input.trim() && !selectedImage}
                className="w-9 h-9 rounded-full btn-primary text-white flex items-center justify-center flex-shrink-0 mb-0.5 disabled:opacity-40"
              >
                <i className="bi bi-arrow-up-short text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DIREITA: histórico de sessões */}
      <aside className={`w-64 bg-white border-l border-gray-100 flex flex-col flex-shrink-0 transition-transform duration-300 fixed inset-y-0 right-0 z-50 lg:relative lg:translate-x-0 ${historyOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        {/* ... (mantido igual) */}
        <div className="p-4 border-b border-gray-100">
          <button onClick={() => setHistoryOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 mb-3 flex items-center gap-1 text-sm">
            <i className="bi bi-x-lg"></i>
          </button>
          <button onClick={handleNewChat}
            className="btn-primary w-full text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
            <i className="bi bi-plus-lg"></i> Novo Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">Histórico</p>
          {sessions.length === 0
            ? <p className="text-xs text-gray-400 text-center py-6">Nenhuma conversa ainda</p>
            : sessions.map(s => (
              <button key={s.session_id} onClick={() => loadSession(s.session_id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl mb-1 flex items-center gap-2 transition-all text-sm font-medium ${currentSession === s.session_id ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-600 hover:bg-gray-50"}`}>
                <i className="bi bi-chat-left-text text-xs flex-shrink-0"></i>
                <span className="truncate">{s.title || s.titulo || "Nova Conversa"}</span>
              </button>
            ))
          }
        </div>
        <div className="p-3 border-t border-gray-100">
          <button onClick={() => navigate("/feed")}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 text-sm font-medium transition-colors">
            <i className="bi bi-arrow-left"></i> Voltar ao Feed
          </button>
        </div>
      </aside>

      {historyOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setHistoryOpen(false)} />
      )}

      <MobileNav />
    </div>
  )
}

export default ChatAI