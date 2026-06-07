import { useMemo } from 'react'

const STEPS = [
  { id: 'RESERVED', label: '1. Reservado' },
  { id: 'AWAITING_PAYMENT', label: '2. Aguardando Pagamento' },
  { id: 'PROCESSING', label: '3. Em Processamento' },
  { id: 'IN_TRANSIT', label: '4. A Caminho' },
  { id: 'COMPLETED', label: '5. Entregue' },
]

function TransactionStepper({ currentStatus = 'RESERVED' }) {
  const activeIndex = useMemo(() => {
    const index = STEPS.findIndex(step => step.id === currentStatus)
    return index === -1 ? 0 : index
  }, [currentStatus])

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 mb-6">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {STEPS.map((step, index) => {
          const completed = index < activeIndex
          const active = index === activeIndex
          return (
            <div key={step.id} className="relative flex-1 min-w-[10rem]">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  completed ? 'bg-green-600 text-white' : active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold ${active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</p>
                  <p className="text-[11px] text-gray-400">{completed ? 'Concluído' : active ? 'Etapa atual' : 'A seguir'}</p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <span className={`absolute left-0 right-0 top-5 h-[2px] ${completed ? 'bg-green-300' : 'bg-gray-200'}`} style={{ zIndex: -1 }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionStepper
