import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import ImageEditor from '../components/ImageEditor'

const MAX_POST_PHOTOS = 5
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_PHOTO_SIZE = 5 * 1024 * 1024

const DEFAULT_POST_CATEGORIES = [
  { value: 'AGRICULTURE', label: 'Agricultura', icon: 'bi-flower1', color: 'border-green-400 bg-green-50 text-green-700' },
  { value: 'LIVESTOCK',   label: 'Pecuária',    icon: 'bi-heart-fill', color: 'border-orange-400 bg-orange-50 text-orange-700' },
]

function CreatePost() {
  const navigate = useNavigate()
  const location = useLocation()
  const editPost = location.state?.post || null
  const isEditing = !!editPost
  const userRole = localStorage.getItem('userRole') || 'user'

  // Bloqueio: apenas produtores podem publicar no feed
  if (userRole === 'user') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8] px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-ban text-3xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Apenas produtores podem publicar no Feed. Solicite o upgrade para produtor para aceder a esta funcionalidade.</p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/feed')} className="flex-1 py-2 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
              Voltar
            </button>
            <button onClick={() => navigate('/profile')} className="flex-1 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700">
              Ver Upgrade
            </button>
          </div>
        </div>
      </div>
    )
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState(editPost?.image || null)
  const [showEditor, setShowEditor] = useState(false)
  const [postCategories, setPostCategories] = useState(DEFAULT_POST_CATEGORIES)
  const [extraPhotos, setExtraPhotos] = useState([])
  const [extraPreviews, setExtraPreviews] = useState([])
  const [linkableProducts, setLinkableProducts] = useState([])
  const [linkedProductId, setLinkedProductId] = useState('')

  useEffect(() => {
    if (userRole !== 'producer') return
    api.getMyLinkableProducts().then(data => {
      const list = Array.isArray(data) ? data : (data.results || [])
      setLinkableProducts(list)
    }).catch(() => {})
  }, [])

  const [formData, setFormData] = useState({
    title:        editPost?.title       || editPost?.titulo       || '',
    content:      editPost?.body        || editPost?.conteudo     || '',
    image:        null,
    category:     editPost?.category    || '',
    // Localização vem pré-preenchida com a que o utilizador indicou no registo;
    // fica editável para o caso de o post ser sobre outro local.
    distrito:     editPost?.distrito    || localStorage.getItem('userDistrictName') || '',
    tipo_cultura: editPost?.tipo_cultura || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  // Aceita seleção múltipla logo na primeira foto: a 1ª vai para a capa (com
  // recorte via ImageEditor, como já era), as restantes entram directamente
  // como "mais fotos" — antes era preciso adicionar a capa primeiro para a
  // secção de fotos extra sequer aparecer, o que não era óbvio.
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    const [file, ...rest] = files
    setFormData(p => ({ ...p, image: file }))
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setShowEditor(true)
    }
    reader.readAsDataURL(file)
    if (rest.length) addExtraPhotos(rest)
  }

  useEffect(() => {
    const loadEnums = async () => {
      try {
        const data = await api.getEnums()
        if (data?.post_categories && Array.isArray(data.post_categories) && data.post_categories.length > 0) {
          setPostCategories(data.post_categories.map(cat => ({
            value: cat.value || cat.key || cat.id,
            label: cat.label || cat.name || cat.title || cat.value,
            icon: cat.icon || 'bi-tags',
            color: cat.color || 'border-gray-200 bg-white text-gray-700',
          })))
        }
      } catch (err) {
        console.debug('CreatePost: failed to load enums', err)
      }
    }
    loadEnums()
  }, [])

  const addExtraPhotos = (files) => {
    setExtraPhotos(prevExtra => {
      const room = MAX_POST_PHOTOS - 1 - prevExtra.length
      const accepted = []
      let rejected = false
      for (const file of files) {
        if (accepted.length >= room) { rejected = true; break }
        if (!ALLOWED_PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_SIZE) { rejected = true; continue }
        accepted.push(file)
      }
      if (rejected) setError(`Só são aceites até ${MAX_POST_PHOTOS} fotos no total (jpeg/png/webp, máx. 5MB cada).`)
      if (!accepted.length) return prevExtra
      accepted.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => setExtraPreviews(prev => [...prev, reader.result])
        reader.readAsDataURL(file)
      })
      return [...prevExtra, ...accepted]
    })
  }

  const handleExtraPhotosChange = (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    addExtraPhotos(files)
  }

  const removeExtraPhoto = (index) => {
    setExtraPhotos(prev => prev.filter((_, i) => i !== index))
    setExtraPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleEditorSave = (editedFile, previewUrl) => {
    setFormData(p => ({ ...p, image: editedFile }))
    setImagePreview(previewUrl)
    setShowEditor(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!formData.title.trim()) { setError('O título é obrigatório.'); return }
    if (!formData.content.trim()) { setError('O conteúdo é obrigatório.'); return }
    setLoading(true)
    try {
      // POST /api/feed/posts/  — multipart/form-data
      // Campos: title (obrigatório), content, image, category, distrito, tipo_cultura
      const postData = new FormData()
      postData.append('title', formData.title.trim())
      postData.append('content', formData.content.trim())
      if (formData.image) postData.append('image', formData.image)
      if (formData.category) postData.append('category', formData.category)
      if (formData.distrito.trim()) postData.append('distrito', formData.distrito.trim())
      if (formData.tipo_cultura.trim()) postData.append('tipo_cultura', formData.tipo_cultura.trim())

      let postId = editPost?.id
      if (isEditing) {
        // PATCH /api/feed/posts/{id}/  (autor, dentro de 10 min)
        await api.updateFeedPost(editPost.id, postData)
      } else {
        const created = await api.createFeedPost(postData)
        postId = created?.id
      }
      let photoUploadFailed = false
      if (postId && extraPhotos.length > 0) {
        const results = await Promise.allSettled(extraPhotos.map(file => api.addPostPhoto(postId, file)))
        const failed = results.filter(r => r.status === 'rejected')
        if (failed.length) {
          photoUploadFailed = true
          console.error('Falha ao enviar fotos extra do post:', failed.map(f => f.reason))
          setError(`Publicação criada, mas ${failed.length} de ${extraPhotos.length} foto(s) extra não foram enviadas. Pode adicioná-las depois a editar o post.`)
        }
      }
      if (postId && linkedProductId) {
        await api.linkProductToPost(postId, linkedProductId, 'Ver produto no marketplace').catch(() => {})
      }
      if (photoUploadFailed) {
        setLoading(false)
        return
      }
      navigate('/feed')
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : err?.message || 'Erro ao publicar.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/feed')}
            className="flex items-center gap-1.5 text-gray-600 hover:text-green-700 font-medium text-sm">
            <i className="bi bi-arrow-left"></i> Voltar
          </button>
          <Logo size="sm" showText={false} />
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Título da página */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center shadow-lg shadow-green-200">
            <i className="bi bi-pencil-square text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">
              {isEditing ? 'Editar publicação' : 'Nova publicação'}
            </h1>
            <p className="text-xs text-gray-400">
              {isEditing ? 'Atualize a sua publicação' : 'Partilhe com a comunidade agrícola'}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-4 text-sm flex items-start gap-2">
            <i className="bi bi-exclamation-circle-fill flex-shrink-0 mt-0.5"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Editor de imagem */}
        {showEditor && imagePreview && (
          <ImageEditor
            src={imagePreview}
            onSave={handleEditorSave}
            onCancel={() => setShowEditor(false)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ── Foto ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="bi bi-image text-green-600"></i> Foto (opcional)
            </p>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-52 object-cover" />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button type="button" onClick={() => setShowEditor(true)}
                    className="w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-green-600/80 text-sm">
                    <i className="bi bi-magic"></i>
                  </button>
                  <button type="button"
                    onClick={() => { setImagePreview(null); setFormData(p => ({ ...p, image: null })) }}
                    className="w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 text-sm">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <label className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-white shadow">
                  <i className="bi bi-arrow-repeat mr-1"></i>Trocar
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group">
                <i className="bi bi-cloud-upload text-3xl text-gray-300 group-hover:text-green-500 mb-2 transition-colors"></i>
                <p className="text-sm font-semibold text-gray-400 group-hover:text-green-600 transition-colors">Clique para adicionar fotos</p>
                <p className="text-xs text-gray-300 mt-0.5">Até {MAX_POST_PHOTOS} fotos — JPG, PNG, WEBP</p>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* ── Mais fotos (opcional) ── */}
          {(extraPreviews.length > 0 || (imagePreview && extraPhotos.length < MAX_POST_PHOTOS - 1)) && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <i className="bi bi-images text-green-600"></i> Mais fotos (opcional, até {MAX_POST_PHOTOS} no total)
              </p>
              {extraPreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {extraPreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img src={src} alt={`Foto extra ${i + 1}`} className="w-full h-20 object-cover rounded-xl" />
                      <button type="button" onClick={() => removeExtraPhoto(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow">
                        <i className="bi bi-x-lg text-[9px]"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {extraPhotos.length < MAX_POST_PHOTOS - 1 && (
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 cursor-pointer hover:text-green-800">
                  <i className="bi bi-plus-circle"></i> Adicionar mais fotos
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleExtraPhotosChange} className="hidden" />
                </label>
              )}
            </div>
          )}

          {/* ── Categoria ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="bi bi-tags text-green-600"></i> Categoria *
            </p>
            <div className="grid grid-cols-2 gap-3">
              {postCategories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, category: cat.value }))}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.category === cat.value
                      ? cat.color
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <i className={`bi ${cat.icon}`}></i>
                  {cat.label}
                </button>
              ))}
            </div>
            {!formData.category && (
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <i className="bi bi-info-circle"></i> Selecione uma categoria para o seu post
              </p>
            )}
          </div>

          {/* ── Localização e Cultura ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <i className="bi bi-geo-alt text-red-500"></i> Localização
                </label>
                <input
                  type="text"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="Ex: Manica"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <i className="bi bi-flower1 text-amber-600"></i> Cultura
                </label>
                <input
                  type="text"
                  name="tipo_cultura"
                  value={formData.tipo_cultura}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="Ex: Milho"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <i className="bi bi-info-circle"></i> A localização vem preenchida com a que indicou no registo — pode alterar se este post for sobre outro local.
            </p>
          </div>

          {/* ── Vincular produto do marketplace (opcional, produtores) ── */}
          {userRole === 'producer' && linkableProducts.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <i className="bi bi-cart3 text-green-600"></i> Vincular ao meu produto (opcional)
              </label>
              <select value={linkedProductId} onChange={e => setLinkedProductId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm border-2 border-gray-200 bg-white text-gray-900">
                <option value="">Nenhum</option>
                {linkableProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name || p.nome}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <i className="bi bi-info-circle"></i> Mostra um botão "Ver no Mercado" na publicação.
              </p>
            </div>
          )}

          {/* ── Título ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <i className="bi bi-type-h1 text-green-600"></i> Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input w-full px-4 py-3 rounded-xl text-sm"
              placeholder="Ex: Colheita de tomates orgânicos..."
              required
            />
          </div>

          {/* ── Conteúdo ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <i className="bi bi-text-paragraph text-green-600"></i> Conteúdo *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              rows={6}
              placeholder="Partilhe a sua experiência, dicas, perguntas ou conquistas..."
              required
            />
            <p className="text-xs text-gray-400 mt-1.5 text-right">
              {formData.content.length} caracteres
            </p>
          </div>

          {/* ── Botões ── */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => navigate('/feed')}
              className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 btn-primary text-white py-3 rounded-2xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
              {loading
                ? <><i className="bi bi-arrow-repeat animate-spin"></i> A publicar...</>
                : isEditing
                  ? <><i className="bi bi-check-lg"></i> Guardar alterações</>
                  : <><i className="bi bi-send-fill"></i> Publicar</>
              }
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreatePost
