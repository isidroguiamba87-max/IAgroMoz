import { useEffect, useRef, useState } from 'react'
import api from '../services/api'
import { normNegotiationChat, normNegotiationMessage, normTx, extractApiErrorMessage } from '../utils/normalizers'
import Avatar from './Avatar'

const POLL_MS = 4000

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
  const [reservation, setReservation] = useState<any>(null)
  const [concluding, setConcluding] = useState(false)
  const [chatStatus, setChatStatus] = useState<string>('ACTIVE')
  const bottomRef = useRef<HTMLDivElement>(null)
  const userId = localStorage.getItem('userId')

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

  const loadReservation = async () => {
    try {
      const data = await api.getChatReservations(chatId)
      const list = Array.isArray(data) ? data : (data.results || [])
      setReservation(list.length ? normTx(list[0]) : null)
    } catch (err) {
      setReservation(null)
    }
  }

  // Chat CLOSED (ex.: reserva já concluída) só pode ser consultado — envio de
  // mensagens é exclusivo de chats ACTIVE.
  const loadChatStatus = async () => {
    try {
      const data = await api.getNegotiationChat(chatId)
      setChatStatus(normNegotiationChat(data).status)
    } catch (err) {
      setChatStatus('ACTIVE')
    }
  }

  useEffect(() => {
    load()
    loadReservation()
    loadChatStatus()
    const interval = setInterval(() => load(true), POLL_MS)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  const isSeller = !!reservation && !!userId && String(reservation.seller_id) === String(userId)
  const canConclude = isSeller && reservation && !['COMPLETED', 'CANCELLED'].includes(reservation.status)

  const handleConclude = async () => {
    if (!reservation || concluding) return
    setConcluding(true)
    setError('')
    try {
      await api.concludeTransaction(reservation.id)
      setReservation((prev: any) => prev ? { ...prev, status: 'COMPLETED' } : prev)
    } catch (err) {
      setError(extractApiErrorMessage(err, 'Não foi possível concluir a reserva.'))
    } finally {
      setConcluding(false)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  const isClosed = chatStatus === 'CLOSED'

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const content = draft.trim()
    if (!content || isClosed) return
    setSending(true)
    setDraft('')
    setError('')

    // Envio otimista — mostra a mensagem de imediato, antes da resposta do servidor.
    const tempId = `temp-${Date.now()}`
    setMessages(prev => [...prev, { id: tempId, content, fromMe: true, senderName: '', createdAt: new Date().toISOString(), pending: true }])

    try {
      await api.sendNegotiationMessage(chatId, content)
      await load(true)
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== tempId))
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
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900 truncate">{title}</p>
          {subtitle && <p className="text-xs text-gray-400 truncate">{subtitle}</p>}
        </div>
        {reservation?.status === 'COMPLETED' ? (
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            <i className="bi bi-check-circle-fill text-gray-400"></i> Concluída
          </span>
        ) : canConclude && (
          <button onClick={handleConclude} disabled={concluding}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
            {concluding
              ? <><i className="bi bi-arrow-repeat animate-spin"></i> A concluir...</>
              : <><i className="bi bi-check-lg"></i> Marcar como concluído</>}
          </button>
        )}
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
            <div key={m.id} className={`flex flex-col ${m.fromMe ? 'items-end' : 'items-start'}`}>
              {!m.fromMe && (
                <span className="text-[11px] font-semibold text-gray-400 px-1 mb-0.5">{m.senderName || title}</span>
              )}
              <div className={`max-w-[75%] text-sm flex items-end gap-1.5 ${m.fromMe ? 'chat-user-message' : 'chat-ai-message'} ${m.pending ? 'opacity-60' : ''}`}>
                <span>{m.content}</span>
                {m.pending && <i className="bi bi-clock text-[10px] flex-shrink-0"></i>}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {isClosed ? (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0 text-xs text-gray-400 justify-center">
          <i className="bi bi-lock-fill"></i> Esta conversa está encerrada e já não aceita novas mensagens.
        </div>
      ) : (
        <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0">
          <input type="text" value={draft} onChange={e => setDraft(e.target.value)}
            placeholder="Escreva uma mensagem..."
            className="form-input flex-1 px-4 py-2.5 rounded-full text-sm" />
          <button type="submit" disabled={!draft.trim() || sending}
            className="w-10 h-10 flex-shrink-0 rounded-full btn-primary text-white flex items-center justify-center disabled:opacity-50">
            <i className="bi bi-send-fill text-sm"></i>
          </button>
        </form>
      )}
    </div>
  )
}

export default NegotiationChatThread
