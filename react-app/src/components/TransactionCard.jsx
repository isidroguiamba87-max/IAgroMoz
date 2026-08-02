import { useState, useRef, useEffect } from 'react'

// Menu "..." por reserva — hoje só "Cancelar reserva", pronto para ganhar
// mais acções (ex: editar quantidade) sem mudar de estrutura outra vez.
function ReservationMenu({ onCancel, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button onClick={() => setOpen(o => !o)} disabled={disabled}
        className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        title="Opções da reserva">
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      {open && (
        <div className="absolute right-0 top-11 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[170px] py-1">
          <button onClick={() => { setOpen(false); onCancel() }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
            <i className="bi bi-x-circle"></i> Cancelar reserva
          </button>
        </div>
      )}
    </div>
  )
}

// TransactionCard — perspetiva diferente para comprador e vendedor
// Fluxo completo simplificado:
//   RESERVED              → Vendedor confirma ou cancela
//   AWAITING_CONFIRMATION → Comprador aguarda e pode cancelar
//   PROCESSING            → Em processamento
//   IN_TRANSIT            → A caminho
//   COMPLETED             → Concluído
//   CANCELLED             → Cancelado

const STATUS_CONFIG = {
  RESERVED:         { label: 'Reservado',            color: 'bg-amber-100 text-amber-800',  icon: 'bi-clock-history',   dot: 'bg-amber-400' },
  AWAITING_PAYMENT: { label: 'Confirmado — Pagar',   color: 'bg-blue-100 text-blue-800',    icon: 'bi-hourglass-split', dot: 'bg-blue-500' },
  PAID:             { label: 'Pago',                 color: 'bg-emerald-100 text-emerald-800', icon: 'bi-cash-coin',    dot: 'bg-emerald-500' },
  COMPLETED:        { label: 'Entregue/Finalizado',  color: 'bg-gray-100 text-gray-600',    icon: 'bi-bag-check-fill',  dot: 'bg-gray-400' },
  CANCELLED:        { label: 'Cancelado',            color: 'bg-red-100 text-red-700',      icon: 'bi-x-circle-fill',   dot: 'bg-red-400' },
}

// Mensagem de contexto para cada papel + estado
const CONTEXT_MSG = {
  buyer: {
    RESERVED:         { icon: 'bi-hourglass-split', text: 'Aguarda confirmação do vendedor.', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    AWAITING_PAYMENT: { icon: 'bi-chat-dots-fill',   text: 'Vendedor confirmou! Fala com ele no chat da reserva para combinar a entrega.', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    PAID:             { icon: 'bi-cash-coin',         text: 'Pagamento recebido. Aguarda a entrega do vendedor.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    COMPLETED:        { icon: 'bi-patch-check-fill',  text: 'Transação concluída com sucesso!', color: 'text-gray-600 bg-gray-50 border-gray-200' },
    CANCELLED:        { icon: 'bi-x-circle',          text: 'Reserva cancelada. O stock foi devolvido.', color: 'text-red-600 bg-red-50 border-red-200' },
  },
  seller: {
    RESERVED:         { icon: 'bi-bell-fill',         text: 'Nova reserva! Confirma se tens o produto disponível.', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    AWAITING_PAYMENT: { icon: 'bi-chat-dots-fill',    text: 'Confirmado! Fala com o comprador no chat da reserva para combinar a entrega.', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    PAID:             { icon: 'bi-cash-coin',          text: 'Pagamento recebido. Conclui a transação após a entrega.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    COMPLETED:        { icon: 'bi-patch-check-fill',  text: 'Transação concluída. Receita registada.', color: 'text-gray-600 bg-gray-50 border-gray-200' },
    CANCELLED:        { icon: 'bi-x-circle',          text: 'Transação cancelada. Stock devolvido automaticamente.', color: 'text-red-600 bg-red-50 border-red-200' },
  },
}

function TransactionCard({
  transaction,
  isBuyer,
  isSeller,
  isLoading,
  onConfirm,
  onConclude,
  onCancelRequest,
  onRejectRequest,
  onViewDetails,
  onChatRequest,
  onRateRequest,
  chatLoading,
}) {
  const tx     = transaction
  const status = STATUS_CONFIG[tx.status] || { label: tx.status, color: 'bg-gray-100 text-gray-600', icon: 'bi-question', dot: 'bg-gray-400' }
  const role   = isBuyer ? 'buyer' : 'seller'
  const ctx    = CONTEXT_MSG[role]?.[tx.status]
  const isActive = !['COMPLETED', 'CANCELLED'].includes(tx.status)
  const canChat = onChatRequest && !['RESERVED', 'CANCELLED'].includes(tx.status)

  return (
    <div className={`bg-white rounded-2xl border shadow-sm mb-3 overflow-hidden ${isActive ? 'border-gray-200' : 'border-gray-100 opacity-80'}`}>

      {/* ── Faixa de estado no topo ── */}
      <div className={`flex items-center gap-2 px-4 py-2 ${status.color}`}>
        <span className={`w-2 h-2 rounded-full ${status.dot} flex-shrink-0`}></span>
        <i className={`bi ${status.icon} text-xs`}></i>
        <span className="text-xs font-bold uppercase tracking-wide">{status.label}</span>
        <span className="ml-auto text-xs opacity-70">
          {tx.created_at ? new Date(tx.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: '2-digit' }) : ''}
        </span>
      </div>

      <div className="p-4">

        {/* ── Produto + contraparte ── */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <i className="bi bi-box-seam text-green-600 text-lg"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight truncate">{tx.product_name}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {isBuyer
                ? <><i className="bi bi-shop text-gray-400 mr-1"></i>Vendedor: <span className="font-semibold text-gray-700">{tx.seller_name}</span></>
                : <><i className="bi bi-person text-gray-400 mr-1"></i>Comprador: <span className="font-semibold text-gray-700">{tx.buyer_name}</span></>
              }
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-base font-black text-green-700">{parseFloat(tx.amount || 0).toFixed(2)} MZN</p>
            <p className="text-xs text-gray-400">{tx.quantity}{tx.unit_name ? ` ${tx.unit_name}` : ' un'}</p>
          </div>
        </div>

        {/* ── Mensagem de contexto ── */}
        {ctx && (
          <div className={`flex items-start gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium mb-3 ${ctx.color}`}>
            <i className={`bi ${ctx.icon} text-sm flex-shrink-0 mt-0.5`}></i>
            <span>{ctx.text}</span>
          </div>
        )}

        {/* ── Chat da reserva — disponível assim que confirmada ── */}
        {canChat && (
          <button onClick={() => onChatRequest(tx)} disabled={chatLoading}
            className="w-full mb-3 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-green-200 bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors disabled:opacity-60">
            <span className="flex items-center gap-2">
              <i className="bi bi-chat-dots-fill text-sm"></i>
              Chat com {isBuyer ? tx.seller_name : tx.buyer_name}
            </span>
            {chatLoading ? <i className="bi bi-arrow-repeat animate-spin"></i> : <i className="bi bi-chevron-right"></i>}
          </button>
        )}

        {/* ── Botões de ação ── */}
        <div className="flex gap-2">

          {/* ── VENDEDOR ── */}

          {/* Vendedor + RESERVED → Confirmar disponibilidade + Recusar com motivo */}
          {isSeller && tx.status === 'RESERVED' && (
            <div className="flex gap-2 w-full">
              <button
                onClick={() => onConfirm(tx.id)}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 transition-colors">
                {isLoading
                  ? <i className="bi bi-arrow-repeat animate-spin"></i>
                  : <><i className="bi bi-check-lg"></i> Tenho o produto</>
                }
              </button>
              <button
                onClick={() => (onRejectRequest ?? onCancelRequest)(tx)}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 transition-colors">
                <i className="bi bi-x-lg"></i> Não tenho
              </button>
            </div>
          )}

          {/* Vendedor + AWAITING_PAYMENT ou PAID → pode concluir ou cancelar */}
          {isSeller && (tx.status === 'AWAITING_PAYMENT' || tx.status === 'PAID') && (
            <>
              <button
                onClick={() => onConclude(tx.id)}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 transition-colors">
                {isLoading
                  ? <i className="bi bi-arrow-repeat animate-spin"></i>
                  : <><i className="bi bi-bag-check-fill"></i> Confirmar entrega</>
                }
              </button>
              <button
                onClick={() => onCancelRequest(tx)}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-1 disabled:opacity-50 transition-colors">
                <i className="bi bi-x-lg"></i>
              </button>
            </>
          )}

          {/* ── COMPRADOR ── */}

          {/* Comprador + RESERVED → Aguarda confirmação + pode cancelar */}
          {isBuyer && tx.status === 'RESERVED' && (
            <>
              <div className="flex-1 py-2.5 rounded-xl bg-amber-50 text-amber-700 text-sm font-semibold flex items-center justify-center gap-1.5">
                <i className="bi bi-hourglass-split animate-pulse"></i> Aguarda confirmação
              </div>
              <ReservationMenu onCancel={() => onCancelRequest(tx)} disabled={isLoading} />
            </>
          )}

          {/* Comprador + AWAITING_PAYMENT ou PAID → aguarda entrega */}
          {isBuyer && (tx.status === 'AWAITING_PAYMENT' || tx.status === 'PAID') && (
            <div className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold flex items-center justify-center gap-1.5">
              <i className="bi bi-truck"></i> Aguarda entrega do vendedor
            </div>
          )}

          {/* COMPLETED — comprador pode avaliar */}
          {isBuyer && tx.status === 'COMPLETED' && (
            <>
              <div className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-500 text-sm font-semibold flex items-center justify-center gap-1.5">
                <i className="bi bi-patch-check-fill text-emerald-500"></i> Entrega concluída
              </div>
              {onRateRequest && (
                <button onClick={() => onRateRequest(tx)}
                  className="flex-1 py-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-800 text-sm font-semibold flex items-center justify-center gap-1.5">
                  <i className="bi bi-star-fill"></i> Avaliar
                </button>
              )}
            </>
          )}

          {/* COMPLETED — vendedor */}
          {isSeller && tx.status === 'COMPLETED' && (
            <div className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-500 text-sm font-semibold flex items-center justify-center gap-1.5">
              <i className="bi bi-patch-check-fill text-emerald-500"></i> Venda concluída
            </div>
          )}

          {/* CANCELLED */}
          {tx.status === 'CANCELLED' && (
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-semibold flex items-center justify-center gap-1.5">
                <i className="bi bi-x-circle-fill"></i>
                {isBuyer && tx.cancel_reason ? 'Recusado pelo vendedor' : 'Cancelado'}
              </div>
              {isBuyer && tx.cancel_reason && (
                <div className="px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700">
                  <span className="font-semibold">Motivo: </span>{tx.cancel_reason}
                </div>
              )}
            </div>
          )}

        </div>
        {onViewDetails && (
          <div className="border-t border-gray-100 px-4 py-3">
            <button
              onClick={() => onViewDetails(tx.id)}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
            >
              <i className="bi bi-info-circle mr-2"></i> Ver detalhes da transação
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionCard
