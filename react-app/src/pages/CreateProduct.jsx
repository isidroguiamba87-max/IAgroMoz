import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import DesktopSidebar from "../components/DesktopSidebar"
import MobileNav from "../components/MobileNav"
import { API_BASE } from "../config/api"
import { getUserCache } from "../utils/userCache"
import { getDashboardPath } from "../utils/dashboardPaths"

const DEFAULT_CATEGORIES = [
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

const MAX_PHOTOS = 5
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_PHOTO_SIZE = 5 * 1024 * 1024

// Unidades base conforme GET /api/marketplace/products/base_units/
const BASE_UNITS = [
  { value: "UNIT",  label: "Unidade",     icon: "bi-box" },
  { value: "KG",    label: "Quilograma",  icon: "bi-speedometer" },
  { value: "TON",   label: "Tonelada",    icon: "bi-truck" },
  { value: "LITER", label: "Litro",       icon: "bi-droplet" },
]

// embedded=true: usado dentro do Painel (SellerDashboardLayout) — sem sidebar/header
// próprios, e ao terminar volta para "Meus Anúncios" em vez de sair para o Mercado.
function CreateProduct({ embedded = false }) {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole") || "user"
  const exitPath = embedded ? getDashboardPath("/anuncios") : "/marketplace"

  // Bloqueio: apenas produtores/vendedores podem publicar produtos
  if (userRole === "user") {
    const restricted = (
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <i className="bi bi-ban text-3xl text-red-600"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
        <p className="text-gray-600 mb-6">Apenas produtores e vendedores podem publicar no Mercado. Solicite o upgrade para aceder a esta funcionalidade.</p>
        <div className="flex gap-3">
          <button onClick={() => navigate(exitPath)} className="flex-1 py-2 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
            Voltar
          </button>
          <button onClick={() => navigate('/profile')} className="flex-1 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700">
            Ver Upgrade
          </button>
        </div>
      </div>
    )
    if (embedded) return <div className="flex items-center justify-center py-16 px-4">{restricted}</div>
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8] px-4">{restricted}</div>
  }

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [baseUnits, setBaseUnits] = useState(BASE_UNITS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imagePreviews, setImagePreviews] = useState([])

  // Pré-preenche campos com dados do registo do utilizador
  const _cache = getUserCache()

  // Campos conforme POST /api/marketplace/products/
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    photos: [],                   // até 5 fotos — a primeira é a capa (campo "photo")
    category: "",
    subcategory: "",
    subcategory_description: "",  // obrigatório se subcategory = "OTHER"
    district: _cache.districtId || "",
    provinceId: _cache.provinceId || "",
    stock_quantity: "",           // quantidade em stock (unidade base)
    base_unit: "UNIT",            // UNIT | KG | TON | LITER
  })

  const selectedCat = categories.find(c => c.value === form.category)
  const needsSubcatDesc = form.subcategory === "OTHER"

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) { navigate("/login"); return }
    api.checkPublishPermission().then(({ allowed }) => {
      if (!allowed) navigate("/marketplace?anunciar=1", { replace: true })
      else loadProvinces()
    }).catch(() => {
      const role = localStorage.getItem("userRole") || ""
      if (!["seller", "producer", "admin"].includes(role)) navigate("/marketplace?anunciar=1", { replace: true })
      else loadProvinces()
    })

    const loadEnums = async () => {
      try {
        const data = await api.getEnums()
        if (data?.product_categories && Array.isArray(data.product_categories) && data.product_categories.length > 0) {
          setCategories(data.product_categories.map(cat => ({
            value: cat.value || cat.key || cat.id,
            label: cat.label || cat.name || cat.title || cat.value,
            icon: cat.icon || 'bi-tags',
            subcategories: Array.isArray(cat.subcategories)
              ? cat.subcategories.map(sub => ({
                  value: sub.value || sub.key || sub.id,
                  label: sub.label || sub.name || sub.title || sub.value,
                }))
              : [],
          })))
        }
      } catch (err) {
        console.debug('CreateProduct: failed to load enums', err)
      }
    }

    const loadBaseUnits = async () => {
      try {
        const data = await api.getBaseUnits()
        if (Array.isArray(data) && data.length > 0) {
          setBaseUnits(data.map(unit => ({
            value: unit.value || unit.key || unit.id,
            label: unit.label || unit.name || unit.title || unit.value,
            icon: unit.icon || 'bi-box',
          })))
        }
      } catch (err) {
        console.debug('CreateProduct: failed to load base units', err)
      }
    }

    loadEnums()
    loadBaseUnits()
  }, [])

  const loadProvinces = async () => {
    try {
      const res = await fetch(`${API_BASE}/provinces/`)
      const data = await res.json()
      setProvinces(Array.isArray(data) ? data : (data.results || []))
    } catch (_) {}
  }

  const loadDistricts = async (provinceId) => {
    setDistricts([])
    try {
      const res = await fetch(`${API_BASE}/districts/?id=${provinceId}`)
      const data = await res.json()
      setDistricts(Array.isArray(data) ? data : (data.results || []))
    } catch (_) {}
  }

  const handleProvinceChange = (provinceId) => {
    setForm(p => ({ ...p, provinceId, district: "" }))
    if (provinceId) loadDistricts(provinceId)
    else setDistricts([])
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    const room = MAX_PHOTOS - form.photos.length
    const accepted = []
    let rejected = false
    for (const file of files) {
      if (accepted.length >= room) { rejected = true; break }
      if (!ALLOWED_PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_SIZE) { rejected = true; continue }
      accepted.push(file)
    }
    if (rejected) setError(`Só são aceites até ${MAX_PHOTOS} fotos (jpeg/png/webp, máx. 5MB cada).`)
    if (!accepted.length) return
    setForm(p => ({ ...p, photos: [...p.photos, ...accepted] }))
    accepted.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreviews(prev => [...prev, reader.result])
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setForm(p => ({ ...p, photos: p.photos.filter((_, i) => i !== index) }))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const saveMyProductId = (id) => {
    try {
      const existing = JSON.parse(localStorage.getItem("myProductIds") || "[]")
      if (!existing.includes(id)) { existing.push(id); localStorage.setItem("myProductIds", JSON.stringify(existing)) }
    } catch (_) {}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const permission = await api.checkPublishPermission().catch(() => ({ allowed: false }))
    if (!permission.allowed) {
      setError('Você não tem permissão para publicar produtos. Aguarde aprovação de administrador ou atualize seu perfil.')
      return
    }
    if (!form.name.trim()) return setError("O nome do produto é obrigatório.")
    if (!form.price || parseFloat(form.price) <= 0) return setError("O preço deve ser maior que zero.")
    if (!form.photos.length) return setError("A foto do produto é obrigatória.")
    if (!form.category) return setError("Selecione uma categoria.")
    if (!form.subcategory) return setError("Selecione uma subcategoria.")
    if (needsSubcatDesc && !form.subcategory_description.trim()) return setError("Descreva a subcategoria 'Outro'.")
    if (!form.stock_quantity || parseInt(form.stock_quantity) < 0) return setError("Indique a quantidade em stock.")
    setLoading(true)
    try {
      const productData = new FormData()
      productData.append("name", form.name.trim())
      productData.append("price", form.price)
      productData.append("photo", form.photos[0])
      if (form.description.trim()) productData.append("description", form.description.trim())
      productData.append("category", form.category)
      productData.append("subcategory", form.subcategory)
      if (needsSubcatDesc) productData.append("subcategory_description", form.subcategory_description.trim())
      if (form.district) productData.append("district", form.district)
      productData.append("stock_quantity", form.stock_quantity)
      productData.append("base_unit", form.base_unit)
      const result = await api.createProduct(productData)
      if (result?.id) saveMyProductId(result.id)
      if (result?.id) {
        // Alguns produtos ficavam sem foto de capa mesmo enviando "photo" na
        // criação — reenvia a capa pela galeria (add_photo, já confirmado a
        // funcionar) sempre que a resposta da criação não trouxer a foto de volta.
        const needsCoverBackfill = !result.photo && !result.foto
        const toUpload = needsCoverBackfill ? form.photos : form.photos.slice(1)
        if (toUpload.length) {
          await Promise.allSettled(toUpload.map(file => api.addProductPhoto(result.id, file)))
        }
      }
      navigate(exitPath)
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join(" | ")
        : err?.message || "Erro ao publicar produto."
      setError(msg)
    } finally { setLoading(false) }
  }

  const formContent = (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-start gap-2">
          <i className="bi bi-exclamation-circle-fill mt-0.5 flex-shrink-0"></i>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

            {/* ── Foto ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <label className="block text-gray-700 font-bold mb-1 text-sm">Fotos do produto *</label>
              <p className="text-xs text-gray-400 mb-3">Até {MAX_PHOTOS} fotos. A primeira é usada como capa.</p>
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img src={src} alt={`Foto ${i + 1}`} className="w-full h-24 object-cover rounded-xl" />
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Capa</span>
                      )}
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow">
                        <i className="bi bi-x-lg text-[10px]"></i>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-36 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-gray-50 mb-3">
                  <i className="bi bi-camera text-4xl text-gray-300 mb-1"></i>
                  <p className="text-gray-400 text-xs">Toque para adicionar fotos</p>
                </div>
              )}
              {imagePreviews.length < MAX_PHOTOS && (
                <label className="btn-primary text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm flex items-center gap-2 w-fit">
                  <i className="bi bi-upload"></i>
                  {imagePreviews.length ? "Adicionar mais fotos" : "Adicionar fotos"}
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>

            {/* ── Informações básicas ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
              <h2 className="font-bold text-gray-800 text-sm">Informações do produto</h2>

              {/* Nome */}
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">Nome *</label>
                <input type="text" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="Ex: Tomates frescos, Sementes de milho..." required />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">Descrição</label>
                <textarea value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" rows={3}
                  placeholder="Descreva o produto: qualidade, origem, características..." />
              </div>
            </div>

            {/* ── Categoria ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
              <h2 className="font-bold text-gray-800 text-sm">Categoria *</h2>

              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <button key={cat.value} type="button"
                    onClick={() => setForm(p => ({ ...p, category: cat.value, subcategory: "", subcategory_description: "" }))}
                    className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                      form.category === cat.value
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}>
                    <i className={`bi ${cat.icon}`}></i> {cat.label}
                  </button>
                ))}
              </div>

              {/* Subcategoria */}
              {selectedCat && (
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">Subcategoria *</label>
                  <select value={form.subcategory}
                    onChange={e => setForm(p => ({ ...p, subcategory: e.target.value, subcategory_description: "" }))}
                    className="w-full px-4 py-3 rounded-xl text-sm border-2 border-gray-200 bg-white text-gray-900" required>
                    <option value="">Selecione uma subcategoria</option>
                    {selectedCat.subcategories.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Descrição da subcategoria "Outro" */}
              {needsSubcatDesc && (
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">Descreva a subcategoria *</label>
                  <input type="text" value={form.subcategory_description}
                    onChange={e => setForm(p => ({ ...p, subcategory_description: e.target.value }))}
                    className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    placeholder="Ex: Cogumelos, Ervas aromáticas..." required />
                </div>
              )}
            </div>

            {/* ── Preço e Stock ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
              <h2 className="font-bold text-gray-800 text-sm">Preço e stock</h2>

              {/* Unidade base */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Unidade base *</label>
                <div className="grid grid-cols-2 gap-2">
                  {baseUnits.map(u => (
                    <button key={u.value} type="button"
                      onClick={() => setForm(p => ({ ...p, base_unit: u.value }))}
                      className={`py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center gap-2 ${
                        form.base_unit === u.value
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                      <i className={`bi ${u.icon}`}></i> {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preço por unidade base */}
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                  Preço por {baseUnits.find(u => u.value === form.base_unit)?.label.toLowerCase() || 'unidade'} (MZN) *
                </label>
                <input type="number" value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="0.00" step="0.01" min="0.01" required />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                  Stock disponível ({baseUnits.find(u => u.value === form.base_unit)?.label.toLowerCase() || 'unidades'}) *
                </label>
                <input type="number" value={form.stock_quantity}
                  onChange={e => setForm(p => ({ ...p, stock_quantity: e.target.value }))}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="Ex: 500" min="0" step="1" required />
              </div>
            </div>

            {/* ── Localização ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
              <h2 className="font-bold text-gray-800 text-sm">Localização</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">Província</label>
                  <select value={form.provinceId} onChange={e => handleProvinceChange(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl text-sm border-2 border-gray-200 bg-white text-gray-900">
                    <option value="">Selecione</option>
                    {provinces.map(p => <option key={p.id} value={p.id}>{p.name || p.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-sm">Distrito</label>
                  <select value={form.district}
                    onChange={e => setForm(p => ({ ...p, district: e.target.value }))}
                    className="w-full px-3 py-3 rounded-xl text-sm border-2 border-gray-200 bg-white text-gray-900"
                    disabled={!form.provinceId}>
                    <option value="">{!form.provinceId ? "Selecione a província" : "Selecione"}</option>
                    {districts.map(d => <option key={d.id} value={d.id}>{d.name || d.nome}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Botões ── */}
            <div className="flex gap-3 pb-4">
              <button type="button" onClick={() => navigate(exitPath)}
                className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-3.5 rounded-xl btn-primary text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                {loading
                  ? <><i className="bi bi-arrow-repeat animate-spin"></i> A publicar...</>
                  : <><i className="bi bi-box-seam"></i> Publicar produto</>
                }
              </button>
            </div>
          </form>
    </>
  )

  if (embedded) {
    return (
      <div className="max-w-2xl w-full">
        {formContent}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3 max-w-2xl mx-auto w-full">
            <button onClick={() => navigate("/marketplace")}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
              <i className="bi bi-arrow-left text-lg"></i>
            </button>
            <div>
              <h1 className="text-lg font-black text-gray-900">Anunciar Produto</h1>
              <p className="text-xs text-gray-400">Preencha os detalhes do produto</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full">
          {formContent}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}

export default CreateProduct
