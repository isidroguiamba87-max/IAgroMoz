import { useMemo } from 'react'

const STEPS = [
  { id: 'RESERVED',         label: 'Reservado',            icon: 'bi-clock-history' },
  { id: 'AWAITING_PAYMENT', label: 'Aguardando Pagamento', icon: 'bi-hourglass-split' },
  { id: 'PROCESSING',       label: 'Em Processamento',     icon: 'bi-gear-wide-connected' },
  { id: 'IN_TRANSIT',       label: 'A Caminho',            icon: 'bi-truck' },
  { id: 'COMPLETED',        label: 'Entregue',             icon: 'bi-bag-check-fill' },
]

const RING_COLORS = ['#F59E0B', '#3B82F6', '#06B6D4', '#A855F7', '#10B981']
const CANCELLED_COLOR = '#EF4444'

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function TransactionStatusWheel({ currentStatus = 'RESERVED', statusLabel }) {
  const isCancelled = currentStatus === 'CANCELLED'

  const activeIndex = useMemo(() => {
    const index = STEPS.findIndex(step => step.id === currentStatus)
    return index === -1 ? 0 : index
  }, [currentStatus])

  const step = STEPS[activeIndex]
  const isFinal = activeIndex === STEPS.length - 1
  const progress = isCancelled ? 1 : activeIndex / (STEPS.length - 1)
  const ringColor = isCancelled ? CANCELLED_COLOR : RING_COLORS[activeIndex]
  const offset = CIRCUMFERENCE * (1 - progress)
  const label = statusLabel || step.label

  const caption = isCancelled
    ? 'Esta reserva foi cancelada'
    : isFinal
      ? 'Reserva concluída com sucesso'
      : `A seguir: ${STEPS[activeIndex + 1].label}`

  return (
    <div className="flex items-center gap-5">
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={isCancelled ? undefined : activeIndex + 1}
        aria-valuetext={label}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#EEF2F0" strokeWidth="9" />
          <circle
            cx="50" cy="50" r={RADIUS} fill="none"
            stroke={ringColor} strokeWidth="9" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="status-wheel-ring"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <i
            className={`bi ${isCancelled ? 'bi-x-circle-fill' : step.icon} text-lg sm:text-xl`}
            style={{ color: ringColor }}
            aria-hidden="true"
          ></i>
          {!isCancelled && (
            <span className="text-[10px] font-bold text-gray-400 mt-0.5">{activeIndex + 1}/{STEPS.length}</span>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-500 mb-1">Status da reserva</p>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 truncate">{label}</h2>
        <p className={`text-xs font-semibold mt-1 ${isCancelled ? 'text-red-500' : isFinal ? 'text-emerald-600' : 'text-gray-400'}`}>
          {caption}
        </p>
      </div>
    </div>
  )
}

export default TransactionStatusWheel
