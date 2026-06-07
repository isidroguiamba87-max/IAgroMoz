function LoadingPlant() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="loading-plant absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-16 bg-gradient-to-t from-green-700 to-green-400 rounded-t-full"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl">
          🌱
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 font-medium">Carregando...</p>
    </div>
  )
}

export default LoadingPlant
