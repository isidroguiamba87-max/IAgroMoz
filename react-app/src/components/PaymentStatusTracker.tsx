import { useEffect, useRef, useState } from 'react'

interface PaymentStatus {
  uuid?: string
  id?: string
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  method?: string
  provider?: string
  amount?: number
  reference?: string
  created_at?: string
  completed_at?: string
  error_message?: string
}

interface PaymentStatusTrackerProps {
  payment?: PaymentStatus | null
  transactionStatus?: string
  onStatusChange?: (status: PaymentStatus) => void
  onVerify?: () => Promise<PaymentStatus>
  isPolling?: boolean
  pollingInterval?: number // ms, default 5000
}

const STATUS_CONFIG = {
  PENDING: {
    icon: 'bi-clock-history',
    label: 'Pagamento criado',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    badge: 'bg-gray-100 text-gray-700',
    description: 'Aguardando envio ao provider',
  },
  PROCESSING: {
    icon: 'bi-hourglass-split',
    label: 'Processando',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    description: 'Confirmação do provider em andamento',
    animate: true,
  },
  SUCCESS: {
    icon: 'bi-check-circle-fill',
    label: 'Pagamento confirmado',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    description: 'Pagamento recebido com sucesso',
  },
  FAILED: {
    icon: 'bi-x-circle-fill',
    label: 'Pagamento recusado',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    description: 'O pagamento foi recusado',
  },
  REFUNDED: {
    icon: 'bi-arrow-counterclockwise',
    label: 'Reembolsado',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    description: 'Pagamento foi reembolsado',
  },
}

function PaymentStatusTracker({
  payment,
  transactionStatus,
  onStatusChange,
  onVerify,
  isPolling = false,
  pollingInterval = 5000,
}: PaymentStatusTrackerProps) {
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [currentPayment, setCurrentPayment] = useState<PaymentStatus | null>(payment || null)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    setCurrentPayment(payment || null)
  }, [payment])

  // Inicia polling automático quando PROCESSING
  useEffect(() => {
    if (!isPolling || !currentPayment || currentPayment.status !== 'PROCESSING' || !onVerify) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
      return
    }

    // Verificar imediatamente
    const verify = async () => {
      if (isVerifying) return
      setIsVerifying(true)
      try {
        const updated = await onVerify()
        if (updated) {
          setCurrentPayment(updated)
          onStatusChange?.(updated)
        }
      } catch (err) {
        console.error('Erro ao verificar status do pagamento:', err)
      } finally {
        setIsVerifying(false)
      }
    }

    verify()

    // Polling a cada X segundos
    pollingRef.current = setInterval(verify, pollingInterval)

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
  }, [isPolling, currentPayment, onVerify, onStatusChange, pollingInterval, isVerifying])

  if (!currentPayment) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i className="bi bi-info-circle text-3xl text-gray-400 mb-2"></i>
        <p className="text-sm text-gray-600">Nenhum pagamento iniciado</p>
      </div>
    )
  }

  const config = STATUS_CONFIG[currentPayment.status] || STATUS_CONFIG.PENDING
  const isSuccess = currentPayment.status === 'SUCCESS'
  const isFailed = currentPayment.status === 'FAILED'
  const isProcessing = currentPayment.status === 'PROCESSING'

  return (
    <div
      className={`rounded-2xl p-6 border-2 transition-all ${config.bgColor} ${config.borderColor}`}
    >
      {/* Header com status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${config.bgColor} border-2 ${config.borderColor}`}
          >
            <i
              className={`bi ${config.icon} text-2xl ${config.color} ${
                isProcessing ? 'animate-spin' : ''
              }`}
            ></i>
          </div>
          <div className="pt-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-lg font-bold ${config.color}`}>{config.label}</h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.badge}`}>
                {currentPayment.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Detalhes do pagamento */}
      <div className="space-y-2 text-sm mb-4">
        {currentPayment.method && (
          <div className="flex justify-between">
            <span className="text-gray-600">Método</span>
            <span className="font-semibold text-gray-800">{currentPayment.method}</span>
          </div>
        )}
        {currentPayment.provider && (
          <div className="flex justify-between">
            <span className="text-gray-600">Provider</span>
            <span className="font-semibold text-gray-800">{currentPayment.provider}</span>
          </div>
        )}
        {currentPayment.amount && (
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
            <span className="font-bold text-gray-700">Valor</span>
            <span className="font-black text-gray-900">
              {currentPayment.amount.toFixed(2)} MZN
            </span>
          </div>
        )}
        {currentPayment.reference && (
          <div className="flex justify-between">
            <span className="text-gray-600">Referência</span>
            <span className="font-mono text-xs text-gray-700 break-all">
              {currentPayment.reference}
            </span>
          </div>
        )}
      </div>

      {/* Mensagem de erro */}
      {currentPayment.error_message && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
          <i className="bi bi-exclamation-triangle-fill mr-2"></i>
          {currentPayment.error_message}
        </div>
      )}

      {/* Estado do passo (se disponível) */}
      {transactionStatus && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Estado da transação:</span>
          {transactionStatus === 'PAID' && (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              <i className="bi bi-check-circle"></i> Pago
            </span>
          )}
          {transactionStatus === 'AWAITING_PAYMENT' && (
            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
              <i className="bi bi-hourglass-split"></i> Aguardando Pagamento
            </span>
          )}
        </div>
      )}

      {/* Status do polling */}
      {isProcessing && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center justify-between text-xs text-blue-700">
            <span className="flex items-center gap-1">
              <i className="bi bi-arrow-repeat animate-spin"></i>
              Verificando status a cada {pollingInterval / 1000}s...
            </span>
            {isVerifying && <span className="font-semibold">Verificando...</span>}
          </div>
        </div>
      )}

      {/* Ações contextuais */}
      {(isSuccess || isFailed) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            {isSuccess && (
              <>
                <i className="bi bi-check-circle text-green-600 mr-1"></i>
                Pagamento confirmado. O vendedor receberá uma notificação.
              </>
            )}
            {isFailed && (
              <>
                <i className="bi bi-x-circle text-red-600 mr-1"></i>
                Tente novamente com outro método ou entre em contacto com suporte.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default PaymentStatusTracker
