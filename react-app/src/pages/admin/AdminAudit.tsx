import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { SectionHeader, Table, Badge, StatCard } from './AdminComponents'

function AdminAudit() {
  const [tab, setTab] = useState('logs') // 'logs' | 'security'

  const [logs, setLogs] = useState([])
  const [loadingLogs, setLoadingLogs] = useState(true)
  const [filters, setFilters] = useState({ user_email: '', action: '', resource: '', status: '' })
  const [message, setMessage] = useState('')

  const [securityEvents, setSecurityEvents] = useState([])
  const [loadingSecurity, setLoadingSecurity] = useState(true)
  const [securityFilters, setSecurityFilters] = useState({ event_type: '', user_email: '', ip_address: '', date_from: '', date_to: '' })
  const [securityMessage, setSecurityMessage] = useState('')

  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)

  const loadStats = useCallback(async () => {
    setStatsLoading(true)
    try {
      const data = await api.getAuditStats()
      setStats(data)
    } catch (err) {
      setStats(null)
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const load = useCallback(async () => {
    setLoadingLogs(true)
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
      setLoadingLogs(false)
    }
  }, [filters])

  const loadSecurity = useCallback(async () => {
    setLoadingSecurity(true)
    setSecurityMessage('')
    try {
      const params = {}
      Object.entries(securityFilters).forEach(([key, value]) => {
        if (value) params[key] = value
      })
      const data = await api.getAuditSecurityEvents(params)
      setSecurityEvents(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setSecurityEvents([])
      setSecurityMessage(err?.message || 'Erro ao carregar eventos de segurança.')
    } finally {
      setLoadingSecurity(false)
    }
  }, [securityFilters])

  useEffect(() => { loadStats() }, [loadStats])
  useEffect(() => { load() }, [load])
  useEffect(() => { if (tab === 'security') loadSecurity() }, [tab, loadSecurity])

  const updateFilter = (key) => (event) => setFilters(prev => ({ ...prev, [key]: event.target.value }))
  const updateSecurityFilter = (key) => (event) => setSecurityFilters(prev => ({ ...prev, [key]: event.target.value }))

  return (
    <div className="space-y-6">
      <SectionHeader title="Audit Logs" subtitle="Analise eventos de sistema, ações de utilizadores e falhas de permissões." />

      {/* ── Estatísticas ── */}
      {!statsLoading && stats && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
            <StatCard icon="bi-activity" label="Pedidos totais" value={stats.total_requests ?? '—'} color="blue" />
            <StatCard icon="bi-box-arrow-in-right" label="Logins" value={stats.total_logins ?? '—'} color="green" />
            <StatCard icon="bi-shield-exclamation" label="Logins falhados" value={stats.failed_logins ?? '—'} color="red" />
            <StatCard icon="bi-calendar-day" label="Pedidos hoje" value={stats.requests_today ?? '—'} color="orange" />
            <StatCard icon="bi-exclamation-triangle" label="Eventos de segurança" value={stats.security_events ?? '—'} color="purple" />
          </div>
          {(stats.top_ips?.length > 0 || stats.top_endpoints?.length > 0) && (
            <div className="grid gap-4 lg:grid-cols-2">
              {stats.top_ips?.length > 0 && (
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-500 mb-3">IPs mais activos</p>
                  <div className="space-y-2">
                    {stats.top_ips.map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-mono">{row.ip_address}</span>
                        <span className="text-gray-400 font-semibold">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {stats.top_endpoints?.length > 0 && (
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-500 mb-3">Endpoints mais acedidos</p>
                  <div className="space-y-2">
                    {stats.top_endpoints.map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm gap-3">
                        <span className="text-gray-700 font-mono truncate">{row.path}</span>
                        <span className="text-gray-400 font-semibold flex-shrink-0">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Separador ── */}
      <div className="flex gap-2 border-b border-gray-200">
        <button onClick={() => setTab('logs')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === 'logs' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          Todos os eventos
        </button>
        <button onClick={() => setTab('security')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === 'security' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          Eventos de Segurança
        </button>
      </div>

      {tab === 'logs' ? (
        <>
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
              loading={loadingLogs}
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
        </>
      ) : (
        <>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-5">
              <input value={securityFilters.event_type} onChange={updateSecurityFilter('event_type')} placeholder="Tipo de evento" className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
              <input value={securityFilters.user_email} onChange={updateSecurityFilter('user_email')} placeholder="Email do utilizador" className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
              <input value={securityFilters.ip_address} onChange={updateSecurityFilter('ip_address')} placeholder="Endereço IP" className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
              <input type="date" value={securityFilters.date_from} onChange={updateSecurityFilter('date_from')} className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
              <input type="date" value={securityFilters.date_to} onChange={updateSecurityFilter('date_to')} className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700" />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={loadSecurity} className="rounded-3xl bg-green-950 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Aplicar filtros</button>
              <button onClick={() => setSecurityFilters({ event_type: '', user_email: '', ip_address: '', date_from: '', date_to: '' })} className="rounded-3xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Limpar filtros</button>
            </div>
          </div>

          {securityMessage && <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{securityMessage}</div>}

          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <Table
              loading={loadingSecurity}
              empty="Nenhum evento de segurança encontrado."
              cols={[
                { key: 'id', label: 'ID' },
                { key: 'event_type', label: 'Tipo' },
                { key: 'user_email', label: 'Utilizador' },
                { key: 'ip_address', label: 'IP', render: row => <span className="font-mono">{row.ip_address || '—'}</span> },
                { key: 'detail', label: 'Detalhe', render: row => <span className="line-clamp-1 max-w-[260px] inline-block text-sm text-gray-600">{row.detail || row.description || '—'}</span> },
                { key: 'timestamp', label: 'Data / Hora', render: row => row.timestamp || row.date ? new Date(row.timestamp || row.date).toLocaleString('pt-PT') : '—' },
              ]}
              rows={securityEvents}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminAudit
