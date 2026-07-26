import { useState } from 'react'
import { normalizePhoneForWhatsapp, extractApiErrorMessage } from '../utils/normalizers'

// TransactionCard — perspetiva diferente para comprador e vendedor
// Fluxo completo simplificado:
//   RESERVED              → Vendedor confirma ou cancela
//   AWAITING_CONFIRMATION → Comprador aguarda e pode cancelar
//   PROCESSING            → Em processamento
//   IN_TRANSIT            → A caminho
//   COMPLETED             → Concluído
//   CANCELLED             → Cancelado

const STATUS_CONFIG = {
  RESERVED:              { label: 'Reservado',                 color: 'bg-amber-100 text-amber-800',   icon: 'bi-clock-history',      dot: 'bg-amber-400' },
  AWAITING_CONFIRMATION: { label: 'Aguardando Confirmação',    color: 'bg-blue-100 text-blue-800',     icon: 'bi-hourglass-split',    dot: 'bg-blue-500' },
  PROCESSING:            { label: 'Em Processamento',          color: 'bg-cyan-100 text-cyan-800',     icon: 'bi-gear',               dot: 'bg-cyan-500' },
  IN_TRANSIT:            { label: 'A Caminho',                 color: 'bg-purple-100 text-purple-800',  icon: 'bi-truck',              dot: 'bg-purple-500' },
  COMPLETED:             { label: 'Entregue/Finalizado',       color: 'bg-gray-100 text-gray-600',     icon: 'bi-bag-check-fill',     dot: 'bg-gray-400' },
  CANCELLED:             { label: 'Cancelado',                 color: 'bg-red-100 text-red-700',       icon: 'bi-x-circle-fill',      dot: 'bg-red-400' },
}

// Mensagem de contexto para cada papel + estado
const CONTEXT_MSG = {
  buyer: {
    RESERVED:              { icon: 'bi-hourglass-split', text: 'Aguarda confirmação do vendedor', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    AWAITING_CONFIRMATION: { icon: 'bi-hourglass-split', text: 'O vendedor está a confirmar a sua reserva.', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    PROCESSING:            { icon: 'bi-gear',             text: 'O vendedor está a processar o seu pedido.', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
    IN_TRANSIT:            { icon: 'bi-truck',            text: 'O seu pedido está a caminho!', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    COMPLETED:             { icon: 'bi-patch-check-fill', text: 'Transação concluída com sucesso!', color: 'text-gray-600 bg-gray-50 border-gray-200' },
    CANCELLED:             { icon: 'bi-x-circle',         text: 'Reserva cancelada. O stock foi devolvido.', color: 'text-red-600 bg-red-50 border-red-200' },
  },
  seller: {
    RESERVED:              { icon: 'bi-bell-fill',        text: 'Nova reserva! Confirma se tens o produto disponível.', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    AWAITING_CONFIRMATION: { icon: 'bi-hourglass-split',  text: 'Confirmado. Processa o pedido do comprador.', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    PROCESSING:            { icon: 'bi-gear',             text: 'Processando o pedido do comprador.', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
    IN_TRANSIT:            { icon: 'bi-truck',            text: 'Pedido enviado. Aguarda confirmação de entrega.', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    COMPLETED:             { icon: 'bi-patch-check-fill', text: 'Transação concluída. Receita registada.', color: 'text-gray-600 bg-gray-50 border-gray-200' },
    CANCELLED:             { icon: 'bi-x-circle',         text: 'Transação cancelada. Stock devolvido automaticamente.', color: 'text-red-600 bg-red-50 border-red-200' },
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
  onShareWhatsapp,
}) {
  const tx     = transaction
  const status = STATUS_CONFIG[tx.status] || { label: tx.status, color: 'bg-gray-100 text-gray-600', icon: 'bi-question', dot: 'bg-gray-400' }
  const role   = isBuyer ? 'buyer' : 'seller'
  const ctx    = CONTEXT_MSG[role]?.[tx.status]
  const isActive = !['COMPLETED', 'CANCELLED'].includes(tx.status)

  const [waInput, setWaInput]   = useState('')
  const [waSending, setWaSending] = useState(false)
  const [waError, setWaError]   = useState('')
  const profileContact = localStorage.getItem('userContact') || ''

  const handleSendWa = async (number) => {
    const clean = String(number || '').replace(/\s+/g, '').replace(/^\+/, '')
    if (!clean || !onShareWhatsapp) return
    setWaSending(true); setWaError('')
    try {
      await onShareWhatsapp(tx.id, clean)
    } catch (err) {
      setWaError(extractApiErrorMessage(err, 'Erro ao enviar número.'))
    } finally {
      setWaSending(false)
    }
  }

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

        {/* ── WhatsApp lado do VENDEDOR ── */}
        {isSeller && tx.status === 'AWAITING_CONFIRMATION' && (
          tx.buyer_whatsapp ? (
            <a
              href={normalizePhoneForWhatsapp(tx.buyer_whatsapp)}
              target="_blank"
              rel="noreferrer noopener"
              className="mb-3 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors">
              <span className="flex items-center gap-2"><i className="bi bi-whatsapp text-sm"></i> {tx.buyer_whatsapp}</span>
              <span className="underline">Iniciar conversa no WhatsApp</span>
            </a>
          ) : (
            <div className="mb-3 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium">
              <i className="bi bi-hourglass-split text-sm animate-pulse"></i>
              A aguardar o número do comprador
            </div>
          )
        )}

        {/* ── WhatsApp lado do COMPRADOR ── */}
        {isBuyer && tx.status === 'AWAITING_CONFIRMATION' && (
          tx.buyer_whatsapp ? (
            <div className="mb-3 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium">
              <i className="bi bi-check2-circle text-sm"></i>
              Número enviado. O vendedor irá contactá-lo pelo WhatsApp.
            </div>
          ) : (
            <div className="mb-3 rounded-xl border border-green-200 bg-green-50 p-3">
              <p className="text-xs font-semibold text-green-800 mb-2 flex items-center gap-1.5">
                <i className="bi bi-whatsapp text-sm"></i>
                Digite o seu número de WhatsApp para interação com o vendedor.
              </p>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={waInput}
                  onChange={e => setWaInput(e.target.value)}
                  placeholder="+258 84 XXX XXXX"
                  className="flex-1 px-3 py-2 rounded-lg border border-green-300 bg-white text-sm focus:outline-none focus:border-green-500 min-w-0"
                  disabled={waSending}
                />
                <button
                  onClick={() => handleSendWa(waInput)}
                  disabled={waSending || !waInput.trim()}
                  className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold disabled:opacity-50 transition-colors flex-shrink-0">
                  {waSending ? <i className="bi bi-arrow-repeat animate-spin"></i> : 'Enviar'}
                </button>
              </div>
              {profileContact && (
                <button
                  onClick={() => handleSendWa(profileContact)}
                  disabled={waSending}
                  className="mt-2 w-full py-2 rounded-lg border border-green-300 text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50">
                  <i className="bi bi-person-check mr-1.5"></i>
                  Enviar número da plataforma ({profileContact})
                </button>
              )}
              {waError && <p className="mt-1.5 text-xs text-red-600">{waError}</p>}
            </div>
          )
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

          {/* Vendedor + AWAITING_CONFIRMATION → Aguarda confirmação + pode cancelar */}
          {isSeller && tx.status === 'AWAITING_CONFIRMATION' && (
            <>
              <div className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold flex items-center justify-center gap-1.5">
                <i className="bi bi-hourglass-split"></i> Aguarda processamento
              </div>
              <button
                onClick={() => onCancelRequest(tx)}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-1 disabled:opacity-50 transition-colors">
                <i className="bi bi-x-lg"></i>
              </button>
            </>
          )}

          {/* Vendedor + AWAITING_CONFIRMATION → Aguarda confirmação ou pode concluir */}
          {isSeller && (tx.status === 'AWAITING_CONFIRMATION' || tx.status === 'PROCESSING' || tx.status === 'IN_TRANSIT') && (
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
              <button
                onClick={() => onCancelRequest(tx)}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-1 disabled:opacity-50 transition-colors"
                title="Cancelar reserva">
                <i className="bi bi-x-lg"></i>
              </button>
            </>
          )}

          {/* Comprador + AWAITING_CONFIRMATION → Aguarda processamento */}
          {isBuyer && tx.status === 'AWAITING_CONFIRMATION' && (
            <>
              <div className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold flex items-center justify-center gap-1.5">
                <i className="bi bi-hourglass-split"></i> Aguarda processamento do vendedor
              </div>
              <button
                onClick={() => onCancelRequest(tx)}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-1 disabled:opacity-50 transition-colors"
                title="Cancelar">
                <i className="bi bi-x-lg"></i>
              </button>
            </>
          )}

          {/* Comprador + AWAITING_CONFIRMATION/PROCESSING/IN_TRANSIT → Aguarda entrega */}
          {isBuyer && (tx.status === 'AWAITING_CONFIRMATION' || tx.status === 'PROCESSING' || tx.status === 'IN_TRANSIT') && (
            <div className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold flex items-center justify-center gap-1.5">
              <i className="bi bi-truck"></i> Aguarda entrega do vendedor
            </div>
          )}

          {/* COMPLETED — comprador pode avaliar */}
          {isBuyer && tx.status === 'COMPLETED' && (
            <div className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-500 text-sm font-semibold flex items-center justify-center gap-1.5">
              <i className="bi bi-patch-check-fill text-emerald-500"></i> Entrega concluída
            </div>
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
