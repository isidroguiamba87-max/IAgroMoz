import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileNav from '../components/MobileNav'
import DesktopSidebar from '../components/DesktopSidebar'
import LoadingPlant from '../components/LoadingPlant'
import api from '../services/api'
import { API_MEDIA } from '../config/api'

// Formulário de pedido de autorização (igual ao do Marketplace)
function SellerRequestForm({ onClose, existingRequest }) {
  const [contacto, setContacto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (existingRequest && existingRequest.status === 'PENDENTE') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <i className="bi bi-hourglass-split text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Solicitação Pendente</h3>
          <p className="text-gray-600 text-sm mb-5">
            Já enviaste uma solicitação. Aguarda a aprovação do administrador antes de submeter novamente.
          </p>
          <button onClick={onClose} className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">
            Fechar
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.requestUpgradeToProducer(contacto, mensagem)
      setSuccess(true)
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : 'Erro ao enviar solicitação.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <i className="bi bi-check-circle text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Solicitação Enviada</h3>
          <p className="text-gray-600 text-sm mb-5">A tua solicitação foi enviada ao administrador. Aguarda a aprovação.</p>
          <button onClick={onClose} className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">
            Fechar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Solicitar Autorização</h3>
            <p className="text-xs text-gray-500">Para publicar técnicas agrícolas</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 mb-4 flex items-start gap-2">
          <i className="bi bi-info-circle text-yellow-600 mt-0.5"></i>
          <p className="text-yellow-700 text-xs">Apenas agricultores e vendedores autorizados pelo admin podem publicar técnicas.</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Contacto (telefone) *</label>
            <input type="text" value={contacto} onChange={e => setContacto(e.target.value)}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm" placeholder="+258 84 XXX XXXX" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Mensagem *</label>
            <textarea value={mensagem} onChange={e => setMensagem(e.target.value)}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" rows={3}
              placeholder="Descreve a tua experiência agrícola..." required />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50">
              {loading ? 'A enviar...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CreateTechniqueModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ titulo: '', descricao: '' })
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFoto = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFoto(f)
    const r = new FileReader()
    r.onloadend = () => setFotoPreview(r.result)
    r.readAsDataURL(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) return setError('O título é obrigatório')
    if (!form.descricao.trim()) return setError('A descrição é obrigatória')
    setLoading(true)
    setError('')
    try {
      if (foto) {
        const fd = new FormData()
        fd.append('title', form.titulo.trim())
        fd.append('description', form.descricao.trim())
        fd.append('image', foto)
        await api.createTechnique(fd)
      } else {
        await api.createTechnique({ title: form.titulo.trim(), description: form.descricao.trim() })
      }
      onCreated()
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : err?.message || 'Erro ao publicar técnica.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Publicar Técnica</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Título *</label>
            <input
              type="text"
              value={form.titulo}
              onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm"
              placeholder="Ex: Técnica de irrigação por gotejamento"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Descrição *</label>
            <textarea
              value={form.descricao}
              onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none"
              rows={5}
              placeholder="Descreve a técnica em detalhe..."
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Foto (opcional)</label>
            {fotoPreview ? (
              <div className="relative rounded-xl overflow-hidden mb-2">
                <img src={fotoPreview} alt="preview" className="w-full h-32 object-cover" />
                <button type="button" onClick={() => { setFoto(null); setFotoPreview(null) }}
                  className="absolute top-1.5 right-1.5 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center text-xs">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-3 py-2.5 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
                <i className="bi bi-cloud-upload text-gray-400 text-lg"></i>
                <span className="text-sm text-gray-400">Clique para adicionar foto</span>
                <input type="file" accept="image/*" onChange={handleFoto} className="hidden" />
              </label>
            )}
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50">
              {loading ? 'A publicar...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Menu ⋯ por técnica
function TechniqueMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white text-gray-600"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      {open && (
        <div className="absolute right-0 top-9 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[150px] py-1">
          <button
            onClick={() => { setOpen(false); onEdit() }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <i className="bi bi-pencil text-blue-500"></i> Editar técnica
          </button>
          <button
            onClick={() => { setOpen(false); onDelete() }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <i className="bi bi-trash"></i> Apagar técnica
          </button>
        </div>
      )}
    </div>
  )
}

// Modal de edição
function EditTechniqueModal({ technique, onClose, onSaved }) {
  const [form, setForm] = useState({ titulo: technique.titulo || '', descricao: technique.descricao || '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) return setError('O título é obrigatório')
    setLoading(true)
    setError('')
    try {
      await api.updateTechnique(technique.id, { title: form.titulo.trim(), description: form.descricao.trim() })
      onSaved()
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : err?.message || 'Erro ao atualizar.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Editar técnica</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Título *</label>
            <input type="text" value={form.titulo}
              onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Descrição</label>
            <textarea value={form.descricao}
              onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))}
              className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" rows={5} />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50">
              {loading ? 'A guardar...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal de confirmação de apagar
function DeleteTechniqueModal({ technique, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
          <i className="bi bi-trash text-red-600 text-2xl"></i>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Apagar técnica?</h3>
        <p className="text-gray-600 text-sm mb-5">
          Tens a certeza que queres apagar <span className="font-semibold">"{technique.titulo}"</span>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm disabled:opacity-50">
            {loading ? 'A apagar...' : 'Apagar'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Techniques() {
  const navigate = useNavigate()
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [votingId, setVotingId] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSellerRequestModal, setShowSellerRequestModal] = useState(false)
  const [existingRequest, setExistingRequest] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [myName, setMyName] = useState(localStorage.getItem('userName') || '')

  const token = localStorage.getItem('access_token')
  const userRole = localStorage.getItem('userRole')
  const isAdmin = userRole === 'admin'

  // Verifica se o utilizador logado é dono da técnica
  const isOwner = (t) => {
    if (!token) return false
    if (isAdmin) return true
    if (!t.criada_por) return false
    const name = (myName || localStorage.getItem('userName') || '').toLowerCase().trim()
    const autor = String(t.criada_por).toLowerCase().trim()
    return autor === name || autor.includes(name) || name.includes(autor)
  }

  useEffect(() => {
    loadTechniques()
    // Atualizar nome do utilizador para comparação de isOwner
    if (token) {
      api.getUserProfile().then(p => {
        if (p?.nome_completo) setMyName(p.nome_completo)
        else if (p?.first_name) setMyName(`${p.first_name} ${p.last_name || ''}`.trim())
      }).catch(() => {})
    }
  }, [])

  const loadTechniques = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await api.getTechniques()
      setTechniques(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      if (err?.status === 401) {
        setTechniques([])
      } else {
        setError('Erro ao carregar técnicas.')
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (techniqueId, voto) => {
    if (!token) { navigate('/login'); return }
    setVotingId(techniqueId)
    try {
      await api.voteTechnique(techniqueId, voto === 'APROVA' ? 'APPROVE' : 'REJECT')
      loadTechniques()
    } catch (err) {
      // Erros de rede são tratados globalmente pelo NetworkErrorModal
      if (!err?.message?.includes('fetch') && !err?.message?.includes('rede')) {
        alert(err?.message || 'Erro ao votar.')
      }
    } finally {
      setVotingId(null)
    }
  }

  const handlePublishClick = async () => {
    if (!token) { navigate('/login'); return }
    // Apenas produtor e admin podem publicar técnicas
    if (userRole !== 'producer' && userRole !== 'admin' && userRole !== 'seller') {
      setShowSellerRequestModal(true)
      try {
        const req = await api.getMySellerRequest()
        setExistingRequest(req)
      } catch (_) {}
      return
    }
    setShowCreateModal(true)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await api.deleteTechnique(deleteTarget.id)
      setTechniques(prev => prev.filter(t => t.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      alert(err?.message || 'Erro ao apagar.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const statusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-600'
    const s = status.toUpperCase()
    if (s === 'APROVADA') return 'bg-green-100 text-green-700'
    if (s === 'REPROVADA') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  const statusLabel = (status) => {
    if (!status) return 'Pendente'
    const s = status.toUpperCase()
    if (s === 'APROVADA') return '✓ Aprovada'
    if (s === 'REPROVADA') return '✗ Reprovada'
    return '⏳ Em votação'
  }

  return (
    <div className="min-h-screen pb-20 soil-texture flex lg:pb-0">
      <DesktopSidebar />
      <div className="flex-1 min-w-0">
      {showSellerRequestModal && (
        <SellerRequestForm
          onClose={() => setShowSellerRequestModal(false)}
          existingRequest={existingRequest}
        />
      )}
      {showCreateModal && (
        <CreateTechniqueModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => { setShowCreateModal(false); loadTechniques() }}
        />
      )}
      {editTarget && (
        <EditTechniqueModal
          technique={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={() => { setEditTarget(null); loadTechniques() }}
        />
      )}
      {deleteTarget && (
        <DeleteTechniqueModal
          technique={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}

      <header className="glass-effect sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                <i className="bi bi-book text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Técnicas Agrícolas</h1>
                <p className="text-xs text-gray-500">Aprovadas pela comunidade</p>
              </div>
            </div>
            <button
              onClick={handlePublishClick}
              className="btn-primary text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <i className="bi bi-plus-lg"></i> Publicar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <LoadingPlant />
        ) : error ? (
          <div className="text-center py-8">
            <i className="bi bi-exclamation-circle text-4xl text-red-400"></i>
            <p className="text-red-600 mt-2">{error}</p>
            <button onClick={loadTechniques} className="mt-4 btn-primary text-white px-6 py-2 rounded-xl">
              Tentar novamente
            </button>
          </div>
        ) : techniques.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-book text-4xl text-purple-400"></i>
            </div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Nenhuma técnica publicada</p>
            <p className="text-gray-500 text-sm mb-6">
              {token
                ? 'Sê o primeiro a partilhar uma técnica agrícola com a comunidade.'
                : 'Faz login para ver e publicar técnicas agrícolas.'}
            </p>
            {token ? (
              <button
                onClick={handlePublishClick}
                className="btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
              >
                <i className="bi bi-plus-lg"></i> Publicar primeira técnica
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="btn-primary text-white px-6 py-3 rounded-xl font-semibold mx-auto"
              >
                Fazer login
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techniques.map(t => (
              <div key={t.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
                {/* Imagem da técnica */}
                {(t.image || t.imagem) && (
                  <img
                    src={(t.image || t.imagem).startsWith('http') ? (t.image || t.imagem) : `${API_MEDIA}${(t.image || t.imagem).startsWith('/') ? '' : '/'}${t.image || t.imagem}`}
                    alt={t.title || t.titulo}
                    className="w-full h-48 object-cover"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="p-4">
                {/* Menu ⋯ — só para dono ou admin */}
                {token && isOwner(t) && (
                  <div className="absolute top-3 right-3 z-10">
                    <TechniqueMenu
                      onEdit={() => setEditTarget(t)}
                      onDelete={() => setDeleteTarget(t)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(t.status)}`}>
                    {statusLabel(t.status)}
                  </span>
                  {(t.author || t.criada_por) && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 truncate max-w-[120px]">
                      <i className="bi bi-person flex-shrink-0"></i>
                      <span className="truncate">{t.author || t.criada_por}</span>
                    </p>
                  )}
                </div>

                <h3 className="text-base font-bold text-gray-800 mb-1">{t.title || t.titulo}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{t.description || t.descricao}</p>

                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-green-600 font-bold text-sm">
                    <i className="bi bi-hand-thumbs-up"></i> {t.votes_approve ?? t.votos_aprovacao ?? 0}
                  </span>
                  <span className="flex items-center gap-1 text-red-500 font-bold text-sm">
                    <i className="bi bi-hand-thumbs-down"></i> {t.votes_reject ?? t.votos_rejeicao ?? 0}
                  </span>
                  {(t.total_votes || t.total_votos) > 0 && (
                    <span className="text-xs text-gray-400 ml-auto">{t.total_votes || t.total_votos} votos</span>
                  )}
                </div>

                {(t.total_votes || t.total_votos) > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-500"
                      style={{ width: `${Math.round(((t.votes_approve ?? t.votos_aprovacao ?? 0) / (t.total_votes || t.total_votos)) * 100)}%` }}
                    />
                  </div>
                )}

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => handleVote(t.id, 'APROVA')}
                    disabled={votingId === t.id}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    <i className="bi bi-hand-thumbs-up"></i> Aprovar
                  </button>
                  <button
                    onClick={() => handleVote(t.id, 'REPROVA')}
                    disabled={votingId === t.id}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    <i className="bi bi-hand-thumbs-down"></i> Reprovar
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/technique/${t.id}`)}
                  className="w-full text-green-600 hover:text-green-700 font-semibold text-sm flex items-center justify-center gap-1"
                >
                  Ver detalhes <i className="bi bi-arrow-right"></i>
                </button>
                </div>{/* end p-4 */}
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

export default Techniques
