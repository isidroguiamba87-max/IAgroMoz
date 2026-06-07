import { useState } from 'react'

function StarRating({ rating = 0, onRate = null, readonly = false, size = 'md' }) {
  const [hover, setHover] = useState(0)
  
  const sizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  }
  
  const sizeClass = sizes[size] || sizes.md

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRate && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
          className={`${sizeClass} transition-all ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          }`}
        >
          <span
            className={
              star <= (hover || rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }
          >
            ★
          </span>
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating
