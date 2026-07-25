import { useState } from 'react'

// Wrapper para imagens de conteúdo (posts, produtos) com lazy loading nativo.
// Não usar para logos/ícones acima do fold — esses carregam sempre imediatamente.
function LazyImage({ src, alt, className = '', fallback = null, onError }) {
  const [error, setError] = useState(false)

  const handleError = (e) => {
    setError(true)
    onError?.(e)
  }

  if (error || !src) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  )
}

export default LazyImage
