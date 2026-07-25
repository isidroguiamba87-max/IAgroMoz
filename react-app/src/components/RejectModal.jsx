import { useState } from 'react'

function RejectModal({ transaction, loading, onConfirm, onClose }) {
  const [reason, setReason] = useState('')

  if (!transaction) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reason.trim()) return
    onConfirm(reason.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
          <i className="bi bi-x-circle text-red-600 text-2xl"></i>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">Recusar reserva</h3>
        <p className="text-gray-500 text-sm mb-4 text-center">
          <span className="font-semibold text-gray-700">{transaction.product_name}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1.5 text-sm">
              Motivo da recusa <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Ex: Produto esgotado, não tenho stock suficiente..."
              rows={3}
              required
              className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-red-400 focus:outline-none resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">O comprador verá este motivo na sua reserva.</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 disabled:opacity-50">
              Voltar
            </button>
            <button
              type="submit"
              disabled={loading || !reason.trim()}
              className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-1.5">
              {loading
                ? <><i className="bi bi-arrow-repeat animate-spin"></i> A recusar...</>
                : <><i className="bi bi-x-circle"></i> Recusar reserva</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RejectModal
