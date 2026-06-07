import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileNav from '../components/MobileNav'
import DesktopSidebar from '../components/DesktopSidebar'
import FeedRightPanel, { getPendingRequestsForMe } from '../components/FeedRightPanel'
import Comment from '../components/Comment'
import Avatar from '../components/Avatar'
import ImageViewer from '../components/ImageViewer'
import api from '../services/api'
import { getDashboardPath, getDashboardLabel } from '../utils/dashboardPaths'

import { API_BASE, API_MEDIA } from '../config/api'

// ─── Constantes globais ───────────────────────────────────────────────────────
const _userFotoCache = {}
const _userNameCache = {}

const REACTIONS = [
  { key: 'gosto',    emoji: null, label: 'Gosto',    color: 'text-blue-500' },
  { key: 'amo',      emoji: '❤️', label: 'Amo',      color: 'text-red-500' },
  { key: 'adorei',   emoji: '😍', label: 'Adorei',   color: 'text-pink-500' },
  { key: 'haha',     emoji: '😂', label: 'Haha',     color: 'text-yellow-500' },
  { key: 'tristeza', emoji: '😢', label: 'Tristeza', color: 'text-blue-400' },
  { key: 'zangado',  emoji: '😡', label: 'Zangado',  color: 'text-orange-600' },
]

const CATEGORIES = [
  { id: '',            label: 'Todos',       icon: 'bi-grid' },
  { id: 'AGRICULTURE', label: 'Agricultura', icon: 'bi-flower1' },
  { id: 'LIVESTOCK',   label: 'Pecuária',    icon: 'bi-heart' },
]

// ─── Funções utilitárias ──────────────────────────────────────────────────────
function normalizeUserDisplayName(user) {
  if (!user) return null
  const name = `${user.first_name || ''} ${user.last_name || ''}`.trim()
    || user.nome_completo
    || user.autor_nome
    || user.usuario_nome
    || user.nome
    || user.display_name
    || user.username
    || user.name
    || (user.email ? user.email.split('@')[0] : null)
  return name ? String(name).trim() : null
}

function extractAuthorName(obj) {
  if (!obj) return 'Utilizador'
  if (obj.full_name) return obj.full_name
  if (obj.nome_completo) return obj.nome_completo
  if (obj.autor_nome) return obj.autor_nome
  if (obj.usuario_nome) return obj.usuario_nome
  if (obj.nome) return obj.nome
  if (obj.author_name) return obj.author_name
  const a = obj.autor || obj.author || obj.user
  if (a) {
    if (a.full_name) return a.full_name
    if (a.nome_completo) return a.nome_completo
    if (a.first_name && a.last_name) return `${a.first_name} ${a.last_name}`.trim()
    if (a.first_name) return a.first_name
    if (a.last_name) return a.last_name
    if (a.autor_nome) return a.autor_nome
    if (a.usuario_nome) return a.usuario_nome
    if (a.nome) return a.nome
    if (a.username) return a.username
    if (a.name) return a.name
    if (a.display_name) return a.display_name
    if (a.email) return a.email.split('@')[0]
  }
  return 'Utilizador'
}

function normalizeComment(c) {
  return {
    id: c.id || c.message_id || null,
    body: c.mensagem || c.body || c.message || c.text || c.conteudo || '',
    author_name: extractAuthorName(c),
    author_id: c.author_id || c.user?.id || c.autor?.id || c.user_id || (c.author && (c.author.id || c.author.user_id)) || null,
    created_at: c.criado_em || c.created_at || c.timestamp || c.createdAt || null,
    parent: c.parent ?? c.parent_message ?? null,
    replies: Array.isArray(c.replies) ? c.replies.map(normalizeComment) : (Array.isArray(c.respostas) ? c.respostas.map(normalizeComment) : [])
  }
}

// ─── Componente principal ──────────────────────────────────────────────────────
function Feed() {
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || 'user'
  const dashboardPath = getDashboardPath('', userRole)
  const dashboardLabel = getDashboardLabel(userRole)
  
  // Sellers com acesso de venda usam o painel e não acedem ao Feed normal
  if (userRole === 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8]">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-ban text-3xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">
            Vendedores não têm acesso ao Feed. Dirija-se ao seu <strong>{dashboardLabel}</strong> para gerir os seus produtos e vendas.
          </p>
          <Link to={dashboardPath}
            className="inline-flex items-center justify-center btn-primary text-white px-6 py-3 rounded-xl font-semibold">
            <i className="bi bi-shop mr-2"></i> Ir para {dashboardLabel}
          </Link>
        </div>
      </div>
    )
  }
  
  const pressTimer = useRef(null)
  const userName = localStorage.getItem('userName')
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('access_token')

  // ─ Estado: Posts
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [userFotos, setUserFotos] = useState({})
  const [userNames, setUserNames] = useState({})

  // ─ Estado: Categorias
  const [activeCategory, setActiveCategory] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ─ Estado: Interações com posts (reações, comentários)
  const [postReactions, setPostReactions] = useState({})
  const [expandedComments, setExpandedComments] = useState({})
  const [postComments, setPostComments] = useState({})
  const [commentTexts, setCommentTexts] = useState({})
  const [loadingComments, setLoadingComments] = useState({})
  const [commentErrors, setCommentErrors] = useState({})

  // ─ Estado: Modais e painéis
  const [showReactionPanel, setShowReactionPanel] = useState(null)
  const [showShareModal, setShowShareModal] = useState(null)
  const [showPostMenu, setShowPostMenu] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)

  // ─ Estado: Dados adicionais
  const [myConnections, setMyConnections] = useState([])
  const [pendingRequests, setPendingRequests] = useState(getPendingRequestsForMe())

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
    loadPosts()
  }, [])

  useEffect(() => {
    if (!showPostMenu && !showReactionPanel) return
    const close = () => { setShowPostMenu(null); setShowReactionPanel(null) }
    const timer = setTimeout(() => { document.addEventListener('mousedown', close) }, 0)
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', close) }
  }, [showPostMenu, showReactionPanel])

  const requireAuth = () => {
    if (!localStorage.getItem('access_token')) { navigate('/register'); return false }
    return true
  }

  const resolveAuthor = (p) => {
    if (!p) return {}
    const raw = p.autor || p.author || {}
    if (typeof raw === 'string' || typeof raw === 'number') return { id: raw }
    return raw.user || raw.profile || raw
  }

  // Função para renderizar o nome do autor — usa melhor fallback
  const renderAuthorName = (post) => {
    const cached = userNames[post.author_id]
    const name = post.author_name || cached
    
    // Se ainda não há nome, tenta tirar informação útil
    if (!name || name === 'Utilizador') {
      // Se há ID, mostra algo genérico mas útil
      if (post.author_id) return `Agricultor #${String(post.author_id).substring(0, 6)}`
      // Se não há ID, mostra placeholder
      return 'Publicação Anónima'
    }
    
    return name
  }

  // Função para extrair nome do autor dos dados da API
  const extractAuthorName = (p, author) => {
    if (!p && !author) return null
    
    // Candidatos de nome na ordem de preferência
    const candidates = [
      p?.full_name?.trim(),
      p?.nome_completo?.trim(),
      p?.autor_nome?.trim(),
      p?.author_name?.trim(),
      author?.full_name?.trim(),
      author?.nome_completo?.trim(),
      author?.display_name?.trim(),
      author?.first_name && author?.last_name ? `${author.first_name} ${author.last_name}`.trim() : null,
      author?.first_name?.trim(),
      author?.last_name?.trim(),
      author?.username?.trim(),
      author?.name?.trim(),
      author?.email?.split('@')[0]?.trim(),
      p?.author?.email?.split('@')[0]?.trim(),
    ]
    
    // Retorna o primeiro candidato válido (não vazio)
    for (const candidate of candidates) {
      if (candidate && String(candidate).trim().length > 0) {
        return String(candidate).trim()
      }
    }
    
    // Se nada funcionou, retorna null para indicar que precisa de prefetch
    return null
  }

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await api.getCommunitySessions()
      const normalized = Array.isArray(data) ? data.map(p => {
        const author = resolveAuthor(p)
        // don't default to 'Utilizador' here — try to compute, keep null if unknown
        const authorName = extractAuthorName(p, author) || null
        return {
          id: p.id,
          title: p.titulo || p.title || '',
          body: p.conteudo || p.body || '',
          author_name: authorName,
          author_id: author?.id || p.autor?.id || p.autor || p.author?.id || p.author || p.autor_id || p.author_id || null,
          author_foto: (() => {
            const foto = author?.foto_perfil || author?.photo || author?.imagem || p.autor_foto || p.author_foto || null
            if (!foto) return null
            if (foto.startsWith('http')) return foto
            return foto
          })(),
          created_at: p.criado_em || p.created_at,
          answers_count: Array.isArray(p.comments) ? p.comments.length : (p.answers_count || 0),
          likes_count: p.total_likes ?? p.likes_count ?? 0,
          gostou: p.gostou === true,
          image: (() => {
            const img = p.imagem || p.image
            if (!img) return null
            if (img.startsWith('http')) return img
            return `${API_MEDIA}/media/` + img.replace(/^\/?(media\/)?/, '')
          })(),
        }
      }) : []
        // Pre-fetch missing author names/photos (if authenticated) before rendering to avoid UI oscillation
        const token = localStorage.getItem('access_token')
        if (token) {
          const missingIds = [...new Set(
            normalized
              .filter(p => p.author_id && (
                (!p.author_foto && !_userFotoCache[p.author_id]) ||
                (!p.author_name && !_userNameCache[p.author_id])
              ))
              .map(p => p.author_id)
          )]
          if (missingIds.length > 0) {
            for (let i = 0; i < missingIds.length; i += 5) {
              const chunk = missingIds.slice(i, i + 5)
              await Promise.all(chunk.map(async (userId) => {
                try {
                  const res = await fetch(`${API_BASE}/users/${userId}/`, { headers: { Authorization: `Bearer ${token}` } })
                  if (!res.ok) return
                  const u = await res.json()
                  const foto = u.foto_perfil || u.profile_photo
                  if (foto) {
                    const url = foto.startsWith('http') ? foto : API_MEDIA + (foto.startsWith('/') ? foto : '/' + foto)
                    _userFotoCache[userId] = url
                  }
                  const name = normalizeUserDisplayName(u)
                  if (name) _userNameCache[userId] = name
                } catch (_) {}
              }))
            }
          }
        }
        // enrich normalized posts with fetched cache if available
        const enriched = normalized.map(p => ({
          ...p,
          author_name: p.author_name || (p.author_id ? _userNameCache[p.author_id] : null),
          author_foto: p.author_foto || (p.author_id ? _userFotoCache[p.author_id] : null),
        }))
        setPosts(enriched)
    } catch (err) { console.error(err); setPosts([]) }
    finally { setLoading(false) }
  }

  const loadComments = async (postId) => {
    try {
      setLoadingComments(prev => ({ ...prev, [postId]: true }))
      const data = await api.getCommunityMessages(postId)
      const list = Array.isArray(data) ? data : []
      setPostComments(prev => ({ ...prev, [postId]: list.map(normalizeComment) }))
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, answers_count: list.length } : p))
    } catch (err) {
      setPostComments(prev => ({ ...prev, [postId]: [] }))
      setCommentErrors(prev => ({ ...prev, [postId]: 'Não foi possível carregar os comentários.' }))
    } finally { setLoadingComments(prev => ({ ...prev, [postId]: false })) }
  }

  const handleCreatePost = () => { if (!requireAuth()) return; navigate('/create-post') }

  const handleLike = async (postId) => {
    if (!requireAuth()) return
    // Optimistic update — inverte imediatamente na UI
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      const liked = !p.gostou
      return { ...p, gostou: liked, likes_count: liked ? p.likes_count + 1 : Math.max(0, p.likes_count - 1) }
    }))
    // Limpar reação local se existir
    setPostReactions(prev => { const n = { ...prev }; delete n[postId]; return n })
    try {
      await api.likeFeedPost(postId)
    } catch (_) {
      // Reverter em caso de erro
      setPosts(prev => prev.map(p => {
        if (p.id !== postId) return p
        const liked = !p.gostou
        return { ...p, gostou: liked, likes_count: liked ? p.likes_count + 1 : Math.max(0, p.likes_count - 1) }
      }))
    }
  }

  const handleReaction = async (postId, key) => {
    if (!requireAuth()) return
    setPostReactions(prev => { const n = { ...prev }; n[postId] === key ? delete n[postId] : (n[postId] = key); return n })
    setShowReactionPanel(null)
    // Também enviar like à API para persistir
    try { await api.likeFeedPost(postId) } catch (_) {}
  }
  const handlePressStart = (postId) => { pressTimer.current = setTimeout(() => { if (!requireAuth()) return; setShowReactionPanel(postId) }, 600) }
  const handlePressEnd = () => { if (pressTimer.current) { clearTimeout(pressTimer.current); pressTimer.current = null } }
  const toggleComments = async (postId) => {
    if (!requireAuth()) return
    if (expandedComments[postId]) { setExpandedComments(prev => ({ ...prev, [postId]: false })); return }
    setExpandedComments(prev => ({ ...prev, [postId]: true }))
    setCommentErrors(prev => ({ ...prev, [postId]: null }))
    await loadComments(postId)
  }
  const handleSubmitComment = async (postId, e) => {
    e?.preventDefault()
    if (!requireAuth()) return
    const text = commentTexts[postId]
    if (!text?.trim()) return
    try {
      await api.sendCommunityMessage(postId, text)
      setCommentTexts(prev => ({ ...prev, [postId]: '' }))
      setExpandedComments(prev => ({ ...prev, [postId]: true }))
      await loadComments(postId)
    } catch (err) { setCommentErrors(prev => ({ ...prev, [postId]: 'Não foi possível enviar o comentário.' })) }
  }
  const handleReply = async (postId, parentId, replyText) => {
    if (!requireAuth()) return
    try { await api.sendCommunityMessage(postId, replyText, parentId); await loadComments(postId) }
    catch (err) { setCommentErrors(prev => ({ ...prev, [postId]: 'Não foi possível enviar a resposta.' })) }
  }
  const handleShare = (postId) => {
    if (!requireAuth()) return
    setShowShareModal(postId)
    setPostShares(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }))
  }
  const handleDeletePost = async (postId) => {
    try { await api.deleteCommunitySession(postId); setPosts(prev => prev.filter(p => p.id !== postId)); setConfirmDelete(null); setShowPostMenu(null) }
    catch (err) { alert('Não foi possível apagar o post.') }
  }
  const shareToWhatsApp = (post) => { window.open('https://wa.me/?text=' + encodeURIComponent(post.title + '\n\n' + post.body + '\n\nVia IAgroMOZ'), '_blank'); setShowShareModal(null) }
  const shareToFacebook = () => { window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank'); setShowShareModal(null) }
  const shareToTwitter = (post) => { window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title + ' - Via IAgroMOZ'), '_blank'); setShowShareModal(null) }
  const copyLink = (postId) => { navigator.clipboard.writeText(window.location.origin + '/post/' + postId); alert('Link copiado!'); setShowShareModal(null) }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex">
      {/* ── Sidebar desktop ── */}
      <DesktopSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* ── Header mobile ── */}
        <header className="glass-effect sticky top-0 z-40 lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="w-7 h-7 object-contain" />
              <span className="text-lg font-black text-gradient">IAgroMOZ</span>
            </div>
            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <button onClick={() => navigate('/login')} className="btn-primary text-white px-4 py-1.5 rounded-full text-sm font-bold">Entrar</button>
              ) : (
                <>
                  <button onClick={handleCreatePost} className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-200"><i className="bi bi-plus-lg text-white font-bold"></i></button>
                  <button onClick={() => navigate('/profile')} className="flex-shrink-0">
                    <Avatar name={localStorage.getItem('userName')} size="sm" />
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Filtros de categoria — mobile */}
          <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                <i className={`bi ${cat.icon} text-xs`}></i>
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* ── Header desktop ── */}
        <header className="hidden lg:flex glass-effect sticky top-0 z-40 border-b border-gray-100">
          <div className="w-full px-4 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                {isLoggedIn && (
                  <button onClick={handleCreatePost} className="btn-primary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <i className="bi bi-plus-lg"></i> Nova publicação
                  </button>
                )}
                {isLoggedIn && (
                  <button onClick={() => navigate('/profile')} className="flex-shrink-0">
                    <Avatar name={localStorage.getItem('userName')} size="sm" />
                  </button>
                )}
              </div>
            </div>
            {/* ── Filtros de categoria ── */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  <i className={`bi ${cat.icon} text-sm`}></i>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* ── Coluna principal: Posts ── */}
          <main className="flex-1 min-w-0 w-full pb-24 lg:pb-6">
            {!isLoggedIn && (
              <div className="mx-4 mt-4 rounded-3xl overflow-hidden shadow-lg">
                <div className="relative h-32" style={{ background: 'linear-gradient(135deg, #003D20, #006D3F, #00C853)' }}>
                  <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=70" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                  <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                    <p className="text-white font-black text-base leading-tight">Bem-vindo à comunidade agrícola de Moçambique 🌿</p>
                    <div className="flex gap-2">
                      <button onClick={() => navigate('/register')} className="bg-white text-green-800 px-4 py-1.5 rounded-full text-sm font-bold shadow">Criar conta</button>
                      <button onClick={() => navigate('/login')} className="border-2 border-white text-white px-4 py-1.5 rounded-full text-sm font-semibold">Entrar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoggedIn && (
              <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar name={localStorage.getItem('userName')} size="md" />
                  <button onClick={handleCreatePost} className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-400 text-left hover:bg-gray-100">
                    Partilhe a sua experiência agrícola...
                  </button>
                  <button onClick={handleCreatePost} className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100">
                    <i className="bi bi-image text-lg"></i>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80 mb-3" />
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-2 h-2 rounded-full bg-green-500"
                        style={{ animation: 'bounce 1.2s infinite', animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-8px);opacity:1}}`}</style>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <i className="bi bi-journal-text text-4xl text-green-300"></i>
                  </div>
                  <p className="text-gray-700 font-bold text-lg mb-1">Nenhuma publicação ainda</p>
                  <p className="text-gray-400 text-sm">Seja o primeiro a partilhar!</p>
                </div>
              ) : posts.map(post => {
                // Filtrar por categoria
                if (activeCategory !== 'todos' && post.tipo_cultura) {
                  const cat = post.tipo_cultura.toLowerCase()
                  if (!cat.includes(activeCategory)) return null
                }
                const reaction = postReactions[post.id] || null
                const reactionData = REACTIONS.find(r => r.key === reaction)
                // gostou vem da API (persistente) — reaction é overlay visual de emoji
                const isLiked = post.gostou || !!reaction
                const likesCount = post.likes_count || 0
                const commentsExpanded = expandedComments[post.id]
                const comments = postComments[post.id] || []
                const rootComments = comments.filter(c => c.parent === null || c.parent === undefined)
                const mainComments = rootComments.length > 0 ? rootComments : comments
                const currentUserId = localStorage.getItem('userId')
                const isOwner = isLoggedIn && currentUserId && String(post.author_id) === String(currentUserId)
                const canEdit = isOwner && post.created_at && (Date.now() - new Date(post.created_at).getTime()) < 10 * 60 * 1000
                return (
                  <article key={post.id} className="bg-white border-b border-gray-100 mb-1">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => post.author_id && navigate(`/profile/${post.author_id}`)}
                          className={`flex-shrink-0 ${post.author_id ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}>
                          <Avatar
                            name={renderAuthorName(post)}
                            foto={
                              post.author_foto ||
                              (post.author_id ? userFotos[post.author_id] : undefined) ||
                              (String(post.author_id) === String(localStorage.getItem('userId')) ? undefined : null)
                            }
                            size="md"
                          />
                        </button>
                        <div>
                          <button
                            onClick={() => post.author_id && navigate(`/profile/${post.author_id}`)}
                            className={`font-bold text-gray-900 text-sm leading-tight block text-left ${post.author_id ? 'hover:text-green-700 hover:underline' : ''}`}>
                            {renderAuthorName(post)}
                          </button>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-400">{post.created_at ? new Date(post.created_at).toLocaleString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}</p>
                          </div>
                        </div>
                      </div>
                      {isLoggedIn && (
                        <div className="relative">
                          <button onClick={() => setShowPostMenu(showPostMenu === post.id ? null : post.id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
                            <i className="bi bi-three-dots text-lg"></i>
                          </button>
                          {showPostMenu === post.id && (
                            <div className="absolute right-0 top-9 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 min-w-[160px] p-2" onMouseDown={e => e.stopPropagation()}>
                              {isOwner ? (
                                <>
                                  {canEdit && <button onMouseDown={e => e.stopPropagation()} onClick={() => { navigate('/create-post', { state: { post } }); setShowPostMenu(null) }} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl"><i className="bi bi-pencil text-blue-500"></i> Editar post</button>}
                                  <button onMouseDown={e => e.stopPropagation()} onClick={() => { setConfirmDelete(post.id); setShowPostMenu(null) }} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl"><i className="bi bi-trash"></i> Apagar post</button>
                                </>
                              ) : <p className="px-3 py-2 text-sm text-gray-400">Sem opções</p>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="px-4 pb-3">
                      {/* Badges de localização e categoria */}
                      {(post.tipo_cultura || post.distrito) && (
                        <div className="flex items-center gap-2 mb-2">
                          {post.distrito && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-700 text-white">
                              {post.distrito}
                              {post.tipo_cultura && ` – ${post.tipo_cultura}`}
                            </span>
                          )}
                          {post.tipo_cultura && !post.distrito && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              <i className="bi bi-flower1 text-xs"></i> {post.tipo_cultura}
                            </span>
                          )}
                          {post.tipo_cultura && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 ml-auto">
                              <i className="bi bi-flower1 text-xs"></i> Plantação
                            </span>
                          )}
                        </div>
                      )}
                      {post.title && <p className="font-bold text-gray-900 text-sm mb-1">{post.title}</p>}
                      <p className="text-gray-700 text-sm leading-relaxed">{post.body}</p>
                    </div>
                    {post.image && (
                      <ImageViewer
                        src={post.image}
                        alt={post.title || 'Imagem do post'}
                        imgClassName="w-full object-contain max-h-[600px] bg-black/5"
                      />
                    )}
                    {(likesCount > 0 || post.answers_count > 0) && (
                      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-400">
                        {likesCount > 0 && <span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"><i className="bi bi-hand-thumbs-up-fill text-white text-[10px]"></i></span>{likesCount}</span>}
                        {post.answers_count > 0 && <button onClick={() => toggleComments(post.id)} className="hover:underline ml-auto">{post.answers_count} comentário{post.answers_count !== 1 ? 's' : ''}</button>}
                      </div>
                    )}
                    <div className="border-t border-gray-100 px-2 py-1 flex items-center">
                      <div className="relative flex-1">
                        {showReactionPanel === post.id && (
                          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-xl border border-gray-100 px-3 py-2 flex gap-3 z-30">
                            {REACTIONS.map(r => (
                              <button key={r.key} onClick={() => handleReaction(post.id, r.key)} className="flex flex-col items-center gap-0.5 hover:scale-125 transition-transform" title={r.label}>
                                {r.emoji ? <span className="text-2xl leading-none">{r.emoji}</span> : <i className="bi bi-hand-thumbs-up-fill text-2xl text-blue-500"></i>}
                                <span className="text-[9px] text-gray-400">{r.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        <button onClick={() => handleLike(post.id)} onMouseDown={() => handlePressStart(post.id)} onMouseUp={handlePressEnd} onMouseLeave={handlePressEnd} onTouchStart={() => handlePressStart(post.id)} onTouchEnd={handlePressEnd}
                          className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-semibold ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}>
                          {reactionData?.emoji ? <span className="text-lg">{reactionData.emoji}</span> : <i className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill text-blue-500' : 'bi-hand-thumbs-up'} text-lg`}></i>}
                          <span>{reactionData ? reactionData.label : 'Gostar'}</span>
                        </button>
                      </div>
                      <button onClick={() => toggleComments(post.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 text-sm font-semibold"><i className="bi bi-chat text-lg"></i> Comentar</button>
                      <button onClick={() => handleShare(post.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 text-sm font-semibold"><i className="bi bi-share text-lg"></i> Partilhar</button>
                    </div>
                    {commentsExpanded && (
                      <div className="border-t border-gray-100 bg-gray-50/50">
                        <div className="px-4 py-3">
                          <form onSubmit={(e) => handleSubmitComment(post.id, e)} className="flex items-center gap-2">
                            <Avatar name={localStorage.getItem('userName')} size="sm" />
                            <input type="text" value={commentTexts[post.id] || ''} onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))} placeholder="Escreva um comentário..." className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <button type="submit" className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white"><i className="bi bi-send-fill text-xs"></i></button>
                          </form>
                        </div>
                        <div className="px-4 pb-4 max-h-72 overflow-y-auto">
                          {commentErrors[post.id] && <p className="text-center text-red-500 text-xs py-2">{commentErrors[post.id]}</p>}
                          {loadingComments[post.id] ? <p className="text-center text-gray-400 text-sm py-4">A carregar...</p>
                            : mainComments.length > 0 ? <div className="space-y-1">{mainComments.map(c => <Comment key={c.id} comment={c} onReply={(pid, rt) => handleReply(post.id, pid, rt)} depth={0} />)}</div>
                            : <p className="text-center text-gray-400 text-sm py-4">Nenhum comentário ainda.</p>}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </main>
          {/* ── Coluna direita: Painel lateral (desktop) ── */}
          <FeedRightPanel isLoggedIn={isLoggedIn} />
        </div>
      </div>

      {/* ── Modal: Partilhar publicação ── */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowShareModal(null)}>
          <div className="bg-white rounded-t-3xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4"></div>
            <div className="px-6 pb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Partilhar publicação</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'WhatsApp', icon: 'bi-whatsapp', color: 'bg-green-500', action: () => shareToWhatsApp(posts.find(p => p.id === showShareModal)) },
                  { label: 'Facebook', icon: 'bi-facebook', color: 'bg-blue-600', action: shareToFacebook },
                  { label: 'Twitter', icon: 'bi-twitter-x', color: 'bg-gray-900', action: () => shareToTwitter(posts.find(p => p.id === showShareModal)) },
                  { label: 'Copiar', icon: 'bi-link-45deg', color: 'bg-gray-500', action: () => copyLink(showShareModal) },
                ].map(({ label, icon, color, action }) => (
                  <button key={label} onClick={action} className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg`}><i className={`${icon} text-white text-2xl`}></i></div>
                    <span className="text-xs text-gray-600 font-medium">{label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowShareModal(null)} className="w-full py-3.5 bg-gray-100 rounded-2xl text-gray-700 font-semibold">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Confirmar eliminação ── */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3"><i className="bi bi-trash text-red-600 text-2xl"></i></div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Apagar publicação?</h3>
            <p className="text-gray-500 text-sm mb-5">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold">Cancelar</button>
              <button onClick={() => handleDeletePost(confirmDelete)} className="flex-1 py-3 rounded-2xl bg-red-600 text-white font-bold">Apagar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Navegação móvel ── */}
      <MobileNav />
    </div>
  )
}

export default Feed
