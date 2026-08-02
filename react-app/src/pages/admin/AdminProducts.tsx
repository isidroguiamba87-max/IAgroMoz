import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { SectionHeader, Table } from './AdminComponents'
import { resolveProductPhoto } from '../../utils/normalizers'

function AdminProducts() {
  const [products, setProducts] = useState([])
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
      const data = await api.getAdminProducts(params)
      setProducts(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setProducts([])
      setMessage(err?.message || 'Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminar produto?')) return
    setActionLoading(`${id}-delete`)
    setMessage('')
    try {
      await api.delete(`/admin-dashboard/products/${id}/`)
      setMessage('Produto eliminado com sucesso.')
      load()
    } catch (err) {
      setMessage(err?.message || 'Erro ao eliminar produto.')
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Mercado (Produtos)" subtitle="Navegue pelos produtos do mercado e remova conteúdo inadequado ou ilegal." />

      <div className="grid gap-3 sm:grid-cols-3">
        <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <option value="">Todas as categorias</option>
          <option value="AGRICULTURE">Agricultura</option>
          <option value="LIVESTOCK">Pecuária</option>
        </select>
        <button onClick={load} className="rounded-3xl bg-green-950 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800">Atualizar produtos</button>
      </div>

      {message && <div className="rounded-3xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <Table
          loading={loading}
          empty="Nenhum produto encontrado."
          cols={[
            { key: 'id', label: 'ID' },
            { key: 'photo', label: 'Foto', render: row => resolveProductPhoto(row) ? <img src={resolveProductPhoto(row)} alt={row.name || ''} className="h-12 w-12 rounded-2xl object-cover" /> : <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400"><i className="bi bi-image" /></div> },
            { key: 'name', label: 'Nome' },
            { key: 'price', label: 'Preço', render: row => row.price ? `${row.price} MT` : '—' },
            { key: 'category', label: 'Categoria' },
            { key: 'seller', label: 'Vendedor', render: row => typeof row.seller === 'object' ? `${row.seller.first_name || ''} ${row.seller.last_name || ''}`.trim() : row.seller || '—' },
            { key: 'actions', label: 'Ações', render: row => (
              <button disabled={actionLoading === `${row.id}-delete`} onClick={() => handleDelete(row.id)} className="rounded-2xl border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50">Eliminar</button>
            ) },
          ]}
          rows={products}
        />
      </div>
    </div>
  )
}

export default AdminProducts
