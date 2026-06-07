import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { SectionHeader, Table, Badge } from './AdminComponents'

function AdminAudit() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ user_email: '', action: '', resource: '', status: '' })
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      const params = {}
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value
      })
      const data = await api.getAuditLogs(params)
      setLogs(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setLogs([])
      setMessage(err?.message || 'Erro ao carregar audit logs.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { load() }, [load])

  const updateFilter = (key) => (event) => setFilters(prev => ({ ...prev, [key]: event.target.value }))

  return (
    <div className="space-y-6">
      <SectionHeader title="Audit Logs" subtitle="Analise eventos de sistema, ações de utilizadores e falhas de permissões." />

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-4">
          <input value={filters.user_email} onChange={updateFilter('user_email')} placeholder="Email do utilizador" className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
          <select value={filters.action} onChange={updateFilter('action')} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
            <option value="">Todas as acções</option>
            {['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGIN_FAILED', 'LOGOUT', 'UPGRADE_REQUEST'].map(action => <option key={action} value={action}>{action}</option>)}
          </select>
          <input value={filters.resource} onChange={updateFilter('resource')} placeholder="Recurso" className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
          <select value={filters.status} onChange={updateFilter('status')} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
            <option value="">Todos os estados</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={load} className="rounded-3xl bg-green-950 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Aplicar filtros</button>
          <button onClick={() => setFilters({ user_email: '', action: '', resource: '', status: '' })} className="rounded-3xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Limpar filtros</button>
        </div>
      </div>

      {message && <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</div>}

      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <Table
          loading={loading}
          empty="Nenhum log encontrado."
          cols={[
            { key: 'id', label: 'ID' },
            { key: 'user_email', label: 'Utilizador' },
            { key: 'action', label: 'Ação' },
            { key: 'resource', label: 'Recurso' },
            { key: 'resource_id', label: 'ID Recurso' },
            { key: 'status', label: 'Estado', render: row => <Badge status={row.status} /> },
            { key: 'detail', label: 'Detalhe', render: row => <span className="line-clamp-1 max-w-[220px] inline-block text-sm text-gray-600">{row.detail || '—'}</span> },
            { key: 'timestamp', label: 'Data / Hora', render: row => row.timestamp ? new Date(row.timestamp).toLocaleString('pt-PT') : '—' },
          ]}
          rows={logs}
        />
      </div>
    </div>
  )
}

export default AdminAudit
