import { useState } from 'react'

function Comment({ comment, onReply, onEdit, onDelete, currentUserId, depth = 0 }) {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showReplies, setShowReplies] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.body || '')

  const isOwner = currentUserId && comment.author_id && String(currentUserId) === String(comment.author_id)

  // Verificar se pode editar (dentro de 10 minutos)
  const canEdit = () => {
    if (!isOwner) return false
    const createdAt = new Date(comment.created_at)
    const now = new Date()
    const diffMinutes = (now - createdAt) / (1000 * 60)
    return diffMinutes <= 10
  }

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText)
      setReplyText('')
      setShowReplyBox(false)
    }
  }

  const handleSaveEdit = () => {
    if (!editText.trim()) return
    if (onEdit) onEdit(comment.id, editText.trim())
    setIsEditing(false)
  }

  const authorName = comment.author_name || comment.nome_completo || 'Utilizador'

  const timeAgo = (date) => {
    if (!date) return ''
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    const seconds = Math.floor((new Date() - d) / 1000)
    if (seconds < 60) return 'agora'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`
    return d.toLocaleDateString('pt-PT')
  }

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-3' : 'mb-4'}`}>
      <div className="flex gap-2">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-xs font-bold">
            {authorName?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          {/* Comment Bubble */}
          <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block max-w-full">
            <p className="font-semibold text-sm text-gray-800">{authorName}</p>
            {isEditing ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="form-input w-full mt-2 px-3 py-2 rounded-xl text-sm resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">{comment.body}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-1 px-2">
            <span className="text-xs text-gray-500">{timeAgo(comment.created_at)}</span>
            {!isEditing && (
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="text-xs font-semibold text-gray-600 hover:text-green-600"
              >
                Responder
              </button>
            )}
            {isOwner && !isEditing && canEdit() && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-gray-600 hover:text-green-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete && onDelete(comment.id)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  Apagar
                </button>
              </>
            )}
            {isOwner && !isEditing && !canEdit() && (
              <span className="text-xs text-gray-400 italic">
                (Já não pode editar - limite de 10 minutos excedido)
              </span>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="text-xs font-semibold text-green-600 hover:text-green-700"
                >
                  Guardar
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditText(comment.body) }}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-700"
                >
                  Cancelar
                </button>
              </>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs font-semibold text-gray-600 hover:text-green-600"
              >
                {showReplies ? 'Ocultar' : 'Ver'} {comment.replies.length} {comment.replies.length === 1 ? 'resposta' : 'respostas'}
              </button>
            )}
          </div>

          {/* Reply Box */}
          {showReplyBox && (
            <div className="mt-2 flex gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                U
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                  placeholder={`Responder a ${authorName}...`}
                  className="w-full px-3 py-2 text-sm rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Nested Replies */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map(reply => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  currentUserId={currentUserId}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
