function CultureIcon({ type }) {
  const icons = {
    plantacao: '🌱',
    pecuaria: '🐄',
    avicultura: '🐓',
    horticultura: '🥬',
    fruticultura: '🍎',
  }

  const labels = {
    plantacao: 'Plantação',
    pecuaria: 'Pecuária',
    avicultura: 'Avicultura',
    horticultura: 'Horticultura',
    fruticultura: 'Fruticultura',
  }

  return (
    <div className="flex items-center gap-2">
      <div className="culture-icon click-scale">
        {icons[type] || '🌾'}
      </div>
      <span className="text-sm font-semibold text-gray-700">
        {labels[type] || 'Agricultura'}
      </span>
    </div>
  )
}

export default CultureIcon
