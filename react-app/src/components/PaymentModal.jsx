import { useState } from 'react'

// Métodos de pagamento conforme documentação
const METHODS = [
  { value: 'MPESA',  label: 'M-Pesa',  icon: 'bi-phone',                color: 'text-red-600' },
  { value: 'EMOLA',  label: 'e-Mola',  icon: 'bi-phone-fill',           color: 'text-orange-500' },
  { value: 'CARD',   label: 'Cartão',  icon: 'bi-credit-card-2-front',  color: 'text-blue-600' },
  { value: 'BANK',   label: 'Banco',   icon: 'bi-bank',                 color: 'text-gray-700' },
]

function PaymentModal({ transaction, onClose, onSubmit, loading }) {
  const [method, setMethod]   = useState('MPESA')
  const [phone, setPhone]     = useState('')
  const [formError, setFormError] = useState('')

  if (!transaction) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')
    if (!phone.trim()) return setFormError('Introduza o número de telefone.')
    onSubmit({
      transactionId: transaction.id,
      method,
      provider: 'MOCK',
      phoneNumber: phone.trim(),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-black text-gray-900">Efetuar Pagamento</h3>
            <p className="text-sm text-gray-500 truncate">{transaction.product_name}</p>
          </div>
          <button onClick={onClose} disabled={loading}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <i className="bi bi-x-lg text-sm"></i>
          </button>
        </div>

        {/* Resumo */}
        <div className="mx-6 mt-4 bg-green-50 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Produto</span>
            <span className="font-semibold text-gray-800 truncate ml-4">{transaction.product_name}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Quantidade</span>
            <span className="font-semibold text-gray-800">
              {transaction.quantity}{transaction.unit_name ? ` ${transaction.unit_name}` : ''}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-green-200 pt-2 mt-2">
            <span className="text-gray-700 font-bold">Total a pagar</span>
            <span className="text-green-700 font-black text-lg">
              {parseFloat(transaction.amount || 0).toFixed(2)} MZN
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-sm">{formError}</div>
          )}

          {/* Método de pagamento */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Método de pagamento</label>
            <div className="grid grid-cols-2 gap-2">
              {METHODS.map(m => (
                <button key={m.value} type="button"
                  onClick={() => setMethod(m.value)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    method === m.value
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>
                  <i className={`bi ${m.icon} ${method === m.value ? 'text-green-600' : m.color}`}></i>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Número de telefone */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Número de telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+258 84 XXX XXXX"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pb-2">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-sm disabled:opacity-50 flex items-center justify-center gap-2">
              {loading
                ? <><i className="bi bi-arrow-repeat animate-spin"></i> A processar...</>
                : <><i className="bi bi-lock-fill"></i> Pagar {parseFloat(transaction.amount || 0).toFixed(2)} MZN</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentModal
