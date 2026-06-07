import { useState, useRef, useEffect, useCallback } from 'react'

const FILTERS = [
  { id: 'none',      label: 'Original',   css: '' },
  { id: 'vivid',     label: 'Vívido',     css: 'saturate(1.8) contrast(1.1)' },
  { id: 'warm',      label: 'Quente',     css: 'sepia(0.3) saturate(1.4) brightness(1.05)' },
  { id: 'cool',      label: 'Frio',       css: 'hue-rotate(20deg) saturate(1.2) brightness(1.05)' },
  { id: 'food',      label: 'Comida',     css: 'saturate(1.6) contrast(1.15) brightness(1.08) hue-rotate(-10deg)' },
  { id: 'nature',    label: 'Natureza',   css: 'saturate(1.5) hue-rotate(10deg) brightness(1.05)' },
  { id: 'dramatic',  label: 'Dramático',  css: 'contrast(1.4) saturate(0.8) brightness(0.9)' },
  { id: 'bw',        label: 'P&B',        css: 'grayscale(1) contrast(1.2)' },
  { id: 'fade',      label: 'Desbotado',  css: 'brightness(1.1) saturate(0.7) contrast(0.9)' },
  { id: 'golden',    label: 'Dourado',    css: 'sepia(0.5) saturate(1.5) brightness(1.1)' },
]

const CROPS = [
  { id: 'free',  label: 'Livre',   ratio: null },
  { id: '1:1',   label: '1:1',     ratio: 1 },
  { id: '4:3',   label: '4:3',     ratio: 4/3 },
  { id: '16:9',  label: '16:9',    ratio: 16/9 },
  { id: '3:4',   label: '3:4',     ratio: 3/4 },
]

function ImageEditor({ src, onSave, onCancel }) {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const [tab, setTab] = useState('filters') // 'filters' | 'adjust' | 'crop'
  const [filter, setFilter] = useState('none')
  const [adjust, setAdjust] = useState({ brightness: 100, contrast: 100, saturation: 100, sharpness: 0 })
  const [cropRatio, setCropRatio] = useState(null)
  const [cropBox, setCropBox] = useState(null)
  const [dragging, setDragging] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 })
  const containerRef = useRef(null)

  // Carregar imagem
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imgRef.current = img
      setImgNaturalSize({ w: img.naturalWidth, h: img.naturalHeight })
      setImgLoaded(true)
    }
    img.src = src
  }, [src])

  // Calcular CSS filter combinado
  const getCssFilter = useCallback(() => {
    const base = FILTERS.find(f => f.id === filter)?.css || ''
    const adj = `brightness(${adjust.brightness}%) contrast(${adjust.contrast}%) saturate(${adjust.saturation}%)`
    return [base, adj].filter(Boolean).join(' ')
  }, [filter, adjust])

  // Inicializar crop box quando muda o ratio
  useEffect(() => {
    if (!imgLoaded || !containerRef.current) return
    const cont = containerRef.current
    const cw = cont.clientWidth
    const ch = cont.clientHeight
    if (cropRatio) {
      const boxW = Math.min(cw * 0.8, ch * cropRatio * 0.8)
      const boxH = boxW / cropRatio
      setCropBox({
        x: (cw - boxW) / 2,
        y: (ch - boxH) / 2,
        w: boxW,
        h: boxH,
      })
    } else {
      setCropBox(null)
    }
  }, [cropRatio, imgLoaded])

  // Exportar imagem com filtros e crop aplicados via Canvas
  const handleSave = () => {
    const img = imgRef.current
    if (!img) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

    // Aplicar crop se existir
    if (cropBox && containerRef.current) {
      const cont = containerRef.current
      const displayW = cont.clientWidth
      const displayH = cont.clientHeight
      const scaleX = img.naturalWidth / displayW
      const scaleY = img.naturalHeight / displayH
      sx = cropBox.x * scaleX
      sy = cropBox.y * scaleY
      sw = cropBox.w * scaleX
      sh = cropBox.h * scaleY
    }

    canvas.width = sw
    canvas.height = sh

    // Aplicar filtros CSS via canvas filter
    const cssFilter = getCssFilter()
    if (cssFilter) ctx.filter = cssFilter

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)

    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], 'edited_image.jpg', { type: 'image/jpeg', lastModified: Date.now() })
      const previewUrl = URL.createObjectURL(blob)
      onSave(file, previewUrl)
    }, 'image/jpeg', 0.92)
  }

  // Drag crop box
  const handleCropMouseDown = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX || e.touches?.[0]?.clientX
    const startY = e.clientY || e.touches?.[0]?.clientY
    const startBox = { ...cropBox }
    setDragging({ type, startX, startY, startBox })
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => {
      const cx = e.clientX || e.touches?.[0]?.clientX
      const cy = e.clientY || e.touches?.[0]?.clientY
      const dx = cx - dragging.startX
      const dy = cy - dragging.startY
      const cont = containerRef.current
      if (!cont) return
      const cw = cont.clientWidth
      const ch = cont.clientHeight

      setCropBox(prev => {
        if (!prev) return prev
        let { x, y, w, h } = dragging.startBox
        if (dragging.type === 'move') {
          x = Math.max(0, Math.min(cw - w, x + dx))
          y = Math.max(0, Math.min(ch - h, y + dy))
        } else if (dragging.type === 'se') {
          w = Math.max(40, x + w + dx <= cw ? w + dx : cw - x)
          h = cropRatio ? w / cropRatio : Math.max(40, y + h + dy <= ch ? h + dy : ch - y)
        } else if (dragging.type === 'sw') {
          const newW = Math.max(40, w - dx)
          x = x + w - newW
          w = newW
          h = cropRatio ? w / cropRatio : Math.max(40, y + h + dy <= ch ? h + dy : ch - y)
        } else if (dragging.type === 'ne') {
          w = Math.max(40, x + w + dx <= cw ? w + dx : cw - x)
          const newH = cropRatio ? w / cropRatio : Math.max(40, h - dy)
          y = y + h - newH
          h = newH
        } else if (dragging.type === 'nw') {
          const newW = Math.max(40, w - dx)
          x = x + w - newW
          w = newW
          const newH = cropRatio ? w / cropRatio : Math.max(40, h - dy)
          y = y + h - newH
          h = newH
        }
        return { x, y, w, h }
      })
    }
    const onUp = () => setDragging(null)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, cropRatio])

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 flex-shrink-0">
        <button onClick={onCancel} className="text-white/70 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-xl hover:bg-white/10">
          Cancelar
        </button>
        <p className="text-white font-bold text-sm">Editar foto</p>
        <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-xl">
          Usar foto
        </button>
      </div>

      {/* Preview */}
      <div ref={containerRef} className="flex-1 relative flex items-center justify-center overflow-hidden bg-black select-none">
        {imgLoaded && (
          <img
            src={src}
            alt="preview"
            className="max-w-full max-h-full object-contain pointer-events-none"
            style={{ filter: getCssFilter() }}
            draggable={false}
          />
        )}
        {/* Crop overlay */}
        {tab === 'crop' && cropBox && (
          <>
            {/* Escurecimento fora do crop */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to right, rgba(0,0,0,0.5) ${cropBox.x}px, transparent ${cropBox.x}px, transparent ${cropBox.x + cropBox.w}px, rgba(0,0,0,0.5) ${cropBox.x + cropBox.w}px)`,
            }} />
            {/* Caixa de crop */}
            <div
              className="absolute border-2 border-white cursor-move"
              style={{ left: cropBox.x, top: cropBox.y, width: cropBox.w, height: cropBox.h }}
              onMouseDown={e => handleCropMouseDown(e, 'move')}
              onTouchStart={e => handleCropMouseDown(e, 'move')}
            >
              {/* Grid lines */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '33.33% 33.33%',
              }} />
              {/* Handles */}
              {[
                { type: 'nw', style: { top: -6, left: -6, cursor: 'nw-resize' } },
                { type: 'ne', style: { top: -6, right: -6, cursor: 'ne-resize' } },
                { type: 'sw', style: { bottom: -6, left: -6, cursor: 'sw-resize' } },
                { type: 'se', style: { bottom: -6, right: -6, cursor: 'se-resize' } },
              ].map(h => (
                <div key={h.type}
                  className="absolute w-4 h-4 bg-white rounded-sm shadow-lg"
                  style={h.style}
                  onMouseDown={e => handleCropMouseDown(e, h.type)}
                  onTouchStart={e => handleCropMouseDown(e, h.type)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-black/90 flex-shrink-0">
        <div className="flex border-b border-white/10">
          {[
            { id: 'filters', label: 'Filtros', icon: 'bi-magic' },
            { id: 'adjust',  label: 'Ajustes', icon: 'bi-sliders' },
            { id: 'crop',    label: 'Recortar', icon: 'bi-crop' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${
                tab === t.id ? 'text-green-400 border-b-2 border-green-400' : 'text-white/50 hover:text-white/80'
              }`}>
              <i className={`bi ${t.icon} text-lg`}></i>
              {t.label}
            </button>
          ))}
        </div>

        {/* Filtros */}
        {tab === 'filters' && (
          <div className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all ${filter === f.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}>
                <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${filter === f.id ? 'border-green-400 scale-105' : 'border-transparent'}`}>
                  <img src={src} alt={f.label} className="w-full h-full object-cover"
                    style={{ filter: f.css || 'none' }} draggable={false} />
                </div>
                <span className="text-white text-[10px] font-medium">{f.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Ajustes */}
        {tab === 'adjust' && (
          <div className="px-4 py-3 space-y-3">
            {[
              { key: 'brightness', label: 'Brilho', icon: 'bi-sun', min: 50, max: 150 },
              { key: 'contrast',   label: 'Contraste', icon: 'bi-circle-half', min: 50, max: 150 },
              { key: 'saturation', label: 'Saturação', icon: 'bi-droplet', min: 0, max: 200 },
            ].map(({ key, label, icon, min, max }) => (
              <div key={key} className="flex items-center gap-3">
                <i className={`bi ${icon} text-white/60 text-sm w-5`}></i>
                <span className="text-white/70 text-xs w-16 flex-shrink-0">{label}</span>
                <input type="range" min={min} max={max} value={adjust[key]}
                  onChange={e => setAdjust(p => ({ ...p, [key]: Number(e.target.value) }))}
                  className="flex-1 accent-green-500 h-1.5" />
                <span className="text-white/50 text-xs w-8 text-right">{adjust[key]}</span>
                <button onClick={() => setAdjust(p => ({ ...p, [key]: 100 }))}
                  className="text-white/30 hover:text-white/60 text-xs">
                  <i className="bi bi-arrow-counterclockwise"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recortar */}
        {tab === 'crop' && (
          <div className="px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {CROPS.map(c => (
                <button key={c.id} onClick={() => setCropRatio(c.ratio)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    cropRatio === c.ratio ? 'bg-green-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}>
                  {c.label}
                </button>
              ))}
            </div>
            {cropBox && (
              <p className="text-white/30 text-xs mt-2 text-center">Arrasta para mover · Cantos para redimensionar</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageEditor
