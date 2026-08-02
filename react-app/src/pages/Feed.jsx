import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import MobileNav from '../components/MobileNav'
import DesktopSidebar from '../components/DesktopSidebar'
import FeedRightPanel, { getPendingRequestsForMe } from '../components/FeedRightPanel'
import Comment from '../components/Comment'
import Avatar from '../components/Avatar'
import api from '../services/api'
import { getDashboardPath, getDashboardLabel } from '../utils/dashboardPaths'
import { normalizeUserDisplayName, normalizeComment, resolveMediaUrl } from '../utils/normalizers'
import { createKeyedThrottle } from '../utils/debounce'

import { API_BASE } from '../config/api'

// ─── Constantes globais ───────────────────────────────────────────────────────
const _userFotoCache = {}
const _userNameCache = {}
const _userDistrictCache = {}

const REACTIONS = [
  { key: 'gosto',    emoji: null, label: 'Gosto',    color: 'text-blue-500' },
  { key: 'amo',      emoji: '❤️', label: 'Amo',      color: 'text-red-500' },
  { key: 'adorei',   emoji: '😍', label: 'Adorei',   color: 'text-pink-500' },
  { key: 'haha',     emoji: '😂', label: 'Haha',     color: 'text-yellow-500' },
  { key: 'tristeza', emoji: '😢', label: 'Tristeza', color: 'text-blue-400' },
  { key: 'zangado',  emoji: '😡', label: 'Zangado',  color: 'text-orange-600' },
]

// normalizeUserDisplayName, normalizeComment, resolveMediaUrl importadas de utils/normalizers

// ─── Preview organizado de fotos no card do feed ───────────────────────────────
// Até 5 fotos por post, mas não expõe todas ao mesmo tempo — mostra no máximo 3
// organizadas; para ver todas (com scroll horizontal) a pessoa abre a publicação.
function FeedPhotoPreview({ images, alt, onOpen }) {
  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="cursor-pointer" onClick={onOpen}>
        <img src={images[0]} alt={alt || 'Imagem do post'} className="w-full object-cover max-h-[500px]" loading="lazy" decoding="async" />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5 cursor-pointer" onClick={onOpen}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`${alt || 'Imagem do post'} (${i + 1})`} className="w-full h-56 object-cover" loading="lazy" decoding="async" />
        ))}
      </div>
    )
  }

  const shown = images.slice(0, 3)
  const extra = images.length - shown.length
  return (
    <div className="grid grid-cols-3 gap-0.5 cursor-pointer" onClick={onOpen}>
      {shown.map((src, i) => (
        <div key={i} className="relative">
          <img src={src} alt={`${alt || 'Imagem do post'} (${i + 1})`} className="w-full h-32 object-cover" loading="lazy" decoding="async" />
          {i === shown.length - 1 && extra > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">+{extra}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────────
function Feed() {
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || 'user'
  const dashboardPath = getDashboardPath('', userRole)
  const dashboardLabel = getDashboardLabel(userRole)
  
  // Sellers não acessam o Feed normal, devem ir diretamente ao painel.
  // Produtores usam o Feed como início (o Painel fica acessível à parte, ver MobileNav/DesktopSidebar).
  if (userRole === 'seller') {
    return <Navigate replace to={dashboardPath} />
  }
  
  const pressTimer = useRef(null)
  const likeThrottle = useRef(createKeyedThrottle())
  const userName = localStorage.getItem('userName')
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('access_token')

  // ─ Estado: Posts
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [userFotos, setUserFotos] = useState({})
  const [userNames, setUserNames] = useState({})

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ─ Estado: Filtro por localização (província)
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null) // null = todas
  const [provinceDistricts, setProvinceDistricts] = useState({}) // { [provinceId]: string[] nomes de distrito }
  const [showLocationMenu, setShowLocationMenu] = useState(false)

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
    api.getProvinces().then(setProvinces).catch(() => {})
  }, [])

  const handleSelectProvince = async (province) => {
    setShowLocationMenu(false)
    if (!province) { setSelectedProvince(null); return }
    setSelectedProvince(province)
    if (!provinceDistricts[province.id]) {
      try {
        const districts = await api.getDistricts(province.id)
        const names = districts.map(d => (d.name || d.nome || '').toLowerCase().trim()).filter(Boolean)
        setProvinceDistricts(prev => ({ ...prev, [province.id]: names }))
      } catch (_) { /* falha silenciosa — filtro fica inativo para esta província */ }
    }
  }

  const matchesSelectedProvince = (post) => {
    if (!selectedProvince) return true
    const names = provinceDistricts[selectedProvince.id]
    if (!names) return true // ainda a carregar — não esconder resultados
    const postDistrict = (post.distrito || '').toLowerCase().trim()
    return postDistrict && names.includes(postDistrict)
  }

  useEffect(() => {
    if (!showPostMenu && !showReactionPanel && !showLocationMenu) return
    const close = () => { setShowPostMenu(null); setShowReactionPanel(null); setShowLocationMenu(false) }
    const timer = setTimeout(() => { document.addEventListener('mousedown', close) }, 0)
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', close) }
  }, [showPostMenu, showReactionPanel, showLocationMenu])

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

  const fetchMissingFotos = async (postList) => {
    if (!token) return

    const missingIds = [...new Set(
      postList
        .filter(p => p.author_id && (
          (!p.author_foto && !_userFotoCache[p.author_id]) ||
          (!p.author_name && !_userNameCache[p.author_id]) ||
          (!p.distrito && !_userDistrictCache[p.author_id])
        ))
        .map(p => p.author_id)
    )]

    if (missingIds.length === 0) return

    for (let i = 0; i < missingIds.length; i += 5) {
      const chunk = missingIds.slice(i, i + 5)
      await Promise.all(chunk.map(async (userId) => {
        try {
          const res = await fetch(`${API_BASE}/users/${userId}/`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (!res.ok) return
          const u = await res.json()
          const foto = u.foto_perfil || u.profile_photo || u.imagem || u.photo
          if (foto) {
            _userFotoCache[userId] = resolveMediaUrl(foto)
          }
          const name = normalizeUserDisplayName(u)
          if (name) _userNameCache[userId] = name
          // Localização de registo — usada quando o post em si não tem localização própria
          const district = u.district?.name || u.district?.nome || u.distrito?.name || u.distrito?.nome || u.distrito || null
          if (district) _userDistrictCache[userId] = district
        } catch (_) {
          // ignore failed lookups
        }
      }))
    }

    setUserFotos({ ..._userFotoCache })
    setUserNames({ ..._userNameCache })
  }

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await api.getCommunitySessions()
      const rawPosts = Array.isArray(data) ? data : (data?.results || [])
      const normalized = rawPosts.map(p => {
        const author = resolveAuthor(p)
        // don't default to 'Utilizador' here — try to compute, keep null if unknown
        const authorName = extractAuthorName(p, author) || null
        return {
          id: p.id,
          title: p.titulo || p.title || '',
          body: p.content || p.conteudo || p.body || p.texto || p.description || '',
          author_name: authorName,
          author_id: author?.id || p.autor?.id || p.autor || p.author?.id || p.author || p.autor_id || p.author_id || null,
          author_foto: resolveMediaUrl(author?.foto_perfil || author?.profile_photo || author?.photo || author?.imagem || p.autor_foto || p.author_foto),
          created_at: p.criado_em || p.created_at,
          distrito: p.distrito || p.district || p.author?.district?.name || null,
          tipo_cultura: p.tipo_cultura || p.crop_type || p.categoria_label || null,
          in_market: Boolean(p.produto || p.product || p.produto_id || p.product_id || p.marketplace_product_id || p.em_mercado || p.is_market),
          linked_products: Array.isArray(p.linked_products) ? p.linked_products : [],
          answers_count: Array.isArray(p.comments) ? p.comments.length : (p.answers_count || 0),
          likes_count: p.total_likes ?? p.likes_count ?? 0,
          gostou: p.gostou === true,
          image: resolveMediaUrl(p.imagem || p.image),
          // Suporte a múltiplas fotos por post — usa o array se a API já o devolver,
          // senão cai para a imagem única (compatibilidade com o formato atual).
          images: (() => {
            const raw = p.imagens || p.images || p.fotos || p.photos
            if (!Array.isArray(raw) || raw.length === 0) return null
            return raw
              .map(item => resolveMediaUrl(typeof item === 'string' ? item : (item?.imagem || item?.image || item?.url || item?.foto)))
              .filter(Boolean)
          })(),
        }
      })

      if (token) {
        await fetchMissingFotos(normalized)
      }

      const enriched = normalized.map(p => ({
        ...p,
        author_name: p.author_name || (p.author_id ? _userNameCache[p.author_id] : null),
        author_foto: p.author_foto || (p.author_id ? _userFotoCache[p.author_id] : null),
        // Se o post não tem localização própria, usa a localização de registo do autor
        // (a própria, se for o post do utilizador atual — sem precisar de pedido extra).
        distrito: p.distrito
          || (String(p.author_id) === String(userId) ? localStorage.getItem('userDistrictName') : null)
          || (p.author_id ? _userDistrictCache[p.author_id] : null)
          || null,
      }))
      setPosts(enriched)
    } catch (err) { console.error(err); setPosts([]) }
    finally { setLoading(false) }
  }

  const loadComments = async (postId) => {
    try {
      setLoadingComments(prev => ({ ...prev, [postId]: true }))
      const data = await api.getCommunityMessages(postId)
      const list = Array.isArray(data) ? data : (data?.results || [])
      setPostComments(prev => ({ ...prev, [postId]: list.map(normalizeComment) }))
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, answers_count: list.length } : p))
    } catch (err) {
      setPostComments(prev => ({ ...prev, [postId]: [] }))
      setCommentErrors(prev => ({ ...prev, [postId]: 'Não foi possível carregar os comentários.' }))
    } finally { setLoadingComments(prev => ({ ...prev, [postId]: false })) }
  }

  const handleCreatePost = useCallback(() => { if (!requireAuth()) return; navigate('/create-post') }, [navigate])

  const handleLike = useCallback(async (postId) => {
    if (!requireAuth()) return
    await likeThrottle.current(postId, async () => {
      // Optimistic update — inverte imediatamente na UI
      setPosts(prev => prev.map(p => {
        if (p.id !== postId) return p
        const liked = !p.gostou
        return { ...p, gostou: liked, likes_count: liked ? p.likes_count + 1 : Math.max(0, p.likes_count - 1) }
      }))
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
    })
  }, [])

  const handleReaction = useCallback(async (postId, key) => {
    if (!requireAuth()) return
    setPostReactions(prev => { const n = { ...prev }; n[postId] === key ? delete n[postId] : (n[postId] = key); return n })
    setShowReactionPanel(null)
    // Também enviar like à API para persistir
    try { await api.likeFeedPost(postId) } catch (err) { console.warn('Erro ao registar reação:', err) }
  }, [])
  const handlePressStart = useCallback((postId) => { pressTimer.current = setTimeout(() => { if (!requireAuth()) return; setShowReactionPanel(postId) }, 600) }, [])
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

  // ─ Filtro por localização — botão + menu suspenso de províncias ─
  const LocationFilter = ({ compact = false }) => (
    <div className="relative flex-shrink-0" onMouseDown={e => e.stopPropagation()}>
      <button
        onClick={() => setShowLocationMenu(v => !v)}
        className={`flex items-center gap-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-colors ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
        <i className="bi bi-geo-alt-fill text-green-600"></i>
        <span className="truncate max-w-[9rem]">{selectedProvince ? selectedProvince.name : 'Todas as províncias'}</span>
        <i className={`bi bi-chevron-down text-[10px] text-gray-400 transition-transform ${showLocationMenu ? 'rotate-180' : ''}`}></i>
      </button>
      {showLocationMenu && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 py-2 max-h-72 overflow-y-auto">
          <button onClick={() => handleSelectProvince(null)}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50 ${!selectedProvince ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>
            <i className="bi bi-globe-americas"></i> Todas as províncias
          </button>
          {provinces.map(p => (
            <button key={p.id} onClick={() => handleSelectProvince(p)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50 ${selectedProvince?.id === p.id ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>
              <i className="bi bi-geo-alt"></i> {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )

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
          {/* Filtro por localização — mobile */}
          <div className="px-4 pb-3">
            <LocationFilter compact />
          </div>
        </header>

        {/* ── Header desktop ── */}
        <header className="hidden lg:flex glass-effect sticky top-0 z-40 border-b border-gray-100">
          <div className="w-full px-4 py-3 flex items-center justify-between gap-3">
            <LocationFilter />
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
              <div className="mx-4 mt-4 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                  <Avatar name={localStorage.getItem('userName')} size="md" />
                  <button onClick={handleCreatePost} className="flex-1 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-500 transition-colors truncate">
                    No que está a trabalhar hoje?
                  </button>
                </div>
                <div className="flex items-center gap-1 px-3 py-2.5 border-t border-gray-100">
                  <button onClick={handleCreatePost} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">
                    <i className="bi bi-camera-fill text-green-600"></i>
                    <span className="hidden sm:inline">Foto/Vídeo</span>
                  </button>
                  <button onClick={handleCreatePost} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">
                    <i className="bi bi-geo-alt-fill text-red-500"></i>
                    <span className="hidden sm:inline">Localização</span>
                  </button>
                  <button onClick={handleCreatePost} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">
                    <i className="bi bi-flower1 text-amber-600"></i>
                    <span className="hidden sm:inline">Cultura</span>
                  </button>
                  <button onClick={handleCreatePost} className="ml-auto btn-primary text-white px-5 py-2 rounded-full text-sm font-bold flex-shrink-0">
                    Publicar
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 px-4 space-y-4">
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
                // Filtrar por província selecionada
                if (!matchesSelectedProvince(post)) return null
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
                const images = post.images && post.images.length > 0 ? post.images : (post.image ? [post.image] : [])
                return (
                  <article key={post.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 pt-4 pb-1">
                      <div className="flex items-center gap-3 min-w-0">
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
                        <div className="min-w-0">
                          <button
                            onClick={() => post.author_id && navigate(`/profile/${post.author_id}`)}
                            className={`font-bold text-gray-900 text-sm leading-tight block text-left truncate ${post.author_id ? 'hover:text-green-700 hover:underline' : ''}`}>
                            {renderAuthorName(post)}
                          </button>
                          <p className="text-xs text-gray-400 flex items-center gap-1 truncate">
                            {post.distrito && <span className="truncate">{post.distrito}</span>}
                            {post.distrito && <span>·</span>}
                            <span>{post.created_at ? new Date(post.created_at).toLocaleString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}</span>
                            <i className="bi bi-globe-americas text-[10px]"></i>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
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
                    </div>
                    <div className="px-4 pb-3 pt-2">
                      {/* Badge de localização/cultura — só quando o post tem essa informação */}
                      {(post.distrito || post.tipo_cultura) && (
                        <div className="mb-1.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-700 text-white min-w-0 truncate">
                            {post.distrito}
                            {post.distrito && post.tipo_cultura && ' – '}
                            {post.tipo_cultura}
                          </span>
                        </div>
                      )}
                      {/* Título e estado (Produção/Mercado) na mesma linha */}
                      <div className="flex items-center gap-2">
                        {post.title && <p className="font-bold text-gray-900 text-base leading-snug min-w-0 truncate">{post.title}</p>}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ml-auto flex-shrink-0 ${
                          post.in_market
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          <i className={`bi ${post.in_market ? 'bi-cart3' : 'bi-flower1'} text-xs`}></i>
                          {post.in_market ? 'Mercado' : 'Produção'}
                        </span>
                      </div>
                    </div>
                    {images.length > 0 && (
                      <FeedPhotoPreview images={images} alt={post.title} onOpen={() => navigate(`/post/${post.id}`)} />
                    )}
                    {post.body && (
                      <div className="px-4 pt-3 pb-1">
                        <p className="text-gray-700 text-sm leading-relaxed">{post.body}</p>
                      </div>
                    )}
                    {post.linked_products.length > 0 && (
                      <div className="px-4 pt-2 flex flex-wrap gap-2">
                        {post.linked_products.map(lp => {
                          const productId = lp.product_id ?? lp.id ?? lp.product?.id
                          const label = lp.label || `Ver produto: ${lp.product_name || lp.product?.name || ''}`.trim()
                          return (
                            <button key={productId}
                              onClick={(e) => { e.stopPropagation(); navigate(`/product/${productId}`) }}
                              className="inline-flex items-center gap-1.5 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold click-scale">
                              <i className="bi bi-cart3"></i>
                              {label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                    {(likesCount > 0 || post.answers_count > 0) && (
                      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-400">
                        {likesCount > 0 && <span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center"><i className="bi bi-hand-thumbs-up-fill text-white text-[10px]"></i></span>{likesCount}</span>}
                        {post.answers_count > 0 && <button onClick={() => toggleComments(post.id)} className="hover:underline ml-auto">{post.answers_count} comentário{post.answers_count !== 1 ? 's' : ''}</button>}
                      </div>
                    )}
                    <div className="border-t border-gray-100 px-2 py-1 flex items-center">
                      <div className="relative flex-1">
                        {showReactionPanel === post.id && (
                          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-xl border border-gray-100 px-3 py-2 flex gap-3 z-30">
                            {REACTIONS.map(r => (
                              <button key={r.key} onClick={() => handleReaction(post.id, r.key)} className="flex flex-col items-center gap-0.5 hover:scale-125 transition-transform" title={r.label}>
                                {r.emoji ? <span className="text-2xl leading-none">{r.emoji}</span> : <i className="bi bi-hand-thumbs-up-fill text-2xl text-green-600"></i>}
                                <span className="text-[9px] text-gray-400">{r.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        <button onClick={() => handleLike(post.id)} onMouseDown={() => handlePressStart(post.id)} onMouseUp={handlePressEnd} onMouseLeave={handlePressEnd} onTouchStart={() => handlePressStart(post.id)} onTouchEnd={handlePressEnd}
                          className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isLiked ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-50'}`}>
                          {reactionData?.emoji ? <span className="text-lg">{reactionData.emoji}</span> : <i className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} text-lg`}></i>}
                          <span>{reactionData ? reactionData.label : 'Curtir'}</span>
                        </button>
                      </div>
                      <button onClick={() => toggleComments(post.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${commentsExpanded ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <i className={`bi ${commentsExpanded ? 'bi-chat-fill' : 'bi-chat'} text-lg`}></i> Comentar
                      </button>
                      <button onClick={() => handleShare(post.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${showShareModal === post.id ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <i className="bi bi-share text-lg"></i> Partilhar
                      </button>
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
