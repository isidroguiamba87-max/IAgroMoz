import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import LoadingPlant from '../components/LoadingPlant'
import ImageViewer from '../components/ImageViewer'
import api from '../services/api'
import { API_MEDIA } from '../config/api'

function TechniqueDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [technique, setTechnique] = useState(null)
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)

  // Editar
  const [showEdit, setShowEdit] = useState(false)
  const [editForm, setEditForm] = useState({ titulo: '', descricao: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState('')

  // Apagar
  const [showDelete, setShowDelete] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const token = localStorage.getItem('access_token')
  const myName = localStorage.getItem('userName') || ''
  const userRole = localStorage.getItem('userRole') || ''

  useEffect(() => {
    loadTechnique()
  }, [id])

  const loadTechnique = async () => {
    try {
      setLoading(true)
      const data = await api.getTechnique(id)
      setTechnique(data)
      setEditForm({ titulo: data.title || data.titulo || '', descricao: data.description || data.descricao || '' })
    } catch (err) {
      console.error('Erro ao carregar técnica:', err)
    } finally {
      setLoading(false)
    }
  }

  const isOwner = (t) => {
    if (!token || !t) return false
    if (userRole === 'admin') return true
    // Se não tem criada_por, mostrar botões para qualquer utilizador logado
    if (!t.criada_por) return true
    const a = String(t.criada_por).toLowerCase().trim()
    const m = myName.toLowerCase().trim()
    if (!m) return true // sem nome no localStorage, mostrar botões
    const mFirst = m.split(' ')[0]
    const aFirst = a.split(' ')[0]
    return a === m || a.includes(mFirst) || m.includes(aFirst) || aFirst === mFirst
  }

  const handleVote = async (voto) => {
    if (!token) { navigate('/login'); return }
    setVoting(true)
    try {
      await api.voteTechnique(id, voto === 'APROVA' ? 'APPROVE' : 'REJECT')
      loadTechnique()
    } catch (err) {
      alert(err?.message || 'Erro ao votar.')
    } finally {
      setVoting(false)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editForm.titulo.trim()) return setEditError('O título é obrigatório')
    setEditLoading(true)
    setEditError('')
    try {
      await api.updateTechnique(id, { title: editForm.titulo.trim(), description: editForm.descricao.trim() })
      setShowEdit(false)
      loadTechnique()
    } catch (err) {
      const msg = err?.data
        ? Object.entries(err.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
        : err?.message || 'Erro ao atualizar.'
      setEditError(msg)
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await api.deleteTechnique(id)
      navigate('/techniques')
    } catch (err) {
      setShowDelete(false)
      const msg = err?.status === 403
        ? 'Não tens permissão para apagar esta técnica.'
        : err?.message || 'Erro ao apagar.'
      alert(msg)
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingPlant /></div>

  if (!technique) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Técnica não encontrada</p>
          <button onClick={() => navigate('/techniques')} className="btn-primary text-white px-6 py-3 rounded-xl">
            Voltar às Técnicas
          </button>
        </div>
      </div>
    )
  }

  const total = technique.total_votes || technique.total_votos || 0
  const aprovacao = technique.votes_approve || technique.votos_aprovacao || 0
  const rejeicao = technique.votes_reject || technique.votos_rejeicao || 0
  const approvalRate = total > 0 ? Math.round((aprovacao / total) * 100) : 0

  const statusColor = () => {
    const s = (technique.status || '').toUpperCase()
    if (s === 'APROVADA') return 'bg-green-100 text-green-700'
    if (s === 'REPROVADA') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  const statusLabel = () => {
    const s = (technique.status || '').toUpperCase()
    if (s === 'APROVADA') return '✓ Técnica Aprovada pela Comunidade'
    if (s === 'REPROVADA') return '✗ Técnica Reprovada'
    return '⏳ Em votação'
  }

  return (
    <div className="min-h-screen soil-texture pb-8">
      {/* Modal Editar */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Editar técnica</h3>
              <button onClick={() => setShowEdit(false)} className="text-gray-400 hover:text-gray-600">
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
            {editError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{editError}</div>}
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Título *</label>
                <input type="text" value={editForm.titulo}
                  onChange={e => setEditForm(p => ({ ...p, titulo: e.target.value }))}
                  className="form-input w-full px-3 py-2.5 rounded-xl text-sm" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Descrição</label>
                <textarea value={editForm.descricao}
                  onChange={e => setEditForm(p => ({ ...p, descricao: e.target.value }))}
                  className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" rows={5} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowEdit(false)}
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

      {/* Modal Apagar */}
      {showDelete && (
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
              <button onClick={() => setShowDelete(false)} disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">
                Cancelar
              </button>
              <button onClick={handleDelete} disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm disabled:opacity-50">
                {deleteLoading ? 'A apagar...' : 'Apagar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="glass-effect sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/techniques')}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600">
              <span>←</span>
              <span className="font-medium">Voltar</span>
            </button>
            <Logo size="sm" showText={false} />
            {/* Botões editar/apagar — só para dono */}
            {isOwner(technique) ? (
              <div className="flex gap-2">
                <button onClick={() => setShowEdit(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm font-medium">
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button onClick={() => setShowDelete(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium">
                  <i className="bi bi-trash"></i> Apagar
                </button>
              </div>
            ) : <div className="w-20"></div>}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="agro-card p-8">
          {/* Status */}
          {technique.status && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${statusColor()}`}>
              {statusLabel()}
            </div>
          )}

          {/* Título */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{technique.title || technique.titulo}</h1>

          {/* Imagem */}
          {(technique.image || technique.imagem) && (
            <ImageViewer
              src={(technique.image || technique.imagem).startsWith('http') ? (technique.image || technique.imagem) : `${API_MEDIA}${(technique.image || technique.imagem).startsWith('/') ? '' : '/'}${technique.image || technique.imagem}`}
              alt={technique.title || technique.titulo}
              imgClassName="w-full max-h-80 object-cover rounded-2xl"
            />
          )}

          {/* Autor */}
          {(technique.author || technique.criada_por) && (
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold">
                {String(technique.author || technique.criada_por).charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{technique.author || technique.criada_por}</p>
                <p className="text-xs text-gray-500">Autor da técnica</p>
              </div>
            </div>
          )}

          {/* Descrição */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
              {technique.description || technique.descricao}
            </p>
          </div>

          {/* Estatísticas */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Votação da Comunidade</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{aprovacao}</p>
                <p className="text-sm text-gray-600">Aprovações</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">{rejeicao}</p>
                <p className="text-sm text-gray-600">Reprovações</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{approvalRate}%</p>
                <p className="text-sm text-gray-600">Aprovação</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                style={{ width: `${approvalRate}%` }} />
            </div>
            {total > 0 && <p className="text-center text-xs text-gray-400 mt-2">{total} votos no total</p>}
          </div>

          {/* Botões de voto */}
          <div className="flex gap-4">
            <button onClick={() => handleVote('APROVA')} disabled={voting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50">
              <span className="text-2xl">👍</span> Aprovar
            </button>
            <button onClick={() => handleVote('REPROVA')} disabled={voting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50">
              <span className="text-2xl">👎</span> Reprovar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TechniqueDetail
