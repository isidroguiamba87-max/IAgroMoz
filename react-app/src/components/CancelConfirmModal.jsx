// CancelConfirmModal — modal de confirmação antes de cancelar uma transação
// Props:
//   transaction: object | null  — transação a cancelar (null = modal fechado)
//   loading: boolean            — true enquanto a chamada à API está em curso
//   onConfirm: () => void       — chamado quando o utilizador confirma o cancelamento
//   onClose: () => void         — chamado quando o utilizador fecha/cancela o modal

function CancelConfirmModal({ transaction, loading, onConfirm, onClose }) {
  if (!transaction) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
          <i className="bi bi-x-circle text-red-600 text-2xl"></i>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">Cancelar transação?</h3>

        <p className="text-gray-600 text-sm mb-1">
          <span className="font-semibold">{transaction.product_name}</span>
        </p>
        <p className="text-gray-500 text-xs mb-5">
          O stock será devolvido automaticamente. Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 disabled:opacity-50">
            Voltar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-1.5">
            {loading
              ? <><i className="bi bi-arrow-repeat animate-spin"></i> A cancelar...</>
              : 'Confirmar cancelamento'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelConfirmModal
