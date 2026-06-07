import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { Badge, SectionHeader, Table } from './AdminComponents'

function AdminTechniques() {
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [actionLoading, setActionLoading] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      const params = {}
      if (status) params.status = status
      const data = await api.getAdminTechniques(params)
      setTechniques(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setTechniques([])
      setMessage(err?.message || 'Erro ao carregar técnicas.')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => { load() }, [load])

  const handleAction = async (id, action) => {
    setActionLoading(`${id}-${action}`)
    setMessage('')
    try {
      if (action === 'validate') await api.validateTechnique(id)
      if (action === 'discard') await api.discardTechnique(id)
      if (action === 'delete') {
        if (!window.confirm('Eliminar técnica?')) return
        await api.delete(`/admin-dashboard/techniques/${id}/`)
      }
      setMessage('Ação realizada com sucesso.')
      load()
    } catch (err) {
      setMessage(err?.message || 'Erro ao executar ação.')
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Técnicas Agrícolas" subtitle="Analise e modere técnicas enviadas pelos utilizadores." />

      <div className="grid gap-3 sm:grid-cols-3">
        <select value={status} onChange={e => setStatus(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="">Todos os estados</option>
          <option value="PENDING_VALIDATION">Pendente</option>
          <option value="VALIDATED">Validada</option>
          <option value="DISCARDED">Descartada</option>
        </select>
        <button onClick={load} className="rounded-3xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800">Atualizar técnicas</button>
      </div>

      {message && <div className="rounded-3xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <Table
          loading={loading}
          empty="Nenhuma técnica encontrada."
          cols={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Título', render: row => <span className="line-clamp-1 max-w-[220px] inline-block">{row.title || '—'}</span> },
            { key: 'status', label: 'Estado', render: row => <Badge status={row.status} /> },
            { key: 'author', label: 'Autor', render: row => row.author?.email || '—' },
            { key: 'actions', label: 'Ações', render: row => (
              <div className="flex flex-wrap gap-2">
                {row.status !== 'VALIDATED' && (
                  <button disabled={actionLoading === `${row.id}-validate`} onClick={() => handleAction(row.id, 'validate')} className="rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50">Validar</button>
                )}
                {row.status !== 'DISCARDED' && (
                  <button disabled={actionLoading === `${row.id}-discard`} onClick={() => handleAction(row.id, 'discard')} className="rounded-2xl border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-100 disabled:opacity-50">Descartar</button>
                )}
                <button disabled={actionLoading === `${row.id}-delete`} onClick={() => handleAction(row.id, 'delete')} className="rounded-2xl border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50">Eliminar</button>
              </div>
            ) },
          ]}
          rows={techniques}
        />
      </div>
    </div>
  )
}

export default AdminTechniques
