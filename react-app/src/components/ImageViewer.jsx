import { useState, useEffect, useCallback } from 'react'

// Lightbox reutilizável — clica na imagem para abrir, zoom, download, partilha
function ImageViewer({ src, alt = 'Imagem', className = '', imgClassName = '' }) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [downloaded, setDownloaded] = useState(false)

  const close = useCallback(() => { setOpen(false); setZoom(1) }, [])

  // Fechar com Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, close])

  // Bloquear scroll quando aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleDownload = async () => {
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = alt.replace(/\s+/g, '_') + '.jpg'
      a.click()
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    } catch {
      // Fallback — abrir em nova aba
      window.open(src, '_blank')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: alt, url: src })
      } catch (_) {}
    } else {
      navigator.clipboard.writeText(src)
      alert('Link da imagem copiado!')
    }
  }

  const zoomIn = () => setZoom(z => Math.min(z + 0.5, 4))
  const zoomOut = () => setZoom(z => Math.max(z - 0.5, 0.5))
  const resetZoom = () => setZoom(1)

  if (!src) return null

  return (
    <>
      {/* Imagem clicável */}
      <div className={className} onClick={() => setOpen(true)}>
        <img
          src={src}
          alt={alt}
          className={`cursor-zoom-in ${imgClassName}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95"
          onClick={close}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-white text-sm font-medium truncate max-w-xs opacity-80">{alt}</p>
            <div className="flex items-center gap-2">
              {/* Zoom out */}
              <button onClick={zoomOut} disabled={zoom <= 0.5}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 transition-all">
                <i className="bi bi-zoom-out text-lg"></i>
              </button>
              {/* Zoom reset */}
              <button onClick={resetZoom}
                className="px-3 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">
                {Math.round(zoom * 100)}%
              </button>
              {/* Zoom in */}
              <button onClick={zoomIn} disabled={zoom >= 4}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 transition-all">
                <i className="bi bi-zoom-in text-lg"></i>
              </button>
              {/* Download */}
              <button onClick={handleDownload}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <i className={`bi ${downloaded ? 'bi-check-lg text-green-400' : 'bi-download'} text-lg`}></i>
              </button>
              {/* Partilhar */}
              <button onClick={handleShare}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <i className="bi bi-share text-lg"></i>
              </button>
              {/* Abrir em nova aba */}
              <a href={src} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <i className="bi bi-box-arrow-up-right text-lg"></i>
              </a>
              {/* Fechar */}
              <button onClick={close}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/60 text-white flex items-center justify-center transition-all ml-1">
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </div>
          </div>

          {/* Imagem */}
          <div
            className="flex-1 flex items-center justify-center overflow-auto p-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Dica */}
          <div className="text-center pb-3 flex-shrink-0">
            <p className="text-white/30 text-xs">Clica fora ou pressiona Esc para fechar</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageViewer
