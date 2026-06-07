import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import api from '../services/api'

// Tipos de unidade conforme GET /api/marketplace/product-units/sale_unit_choices/
const UNIT_TYPES = [
  { value: 'UNIT',  label: 'Unidade' },
  { value: 'DOZEN', label: 'Dúzia' },
  { value: 'FAVO',  label: 'Favo' },
  { value: 'BOX',   label: 'Caixa' },
  { value: 'SACK',  label: 'Saco' },
  { value: 'OTHER', label: 'Outro (personalizado)' },
]

const emptyForm = {
  unit_type: 'UNIT',
  custom_unit_name: '',
  multiplier: '',
  price: '',
  is_active: true,
}

function ProductUnits() {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Formulário de criação/edição
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  // Modal de confirmação de eliminação
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [productId])

  const loadData = async () => {
    setLoading(true); setError('')
    try {
      const [prod, allUnits] = await Promise.all([
        api.getProduct(productId),
        api.getMyProductUnits(),
      ])
      setProduct(prod)
      // Filtrar apenas as unidades deste produto
      const list = Array.isArray(allUnits) ? allUnits : (allUnits.results || [])
      setUnits(list.filter(u => String(u.product_id || u.product) === String(productId)))
    } catch (err) {
      setError('Não foi possível carregar os dados.')
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (unit) => {
    setEditingId(unit.id)
    setForm({
      unit_type:        unit.unit_type || 'UNIT',
      custom_unit_name: unit.custom_unit_name || '',
      multiplier:       unit.multiplier || '',
      price:            unit.price || '',
      is_active:        unit.is_active !== false,
    })
    setFormError('')
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.multiplier || parseFloat(form.multiplier) <= 0) return setFormError('O multiplicador deve ser maior que zero.')
    if (!form.price || parseFloat(form.price) <= 0) return setFormError('O preço deve ser maior que zero.')
    if (form.unit_type === 'OTHER' && !form.custom_unit_name.trim()) return setFormError('Indique o nome da unidade personalizada.')
    setFormLoading(true)
    try {
      const payload = {
        product_id:       parseInt(productId),
        unit_type:        form.unit_type,
        custom_unit_name: form.unit_type === 'OTHER' ? form.custom_unit_name.trim() : '',
        multiplier:       form.multiplier,
        price:            form.price,
        is_active:        form.is_active,
      }
      if (editingId) {
        await api.updateProductUnit(editingId, payload)
      } else {
        await api.createProductUnit(payload)
      }
      setShowForm(false)
      await loadData()
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : err?.message || 'Erro ao guardar.'
      setFormError(msg)
    } finally {
      setFormLoading(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await api.deleteProductUnit(deleteTarget.id)
      setDeleteTarget(null)
      await loadData()
    } catch (err) {
      alert(err?.message || 'Erro ao eliminar.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const productName = product?.name || product?.nome || 'Produto'

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />

      {/* Modal de confirmação de eliminação */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-trash text-red-600 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Eliminar unidade?</h3>
            <p className="text-gray-600 text-sm mb-5">
              A unidade <span className="font-semibold">"{deleteTarget.name || deleteTarget.unit_type}"</span> será eliminada.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
                Cancelar
              </button>
              <button onClick={handleDelete} disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm disabled:opacity-50">
                {deleteLoading ? 'A eliminar...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3 max-w-2xl mx-auto w-full">
            <button onClick={() => navigate(`/product/${productId}`)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
              <i className="bi bi-arrow-left text-lg"></i>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-black text-gray-900">Unidades de venda</h1>
              <p className="text-xs text-gray-400 truncate">{productName}</p>
            </div>
            <button onClick={openCreate}
              className="btn-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5">
              <i className="bi bi-plus-lg"></i> Adicionar
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">

          {/* Formulário de criação/edição */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">{editingId ? 'Editar unidade' : 'Nova unidade de venda'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-4 text-sm">{formError}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tipo de unidade */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">Tipo de unidade *</label>
                  <select value={form.unit_type}
                    onChange={e => setForm(p => ({ ...p, unit_type: e.target.value, custom_unit_name: '' }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm text-gray-900">
                    {UNIT_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Nome personalizado (só para OTHER) */}
                {form.unit_type === 'OTHER' && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Nome da unidade *</label>
                    <input type="text" value={form.custom_unit_name}
                      onChange={e => setForm(p => ({ ...p, custom_unit_name: e.target.value }))}
                      className="form-input w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="Ex: Fardo, Pacote, Rolo..." required />
                  </div>
                )}

                {/* Multiplicador */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                    Multiplicador * <span className="text-gray-400 font-normal">(quantas unidades base representa)</span>
                  </label>
                  <input type="number" value={form.multiplier}
                    onChange={e => setForm(p => ({ ...p, multiplier: e.target.value }))}
                    className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    placeholder="Ex: 12 para Dúzia, 30 para Fardo" step="0.01" min="0.01" required />
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">Preço desta unidade (MZN) *</label>
                  <input type="number" value={form.price}
                    onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                    className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    placeholder="0.00" step="0.01" min="0.01" required />
                </div>

                {/* Ativa */}
                <div className="flex items-center gap-3">
                  <button type="button"
                    onClick={() => setForm(p => ({ ...p, is_active: !p.is_active }))}
                    className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ${form.is_active ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5 ${form.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                  <span className="text-sm text-gray-700 font-medium">Unidade ativa</span>
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
                    Cancelar
                  </button>
                  <button type="submit" disabled={formLoading}
                    className="flex-1 py-3 rounded-xl btn-primary text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                    {formLoading
                      ? <><i className="bi bi-arrow-repeat animate-spin"></i> A guardar...</>
                      : editingId ? 'Guardar alterações' : 'Criar unidade'
                    }
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de unidades */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80 mb-3" />
              <div className="flex items-center gap-1.5">
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-green-500"
                    style={{ animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-8px);opacity:1}}`}</style>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">{error}</p>
              <button onClick={loadData} className="btn-primary text-white px-6 py-2 rounded-xl text-sm">Tentar novamente</button>
            </div>
          ) : units.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-tags text-3xl text-gray-300"></i>
              </div>
              <p className="text-gray-700 font-bold mb-1">Nenhuma unidade definida</p>
              <p className="text-gray-400 text-sm mb-5">Adiciona unidades de venda para que os compradores possam escolher (Dúzia, Saco, etc.)</p>
              <button onClick={openCreate} className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">
                Adicionar primeira unidade
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {units.map(unit => (
                <div key={unit.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900">{unit.name || unit.unit_type}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          unit.is_active !== false
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {unit.is_active !== false ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span><i className="bi bi-arrow-repeat mr-1"></i>×{parseFloat(unit.multiplier || 1).toFixed(0)} unidades base</span>
                        <span className="font-bold text-green-700">{parseFloat(unit.price || 0).toFixed(2)} MZN</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-3">
                      <button onClick={() => openEdit(unit)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-blue-50 text-blue-600">
                        <i className="bi bi-pencil text-sm"></i>
                      </button>
                      <button onClick={() => setDeleteTarget(unit)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-50 text-red-500">
                        <i className="bi bi-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}

export default ProductUnits
