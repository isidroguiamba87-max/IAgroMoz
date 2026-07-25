import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionCard from '../components/TransactionCard'
import CancelConfirmModal from '../components/CancelConfirmModal'
import api from '../services/api'
import { getDashboardPath } from '../utils/dashboardPaths'
import { normTx, extractApiErrorMessage } from '../utils/normalizers'

function SellerDashboardSales() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [error, setError] = useState('')

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    setLoading(true)
    setError('')
    try {
      const [txData, pyData] = await Promise.all([api.getTransactions(), api.getPayments().catch(() => [])])
      const list = Array.isArray(txData) ? txData : txData.results || []
      const pyList = Array.isArray(pyData) ? pyData : pyData.results || []
      setTransactions(list.map(normTx).filter(tx => String(tx.seller_id) === String(userId)))
      setPayments(pyList)
    } catch (err) {
      setError('Não foi possível carregar as vendas.')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async (txId) => {
    setActionLoading(txId)
    try {
      await api.confirmTransaction(txId)
      setTransactions(prev => prev.map(tx => tx.id === txId ? { ...tx, status: 'AWAITING_CONFIRMATION' } : tx))
    } catch (err) {
      setError('Erro ao confirmar reserva.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleConclude = async (txId) => {
    setActionLoading(txId)
    try {
      await api.concludeTransaction(txId)
      setTransactions(prev => prev.map(tx => tx.id === txId ? { ...tx, status: 'COMPLETED' } : tx))
    } catch (err) {
      setError('Erro ao concluir transação.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancel = async () => {
    if (!cancelTarget) return
    setCancelLoading(true)
    try {
      await api.cancelTransaction(cancelTarget.id)
      setTransactions(prev => prev.map(tx => tx.id === cancelTarget.id ? { ...tx, status: 'CANCELLED' } : tx))
      setCancelTarget(null)
    } catch (err) {
      setError('Erro ao cancelar transação.')
      setCancelTarget(null)
    } finally {
      setCancelLoading(false)
    }
  }

  const getPayment = (tx) => payments.find(p => String(p.transaction || p.transaction_id) === String(tx.id))

  if (loading) {
    return <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">Carregando vendas...</div>
  }

  return (
    <div className="space-y-4">
      <CancelConfirmModal
        transaction={cancelTarget}
        loading={cancelLoading}
        onConfirm={handleCancel}
        onClose={() => setCancelTarget(null)}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Minhas Vendas</h2>
          <p className="text-sm text-gray-500">Gestão de pedidos e confirmações como vendedor.</p>
        </div>
        <button onClick={() => navigate(getDashboardPath('/notificacoes'))}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
          <i className="bi bi-bell"></i> Ver notificações
        </button>
      </div>

      {error && <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {transactions.length === 0 ? (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          Nenhuma venda encontrada. Quando alguém reservar um produto, a venda aparecerá aqui.
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map(tx => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              isBuyer={false}
              isSeller={true}
              isLoading={actionLoading === tx.id}
              onConfirm={handleConfirm}
              onConclude={handleConclude}
              onCancelRequest={setCancelTarget}
              onPay={() => {} }
              payment={getPayment(tx)}
              onVerifyPayment={() => {} }
              onViewDetails={(txId) => navigate(`/transactions/${txId}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SellerDashboardSales
