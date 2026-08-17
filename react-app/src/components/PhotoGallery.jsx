import { useState, useRef, useEffect, useCallback } from 'react'

// Galeria de fotos com carrossel + indicadores — uma foto ou várias.
// Partilhada entre Feed (posts) e ProductDetail (produtos).
//
// A galeria abre UM único lightbox partilhado (com botões anterior/seguinte
// e swipe) em vez de um lightbox independente por foto — várias instâncias
// de ImageViewer simultâneas causavam sobreposição visual ao navegar entre
// fotos de um mesmo produto/post.
function PhotoGallery({ images, alt }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [downloaded, setDownloaded] = useState(false)
  const scrollerRef = useRef(null)
  const touchStartX = useRef(null)

  const handleScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const openLightbox = (i) => { setLightboxIndex(i); setZoom(1); setLightboxOpen(true) }
  const closeLightbox = useCallback(() => setLightboxOpen(false), [])
  const nextImage = useCallback((e) => { e?.stopPropagation(); setZoom(1); setLightboxIndex(i => (i + 1) % images.length) }, [images?.length])
  const prevImage = useCallback((e) => { e?.stopPropagation(); setZoom(1); setLightboxIndex(i => (i - 1 + images.length) % images.length) }, [images?.length])

  useEffect(() => {
    if (!lightboxOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [lightboxOpen, closeLightbox, nextImage, prevImage])

  if (!images || images.length === 0) return null

  const zoomIn = () => setZoom(z => Math.min(z + 0.5, 4))
  const zoomOut = () => setZoom(z => Math.max(z - 0.5, 0.5))
  const resetZoom = () => setZoom(1)

  const handleDownload = async () => {
    const src = images[lightboxIndex]
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (alt || 'imagem').replace(/\s+/g, '_') + `_${lightboxIndex + 1}.jpg`
      a.click()
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    } catch {
      window.open(src, '_blank', 'noopener,noreferrer')
    }
  }

  const handleShare = async () => {
    const src = images[lightboxIndex]
    if (navigator.share) {
      try { await navigator.share({ title: alt, url: src }) } catch (_) {}
    } else {
      navigator.clipboard.writeText(src)
      alert('Link da imagem copiado!')
    }
  }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40 || images.length < 2) return
    if (delta < 0) nextImage()
    else prevImage()
  }

  return (
    <div className="relative">
      <div ref={scrollerRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {images.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0 snap-center" onClick={() => openLightbox(i)}>
            <img
              src={src}
              alt={`${alt || 'Imagem'} (${i + 1}/${images.length})`}
              className="w-full object-contain max-h-[600px] bg-black/5 cursor-zoom-in"
              loading="lazy"
              decoding="async"
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

      {lightboxOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-black/95" onClick={closeLightbox}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <p className="text-white text-sm font-medium truncate max-w-xs opacity-80">
              {alt || 'Imagem'} {images.length > 1 && `(${lightboxIndex + 1}/${images.length})`}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={zoomOut} disabled={zoom <= 0.5}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 transition-all">
                <i className="bi bi-zoom-out text-lg"></i>
              </button>
              <button onClick={resetZoom}
                className="px-3 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">
                {Math.round(zoom * 100)}%
              </button>
              <button onClick={zoomIn} disabled={zoom >= 4}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 transition-all">
                <i className="bi bi-zoom-in text-lg"></i>
              </button>
              <button onClick={handleDownload}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <i className={`bi ${downloaded ? 'bi-check-lg text-green-400' : 'bi-download'} text-lg`}></i>
              </button>
              <button onClick={handleShare}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <i className="bi bi-share text-lg"></i>
              </button>
              <a href={images[lightboxIndex]} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <i className="bi bi-box-arrow-up-right text-lg"></i>
              </a>
              <button onClick={closeLightbox}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/60 text-white flex items-center justify-center transition-all ml-1">
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </div>
          </div>

          {/* Imagem + navegação */}
          <div className="flex-1 flex items-center justify-center overflow-auto p-4 relative"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            {images.length > 1 && (
              <button onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10">
                <i className="bi bi-chevron-left text-xl"></i>
              </button>
            )}
            <img
              src={images[lightboxIndex]}
              alt={alt}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
            {images.length > 1 && (
              <button onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10">
                <i className="bi bi-chevron-right text-xl"></i>
              </button>
            )}
          </div>

          {/* Dica */}
          <div className="text-center pb-3 flex-shrink-0">
            <p className="text-white/30 text-xs">
              {images.length > 1 ? 'Desliza ou usa as setas para ver mais fotos · ' : ''}Clica fora ou pressiona Esc para fechar
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
