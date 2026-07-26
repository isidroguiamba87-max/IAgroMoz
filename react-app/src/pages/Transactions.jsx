import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import TransactionCard from '../components/TransactionCard'
import CancelConfirmModal from '../components/CancelConfirmModal'
import RejectModal from '../components/RejectModal'
import api from '../services/api'
import { addNotification } from './Notifications'
import { normTx, extractApiErrorMessage } from '../utils/normalizers'

// ─── Página principal ─────────────────────────────────────────────────────────
function Transactions() {
  const navigate = useNavigate()
  const [transactions, setTransactions]   = useState([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState('')
  const [actionLoading, setActionLoading] = useState(null)
  const [actionError, setActionError]     = useState('')
  const [cancelTarget, setCancelTarget]   = useState(null)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [rejectTarget, setRejectTarget]   = useState(null)
  const [rejectLoading, setRejectLoading] = useState(false)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true); setError('')
      const txData = await api.getTransactions()
      const list   = Array.isArray(txData) ? txData : (txData.results || [])
      setTransactions(list.map(normTx))
    } catch {
      setError('Não foi possível carregar as suas reservas.')
    } finally {
      setLoading(false)
    }
  }

  const updateTxStatus = (txId, newStatus) =>
    setTransactions(prev => prev.map(tx => tx.id === txId ? { ...tx, status: newStatus } : tx))

  const handleShareWhatsapp = async (txId, whatsapp) => {
    await api.shareTransactionContact(txId, whatsapp)
    setTransactions(prev => prev.map(tx => tx.id === txId ? { ...tx, buyer_whatsapp: whatsapp } : tx))
  }

  const handleConfirm = async (txId) => {
    setActionLoading(txId); setActionError('')
    try {
      await api.confirmTransaction(txId)
      updateTxStatus(txId, 'AWAITING_CONFIRMATION')
      addNotification({ type: 'transaction', message: 'Reserva confirmada com sucesso.', icon: 'bi-check2-circle', transaction_id: txId, transaction_status: 'AWAITING_CONFIRMATION' }, true)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao confirmar.'))
    } finally { setActionLoading(null) }
  }

  const handleConclude = async (txId) => {
    setActionLoading(txId); setActionError('')
    try {
      await api.concludeTransaction(txId)
      updateTxStatus(txId, 'COMPLETED')
      addNotification({ type: 'transaction', message: 'Reserva concluída com sucesso.', icon: 'bi-check-circle', transaction_id: txId, transaction_status: 'COMPLETED' }, true)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao concluir.'))
    } finally { setActionLoading(null) }
  }

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return
    setCancelLoading(true); setActionError('')
    try {
      await api.cancelTransaction(cancelTarget.id)
      updateTxStatus(cancelTarget.id, 'CANCELLED')
      addNotification({ type: 'transaction', message: 'Reserva cancelada.', icon: 'bi-x-circle', transaction_id: cancelTarget.id, transaction_status: 'CANCELLED' }, true)
      setCancelTarget(null)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao cancelar.'))
      setCancelTarget(null)
    } finally { setCancelLoading(false) }
  }

  const handleReject = async (reason) => {
    if (!rejectTarget) return
    setRejectLoading(true); setActionError('')
    try {
      await api.cancelTransaction(rejectTarget.id, reason)
      setTransactions(prev => prev.map(tx =>
        tx.id === rejectTarget.id ? { ...tx, status: 'CANCELLED', cancel_reason: reason } : tx
      ))
      addNotification({ type: 'transaction', message: 'Reserva recusada.', icon: 'bi-x-circle', transaction_id: rejectTarget.id, transaction_status: 'CANCELLED' }, true)
      setRejectTarget(null)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao recusar reserva.'))
      setRejectTarget(null)
    } finally { setRejectLoading(false) }
  }

  // Mostrar apenas reservas ativas (não concluídas/canceladas)
  const activeTransactions = transactions.filter(tx => !['COMPLETED', 'CANCELLED'].includes(tx.status))
  const historyTransactions = transactions.filter(tx => ['COMPLETED', 'CANCELLED'].includes(tx.status))

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />

      <CancelConfirmModal
        transaction={cancelTarget}
        loading={cancelLoading}
        onConfirm={handleCancelConfirm}
        onClose={() => setCancelTarget(null)}
      />
      <RejectModal
        transaction={rejectTarget}
        loading={rejectLoading}
        onConfirm={handleReject}
        onClose={() => setRejectTarget(null)}
      />

      <div className="flex-1 min-w-0 flex flex-col">

        {/* ── Header ── */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
              <i className="bi bi-arrow-left text-lg"></i>
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-black text-gray-900">Minhas Reservas</h1>
              <p className="text-xs text-gray-400">Todas as suas reservas e transações</p>
            </div>
            <button onClick={loadTransactions}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              title="Atualizar">
              <i className="bi bi-arrow-clockwise text-lg"></i>
            </button>
          </div>
        </header>

        {/* ── Erro de ação ── */}
        {actionError && (
          <div className="mx-4 mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            <span>{actionError}</span>
            <button onClick={() => setActionError('')} className="ml-3 text-red-400 hover:text-red-600">
              <i className="bi bi-x-lg text-xs"></i>
            </button>
          </div>
        )}

        <main className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80 mb-3" />
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-green-500"
                    style={{ animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-8px);opacity:1}}`}</style>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <i className="bi bi-exclamation-circle text-4xl text-red-300"></i>
              <p className="text-gray-600 mt-3 mb-4">{error}</p>
              <button onClick={loadTransactions} className="btn-primary text-white px-6 py-2 rounded-xl text-sm font-semibold">
                Tentar novamente
              </button>
            </div>
          ) : activeTransactions.length === 0 && historyTransactions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-inbox text-4xl text-gray-300"></i>
              </div>
              <p className="text-gray-700 font-bold text-lg mb-1">Nenhuma reserva</p>
              <p className="text-gray-400 text-sm mb-5">As suas reservas aparecerão aqui quando fizer uma compra ou venda.</p>
              <button onClick={() => navigate('/marketplace')}
                className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">
                Ir ao Mercado
              </button>
            </div>
          ) : (
            <>
              {/* Reservas Ativas */}
              {activeTransactions.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-3 px-1 uppercase tracking-wide">
                    {activeTransactions.length} reserva{activeTransactions.length === 1 ? '' : 's'} ativa{activeTransactions.length === 1 ? '' : 's'}
                  </p>
                  {activeTransactions.map(tx => {
                    const txIsBuyer  = String(tx.buyer_id)  === String(userId)
                    const txIsSeller = !txIsBuyer && String(tx.seller_id) === String(userId)
                    return (
                      <TransactionCard
                        key={tx.id}
                        transaction={tx}
                        isBuyer={txIsBuyer || (!txIsBuyer && !txIsSeller)}
                        isSeller={txIsSeller}
                        isLoading={actionLoading === tx.id}
                        onConfirm={handleConfirm}
                        onConclude={handleConclude}
                        onCancelRequest={setCancelTarget}
                        onRejectRequest={setRejectTarget}
                        onViewDetails={(txId) => navigate(`/transactions/${txId}`)}
                        onShareWhatsapp={handleShareWhatsapp}
                      />
                    )
                  })}
                </div>
              )}

              {/* Histórico */}
              {historyTransactions.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs text-gray-400 font-semibold mb-3 px-1 uppercase tracking-wide">
                    Histórico ({historyTransactions.length})
                  </p>
                  {historyTransactions.map(tx => {
                    const txIsBuyer  = String(tx.buyer_id)  === String(userId)
                    const txIsSeller = !txIsBuyer && String(tx.seller_id) === String(userId)
                    return (
                      <TransactionCard
                        key={tx.id}
                        transaction={tx}
                        isBuyer={txIsBuyer || (!txIsBuyer && !txIsSeller)}
                        isSeller={txIsSeller}
                        isLoading={actionLoading === tx.id}
                        onConfirm={handleConfirm}
                        onConclude={handleConclude}
                        onCancelRequest={setCancelTarget}
                        onRejectRequest={setRejectTarget}
                        onViewDetails={(txId) => navigate(`/transactions/${txId}`)}
                        onShareWhatsapp={handleShareWhatsapp}
                      />
                    )
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}

export default Transactions
