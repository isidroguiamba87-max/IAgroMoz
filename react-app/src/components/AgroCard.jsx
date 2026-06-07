import RegionBadge from './RegionBadge'
import CultureIcon from './CultureIcon'

function AgroCard({ title, description, region, province, cultureType, author, date }) {
  return (
    <div className="agro-card p-6 mb-4 soil-texture">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <RegionBadge region={region} province={province} />
        <span className="text-xs text-gray-500">{date}</span>
      </div>

      {/* Culture Type */}
      <div className="mb-3">
        <CultureIcon type={cultureType} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-xs font-bold">
            {author.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700">{author}</span>
        </div>
        
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-green-600 transition-colors click-scale">
            <span className="text-lg">👍</span>
          </button>
          <button className="text-gray-500 hover:text-green-600 transition-colors click-scale">
            <span className="text-lg">💬</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgroCard
