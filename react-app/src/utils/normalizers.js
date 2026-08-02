import { API_MEDIA } from '../config/api'

// ─── Transações ───────────────────────────────────────────────────────────────

export function normTx(tx) {
  return {
    id:                     tx.id,
    status:                 tx.status || 'RESERVED',
    product_id:             tx.product?.id || tx.product_id || tx.product || null,
    product_name:           tx.product_name || tx.product?.name || tx.product?.nome || 'Produto',
    product_photo:          tx.product?.photo || tx.product?.foto || tx.product_photo || null,
    quantity:               tx.quantity ?? 1,
    unit_name:              tx.unit_name || tx.unit || 'un',
    amount:                 tx.amount || tx.total_price || tx.price || '0',
    created_at:             tx.created_at || tx.criado_em || '',
    buyer_id:               tx.buyer?.id ?? tx.buyer_id ?? (Number.isFinite(tx.buyer) ? tx.buyer : null),
    buyer_name:             tx.buyer_name || (tx.buyer?.first_name ? `${tx.buyer.first_name} ${tx.buyer.last_name || ''}`.trim() : null) || 'Comprador',
    seller_id:              tx.seller?.id ?? tx.seller_id ?? tx.product?.seller?.id ?? tx.product?.seller_id ?? (Number.isFinite(tx.seller) ? tx.seller : null),
    seller_name:            tx.seller_name || (tx.seller?.first_name ? `${tx.seller.first_name} ${tx.seller.last_name || ''}`.trim() : null) || 'Vendedor',
    buyer_contact_name:     tx.buyer_contact_name || tx.buyer_name || '',
    buyer_contact_phone:    tx.buyer_contact_phone || tx.buyer_phone || tx.buyer?.contact || '',
    buyer_contact_whatsapp: tx.buyer_contact_whatsapp || tx.buyer_contact_phone || tx.buyer_phone || tx.buyer?.contact || '',
    buyer_whatsapp:         tx.buyer_whatsapp || '',
    seller_phone:           tx.seller_phone || tx.seller?.phone || tx.seller?.contact || '',
    seller_whatsapp:        tx.seller_whatsapp || tx.seller_phone || tx.seller?.phone || tx.seller?.contact || '',
    delivery_address:       tx.delivery_address || tx.address || tx.location || '',
    note:                   tx.note || tx.observations || tx.comments || '',
    cancel_reason:          tx.cancel_reason || tx.cancellation_reason || tx.rejection_reason || tx.motivo || '',
  }
}

// ─── Produtos ─────────────────────────────────────────────────────────────────

export function normProduct(p) {
  return {
    id:            p.id,
    name:          p.name || p.nome || '',
    description:   p.description || p.descricao || '',
    price:         p.price || p.preco || '0',
    photo:         p.photo || p.foto || null,
    photos:        Array.isArray(p.photos) ? p.photos : [],
    category:      p.category || p.categoria || '',
    subcategory:   p.subcategory || '',
    district:      p.district?.name || p.district || p.distrito || '',
    seller:        typeof p.seller === 'object'
      ? `${p.seller?.first_name || ''} ${p.seller?.last_name || ''}`.trim()
      : (p.seller || p.vendedor || ''),
    seller_id:     p.seller?.id || p.seller_id || p.vendedor_id || null,
    avg_rating:    parseFloat(p.average_rating || p.media_avaliacao || 0),
    total_ratings: p.total_ratings || p.total_avaliacoes || 0,
    created_at:    p.created_at || p.criado_em || '',
  }
}

// ─── Chat de Negociação (marketplace/chats) ────────────────────────────────────

export function normNegotiationChat(c) {
  const myId = String(localStorage.getItem('userId') || '')
  const buyerId = String(c.buyer_id ?? c.buyer?.id ?? c.buyer ?? '')
  const isBuyer = !!myId && buyerId === myId
  const lastMessage = c.last_message
  return {
    id: c.id,
    status: c.status || 'ACTIVE',
    productId: c.product_id ?? c.product?.id ?? c.reservation?.product_id ?? null,
    productName: c.product_name || c.product?.name || c.reservation?.product_name || '',
    otherName: isBuyer
      ? (c.seller_name || c.seller?.store_name || `${c.seller?.first_name || ''} ${c.seller?.last_name || ''}`.trim() || c.seller?.username || 'Vendedor')
      : (c.buyer_name || `${c.buyer?.first_name || ''} ${c.buyer?.last_name || ''}`.trim() || c.buyer?.username || 'Comprador'),
    otherPhoto: isBuyer ? (c.seller?.profile_photo || null) : (c.buyer?.profile_photo || null),
    lastMessage: typeof lastMessage === 'string' ? lastMessage : (lastMessage?.content || ''),
    lastMessageAt: (typeof lastMessage === 'object' && lastMessage?.created_at) || c.updated_at || c.created_at || null,
    unreadCount: c.unread_count ?? 0,
  }
}

export function normNegotiationMessage(m) {
  const myId = String(localStorage.getItem('userId') || '')
  const senderId = String(m.sender_id ?? m.sender?.id ?? m.sender ?? m.user_id ?? '')
  return {
    id: m.id,
    content: m.content || m.message || '',
    fromMe: !!myId && senderId === myId,
    senderName: m.sender_name || m.sender?.username || '',
    createdAt: m.created_at || m.timestamp || null,
  }
}

// ─── Utilizadores ─────────────────────────────────────────────────────────────

export function normalizeUserDisplayName(user) {
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

export function extractAuthorName(obj) {
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

// ─── Comentários ─────────────────────────────────────────────────────────────

export function normalizeComment(c) {
  return {
    id:          c.id || c.message_id || null,
    body:        c.mensagem || c.body || c.message || c.text || c.conteudo || '',
    author_name: extractAuthorName(c),
    author_id:   c.author_id || c.user?.id || c.autor?.id || c.user_id || (c.author && (c.author.id || c.author.user_id)) || null,
    created_at:  c.criado_em || c.created_at || c.timestamp || c.createdAt || null,
    parent:      c.parent ?? c.parent_message ?? null,
    replies:     Array.isArray(c.replies)
      ? c.replies.map(normalizeComment)
      : (Array.isArray(c.respostas) ? c.respostas.map(normalizeComment) : []),
  }
}

// ─── Media URL ────────────────────────────────────────────────────────────────

const BACKEND_HTTP_ORIGINS = ['http://65.21.165.103', 'http://192.168.88.67:8000']

export function resolveMediaUrl(path) {
  if (!path) return null
  // Converter URLs absolutas do backend para caminhos relativos (evita mixed content em HTTPS)
  for (const origin of BACKEND_HTTP_ORIGINS) {
    if (path.startsWith(origin)) return path.slice(origin.length)
  }
  if (path.startsWith('http')) return path
  return API_MEDIA + (path.startsWith('/') ? path : '/' + path)
}

// ─── Telefone → WhatsApp URL ──────────────────────────────────────────────────

export function normalizePhoneForWhatsapp(value) {
  const digits = String(value || '').replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : null
}

// ─── Erros da API ─────────────────────────────────────────────────────────────

export function extractApiErrorMessage(err, fallback = 'Ocorreu um erro.') {
  if (!err) return fallback
  if (err?.data && typeof err.data === 'object') {
    const msgs = Object.values(err.data).flat().filter(Boolean)
    if (msgs.length) return msgs.join(' | ')
  }
  return err?.message || fallback
}
