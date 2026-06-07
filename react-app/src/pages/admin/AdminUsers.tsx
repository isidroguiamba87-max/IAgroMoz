import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { Badge, SectionHeader, Table } from './AdminComponents'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [actionLoading, setActionLoading] = useState('')
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      const params = {}
      if (roleFilter) params.role = roleFilter
      if (activeFilter !== '') params.is_active = activeFilter
      const data = await api.getAdminUsers(params)
      setUsers(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setUsers([])
      setMessage(err?.message || 'Não foi possível carregar utilizadores.')
    } finally {
      setLoading(false)
    }
  }, [roleFilter, activeFilter])

  useEffect(() => { load() }, [load])

  const handleAction = async (userId, action) => {
    setActionLoading(`${userId}-${action}`)
    setMessage('')
    try {
      if (action === 'activate') await api.activateUser(userId)
      if (action === 'deactivate') await api.deactivateUser(userId)
      if (action === 'delete') {
        if (!window.confirm('Eliminar utilizador?')) return
        await api.deleteUser(userId)
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
      <SectionHeader title="Utilizadores" subtitle="Gerencie utilizadores, filtros e ações administrativas de conta." />

      <div className="grid gap-3 sm:grid-cols-3">
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="">Todos os cargos</option>
          <option value="NORMAL">Normal</option>
          <option value="PRODUCER">Produtor</option>
          <option value="SELLER">Vendedor</option>
          <option value="ADMIN">Admin</option>
        </select>
        <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="">Todos os estados</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
        <button onClick={load} className="rounded-3xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800">Atualizar lista</button>
      </div>

      {message && <div className="rounded-3xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <Table
          loading={loading}
          empty="Nenhum utilizador encontrado."
          cols={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Nome', render: row => `${row.first_name || ''} ${row.last_name || ''}`.trim() || row.email },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Tipo', render: row => <Badge status={row.role} /> },
            { key: 'is_active', label: 'Estado', render: row => <Badge status={row.is_active ? 'ACTIVE' : 'INACTIVE'} /> },
            { key: 'actions', label: 'Ações', render: row => (
              <div className="flex flex-wrap gap-2">
                {row.is_active ? (
                  <button disabled={actionLoading === `${row.id}-deactivate`} onClick={() => handleAction(row.id, 'deactivate')} className="rounded-2xl border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-100 disabled:opacity-50">Desativar</button>
                ) : (
                  <button disabled={actionLoading === `${row.id}-activate`} onClick={() => handleAction(row.id, 'activate')} className="rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50">Ativar</button>
                )}
                {row.role !== 'ADMIN' && (
                  <button disabled={actionLoading === `${row.id}-delete`} onClick={() => handleAction(row.id, 'delete')} className="rounded-2xl border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50">Eliminar</button>
                )}
              </div>
            ) },
          ]}
          rows={users}
        />
      </div>
    </div>
  )
}

export default AdminUsers
