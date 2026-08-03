import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import LoadingPlant from '../components/LoadingPlant'
import ImageViewer from '../components/ImageViewer'
import Comment from '../components/Comment'
import api from '../services/api'
import { API_MEDIA } from '../config/api'
import { extractApiErrorMessage } from '../utils/normalizers'

function TechniqueDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [technique, setTechnique] = useState(null)
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)
  const [userVote, setUserVote] = useState(null) // 'APPROVE' | 'REJECT' | null
  const [voteError, setVoteError] = useState('')

  // Editar
  const [showEdit, setShowEdit] = useState(false)
  const [editForm, setEditForm] = useState({ titulo: '', descricao: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState('')

  // Apagar
  const [showDelete, setShowDelete] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Comentários
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [commentError, setCommentError] = useState('')
  const [commentsSupported, setCommentsSupported] = useState(true)
  const commentInputRef = useRef(null)

  const token = localStorage.getItem('access_token')
  const myUserId = localStorage.getItem('userId')
  const myName = localStorage.getItem('userName') || ''
  const userRole = (localStorage.getItem('userRole') || '').toLowerCase()

  useEffect(() => {
    loadTechnique()
  }, [id])

  useEffect(() => {
    if (commentsSupported) loadComments()
  }, [id, commentsSupported])

  const loadTechnique = async () => {
    try {
      setLoading(true)
      const data = await api.getTechnique(id)
      setTechnique(data)
      setEditForm({ titulo: data.title || data.titulo || '', descricao: data.description || data.descricao || '' })
      // Recuperar o voto do utilizador actual se a API o devolve.
      // A API só aceita/devolve APPROVE ou REJECT (confirmado pelo erro 400
      // "Invalid vote. Use 'APPROVE' or 'REJECT'." — não usa UP/DOWN).
      const rawVote = (data.user_vote || data.meu_voto || '').toString().toUpperCase()
      const uv = (rawVote === 'APPROVE' || rawVote === 'REJECT') ? rawVote : null
      setUserVote(uv)
    } catch (err) {
      console.error('Erro ao carregar técnica:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadComments = async () => {
    setLoadingComments(true)
    try {
      const data = await api.getTechniqueComments(id)
      const list = Array.isArray(data) ? data : (data?.results || [])
      setComments(list)
    } catch (err) {
      // Endpoint de comentários pode não existir — silenciar graciosamente
      if (err?.status === 404 || err?.status === 405) setCommentsSupported(false)
      setComments([])
    } finally {
      setLoadingComments(false)
    }
  }

  // Só mostra editar/apagar se conseguirmos identificar o utilizador como dono
  const isOwner = (t) => {
    if (!token || !t || !myUserId) return false
    if (userRole === 'admin') return true
    const authorId =
      t.author_id ?? t.autor_id ?? t.created_by_id ??
      (typeof t.created_by === 'number' ? t.created_by : null) ??
      t.created_by?.id ?? t.author?.id ?? t.autor?.id ?? null
    if (authorId !== null) return String(authorId) === String(myUserId)
    return false // não conseguiu determinar — não mostrar botões
  }

  const handleVote = async (vote) => {
    if (!token) { navigate('/login'); return }
    setVoting(true)
    setVoteError('')
    try {
      await api.voteTechnique(id, vote)
      setUserVote(prev => prev === vote ? null : vote) // toggle
      loadTechnique()
    } catch (err) {
      const msg = extractApiErrorMessage(err, '')
      if (msg.toLowerCase().includes('já votou') || msg.toLowerCase().includes('already voted') || err?.status === 400) {
        setVoteError('Já votaste nesta recomendação.')
      } else {
        setVoteError(msg || 'Erro ao registar voto. Tente novamente.')
      }
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

  const handleSubmitComment = async () => {
    if (!token) { navigate('/login'); return }
    const text = commentText.trim()
    if (!text) return
    setSubmittingComment(true)
    setCommentError('')
    try {
      await api.createTechniqueComment(id, text)
      setCommentText('')
      loadComments()
    } catch (err) {
      setCommentError(extractApiErrorMessage(err, 'Erro ao publicar comentário.'))
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleReplyComment = async (parentId, text) => {
    if (!token) { navigate('/login'); return }
    try {
      await api.createTechniqueComment(id, text, parentId)
      loadComments()
    } catch (err) {
      setCommentError(extractApiErrorMessage(err, 'Erro ao responder.'))
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await api.deleteTechniqueComment(commentId)
      loadComments()
    } catch (err) {
      setCommentError(extractApiErrorMessage(err, 'Erro ao apagar comentário.'))
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
  const aprovacao = technique.approval_votes ?? technique.votes_approve ?? technique.votos_aprovacao ?? 0
  const rejeicao = technique.rejection_votes ?? technique.votes_reject ?? technique.votos_rejeicao ?? 0
  const approvalRate = total > 0 ? Math.round((aprovacao / total) * 100) : 0

  const statusColor = () => {
    const s = (technique.status || '').toUpperCase()
    if (s === 'APPROVED' || s === 'APROVADA') return 'bg-green-100 text-green-700'
    if (s === 'REJECTED' || s === 'REPROVADA') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  const statusLabel = () => {
    const s = (technique.status || '').toUpperCase()
    if (s === 'APPROVED' || s === 'APROVADA') return '✓ Técnica Aprovada pela Comunidade'
    if (s === 'REJECTED' || s === 'REPROVADA') return '✗ Técnica Reprovada'
    return '⏳ Em votação'
  }

  const authorInitial = String(technique.author || technique.criada_por || 'A').charAt(0).toUpperCase()
  const myInitial = myName.charAt(0).toUpperCase() || 'U'

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
              Tens a certeza que queres apagar <span className="font-semibold">"{technique.title || technique.titulo}"</span>? Esta ação não pode ser desfeita.
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
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600">
              <span>←</span>
              <span className="font-medium">Voltar</span>
            </button>
            <Logo size="sm" showText={false} />
            {/* Botões editar/apagar — só para o autor verificado */}
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

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Card principal */}
        <div className="agro-card p-6 md:p-8">
          {/* Status */}
          {technique.status && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${statusColor()}`}>
              {statusLabel()}
            </div>
          )}

          {/* Título */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{technique.title || technique.titulo}</h1>

          {/* Imagem */}
          {(technique.image || technique.imagem) && (
            <ImageViewer
              src={(technique.image || technique.imagem).startsWith('http')
                ? (technique.image || technique.imagem)
                : `${API_MEDIA}${(technique.image || technique.imagem).startsWith('/') ? '' : '/'}${technique.image || technique.imagem}`}
              alt={technique.title || technique.titulo}
              imgClassName="w-full max-h-80 object-cover rounded-2xl"
            />
          )}

          {/* Autor */}
          {(technique.author || technique.criada_por) && (
            <div className="flex items-center gap-3 my-6 py-4 border-y border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold">
                {authorInitial}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{technique.author || technique.criada_por}</p>
                <p className="text-xs text-gray-500">Autor da recomendação</p>
              </div>
            </div>
          )}

          {/* Descrição */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
              {technique.description || technique.descricao}
            </p>
          </div>

          {/* Estatísticas de votação */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-5">
            <h3 className="text-base font-bold text-gray-800 mb-4">Votação da Comunidade</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{aprovacao}</p>
                <p className="text-xs text-gray-500">Aprovações</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{rejeicao}</p>
                <p className="text-xs text-gray-500">Reprovações</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{approvalRate}%</p>
                <p className="text-xs text-gray-500">Aprovação</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                style={{ width: `${approvalRate}%` }} />
            </div>
            {total > 0 && <p className="text-center text-xs text-gray-400 mt-2">{total} votos no total</p>}
          </div>

          {/* Botões de voto */}
          {voteError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2.5 rounded-xl mb-3 text-sm flex items-center gap-2">
              <i className="bi bi-info-circle-fill flex-shrink-0"></i> {voteError}
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => handleVote('APPROVE')}
              disabled={voting}
              className={`flex-1 py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                userVote === 'APPROVE'
                  ? 'bg-green-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-green-50 border-2 border-green-200 text-green-700 hover:bg-green-100'
              }`}>
              <span className="text-xl">👍</span>
              {userVote === 'APPROVE' ? 'Aprovado' : 'Aprovar'}
            </button>
            <button
              onClick={() => handleVote('REJECT')}
              disabled={voting}
              className={`flex-1 py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                userVote === 'REJECT'
                  ? 'bg-red-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-red-50 border-2 border-red-200 text-red-700 hover:bg-red-100'
              }`}>
              <span className="text-xl">👎</span>
              {userVote === 'REJECT' ? 'Reprovado' : 'Reprovar'}
            </button>
          </div>
          {!token && (
            <p className="text-center text-xs text-gray-400 mt-2">
              <button onClick={() => navigate('/login')} className="underline text-green-600">Inicia sessão</button> para votar
            </p>
          )}
        </div>

        {/* Secção de comentários */}
        {commentsSupported && (
          <div className="agro-card p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="bi bi-chat-dots text-green-600"></i>
              Comentários
              {comments.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{comments.length}</span>
              )}
            </h3>

            {/* Caixa para novo comentário */}
            {token ? (
              <div className="flex gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {myInitial}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input
                      ref={commentInputRef}
                      type="text"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSubmitComment()}
                      placeholder="Escreve um comentário..."
                      className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <button
                      onClick={handleSubmitComment}
                      disabled={submittingComment || !commentText.trim()}
                      className="px-4 py-2.5 rounded-full btn-primary text-white text-sm font-semibold disabled:opacity-50">
                      {submittingComment ? <i className="bi bi-arrow-repeat animate-spin"></i> : <i className="bi bi-send-fill"></i>}
                    </button>
                  </div>
                  {commentError && (
                    <p className="text-red-600 text-xs mt-1.5 ml-1">{commentError}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-5 text-center">
                <p className="text-gray-500 text-sm">
                  <button onClick={() => navigate('/login')} className="font-semibold text-green-600 underline">Inicia sessão</button> para comentar
                </p>
              </div>
            )}

            {/* Lista de comentários */}
            {loadingComments ? (
              <div className="py-6 flex justify-center"><LoadingPlant /></div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <i className="bi bi-chat text-4xl text-gray-200"></i>
                <p className="text-gray-400 text-sm mt-2">Nenhum comentário ainda. Sê o primeiro!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {comments.map(c => (
                  <Comment
                    key={c.id}
                    comment={c}
                    onReply={handleReplyComment}
                    onDelete={handleDeleteComment}
                    currentUserId={myUserId}
                    depth={0}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default TechniqueDetail
