import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionCard from '../components/TransactionCard'
import api from '../services/api'
import { normTx } from '../utils/normalizers'

function SellerDashboardPurchases() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [txData, pyData] = await Promise.all([api.getTransactions(), api.getPayments().catch(() => [])])
        const list = Array.isArray(txData) ? txData : txData.results || []
        const pyList = Array.isArray(pyData) ? pyData : pyData.results || []
        setTransactions(list.map(normTx).filter(tx => String(tx.buyer_id) === String(userId) && String(tx.seller_id) !== String(userId)))
        setPayments(pyList)
      } catch (err) {
        setError('Não foi possível carregar as compras.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [userId])

  const getPayment = (tx) => payments.find(p => String(p.transaction || p.transaction_id) === String(tx.id))

  if (loading) {
    return <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">Carregando compras...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Compras</h2>
        <p className="text-sm text-gray-500">Compras feitas de outros vendedores.</p>
      </div>

      {error && <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {transactions.length === 0 ? (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          Nenhuma compra encontrada.
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map(tx => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              isBuyer={true}
              isSeller={false}
              isLoading={false}
              onConfirm={() => {}}
              onConclude={() => {}}
              onCancelRequest={() => {}}
              onPay={() => {}}
              payment={getPayment(tx)}
              onVerifyPayment={() => {}}
              onViewDetails={(txId) => navigate(`/transactions/${txId}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SellerDashboardPurchases
