import { useState } from 'react'

import { API_MEDIA } from '../config/api'

// Normaliza URL de foto — adiciona domínio se for relativa
function normalizeFoto(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  // URL relativa — adicionar domínio do backend
  return API_MEDIA + (url.startsWith('/') ? url : '/' + url)
}

// Avatar reutilizável — mostra foto_perfil se disponível, senão iniciais
// Se foto=undefined (não passado), usa localStorage. Se foto=null (explícito), não usa localStorage.
function Avatar({ name, foto, size = 'md', className = '' }) {
  const rawUrl = foto !== undefined ? foto : localStorage.getItem('userFoto')
  const foto_url = normalizeFoto(rawUrl)
  const initial = (name || localStorage.getItem('userName') || 'U').charAt(0).toUpperCase()
  const [imgError, setImgError] = useState(false)

  const sizes = {
    xs:  'w-6 h-6 text-[10px]',
    sm:  'w-8 h-8 text-xs',
    md:  'w-10 h-10 text-sm',
    lg:  'w-14 h-14 text-xl',
    xl:  'w-20 h-20 text-3xl',
    '2xl': 'w-24 h-24 text-4xl',
  }

  const sizeClass = sizes[size] || sizes.md
  const fallback = (
    <div className={`${sizeClass} rounded-full avatar-gradient flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}>
      {initial}
    </div>
  )

  if (foto_url && !imgError) {
    return (
      <img
        src={foto_url}
        alt={name || 'Avatar'}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
      />
    )
  }

  return fallback
}

export default Avatar
