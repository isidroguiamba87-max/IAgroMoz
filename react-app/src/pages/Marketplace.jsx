import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import MobileNav from "../components/MobileNav"
import DesktopSidebar from "../components/DesktopSidebar"
import LoadingPlant from "../components/LoadingPlant"
import LazyImage from "../components/LazyImage"
import api from "../services/api"
import { API_BASE } from "../config/api"
import { normProduct as norm, extractApiErrorMessage, resolveMediaUrl } from "../utils/normalizers"
import { getDashboardPath } from "../utils/dashboardPaths"
import { loadDistrictMap, districtLabel } from "../utils/districtCache"
import { useAuth } from "../context/AuthContext"

// ─── Categorias e subcategorias conforme GET /api/enums/ ─────────────────────
const CATEGORIES = [
  { value: "AGRICULTURE", label: "Agricultura", icon: "bi-flower1",
    subcategories: [
      { value: "CITRUS",      label: "Citrinos" },
      { value: "TUBERS",      label: "Tubérculos" },
      { value: "FRUITS",      label: "Frutas" },
      { value: "CEREALS",     label: "Cereais" },
      { value: "LEGUMES",     label: "Leguminosas" },
      { value: "VEGETABLES",  label: "Hortícolas" },
      { value: "OTHER",       label: "Outro" },
    ]
  },
  { value: "LIVESTOCK", label: "Pecuária", icon: "bi-heart-fill",
    subcategories: [
      { value: "POULTRY",     label: "Aves" },
      { value: "EGGS",        label: "Ovos" },
      { value: "SWINE",       label: "Suínos" },
      { value: "FISH",        label: "Peixe" },
      { value: "CATTLE",      label: "Bovinos" },
      { value: "GOATS",       label: "Caprinos" },
      { value: "SHEEP",       label: "Ovinos" },
      { value: "BEEKEEPING",  label: "Apicultura" },
      { value: "OTHER",       label: "Outro" },
    ]
  },
]

// ─── Modal de pedido de upgrade para produtor ─────────────────────────────────
// POST /api/users/upgrade-to-producer/  { contact, farm_address }
function UpgradeModal({ onClose, existingRequest }) {
  const [contact, setContact] = useState("")
  const [farmAddress, setFarmAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  if (existingRequest?.status === "PENDING") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <i className="bi bi-hourglass-split text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Pedido Pendente</h3>
          <p className="text-gray-600 text-sm mb-5">Já enviaste um pedido de upgrade. Aguarda a aprovação do administrador.</p>
          <button onClick={onClose} className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">Fechar</button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <i className="bi bi-check-circle text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Pedido Enviado</h3>
          <p className="text-gray-600 text-sm mb-5">O teu pedido foi enviado ao administrador. Aguarda a aprovação.</p>
          <button onClick={onClose} className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">Fechar</button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      await api.requestUpgradeToProducer(contact, farmAddress)
      setSuccess(true)
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${Array.isArray(v) ? v.join(", ") : v}`).join(" | ")
        : "Erro ao enviar pedido."
      setError(msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Solicitar Acesso de Produtor</h3>
            <p className="text-xs text-gray-500">Para publicar produtos no marketplace</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="bi bi-x-lg text-xl"></i></button>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 mb-4 flex items-start gap-2">
          <i className="bi bi-info-circle text-yellow-600 mt-0.5"></i>
          <p className="text-yellow-700 text-xs">Apenas produtores e vendedores autorizados pelo admin podem publicar produtos.</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Contacto (telefone) *</label>
            <input type="text" value={contact} onChange={e => setContact(e.target.value)}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm" placeholder="+258 84 XXX XXXX" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Endereço da exploração *</label>
            <textarea value={farmAddress} onChange={e => setFarmAddress(e.target.value)}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" rows={3}
              placeholder="Ex: Bairro Central, Manica..." required />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50">
              {loading ? "A enviar..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Modal de apagar produto ──────────────────────────────────────────────────
function DeleteModal({ product, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
          <i className="bi bi-trash text-red-600 text-2xl"></i>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Apagar produto?</h3>
        <p className="text-gray-600 text-sm mb-5">
          Tens a certeza que queres apagar <span className="font-semibold">"{product.name}"</span>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">Cancelar</button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm disabled:opacity-50">
            {loading ? "A apagar..." : "Apagar"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Modal de edição de produto ───────────────────────────────────────────────
// PATCH /api/marketplace/products/{id}/  — campos: name, description, price, photo, category, subcategory, district
const EDIT_MAX_PHOTOS = 5
const EDIT_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const EDIT_MAX_SIZE = 5 * 1024 * 1024

function EditModal({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: product.name || "", description: product.description || "",
    price: product.price || "", category: product.category || "",
    subcategory: product.subcategory || "", photo: null
  })
  const [preview, setPreview] = useState(product.photo || null)
  const [existingPhotos, setExistingPhotos] = useState(
    Array.isArray(product.photos) ? product.photos.map(p => ({
      id: p.id, url: resolveMediaUrl(p.image || p.photo || p.url || p.file),
    })).filter(p => p.url) : []
  )
  const [newPhotos, setNewPhotos] = useState([])
  const [newPreviews, setNewPreviews] = useState([])
  const [removingPhotoId, setRemovingPhotoId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const catObj = CATEGORIES.find(c => c.value === form.category)
  const totalPhotoCount = 1 + existingPhotos.length + newPhotos.length // capa + galeria

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(p => ({ ...p, photo: file }))
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleAddGalleryPhotos = (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    const room = EDIT_MAX_PHOTOS - totalPhotoCount
    const accepted = []
    let rejected = false
    for (const file of files) {
      if (accepted.length >= room) { rejected = true; break }
      if (!EDIT_ALLOWED_TYPES.includes(file.type) || file.size > EDIT_MAX_SIZE) { rejected = true; continue }
      accepted.push(file)
    }
    if (rejected) setError(`Só são aceites até ${EDIT_MAX_PHOTOS} fotos no total (jpeg/png/webp, máx. 5MB cada).`)
    if (!accepted.length) return
    setNewPhotos(prev => [...prev, ...accepted])
    accepted.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => setNewPreviews(prev => [...prev, reader.result])
      reader.readAsDataURL(file)
    })
  }

  const removeNewPhoto = (index) => {
    setNewPhotos(prev => prev.filter((_, i) => i !== index))
    setNewPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingPhoto = async (photoId) => {
    setRemovingPhotoId(photoId)
    setError("")
    try {
      await api.removeProductPhoto(product.id, photoId)
      setExistingPhotos(prev => prev.filter(p => p.id !== photoId))
    } catch (err) {
      setError(extractApiErrorMessage(err, "Erro ao remover foto."))
    } finally {
      setRemovingPhotoId(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError("O nome é obrigatório")
    if (!form.price || parseFloat(form.price) <= 0) return setError("O preço deve ser maior que zero")
    setLoading(true); setError("")
    try {
      const token = localStorage.getItem("access_token")
      const data = new FormData()
      data.append("name", form.name.trim())
      data.append("price", form.price)
      if (form.description.trim()) data.append("description", form.description.trim())
      if (form.category) data.append("category", form.category)
      if (form.subcategory) data.append("subcategory", form.subcategory)
      if (form.photo) data.append("photo", form.photo)
      const res = await fetch(`${API_BASE}/marketplace/products/${product.id}/`, {
        method: "PATCH", headers: { "Authorization": `Bearer ${token}` }, body: data
      })
      const result = await res.json()
      if (!res.ok) throw new Error(Object.entries(result).map(([k, v]) => `${Array.isArray(v) ? v.join(", ") : v}`).join(" | "))
      if (newPhotos.length > 0) {
        await Promise.allSettled(newPhotos.map(file => api.addProductPhoto(product.id, file)))
      }
      onSave(norm(result))
    } catch (err) { setError(err.message || "Erro ao atualizar.") }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Editar produto</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><i className="bi bi-x-lg text-xl"></i></button>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Foto de capa</label>
            {preview && <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
            <label className="btn-primary text-white px-4 py-2 rounded-xl cursor-pointer text-sm flex items-center gap-2 w-fit">
              <i className="bi bi-upload"></i> {preview ? "Trocar foto" : "Adicionar foto"}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Galeria (até {EDIT_MAX_PHOTOS} fotos no total)</label>
            {(existingPhotos.length > 0 || newPreviews.length > 0) && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {existingPhotos.map(p => (
                  <div key={p.id} className="relative">
                    <img src={p.url} alt="Foto da galeria" className="w-full h-16 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeExistingPhoto(p.id)} disabled={removingPhotoId === p.id}
                      className="absolute top-0.5 right-0.5 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow disabled:opacity-50">
                      <i className={`bi ${removingPhotoId === p.id ? 'bi-arrow-repeat animate-spin' : 'bi-x-lg'} text-[9px]`}></i>
                    </button>
                  </div>
                ))}
                {newPreviews.map((src, i) => (
                  <div key={`new-${i}`} className="relative">
                    <img src={src} alt="Nova foto" className="w-full h-16 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeNewPhoto(i)}
                      className="absolute top-0.5 right-0.5 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow">
                      <i className="bi bi-x-lg text-[9px]"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {totalPhotoCount < EDIT_MAX_PHOTOS && (
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 cursor-pointer hover:text-green-800">
                <i className="bi bi-plus-circle"></i> Adicionar à galeria
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleAddGalleryPhotos} className="hidden" />
              </label>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Nome *</label>
            <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Preço (MZN) *</label>
            <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm" step="0.01" min="0.01" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Categoria</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value, subcategory: "" }))}
              className="w-full px-3 py-2.5 rounded-xl text-sm border-2 border-gray-200 bg-white">
              <option value="">Selecione</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          {catObj && (
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Subcategoria</label>
              <select value={form.subcategory} onChange={e => setForm(p => ({ ...p, subcategory: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm border-2 border-gray-200 bg-white">
                <option value="">Selecione</option>
                {catObj.subcategories.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Descrição</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" rows={3} />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">Cancelar</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50">
              {loading ? "A guardar..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Menu ⋯ por produto ───────────────────────────────────────────────────────
function ProductMenu({ product, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white text-gray-600">
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      {open && (
        <div className="absolute right-0 top-9 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[150px] py-1">
          <button onClick={() => { setOpen(false); onEdit(product) }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <i className="bi bi-pencil text-blue-500"></i> Editar produto
          </button>
          <button onClick={() => { setOpen(false); onDelete(product) }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
            <i className="bi bi-trash"></i> Apagar produto
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Marketplace principal ────────────────────────────────────────────────────
function Marketplace() {
  const navigate = useNavigate()
  const { requireAuth } = useAuth()
  const [category, setCategory] = useState("todos")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [existingRequest, setExistingRequest] = useState(null)
  const [checkingStatus, setCheckingStatus] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [reservationCount, setReservationCount] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [districtMap, setDistrictMap] = useState({})

  const token = localStorage.getItem("access_token")
  const userId = localStorage.getItem("userId")
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"
  // Produtor já tem "Meus Anúncios" e "Pedidos" dentro do painel — evita duplicar aqui.
  const isProducer = userRole === "producer"
  const hasMounted = useRef(false)
  const categoryMounted = useRef(false)

  useEffect(() => {
    if (hasMounted.current) return
    hasMounted.current = true

    loadProducts(1)
    loadDistrictMap().then(setDistrictMap)
    if (token) {
      loadMyProfile()
      loadReservationCount()
    }
    const params = new URLSearchParams(window.location.search)
    if (params.get("anunciar") === "1" && token) {
      ;(async () => {
        try {
          const req = await api.getUpgradeStatus()
          setExistingRequest(req)
        } catch (err) {
          console.warn('getUpgradeStatus:', err)
        } finally {
          setShowUpgradeModal(true)
          window.history.replaceState({}, '', '/marketplace')
        }
      })()
    }
  }, [])

  // Categoria filtra no servidor (?category=) — recarrega a partir da página 1
  // sempre que muda, sem repetir isso no mount (já tratado pelo efeito acima).
  useEffect(() => {
    if (!categoryMounted.current) { categoryMounted.current = true; return }
    loadProducts(1)
  }, [category])

  const loadReservationCount = async () => {
    try {
      const data = await api.getTransactions()
      const list = Array.isArray(data) ? data : (data.results || [])
      const active = list.filter(tx => !['COMPLETED', 'CANCELLED'].includes(tx.status))
      setReservationCount(active.length)
    } catch (_) {}
  }

  const loadMyProfile = async () => {
    try {
      const profile = await api.getUserProfile()
      // getUserProfile() já guarda userRole no localStorage corretamente
      // Apenas atualizar o nome se necessário
      const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
      if (fullName) localStorage.setItem('userName', fullName)
    } catch (_) {}
  }

  const loadProducts = async (targetPage = 1) => {
    try {
      if (targetPage === 1) { setLoading(true); setError("") } else { setLoadingMore(true) }
      const params = { page: targetPage }
      if (category !== "todos") params.category = category
      const data = await api.getProducts(params)
      const list = Array.isArray(data) ? data : (data.results || [])
      const normalized = list.map(norm)
      setProducts(prev => targetPage === 1 ? normalized : [...prev, ...normalized])
      setHasMore(!Array.isArray(data) && !!data.next)
      setPage(targetPage)
    } catch (err) {
      if (targetPage === 1) setError("Erro ao carregar produtos. Verifique a conexão com o servidor.")
    } finally { setLoading(false); setLoadingMore(false) }
  }

  // Verifica se o utilizador logado é dono do produto
  const isOwner = (product) => {
    if (!token) return false
    if (isAdmin) return true
    if (!userId) return false
    if (product.seller_id && String(product.seller_id) === String(userId)) return true
    try {
      const myIds = JSON.parse(localStorage.getItem("myProductIds") || "[]")
      if (myIds.includes(product.id)) return true
    } catch (_) {}
    return false
  }

  const handlePublishClick = async () => {
    if (!requireAuth(handlePublishClick)) return
    setCheckingStatus(true)
    try {
      const { allowed } = await api.checkPublishPermission()
      if (allowed) { navigate("/create-product"); return }
    } catch (_) {}
    try {
      const req = await api.getUpgradeStatus()
      setExistingRequest(req)
    } catch (_) { setExistingRequest(null) }
    finally { setCheckingStatus(false) }
    setShowUpgradeModal(true)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await api.deleteProduct(deleteTarget.id)
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (_) {}
    finally { setDeleteLoading(false) }
  }

  const handleEditSave = (updated) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
    setEditTarget(null)
  }

  // Filtros baseados nos campos reais da API
  const CATS = [
    { id: "todos",       label: "Todos",       icon: "bi-grid-fill" },
    { id: "AGRICULTURE", label: "Agricultura", icon: "bi-flower1" },
    { id: "LIVESTOCK",   label: "Pecuária",    icon: "bi-heart-fill" },
  ]

  // Categoria já vem filtrada do servidor (?category=); aqui só falta a busca por nome,
  // que a API não documenta como filtro — por isso continua a ser feita no que já carregou.
  const filteredProducts = products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))

  const destaques = [...filteredProducts].filter(p => p.avg_rating > 0).sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 4)
  const novos = [...filteredProducts].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 4)

  const ProductCard = ({ product, size = "md" }) => {
    const district = districtLabel(product.district, districtMap)
    return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all relative ${size === "sm" ? "flex gap-3 p-3" : ""}`}
      onClick={() => navigate(`/product/${product.id}`)}>
      {token && isOwner(product) && size !== "sm" && (
        <div className="absolute top-2 right-2 z-10" onClick={e => e.stopPropagation()}>
          <ProductMenu product={product} onEdit={setEditTarget} onDelete={setDeleteTarget} />
        </div>
      )}
      {size === "sm" ? (
        <>
          <LazyImage
              src={product.photo}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
              fallback={<div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center"><i className="bi bi-image text-gray-300 text-xl"></i></div>}
            />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight">{product.name}</p>
            {district && <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><i className="bi bi-geo-alt"></i>{district}</p>}
            <p className="text-green-700 font-black text-sm mt-1">{product.price} MZN</p>
          </div>
        </>
      ) : (
        <>
          {product.category && (
            <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-600 text-white">
              {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
            </span>
          )}
          <LazyImage
              src={product.photo}
              alt={product.name}
              className="w-full h-40 object-cover"
              fallback={<div className="w-full h-40 bg-gray-100 flex items-center justify-center"><i className="bi bi-image text-4xl text-gray-300"></i></div>}
            />
          <div className="p-3">
            <p className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight mb-1">{product.name}</p>
            {district && <p className="text-xs text-gray-400 flex items-center gap-1 mb-1"><i className="bi bi-geo-alt"></i>{district}</p>}
            <p className="text-green-700 font-black text-base">{product.price} MZN</p>
            {product.seller && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-5 h-5 rounded-full avatar-gradient flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                  {(product.seller || "V").charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-gray-500 truncate">{product.seller}</span>
                {product.avg_rating > 0 && (
                  <span className="ml-auto flex items-center gap-0.5 text-xs text-yellow-600 font-semibold flex-shrink-0">
                    <i className="bi bi-star-fill text-[10px]"></i>{product.avg_rating.toFixed(1)}
                  </span>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        {showUpgradeModal && (
          <UpgradeModal onClose={() => setShowUpgradeModal(false)} existingRequest={existingRequest} />
        )}
        {deleteTarget && (
          <DeleteModal product={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleteLoading} />
        )}
        {editTarget && (
          <EditModal product={editTarget} onSave={handleEditSave} onCancel={() => setEditTarget(null)} />
        )}

        {/* Header */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <div>
                <h1 className="text-xl font-black text-gray-900">Mercado</h1>
                <p className="text-xs text-gray-500">Compre e venda produtos agrícolas.</p>
              </div>
              <div className="flex items-center gap-2">
                {token && !isProducer && (
                  <button onClick={() => navigate('/minhas-reservas')}
                    className="relative w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm flex-shrink-0">
                    <i className="bi bi-cart3 text-lg"></i>
                    {reservationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                        {reservationCount > 9 ? '9+' : reservationCount}
                      </span>
                    )}
                  </button>
                )}
                {token && !isProducer && (
                  <button onClick={() => navigate('/mensagens')}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm flex-shrink-0">
                    <i className="bi bi-chat-dots-fill text-lg"></i>
                  </button>
                )}
                {token && !isProducer && (
                  <button onClick={handlePublishClick} disabled={checkingStatus}
                    className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <i className="bi bi-plus-lg font-bold"></i>
                  </button>
                )}
                {token && isProducer && (
                  <button onClick={() => navigate(getDashboardPath('/mensagens'))}
                    className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <i className="bi bi-chat-dots-fill"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-black text-gray-900">Mercado</h1>
                <p className="text-sm text-gray-500">Encontre os melhores produtos agrícolas.</p>
              </div>
              <div className="flex items-center gap-3">
                {token && !isProducer && (
                  <button onClick={() => navigate('/minhas-reservas')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                    <i className="bi bi-cart3 text-base"></i>
                    <span>As minhas reservas</span>
                    {reservationCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                        {reservationCount > 9 ? '9+' : reservationCount}
                      </span>
                    )}
                  </button>
                )}
                {token && !isProducer && (
                  <button onClick={() => navigate('/mensagens')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                    <i className="bi bi-chat-dots-fill text-base"></i>
                    <span>Mensagens</span>
                  </button>
                )}
                {token && !isProducer && (
                  <button onClick={handlePublishClick} disabled={checkingStatus}
                    className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-70">
                    {checkingStatus ? <><i className="bi bi-arrow-repeat"></i> A verificar...</> : <><i className="bi bi-plus-lg"></i> Anunciar</>}
                  </button>
                )}
                {token && isProducer && (
                  <button onClick={() => navigate(getDashboardPath('/mensagens'))}
                    className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                    <i className="bi bi-chat-dots-fill"></i> Mensagens
                  </button>
                )}
              </div>
            </div>
            {/* Pesquisa */}
            <div className="relative mb-3">
              <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-400"
              />
            </div>
          </div>
          {/* Categorias */}
          <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {CATS.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center gap-1 flex-shrink-0 transition-all ${category === cat.id ? "opacity-100" : "opacity-60 hover:opacity-80"}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  category === cat.id ? "bg-green-600 shadow-lg shadow-green-200" : "bg-gray-100"
                }`}>
                  <i className={`bi ${cat.icon} text-xl ${category === cat.id ? "text-white" : "text-gray-600"}`}></i>
                </div>
                <span className={`text-[11px] font-semibold ${category === cat.id ? "text-green-700" : "text-gray-500"}`}>{cat.label}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 px-4 py-4 max-w-5xl mx-auto w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80 mb-3" />
              <div className="flex items-center gap-1.5">
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-green-500"
                    style={{ animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-8px);opacity:1}}`}</style>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-3">{error}</p>
              <button onClick={() => loadProducts(1)} className="btn-primary text-white px-6 py-2 rounded-xl text-sm">Tentar novamente</button>
            </div>
          ) : (
            <>
              {/* Destaques — produtos com melhor avaliação */}
              {destaques.length > 0 && (
                <section className="mb-6">
                  <h2 className="font-black text-gray-900 text-base mb-3">Destaques para você</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {destaques.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                </section>
              )}

              {/* Novos produtos */}
              {novos.length > 0 && (
                <section className="mb-6">
                  <h2 className="font-black text-gray-900 text-base mb-3">Novos produtos</h2>
                  <div className="space-y-2">
                    {novos.map(p => <ProductCard key={p.id} product={p} size="sm" />)}
                  </div>
                </section>
              )}

              {/* Todos os produtos */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <i className="bi bi-box-seam text-5xl text-gray-200"></i>
                  <p className="text-gray-500 mt-3 font-semibold">Nenhum produto encontrado</p>
                  {token && !isProducer && <button onClick={handlePublishClick} className="mt-4 btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">Anunciar produto</button>}
                </div>
              ) : (
                <section>
                  <h2 className="font-black text-gray-900 text-base mb-3">Todos os produtos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                  {hasMore && (
                    <div className="flex justify-center mt-5">
                      <button onClick={() => loadProducts(page + 1)} disabled={loadingMore}
                        className="px-6 py-2.5 rounded-xl border-2 border-green-200 text-green-700 font-semibold text-sm hover:bg-green-50 disabled:opacity-50">
                        {loadingMore ? 'A carregar...' : 'Carregar mais produtos'}
                      </button>
                    </div>
                  )}
                </section>
              )}

              {/* Card Venda mais rápido — mobile */}
              {token && !isProducer && (
                <div className="mt-6 rounded-2xl p-4 lg:hidden" style={{ background: "#f0f7f0" }}>
                  <p className="font-black text-green-800 text-base mb-1">Venda mais rápido!</p>
                  <p className="text-green-700 text-xs mb-3 leading-relaxed">
                    Publique o seu produto e alcance milhares de agricultores na sua região.
                  </p>
                  <div className="flex justify-center mb-3">
                    <i className="bi bi-box-seam text-green-600 text-5xl"></i>
                  </div>
                  <button onClick={handlePublishClick} className="w-full py-3 rounded-xl bg-green-700 text-white font-bold text-sm">
                    Anunciar agora
                  </button>
                </div>
              )}

              {/* Rodapé de confiança */}
              <div className="mt-8 grid grid-cols-3 gap-3 pb-4">
                {[
                  { icon: "bi-shield-check", title: "Pagamento seguro", desc: "Protegemos as suas transações" },
                  { icon: "bi-patch-check", title: "Produtos verificados", desc: "Mais segurança para você" },
                  { icon: "bi-headset", title: "Suporte dedicado", desc: "Estamos aqui para ajudar" },
                ].map(item => (
                  <div key={item.title} className="flex flex-col items-center text-center gap-1">
                    <i className={`bi ${item.icon} text-green-600 text-xl`}></i>
                    <p className="text-xs font-bold text-gray-700">{item.title}</p>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default Marketplace
