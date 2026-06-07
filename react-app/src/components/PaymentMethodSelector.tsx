import { useState } from 'react'

// Métodos de pagamento conforme documentação
const METHODS = [
  { value: 'MPESA', label: 'M-Pesa', icon: 'bi-phone', color: 'text-red-600' },
  { value: 'EMOLA', label: 'e-Mola', icon: 'bi-phone-fill', color: 'text-orange-500' },
  { value: 'CARD', label: 'Cartão', icon: 'bi-credit-card-2-front', color: 'text-blue-600' },
  { value: 'BANK', label: 'Banco', icon: 'bi-bank', color: 'text-gray-700' },
]

// Providers disponíveis (MOCK visível em desenvolvimento)
const PROVIDERS = [
  { value: 'MOCK', label: 'Mock (Dev)', isDev: true },
  { value: 'PAYSUITE', label: 'PaySuite' },
  { value: 'E2PAYMENTS', label: 'E2 Payments' },
  { value: 'DIRECT_MPESA', label: 'M-Pesa Direto' },
  { value: 'DIRECT_EMOLA', label: 'e-Mola Direto' },
]

interface PaymentMethodSelectorProps {
  onConfirm: (payload: { method: string; provider: string; phoneNumber: string }) => void
  onCancel: () => void
  loading?: boolean
  error?: string
  transaction?: {
    id: number
    product_name?: string
    quantity?: number
    unit_name?: string
    amount?: string | number
  }
}

function PaymentMethodSelector({
  onConfirm,
  onCancel,
  loading = false,
  error = '',
  transaction,
}: PaymentMethodSelectorProps) {
  const [method, setMethod] = useState('MPESA')
  const [provider, setProvider] = useState('MOCK')
  const [phone, setPhone] = useState('')
  const [formError, setFormError] = useState('')
  const isDev = process.env.NODE_ENV === 'development'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!phone.trim()) {
      return setFormError('Introduza o número de telefone.')
    }

    if (!/^\+?258\d{8,9}$|^\+?27\d{8,9}$|\d{9,10}/.test(phone)) {
      return setFormError('Número de telefone inválido.')
    }

    onConfirm({
      method,
      provider,
      phoneNumber: phone.trim(),
    })
  }

  return (
    <div className="space-y-4">
      {(formError || error) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
          <div className="flex items-start gap-3">
            <i className="bi bi-exclamation-circle-fill text-lg mt-0.5"></i>
            <div>{formError || error}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Resumo da transação */}
        {transaction && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Produto</span>
                <span className="font-semibold text-gray-800 truncate ml-4">
                  {transaction.product_name || 'Produto'}
                </span>
              </div>
              {transaction.quantity && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantidade</span>
                  <span className="font-semibold text-gray-800">
                    {transaction.quantity} {transaction.unit_name || 'un'}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                <span className="text-gray-700 font-bold">Total a pagar</span>
                <span className="text-green-700 font-black text-lg">
                  {typeof transaction.amount === 'number'
                    ? transaction.amount.toFixed(2)
                    : parseFloat(transaction.amount || '0').toFixed(2)}{' '}
                  MZN
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Método de pagamento */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2.5">
            <i className="bi bi-credit-card-2-back mr-2"></i>
            Escolha o método
          </label>
          <div className="grid grid-cols-2 gap-2">
            {METHODS.map(m => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMethod(m.value)}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl border-2 text-sm font-semibold transition-all ${
                  method === m.value
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                    : 'border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <i className={`bi ${m.icon} text-lg ${method === m.value ? 'text-green-600' : m.color}`}></i>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Provider de pagamento */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2.5">
            <i className="bi bi-shield-lock mr-2"></i>
            Gateway de pagamento
          </label>
          <div className="space-y-2">
            {PROVIDERS.map(p => {
              // Mostrar MOCK apenas em desenvolvimento
              if (p.isDev && !isDev) return null
              return (
                <label key={p.value} className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50" style={{
                  borderColor: provider === p.value ? '#16a34a' : '#e5e7eb',
                  backgroundColor: provider === p.value ? '#f0fdf4' : 'transparent',
                }}>
                  <input
                    type="radio"
                    name="provider"
                    value={p.value}
                    checked={provider === p.value}
                    onChange={e => setProvider(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {p.label}
                    {p.isDev && <span className="text-xs text-yellow-600 ml-2">(Desenvolvimento)</span>}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Número de telefone */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2.5">
            <i className="bi bi-telephone mr-2"></i>
            Número de telefone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+258 84 123 4567"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm disabled:bg-gray-50 disabled:opacity-60"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            <i className="bi bi-info-circle mr-1"></i>
            Formato: +258 ou número local (ex: 84 123 4567)
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="bi bi-hourglass-split animate-spin"></i>
                Processando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle"></i>
                Pagar Agora
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaymentMethodSelector
