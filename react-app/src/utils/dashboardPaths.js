export const getDashboardBasePath = (role = null) => {
  const normalized = (role || localStorage.getItem('userRole') || '').toLowerCase()
  return normalized === 'producer' ? '/producer/dashboard' : '/seller/dashboard'
}

export const getDashboardPath = (segment = '', role = null) => {
  const base = getDashboardBasePath(role)
  if (!segment) return base
  return segment.startsWith('/') ? `${base}${segment}` : `${base}/${segment}`
}

export const getDashboardLabel = (role = null) => {
  const normalized = (role || localStorage.getItem('userRole') || '').toLowerCase()
  return normalized === 'producer' ? 'Painel do Produtor' : 'Painel do Vendedor'
}

export const getDashboardRole = (role = null) => {
  const normalized = (role || localStorage.getItem('userRole') || '').toLowerCase()
  return normalized === 'producer' ? 'producer' : 'seller'
}
