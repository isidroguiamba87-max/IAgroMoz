import { useMemo } from 'react'

export function Sparkline({ data, color = '#16a34a' }) {
  if (!data || data.length < 2) return null
  const vals = data.map(d => d.count || 0)
  const max = Math.max(...vals)
  const min = Math.min(...vals)
  const range = max - min || 1
  const width = 300
  const height = 80
  const points = vals.map((value, index) => {
    const x = (index / (vals.length - 1)) * width
    const y = height - ((value - min) / range) * (height - 10) - 5
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={points} />
      <polyline fill={`${color}22`} stroke="none" points={`0,${height} ${points} ${width},${height}`} />
    </svg>
  )
}

export function StatCard({ icon, label, value, sub, color = 'green', onClick }) {
  const palette = {
    green: ['bg-green-50', 'text-green-600', 'text-green-700'],
    blue: ['bg-blue-50', 'text-blue-600', 'text-blue-700'],
    orange: ['bg-orange-50', 'text-orange-600', 'text-orange-700'],
    purple: ['bg-purple-50', 'text-purple-600', 'text-purple-700'],
    teal: ['bg-teal-50', 'text-teal-600', 'text-teal-700'],
    red: ['bg-red-50', 'text-red-600', 'text-red-700'],
  }

  const [bg, iconColor, valueColor] = palette[color] || palette.green

  return (
    <div onClick={onClick} className={`${bg} rounded-3xl p-5 flex flex-col gap-3 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
        <i className={`${icon} text-2xl ${iconColor}`}></i>
      </div>
      <div>
        <p className={`text-3xl font-black ${valueColor}`}>{value ?? '—'}</p>
        {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
      </div>
    </div>
  )
}

export function Badge({ status }) {
  const map = {
    ACTIVE: ['bg-green-100 text-green-700', 'Activo'],
    INACTIVE: ['bg-gray-100 text-gray-600', 'Inactivo'],
    PENDING: ['bg-yellow-100 text-yellow-700', 'Pendente'],
    APPROVED: ['bg-green-100 text-green-700', 'Aprovado'],
    REJECTED: ['bg-red-100 text-red-700', 'Rejeitado'],
    RESERVED: ['bg-amber-100 text-amber-700', 'Reservado'],
    AWAITING_PAYMENT: ['bg-blue-100 text-blue-700', 'Ag. Pagamento'],
    PAID: ['bg-emerald-100 text-emerald-700', 'Pago'],
    COMPLETED: ['bg-green-100 text-green-700', 'Concluído'],
    CANCELLED: ['bg-red-100 text-red-700', 'Cancelado'],
    PENDING_VALIDATION: ['bg-yellow-100 text-yellow-700', 'Pendente'],
    VALIDATED: ['bg-green-100 text-green-700', 'Validada'],
    DISCARDED: ['bg-red-100 text-red-700', 'Descartada'],
    NORMAL: ['bg-gray-100 text-gray-700', 'Normal'],
    PRODUCER: ['bg-green-100 text-green-700', 'Produtor'],
    SELLER: ['bg-blue-100 text-blue-700', 'Vendedor'],
    ADMIN: ['bg-red-100 text-red-700', 'Admin'],
  }

  const [classes, label] = map[status] || ['bg-gray-100 text-gray-600', status || '—']
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${classes}`}>{label}</span>
}

export function Table({ cols, rows, loading, empty = 'Sem dados.' }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!rows || rows.length === 0) {
    return <div className="text-center py-12 text-gray-400 text-sm">{empty}</div>
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            {cols.map(col => (
              <th key={col.key} className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-gray-500 whitespace-nowrap">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <tr key={row.id ?? idx} className="hover:bg-gray-50 transition-colors">
              {cols.map(col => (
                <td key={col.key} className="px-4 py-3 align-top text-gray-700 whitespace-nowrap">
                  {col.render ? col.render(row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-black text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 max-w-2xl">{subtitle}</p>}
    </div>
  )
}
