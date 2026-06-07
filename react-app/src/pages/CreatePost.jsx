import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import ImageEditor from '../components/ImageEditor'

const DEFAULT_POST_CATEGORIES = [
  { value: 'AGRICULTURE', label: 'Agricultura', icon: 'bi-flower1', color: 'border-green-400 bg-green-50 text-green-700' },
  { value: 'LIVESTOCK',   label: 'Pecuária',    icon: 'bi-heart-fill', color: 'border-orange-400 bg-orange-50 text-orange-700' },
]

function CreatePost() {
  const navigate = useNavigate()
  const location = useLocation()
  const editPost = location.state?.post || null
  const isEditing = !!editPost

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState(editPost?.image || null)
  const [showEditor, setShowEditor] = useState(false)
  const [postCategories, setPostCategories] = useState(DEFAULT_POST_CATEGORIES)

  const [formData, setFormData] = useState({
    title:    editPost?.title    || editPost?.titulo    || '',
    content:  editPost?.body     || editPost?.conteudo  || '',
    image:    null,
    category: editPost?.category || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFormData(p => ({ ...p, image: file }))
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setShowEditor(true)
    }
    reader.readAsDataURL(file)
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
      // Campos: title (obrigatório), content, image, category
      const postData = new FormData()
      postData.append('title', formData.title.trim())
      postData.append('content', formData.content.trim())
      if (formData.image) postData.append('image', formData.image)
      if (formData.category) postData.append('category', formData.category)

      if (isEditing) {
        // PATCH /api/feed/posts/{id}/  (autor, dentro de 10 min)
        await api.updateFeedPost(editPost.id, postData)
      } else {
        await api.createFeedPost(postData)
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
                <p className="text-sm font-semibold text-gray-400 group-hover:text-green-600 transition-colors">Clique para adicionar foto</p>
                <p className="text-xs text-gray-300 mt-0.5">JPG, PNG, WEBP</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

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
