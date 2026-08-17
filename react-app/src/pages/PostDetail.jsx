import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { getDashboardPath, getDashboardLabel } from '../utils/dashboardPaths'
import LoadingPlant from '../components/LoadingPlant'
import Comment from '../components/Comment'
import PhotoGallery from '../components/PhotoGallery'
import Avatar from '../components/Avatar'
import api from '../services/api'
import { resolveMediaUrl, normalizeUserDisplayName } from '../utils/normalizers'
import { useAuth } from '../context/AuthContext'

// Repetida por baixo de cada foto quando o post tem mais que uma — mesmo
// padrão do Facebook (a pessoa faz scroll pelas fotos e pode reagir a
// qualquer momento) — mas a ação é sempre sobre o post, não por foto.
function PostActionRow({ liked, likesCount, onLike, onComment, onShare }) {
  return (
    <div className="flex items-center border-t border-gray-100">
      <button onClick={onLike}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${liked ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-50'}`}>
        <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} text-lg`}></i>
        {likesCount > 0 ? likesCount : 'Gostar'}
      </button>
      <button onClick={onComment}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
        <i className="bi bi-chat text-lg"></i> Comentar
      </button>
      <button onClick={onShare}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
        <i className="bi bi-share text-lg"></i> Partilhar
      </button>
    </div>
  )
}

// GET /feed/posts/{id}/ devolve o autor aninhado em .autor/.author (por vezes
// dentro de .user/.profile) — ao contrário do Feed.jsx, que já faz este
// desembrulho, este ecrã só olhava para post.nome_completo/post.author_name
// no nível de topo, por isso caía sempre em "Utilizador".
function resolvePostAuthor(post) {
  const raw = post?.autor || post?.author || {}
  const author = (typeof raw === 'object') ? (raw.user || raw.profile || raw) : {}
  const candidates = [
    post?.nome_completo, post?.autor_nome, post?.author_name,
    author?.first_name && author?.last_name ? `${author.first_name} ${author.last_name}`.trim() : null,
    author?.first_name, author?.last_name, author?.username, author?.name,
    author?.email?.split('@')[0],
  ]
  const name = candidates.map(c => (c || '').toString().trim()).find(Boolean)
  const foto = author?.profile_photo || author?.foto_perfil || author?.photo || author?.imagem
    || post?.autor_foto || post?.author_foto
  const id = author?.id ?? post?.autor_id ?? post?.author_id ?? (typeof raw === 'object' ? raw.id : raw) ?? null
  return { name: name || 'Utilizador', foto: resolveMediaUrl(foto), id }
}

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { requireAuth } = useAuth()
  const userRole = localStorage.getItem('userRole') || 'user'
  const dashboardPath = getDashboardPath('', userRole)
  const dashboardLabel = getDashboardLabel(userRole)
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [authorLookup, setAuthorLookup] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const commentSectionRef = useRef(null)
  const commentInputRef = useRef(null)
  const userId = localStorage.getItem('userId')

  // Sellers não podem aceder aos posts independentes do Feed
  if (userRole === 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8]">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-ban text-3xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">
            Vendedores não têm acesso a posts do Feed. Utilize o seu painel para gerir produtos e transações.
          </p>
          <button onClick={() => navigate(dashboardPath)}
            className="btn-primary text-white px-6 py-3 rounded-xl font-semibold">
            <i className="bi bi-shop mr-2"></i> Ir para {dashboardLabel}
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    try {
      setLoading(true)
      const data = await api.getFeedPost(id)
      setPost(data)
      setAuthorLookup(null)
      setLiked(!!(data.liked || data.gostou))
      setLikesCount(data.total_likes ?? data.likes_count ?? 0)
      // Em alguns posts o autor vem só como ID (sem nome/foto embutidos) —
      // mesmo caso que o Feed.jsx já resolve com um pedido extra a /users/{id}/.
      const { name: quickName, id: authorId } = resolvePostAuthor(data)
      if (authorId && quickName === 'Utilizador' && localStorage.getItem('access_token')) {
        api.getUser(authorId).then(u => {
          const name = normalizeUserDisplayName(u)
          const foto = u?.profile_photo || u?.foto_perfil || u?.photo
          if (name || foto) setAuthorLookup({ name, foto: resolveMediaUrl(foto) })
        }).catch(() => {})
      }
      const answers = await api.getFeedComments(id)
      setComments(Array.isArray(answers) ? answers : (answers?.results || []))
    } catch (err) {
      console.error('Erro ao carregar post:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!requireAuth(handleLike, 'Entra na tua conta para gostar desta publicação.')) return
    const wasLiked = liked
    setLiked(!wasLiked)
    setLikesCount(c => wasLiked ? Math.max(0, c - 1) : c + 1)
    try {
      await api.likeFeedPost(id)
    } catch (err) {
      setLiked(wasLiked)
      setLikesCount(c => wasLiked ? c + 1 : Math.max(0, c - 1))
    }
  }

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    commentInputRef.current?.focus()
  }

  const handleShare = async () => {
    const url = window.location.origin + '/post/' + id
    if (navigator.share) {
      try { await navigator.share({ title: postTitle, url }); return } catch (_) { /* utilizador cancelou */ }
    }
    navigator.clipboard.writeText(url)
    alert('Link copiado!')
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    if (!requireAuth(() => handleSubmitComment(e), 'Entra na tua conta para comentar.')) return

    try {
      setSubmitting(true)
      await api.createFeedComment(id, commentText, null)
      setCommentText('')
      loadPost()
    } catch (err) {
      console.error('Erro ao enviar comentário:', err)
      alert('Erro ao enviar comentário.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReply = async (parentId, replyText) => {
    if (!requireAuth(() => handleReply(parentId, replyText), 'Entra na tua conta para responder.')) return
    try {
      await api.createFeedComment(id, replyText, parentId)
      loadPost()
    } catch (err) {
      console.error('Erro ao enviar resposta:', err)
      alert('Erro ao enviar resposta.')
    }
  }

  const handleEditComment = async (commentId, message) => {
    try {
      await api.updateFeedComment(commentId, message)
      loadPost()
    } catch (err) {
      console.error('Erro ao atualizar comentário:', err)
      alert('Erro ao atualizar comentário.')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Deseja apagar este comentário?')) return
    try {
      await api.deleteFeedComment(commentId)
      loadPost()
    } catch (err) {
      console.error('Erro ao apagar comentário:', err)
      alert('Erro ao apagar comentário.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingPlant />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Post não encontrado</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary text-white px-6 py-3 rounded-xl"
          >
            Voltar ao Feed
          </button>
        </div>
      </div>
    )
  }

  const postTitle = post.titulo || post.title || ''
  const postBody = post.content || post.primeira_mensagem || post.conteudo || post.body || ''
  const quickAuthor = resolvePostAuthor(post)
  const postAuthor = authorLookup?.name || quickAuthor.name
  const postAuthorFoto = authorLookup?.foto || quickAuthor.foto
  const postDate = post.criado_em || post.created_at
  const postImages = (() => {
    const raw = post.imagens || post.images || post.fotos || post.photos
    const arr = Array.isArray(raw) && raw.length > 0
      ? raw.map(item => resolveMediaUrl(typeof item === 'string' ? item : (item?.imagem || item?.image || item?.url || item?.foto))).filter(Boolean)
      : []
    if (arr.length > 0) return arr
    const single = resolveMediaUrl(post.primeira_imagem || post.imagem || post.image)
    return single ? [single] : []
  })()
  const mainComments = comments.filter(c => !c.parent_message && !c.parent)
  const linkedProducts = Array.isArray(post.linked_products) ? post.linked_products : []
  const isAuthor = userId && String(post.author_id ?? post.autor_id ?? post.user_id ?? post.author?.id ?? '') === String(userId)

  const handleUnlinkProduct = async (productId) => {
    try {
      await api.unlinkProductFromPost(id, productId)
      loadPost()
    } catch (err) {
      console.error('Erro ao remover vínculo do produto:', err)
      alert('Erro ao remover o vínculo do produto.')
    }
  }

  const postCanonical = `https://www.iagromoz.com/post/${id}`
  const metaTitle = postTitle ? `${postTitle} | IAgroMOZ` : 'IAgroMOZ — Comunidade Agrícola de Moçambique'
  const metaDescription = postBody
    ? postBody.slice(0, 155).replace(/\s+/g, ' ').trim() + (postBody.length > 155 ? '…' : '')
    : 'Publicação da comunidade agrícola IAgroMOZ de Moçambique.'
  const metaImage = postImages[0] || 'https://www.iagromoz.com/logo.png'

  return (
    <div className="min-h-screen soil-texture pb-8">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={postCanonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={postCanonical} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="IAgroMOZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      <header className="glass-effect sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 click-scale"
            >
              <span>←</span>
              <span className="font-medium">Voltar</span>
            </button>
            <Logo size="sm" showText={false} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="agro-card p-6 mb-6">
          {postImages.length > 1 ? (
            // Várias fotos — mostra todas em coluna (scroll), como no Facebook,
            // cada uma seguida das mesmas ações (gostar/comentar/partilhar são
            // sempre sobre o post, repetidas para ficarem à mão ao ir descendo).
            <div className="rounded-xl overflow-hidden mb-6 border border-gray-100">
              {postImages.map((src, i) => (
                <div key={i} className={i > 0 ? 'border-t border-gray-100' : ''}>
                  <img src={src} alt={`${postTitle} (${i + 1})`} className="w-full object-cover" loading="lazy" decoding="async" />
                  <PostActionRow liked={liked} likesCount={likesCount} onLike={handleLike} onComment={scrollToComments} onShare={handleShare} />
                </div>
              ))}
            </div>
          ) : postImages.length === 1 ? (
            <div className="rounded-xl overflow-hidden mb-6">
              <PhotoGallery images={postImages} alt={postTitle} />
            </div>
          ) : null}

          <div className="flex items-center gap-3 mb-4">
            <Avatar name={postAuthor} foto={postAuthorFoto} size="lg" />
            <div>
              <p className="font-semibold text-gray-800">{postAuthor}</p>
              <p className="text-xs text-gray-500">
                {postDate ? new Date(postDate).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
              </p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">{postTitle}</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">{postBody}</p>

          {linkedProducts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {linkedProducts.map(lp => {
                const productId = lp.product_id ?? lp.id ?? lp.product?.id
                const label = lp.label || `Ver no Mercado: ${lp.product_name || lp.product?.name || ''}`.trim()
                return (
                  <div key={productId} className="inline-flex items-center gap-1 bg-green-100 rounded-full pl-4 pr-1 py-1">
                    <button onClick={() => navigate(`/product/${productId}`)}
                      className="inline-flex items-center gap-2 text-green-700 text-sm font-semibold click-scale py-1">
                      <span>🛒</span>
                      <span>{label}</span>
                      <span>→</span>
                    </button>
                    {isAuthor && (
                      <button onClick={() => handleUnlinkProduct(productId)} title="Remover vínculo"
                        className="w-6 h-6 rounded-full flex items-center justify-center text-green-700 hover:bg-green-200 flex-shrink-0">
                        <i className="bi bi-x-lg text-xs"></i>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {postImages.length <= 1 && (
            <PostActionRow liked={liked} likesCount={likesCount} onLike={handleLike} onComment={scrollToComments} onShare={handleShare} />
          )}
          <div className="flex items-center gap-6 pt-2 text-sm text-gray-600">
            <span>{mainComments.length} {mainComments.length === 1 ? 'comentário' : 'comentários'}</span>
          </div>
        </div>

        <div className="agro-card p-6" ref={commentSectionRef}>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Comentários ({mainComments.length})
          </h2>

          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex gap-3">
              <Avatar name={localStorage.getItem('userName')} size="md" />
              <div className="flex-1">
                <input
                  ref={commentInputRef}
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escreva um comentário..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  disabled={submitting}
                />
              </div>
            </div>
          </form>

          {mainComments.length > 0 ? (
            <div className="space-y-1">
              {mainComments.map(comment => (
                <Comment
                  key={comment.message_id || comment.id}
                  comment={{
                    id: comment.message_id || comment.id,
                    body: comment.mensagem || comment.body,
                    author_name: comment.user
                      ? `${comment.user.first_name || ''} ${comment.user.last_name || ''}`.trim() || comment.user.username || 'Utilizador'
                      : comment.author_name || 'Utilizador',
                    author_id: comment.user?.id || comment.author_id || comment.user_id || null,
                    created_at: comment.timestamp || comment.created_at,
                    replies: (comment.respostas || comment.replies || []).map(r => ({
                      id: r.message_id || r.id,
                      body: r.mensagem || r.body,
                      author_name: r.user
                        ? `${r.user.first_name || ''} ${r.user.last_name || ''}`.trim() || r.user.username || 'Utilizador'
                        : r.author_name || 'Utilizador',
                      author_id: r.user?.id || r.author_id || r.user_id || null,
                      created_at: r.timestamp || r.created_at,
                      replies: []
                    }))
                  }}
                  onReply={handleReply}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                  currentUserId={userId}
                  depth={0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum comentário ainda. Seja o primeiro!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default PostDetail
