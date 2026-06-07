function Logo({ size = 'md', showText = true }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size]} rounded-full overflow-hidden flex-shrink-0`}>
        <img 
          src="/logo.png" 
          alt="IAgroMOZ Logo" 
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <div>
          <h1 className={`${textSizes[size]} font-bold`} style={{ color: '#2d6b6b', letterSpacing: '0.02em' }}>
            IAgroMOZ
          </h1>
          <p className="text-xs text-gray-500 font-medium">Agricultura Inteligente</p>
        </div>
      )}
    </div>
  )
}

export default Logo
