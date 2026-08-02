import { useEffect, useRef, useState } from 'react'
import api from '../services/api'
import { normNegotiationMessage, extractApiErrorMessage } from '../utils/normalizers'
import Avatar from './Avatar'

const POLL_MS = 15000

interface NegotiationChatThreadProps {
  chatId: number
  title: string
  subtitle?: string
  onBack?: () => void
}

// Thread do chat de negociação (ligado a uma reserva). Reaproveitado tanto
// pelo painel do produtor (SellerDashboardMessages) como pelo TransactionDetail.
function NegotiationChatThread({ chatId, title, subtitle, onBack }: NegotiationChatThreadProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const load = async (silent = false) => {
    if (!silent) setLoading(true)
    setError('')
    try {
      const data = await api.getNegotiationMessages(chatId)
      const list = Array.isArray(data) ? data : (data.results || [])
      setMessages(list.map(normNegotiationMessage))
    } catch (err) {
      if (!silent) setError(extractApiErrorMessage(err, 'Não foi possível carregar as mensagens.'))
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(() => load(true), POLL_MS)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const content = draft.trim()
    if (!content || sending) return
    setSending(true)
    setDraft('')
    try {
      await api.sendNegotiationMessage(chatId, content)
      await load(true)
    } catch (err) {
      setError(extractApiErrorMessage(err, 'Não foi possível enviar a mensagem.'))
      setDraft(content)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 flex-shrink-0">
        {onBack && (
          <button onClick={onBack} className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <i className="bi bi-arrow-left"></i>
          </button>
        )}
        <Avatar name={title} size="sm" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{title}</p>
          {subtitle && <p className="text-xs text-gray-400 truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 soil-texture">
        {loading ? (
          <p className="text-center text-sm text-gray-400 mt-6">A carregar conversa...</p>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-gray-400 mt-6">Ainda não há mensagens. Diga olá!</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] text-sm ${m.fromMe ? 'chat-user-message' : 'chat-ai-message'}`}>
                {m.content}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0">
        <input type="text" value={draft} onChange={e => setDraft(e.target.value)}
          placeholder="Escreva uma mensagem..." disabled={sending}
          className="form-input flex-1 px-4 py-2.5 rounded-full text-sm" />
        <button type="submit" disabled={sending || !draft.trim()}
          className="w-10 h-10 flex-shrink-0 rounded-full btn-primary text-white flex items-center justify-center disabled:opacity-50">
          <i className="bi bi-send-fill text-sm"></i>
        </button>
      </form>
    </div>
  )
}

export default NegotiationChatThread
