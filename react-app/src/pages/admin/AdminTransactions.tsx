import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { SectionHeader, Table, Badge } from './AdminComponents'

function AdminTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      const params = {}
      if (status) params.status = status
      const data = await api.getAdminTransactions(params)
      setTransactions(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setTransactions([])
      setMessage(err?.message || 'Erro ao carregar transações.')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => { load() }, [load])

  return (
    <div className="space-y-6">
      <SectionHeader title="Transações" subtitle="Analise o fluxo de compra/venda e filtre por estados de transações." />

      <div className="grid gap-3 sm:grid-cols-3">
        <select value={status} onChange={e => setStatus(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="">Todos os estados</option>
          <option value="RESERVED">Reservado</option>
          <option value="AWAITING_CONFIRMATION">Aguardando confirmação</option>
          <option value="PROCESSING">Em Processamento</option>
          <option value="IN_TRANSIT">A Caminho</option>
          <option value="COMPLETED">Concluído</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
        <button onClick={load} className="rounded-3xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800">Atualizar transações</button>
      </div>

      {message && <div className="rounded-3xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <Table
          loading={loading}
          empty="Nenhuma transação encontrada."
          cols={[
            { key: 'id', label: 'ID' },
            { key: 'product', label: 'Produto', render: row => row.product?.name || row.product_name || '—' },
            { key: 'buyer', label: 'Comprador', render: row => row.buyer?.email || row.buyer_name || '—' },
            { key: 'seller', label: 'Vendedor', render: row => row.seller?.email || row.seller_name || '—' },
            { key: 'amount', label: 'Valor', render: row => row.amount ? `${row.amount} MT` : '—' },
            { key: 'status', label: 'Estado', render: row => <Badge status={row.status} /> },
            { key: 'created_at', label: 'Data', render: row => row.created_at ? new Date(row.created_at).toLocaleDateString('pt-PT') : '—' },
          ]}
          rows={transactions}
        />
      </div>
    </div>
  )
}

export default AdminTransactions
