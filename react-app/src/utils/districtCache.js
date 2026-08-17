import api from '../services/api'

// GET /districts/ (sem id de província) devolve todos os distritos — usado para
// resolver o id numérico de distrito (guardado nos produtos como FK) num nome legível.
let cache = null
let pending = null

export async function loadDistrictMap() {
  if (cache) return cache
  if (pending) return pending
  pending = api.getDistricts().then(list => {
    const arr = Array.isArray(list) ? list : (list?.results || [])
    cache = Object.fromEntries(arr.map(d => [String(d.id), d.name || d.nome || '']))
    return cache
  }).catch(() => (cache = {}))
  return pending
}

// value pode vir como objeto {name}, string (nome já resolvido) ou id numérico (FK crua)
export function districtLabel(value, map) {
  if (value == null || value === '') return ''
  if (typeof value === 'object') return value.name || value.nome || ''
  if (typeof value === 'string' && value.trim() !== '' && isNaN(Number(value))) return value
  return (map || cache || {})[String(value)] || ''
}
