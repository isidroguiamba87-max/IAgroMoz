import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { SectionHeader, Table } from './AdminComponents'

function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [actionLoading, setActionLoading] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      const params = {}
      if (category) params.category = category
      const data = await api.getAdminPosts(params)
      setPosts(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setPosts([])
      setMessage(err?.message || 'Erro ao carregar publicações.')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminar publicação?')) return
    setActionLoading(`${id}-delete`)
    setMessage('')
    try {
      await api.delete(`/admin-dashboard/posts/${id}/`)
      setMessage('Publicação eliminada com sucesso.')
      load()
    } catch (err) {
      setMessage(err?.message || 'Erro ao eliminar publicação.')
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Feed & Conteúdo" subtitle="Revise e remova conteúdos públicos de posts potencialmente problemáticos." />

      <div className="grid gap-3 sm:grid-cols-3">
        <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="">Todas as categorias</option>
          <option value="AGRICULTURE">Agricultura</option>
          <option value="LIVESTOCK">Pecuária</option>
        </select>
        <button onClick={load} className="rounded-3xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800">Atualizar publicações</button>
      </div>

      {message && <div className="rounded-3xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <Table
          loading={loading}
          empty="Nenhuma publicação encontrada."
          cols={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Título', render: row => <span className="line-clamp-1 max-w-[200px] inline-block">{row.title || '—'}</span> },
            { key: 'category', label: 'Categoria' },
            { key: 'author', label: 'Autor', render: row => row.author?.email || row.author_email || '—' },
            { key: 'created_at', label: 'Data', render: row => row.created_at ? new Date(row.created_at).toLocaleDateString('pt-PT') : '—' },
            { key: 'actions', label: 'Ações', render: row => (
              <button disabled={actionLoading === `${row.id}-delete`} onClick={() => handleDelete(row.id)} className="rounded-2xl border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50">Eliminar</button>
            ) },
          ]}
          rows={posts}
        />
      </div>
    </div>
  )
}

export default AdminPosts
