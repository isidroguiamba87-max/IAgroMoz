import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import StarRating from '../components/StarRating'
import ImageViewer from '../components/ImageViewer'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import api from '../services/api'

import { API_BASE } from '../config/api'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [ratingType, setRatingType] = useState('produto') // 'produto' | 'vendedor'
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [ratingLoading, setRatingLoading] = useState(false)
  const [ratingError, setRatingError] = useState('')
  const [ratingSuccess, setRatingSuccess] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [editForm, setEditForm] = useState({ nome: '', descricao: '', preco: '', foto: null })
  const [editPreview, setEditPreview] = useState(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState('')
  const [units, setUnits] = useState([])
  const [selectedUnitId, setSelectedUnitId] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [buyLoading, setBuyLoading] = useState(false)
  const [buyError, setBuyError] = useState('')
  const [buySuccess, setBuySuccess] = useState(false)
  const [reservationId, setReservationId] = useState(null)

  const token = localStorage.getItem('access_token')
  const userId = localStorage.getItem('userId')
  const userRole = localStorage.getItem('userRole')
  const isAdmin = userRole === 'admin'

  useEffect(() => {
    // Carregar produto primeiro para extrair eventuais avaliações embutidas;
    // evita fazer uma chamada separada a /ratings/ que em alguns backends não existe.
    ;(async () => {
      const data = await loadProduct()
      await loadRatings(data)
    })()
  }, [id])

  const loadUnits = (productData) => {
    // A API retorna units dentro do produto: GET /marketplace/products/{id}/
    const unitList = productData?.units || productData?.product_units || []
    const active = unitList.filter(u => u.is_active !== false)
    setUnits(active)
    // Selecionar a primeira unidade ativa por defeito
    if (active.length > 0) setSelectedUnitId(active[0].id)
    else setSelectedUnitId(null)
  }

  const isOwner = (p) => {
    if (!p || !token) return false
    // Admin vê os botões de gestão mas não o botão de reservar
    // Só consideramos dono se o seller.id bater certo com o userId
    if (!userId) return false

    const seller = resolveSeller(p)
    if (seller.id != null && String(seller.id) === String(userId)) return true
    if (p.seller?.id != null && String(p.seller.id) === String(userId)) return true

    // Campos de ID numérico diretos
    const idFields = ['seller_id', 'vendedor_id', 'user_id', 'owner_id']
    if (idFields.some(f => p[f] != null && String(p[f]) === String(userId))) return true

    // IDs guardados localmente quando o utilizador publicou
    try {
      const myIds = JSON.parse(localStorage.getItem('myProductIds') || '[]')
      if (myIds.includes(p.id)) return true
    } catch (_) {}

    return false
  }

  const getSellerId = (p) => {
    if (!p) return null
    const seller = resolveSeller(p)
    return seller.id ?? p.seller?.id ?? p.seller_id ?? p.vendedor_id ?? p.user_id ?? p.owner_id ?? null
  }

  const resolveSeller = (p) => {
    if (!p || !p.seller || typeof p.seller !== 'object') return {}
    return p.seller.user || p.seller.profile || p.seller
  }

  const getSellerDisplayName = (p) => {
    if (!p) return 'Vendedor'
    const seller = resolveSeller(p)
    const sellerText = typeof p.seller === 'string' ? p.seller : null
    const fullName = [seller.first_name, seller.last_name].filter(Boolean).join(' ')
    if (fullName) return fullName
    if (seller.nome_completo) return seller.nome_completo
    if (seller.full_name) return seller.full_name
    if (seller.nome) return seller.nome
    if (seller.display_name) return seller.display_name
    if (seller.store_name) return seller.store_name
    if (seller.name) return seller.name
    if (sellerText) return sellerText
    if (p.vendedor) return p.vendedor
    if (seller.username) return seller.username
    if (seller.email) return seller.email?.split('@')[0]
    return 'Vendedor'
  }

  const getSellerHandle = (p) => {
    if (!p) return null
    const seller = resolveSeller(p)
    const sellerText = typeof p.seller === 'string' ? p.seller : null
    const handleParts = [seller.username,
      seller.store_name,
      seller.nome_completo,
      seller.full_name,
      seller.name,
      sellerText,
      seller.email?.split('@')[0]
    ]
      .filter(Boolean)
      .map(v => String(v).replace(/\s+/g, '').toLowerCase())

    return handleParts.length > 0 ? `@${handleParts[0]}` : null
  }

  const getSellerLocation = (p) => {
    if (!p) return 'Moçambique'
    const seller = resolveSeller(p)
    const sellerDistrict = seller.district?.name || seller.district || seller.distrito || seller.district_name
    const sellerProvince = seller.province?.name || seller.province || seller.province_name
    if (sellerDistrict && sellerProvince) return `${sellerDistrict}, ${sellerProvince}`
    if (sellerDistrict) return sellerDistrict
    if (sellerProvince) return sellerProvince
    if (seller.location_name) return seller.location_name
    if (seller.location) return seller.location
    if (seller.address) return seller.address
    if (seller.store_address) return seller.store_address

    const productDistrict = p.district?.name || p.district || p.distrito || p.district_name
    const productProvince = p.province?.name || p.province || p.province_name
    if (productDistrict && productProvince) return `${productDistrict}, ${productProvince}`
    if (productDistrict) return productDistrict
    if (productProvince) return productProvince
    if (p.location_name) return p.location_name
    if (p.location) return p.location
    if (p.store_address) return p.store_address
    return 'Moçambique'
  }

  // Verifica se pode mostrar botão de gestão (editar/apagar) — admin também pode
  const canManage = (p) => {
    if (!p || !token) return false
    if (isAdmin) return true
    return isOwner(p)
  }

  const loadProduct = async () => {
    let data = null
    try {
      setLoading(true)
      data = await api.getProduct(id)
      setProduct(data)
      loadUnits(data)
      setEditForm({
        nome: data.nome || data.name || '',
        descricao: data.descricao || data.description || '',
        preco: data.preco || data.price || '',
        foto: null
      })
      setEditPreview(data.foto || data.photo || data.image || null)
    } catch (err) {
      console.error('Erro ao carregar produto:', err)
    } finally {
      setLoading(false)
    }
    return data
  }

  const loadRatings = async (productData = null) => {
    try {
      // Se o detalhe do produto já estiver disponível e contiver avaliações embutidas,
      // use-as sem chamar o endpoint /ratings/ (que pode não existir no backend).
      const candidates = productData?.ratings || productData?.avaliacoes || productData?.product_ratings || productData?.reviews || null
      const data = candidates ? candidates : await api.getProductAvaliacoes(id)
      const list = Array.isArray(data) ? data : (data?.results || [])
      // Normalizar campos — API pode retornar diferentes nomes
      const normalized = list.map(r => ({
        id: r.id,
        user_name: r.avaliador_nome || r.avaliador?.nome_completo
          || (r.avaliador?.first_name ? `${r.avaliador.first_name} ${r.avaliador.last_name || ''}`.trim() : null)
          || r.user_name || r.usuario_nome || 'Utilizador',
        rating: r.nota || r.rating || 0,
        comment: r.comentario || r.comment || '',
        created_at: r.criado_em || r.created_at || null,
      }))
      setRatings(normalized)
    } catch (_) {
      setRatings([])
    }
  }

  const handleSubmitRating = async () => {
    if (userRating === 0) { setRatingError('Selecione uma avaliação de 1 a 5 estrelas'); return }
    if (!token) { navigate('/login'); return }
    setRatingLoading(true)
    setRatingError('')
    setRatingSuccess('')
    try {
      if (ratingType === 'produto') {
        await api.rateProduct(id, userRating, userComment)
        // Atualizar produto localmente com nova média (optimistic)
        setProduct(prev => {
          if (!prev) return prev
          const oldTotal = (prev.media_avaliacao || prev.average_rating || 0) * (prev.total_avaliacoes || prev.ratings_count || 0)
          const newCount = (prev.total_avaliacoes || prev.ratings_count || 0) + 1
          const newMedia = ((oldTotal + userRating) / newCount).toFixed(1)
          return {
            ...prev,
            media_avaliacao: parseFloat(newMedia),
            average_rating: parseFloat(newMedia),
            total_avaliacoes: newCount,
            ratings_count: newCount,
            user_avaliou: true,
          }
        })
        setRatingSuccess('Produto avaliado com sucesso! ⭐')
      } else {
        const sellerId = getSellerId(product)
        if (!sellerId) {
          setRatingError('Não foi possível encontrar o vendedor para avaliação.')
          return
        }
        await api.rateVendedor(sellerId, userRating, userComment)
        setRatingSuccess('Vendedor avaliado com sucesso! ⭐')
      }
      setUserRating(0)
      setUserComment('')
      // Recarregar produto para obter dados atualizados da API
      setTimeout(() => {
        loadProduct()
        loadRatings()
        setShowRatingModal(false)
        setRatingSuccess('')
      }, 1500)
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : err?.message || 'Erro ao enviar avaliação.'
      setRatingError(msg)
    } finally {
      setRatingLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await api.deleteProduct(id)
      navigate('/marketplace')
    } catch (err) {
      console.error('Erro ao apagar:', err)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleEditImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setEditForm(p => ({ ...p, foto: file }))
    const reader = new FileReader()
    reader.onloadend = () => setEditPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editForm.nome.trim()) return setEditError('O nome é obrigatório')
    if (!editForm.preco || parseFloat(editForm.preco) <= 0) return setEditError('Preço inválido')
    setEditLoading(true)
    setEditError('')
    try {
      const data = new FormData()
      data.append('nome', editForm.nome.trim())
      data.append('preco', editForm.preco)
      if (editForm.descricao.trim()) data.append('descricao', editForm.descricao.trim())
      if (editForm.foto) data.append('foto', editForm.foto)
      const res = await fetch(`${API_BASE}/marketplace/products/${id}/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      })
      const result = await res.json()
      if (!res.ok) {
        const msg = Object.entries(result).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        throw new Error(msg)
      }
      setProduct(prev => ({ ...prev, ...result }))
      setShowEditModal(false)
    } catch (err) {
      setEditError(err.message || 'Erro ao atualizar.')
    } finally {
      setEditLoading(false)
    }
  }

  const handleBuy = async () => {
    if (!token) { navigate('/login'); return }
    setBuyLoading(true)
    setBuyError('')
    setBuySuccess(false)
    try {
      // Passa unit_id (opcional) e quantity conforme documentação
      const result = await api.buyProduct(id, selectedUnitId || null, quantity)
      setReservationId(result?.id || null)
      setBuySuccess(true)
    } catch (err) {
      // Tratar erro específico de tentar comprar o próprio produto
      const errData = err?.data
      const errMsg = errData
        ? Object.values(errData).flat().join(' | ')
        : err?.message || ''
      if (errMsg.toLowerCase().includes('own') || errMsg.toLowerCase().includes('próprio') || err?.status === 400) {
        setBuyError(errMsg || 'Não é possível reservar o seu próprio produto.')
      } else {
        setBuyError(errMsg || 'Erro ao processar reserva. Tente novamente.')
      }
    } finally {
      setBuyLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-plant mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Produto não encontrado</p>
          <button onClick={() => navigate('/marketplace')} className="btn-primary text-white px-6 py-2 rounded-xl">
            Voltar ao Marketplace
          </button>
        </div>
      </div>
    )
  }

  const productName = product.name || product.nome || 'Produto'
  const sellerId = getSellerId(product)

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
      {/* Modal apagar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-trash text-red-600 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Apagar produto?</h3>
            <p className="text-gray-600 text-sm mb-5">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
                Cancelar
              </button>
              <button onClick={handleDelete} disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm disabled:opacity-50">
                {deleteLoading ? 'A apagar...' : 'Apagar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Editar produto</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
            {editError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{editError}</div>}
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Foto</label>
                {editPreview && <img src={editPreview} alt="preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
                <label className="btn-primary text-white px-4 py-2 rounded-xl cursor-pointer text-sm flex items-center gap-2 w-fit">
                  <i className="bi bi-upload"></i> {editPreview ? 'Trocar foto' : 'Adicionar foto'}
                  <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                </label>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Nome *</label>
                <input type="text" value={editForm.nome}
                  onChange={e => setEditForm(p => ({ ...p, nome: e.target.value }))}
                  className="form-input w-full px-3 py-2.5 rounded-xl text-sm" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Preço (MZN) *</label>
                <input type="number" value={editForm.preco}
                  onChange={e => setEditForm(p => ({ ...p, preco: e.target.value }))}
                  className="form-input w-full px-3 py-2.5 rounded-xl text-sm" step="0.01" min="0.01" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Descrição</label>
                <textarea value={editForm.descricao}
                  onChange={e => setEditForm(p => ({ ...p, descricao: e.target.value }))}
                  className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" rows={3} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
                  Cancelar
                </button>
                <button type="submit" disabled={editLoading}
                  className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50">
                  {editLoading ? 'A guardar...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/marketplace')}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <i className="bi bi-arrow-left text-lg"></i>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black text-gray-900 leading-tight truncate">
              {productName}
            </h1>
          </div>
          {product && canManage(product) && (
            <div className="flex gap-2">
              <button onClick={() => navigate(`/product/${id}/units`)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-50 text-green-600"
                title="Gerir unidades de venda">
                <i className="bi bi-tags text-base"></i>
              </button>
              <button onClick={() => setShowEditModal(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-50 text-blue-600">
                <i className="bi bi-pencil text-base"></i>
              </button>
              <button onClick={() => setShowDeleteModal(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 text-red-500">
                <i className="bi bi-trash text-base"></i>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 max-w-4xl mx-auto w-full pb-6">
        {/* Product Image and Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div>
              {(product.photo || product.image || product.foto) ? (
                <ImageViewer
                  src={product.photo || product.image || product.foto}
                  alt={product.name || product.nome}
                  imgClassName="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                  <i className="bi bi-box-seam text-green-400" style={{fontSize:'5rem'}}></i>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="region-badge mb-3">
                <i className="bi bi-geo-alt-fill text-green-600"></i>
                <span>{product.location_name || product.distrito || 'Moçambique'}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">{productName}</h1>

              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={parseFloat(product.media_avaliacao || product.average_rating || 0)} readonly size="md" />
                <span className="text-sm text-gray-500">
                  {parseFloat(product.media_avaliacao || product.average_rating || 0).toFixed(1)} · ({product.total_avaliacoes || product.ratings_count || 0} avaliações)
                </span>
                {product.user_avaliou && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">✓ Avaliado</span>
                )}
              </div>

              {/* Preço por unidade */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-4xl font-bold text-green-700">
                  {product.price || product.preco} MZN
                </span>
                <span className="text-gray-500 text-sm">/ {product.base_unit || product.unit || 'unidade'}</span>
              </div>

              {/* Seletor de unidades de venda */}
              {units.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Unidade de compra</label>
                  <div className="grid grid-cols-2 gap-2">
                    {units.map(u => (
                      <button key={u.id} type="button"
                        onClick={() => setSelectedUnitId(u.id)}
                        className={`flex flex-col items-start px-3 py-2.5 rounded-xl border-2 text-sm transition-all ${
                          selectedUnitId === u.id
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                        <span className={`font-bold ${selectedUnitId === u.id ? 'text-green-700' : 'text-gray-800'}`}>
                          {u.name || u.unit_type}
                        </span>
                        <span className="text-xs text-gray-500">{parseFloat(u.price || 0).toFixed(2)} MZN</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Seletor de quantidade */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Quantidade</label>
                <div className="flex items-center gap-3">
                  <button type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    −
                  </button>
                  <input type="number" value={quantity} min="1"
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center form-input py-2 rounded-xl font-bold text-lg" />
                  <button type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    +
                  </button>
                  <span className="text-gray-500 text-sm">
                    {units.find(u => u.id === selectedUnitId)?.name || product.base_unit || 'un'}
                  </span>
                </div>
              </div>

              {/* Total estimado */}
              {(() => {
                const selectedUnit = units.find(u => u.id === selectedUnitId)
                const unitPrice = selectedUnit
                  ? parseFloat(selectedUnit.price || 0)
                  : parseFloat(product.price || product.preco || 0)
                const total = (unitPrice * quantity).toFixed(2)
                return (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium">Total estimado</span>
                    <span className="text-green-700 font-black text-xl">{total} MZN</span>
                  </div>
                )
              })()}

              {/* Unidades de venda — removido (não suportado pela API) */}

              {/* Erros de compra */}
              {buyError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{buyError}</div>
              )}

              {/* Sucesso de compra */}
              {buySuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-check-circle-fill text-green-600 text-xl flex-shrink-0 mt-0.5"></i>
                    <div className="flex-1">
                      <p className="font-bold text-green-800 text-sm">Reserva criada com sucesso!</p>
                      <p className="text-green-700 text-xs mt-0.5">O vendedor irá confirmar a disponibilidade. Acompanha o estado nas tuas transações.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/minhas-reservas')}
                    className="mt-3 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-2">
                    <i className="bi bi-bag-check"></i> Ver as minhas compras
                  </button>
                </div>
              )}

              {/* Botões de ação */}
              <div className="space-y-3">
                {token && !buySuccess && (
                  <button onClick={handleBuy} disabled={buyLoading}
                    className="w-full btn-primary text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50">
                    {buyLoading
                      ? <><i className="bi bi-arrow-repeat animate-spin"></i> A processar...</>
                      : <><i className="bi bi-cart3"></i> Reservar produto</>
                    }
                  </button>
                )}
                {!token && (
                  <button onClick={() => navigate('/login')}
                    className="w-full btn-primary text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                    <i className="bi bi-cart3"></i> Entrar para reservar
                  </button>
                )}
                <a href={`https://wa.me/?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name || product.nome}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 rounded-xl font-semibold text-base text-center">
                  <i className="bi bi-whatsapp mr-1"></i> Contatar Vendedor
                </a>
                <button onClick={() => { setRatingType('produto'); setShowRatingModal(true) }}
                  className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-800 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <i className="bi bi-star"></i> Avaliar Produto
                </button>
                {getSellerId(product) && token && (
                  <button onClick={() => { setRatingType('vendedor'); setShowRatingModal(true) }}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <i className="bi bi-person-check"></i> Avaliar Vendedor
                  </button>
                )}
              </div>

              {/* Stock Info */}
              {(product.stock_quantity != null || product.stock != null) && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm text-gray-600 flex items-center gap-2">
                  <i className="bi bi-box-seam text-green-600"></i>
                  <span>Stock disponível: <span className="font-bold text-gray-800">{product.stock_quantity ?? product.stock} {product.base_unit || product.unit || 'un'}</span></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seller Info */}
        {(product.seller || product.vendedor) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4"><i className="bi bi-person-circle text-gray-600 mr-2"></i>Vendedor</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-bold text-lg text-gray-800">
                  {getSellerDisplayName(product)}
                </p>
                {getSellerHandle(product) && (
                  <p className="text-gray-600">{getSellerHandle(product)}</p>
                )}
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <i className="bi bi-geo-alt text-green-600"></i>
                  <span>{getSellerLocation(product)}</span>
                </p>
              </div>
              <div className="text-right">
                <StarRating rating={resolveSeller(product).seller_rating || parseFloat(product.media_avaliacao || product.average_rating || 0) || 0} readonly size="md" />
                <p className="text-xs text-gray-500 mt-1">
                  {resolveSeller(product).seller_ratings_count || product.total_avaliacoes || product.ratings_count || 0} avaliações
                </p>
              </div>
            </div>
            {resolveSeller(product).store_name && (
              <div className="mt-4 text-sm text-gray-600">
                <span className="font-semibold">Loja:</span> {resolveSeller(product).store_name}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4"><i className="bi bi-file-text text-gray-600 mr-2"></i>Descrição</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description || product.descricao || 'Sem descrição.'}
          </p>
        </div>

        {/* Category */}
        {(product.category_display || product.categoria) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4"><i className="bi bi-tag text-gray-600 mr-2"></i>Categoria</h2>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold capitalize">
              {product.category_display || product.categoria}
            </span>
          </div>
        )}

        {/* Ratings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4"><i className="bi bi-star text-yellow-500 mr-2"></i>Avaliações do produto</h2>
          {ratings.length === 0 ? (
            <div className="text-center py-8">
              <i className="bi bi-star text-4xl text-gray-200"></i>
              <p className="text-gray-500 text-sm mt-2">Ainda sem avaliações. Sê o primeiro!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ratings.map(r => (
                <div key={r.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-9 h-9 rounded-full avatar-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(r.user_name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800 text-sm">{r.user_name}</p>
                      {r.created_at && (
                        <span className="text-xs text-gray-400">
                          {new Date(r.created_at).toLocaleDateString('pt-PT')}
                        </span>
                      )}
                    </div>
                    <StarRating rating={r.rating} readonly size="sm" />
                    {r.comment && (
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{r.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal sucesso de compra */}
      {buySuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-bag-check-fill text-green-600 text-3xl"></i>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Reserva criada!</h3>
            <p className="text-gray-500 text-sm mb-2">
              A tua reserva foi criada com sucesso. O vendedor irá confirmar a disponibilidade.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Após confirmação do vendedor, poderás efetuar o pagamento nas tuas transações.
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setBuySuccess(false); setBuyError('') }}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold text-sm">
                Continuar
              </button>
              <button onClick={() => navigate('/minhas-reservas')}  
                className="flex-1 py-3 rounded-2xl bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-1.5">
                <i className="bi bi-bag"></i> Ver transações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {ratingType === 'produto'
                  ? <><i className="bi bi-star text-yellow-500 mr-1"></i>Avaliar Produto</>
                  : <><i className="bi bi-person-check text-blue-600 mr-1"></i>Avaliar Vendedor</>}
              </h3>
              <button onClick={() => { setShowRatingModal(false); setRatingError(''); setRatingSuccess(''); setUserRating(0); setUserComment('') }}
                className="text-gray-400 hover:text-gray-600">
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>

            {/* Tabs produto/vendedor */}
            {(product.vendedor || product.seller) && token && (
              <div className="flex gap-2 mb-4 bg-gray-100 rounded-xl p-1">
                <button onClick={() => { setRatingType('produto'); setRatingError(''); setRatingSuccess('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${ratingType === 'produto' ? 'bg-white shadow text-yellow-700' : 'text-gray-500'}`}>
                  <i className="bi bi-star mr-1"></i>Produto
                </button>
                <button onClick={() => { setRatingType('vendedor'); setRatingError(''); setRatingSuccess('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${ratingType === 'vendedor' ? 'bg-white shadow text-blue-700' : 'text-gray-500'}`}>
                  <i className="bi bi-person-check mr-1"></i>Vendedor
                </button>
              </div>
            )}

            {ratingError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{ratingError}</div>
            )}
            {ratingSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl mb-3 text-sm font-semibold text-center">{ratingSuccess}</div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">A tua avaliação</label>
              <div className="flex justify-center">
                <StarRating rating={userRating} onRate={setUserRating} size="lg" />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Comentário (opcional)</label>
              <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)}
                className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" rows="3"
                placeholder={ratingType === 'produto' ? 'Conta a tua experiência com este produto...' : 'Conta a tua experiência com este vendedor...'} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowRatingModal(false); setRatingError(''); setRatingSuccess(''); setUserRating(0); setUserComment('') }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm">
                Cancelar
              </button>
              <button onClick={handleSubmitRating} disabled={ratingLoading || userRating === 0}
                className="flex-1 btn-primary text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50">
                {ratingLoading ? 'A enviar...' : 'Enviar avaliação'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      <MobileNav />
    </div>
  )
}

export default ProductDetail
