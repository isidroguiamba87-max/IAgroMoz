import { useState } from 'react'
import StarRating from './StarRating'
import api from '../services/api'

const friendlyRatingError = (err, ratingType) => {
  const errData = err?.data
  const status = err?.status || err?.response?.status
  const raw = errData ? Object.values(errData).flat().join(' | ') : (err?.message || 'Erro ao enviar avaliação.')
  const lower = raw.toLowerCase()
  if (lower.includes('auto') || lower.includes('próprio') || lower.includes('yourself')) {
    return 'Não podes avaliar o teu próprio produto ou perfil.'
  }
  if (lower.includes('duplic') || lower.includes('already') || lower.includes('once')) {
    return 'Já avaliaste este ' + (ratingType === 'produto' ? 'produto' : 'vendedor') + ' anteriormente.'
  }
  if (lower.includes('não encontrado') || lower.includes('not found') || status === 404) {
    return 'Não foi possível encontrar o perfil para avaliar.'
  }
  return raw
}

// Modal partilhado de avaliação (produto e/ou vendedor). Usado a partir de
// uma reserva concluída — reaproveita o mesmo padrão já usado no ProductDetail.
function RatingModal({ productId, sellerId, productName, sellerName, onClose, onSubmitted }) {
  const [ratingType, setRatingType] = useState(productId ? 'produto' : 'vendedor')
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const hasBoth = !!productId && !!sellerId

  const handleSubmit = async () => {
    if (userRating === 0) { setError('Selecione uma avaliação de 1 a 5 estrelas'); return }
    const score = parseFloat(userRating)
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      if (ratingType === 'produto') {
        await api.rateProduct(productId, score, userComment)
        setSuccess('Produto avaliado com sucesso! ⭐')
      } else {
        await api.rateVendedor(sellerId, score, userComment)
        setSuccess('Vendedor avaliado com sucesso! ⭐')
      }
      setTimeout(() => {
        onSubmitted?.(ratingType)
        onClose?.()
      }, 1200)
    } catch (err) {
      setError(friendlyRatingError(err, ratingType))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {ratingType === 'produto'
              ? <><i className="bi bi-star text-yellow-500 mr-1"></i>Avaliar Produto</>
              : <><i className="bi bi-person-check text-blue-600 mr-1"></i>Avaliar Vendedor</>}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {hasBoth && (
          <div className="flex gap-2 mb-4 bg-gray-100 rounded-xl p-1">
            <button onClick={() => { setRatingType('produto'); setError(''); setSuccess('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${ratingType === 'produto' ? 'bg-white shadow text-yellow-700' : 'text-gray-500'}`}>
              <i className="bi bi-star mr-1"></i>Produto
            </button>
            <button onClick={() => { setRatingType('vendedor'); setError(''); setSuccess('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${ratingType === 'vendedor' ? 'bg-white shadow text-blue-700' : 'text-gray-500'}`}>
              <i className="bi bi-person-check mr-1"></i>Vendedor
            </button>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-4">
          {ratingType === 'produto'
            ? <>Como foi a sua experiência com <strong>{productName || 'este produto'}</strong>?</>
            : <>Como foi a sua experiência com <strong>{sellerName || 'este vendedor'}</strong>?</>}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl mb-3 text-sm font-semibold text-center">{success}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-sm">A sua avaliação</label>
          <div className="flex justify-center">
            <StarRating rating={userRating} onRate={setUserRating} size="lg" />
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">Comentário (opcional)</label>
          <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)}
            className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" rows="3"
            placeholder={ratingType === 'produto' ? 'Conta a tua experiência com este produto...' : 'Conta a tua experiência com este vendedor...'} />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm">
            Agora não
          </button>
          <button onClick={handleSubmit} disabled={loading || userRating === 0}
            className="flex-1 btn-primary text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50">
            {loading ? 'A enviar...' : 'Enviar avaliação'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RatingModal
