import { useState, useRef } from 'react'
import ImageViewer from './ImageViewer'

// Galeria de fotos com carrossel + indicadores — uma foto ou várias.
// Partilhada entre Feed (posts) e ProductDetail (produtos).
function PhotoGallery({ images, alt }) {
  const [active, setActive] = useState(0)
  const scrollerRef = useRef(null)

  const handleScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  if (!images || images.length === 0) return null

  return (
    <div className="relative">
      <div ref={scrollerRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {images.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0 snap-center">
            <ImageViewer
              src={src}
              alt={`${alt || 'Imagem'} (${i + 1}/${images.length})`}
              imgClassName="w-full object-contain max-h-[600px] bg-black/5"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          {images.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
