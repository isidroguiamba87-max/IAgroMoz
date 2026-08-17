// Grelha de fotos ao estilo Facebook (1 a 5 fotos, o máximo suportado por post).
// Em vez de espremer tudo numa fila de miniaturas, mistura tamanhos — uma foto
// grande + as restantes menores — para que o padrão fique reconhecível e nada
// fique escondido sem indicação. Clicar em qualquer foto abre a publicação
// completa (onOpen), onde todas as fotos aparecem em coluna com as suas ações.
function Tile({ src, alt, i, onOpen, className = '', imgClassName = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} onClick={() => onOpen(i)}>
      <img src={src} alt={`${alt || 'Imagem'} ${i + 1}`} loading="lazy" decoding="async"
        className={`w-full h-full object-cover cursor-pointer ${imgClassName}`} />
    </div>
  )
}

function PhotoGrid({ images, alt, onOpen, maxHeight = 420 }) {
  if (!images || images.length === 0) return null
  const n = images.length
  const open = (i) => onOpen?.(i)

  if (n === 1) {
    return (
      <div className="cursor-pointer" onClick={() => open(0)}>
        <img src={images[0]} alt={alt || 'Imagem'} loading="lazy" decoding="async"
          className="w-full object-cover" style={{ maxHeight }} />
      </div>
    )
  }

  if (n === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5" style={{ height: maxHeight * 0.65 }}>
        {images.map((src, i) => <Tile key={i} src={src} alt={alt} i={i} onOpen={open} />)}
      </div>
    )
  }

  // 3 ou mais fotos — nunca mostra tudo de uma vez no cartão do feed: no
  // máximo 3 miniaturas (1 grande + 2 empilhadas), com "+N" sobre a última
  // quando há mais fotos por ver. Clicar em qualquer miniatura abre a
  // publicação completa, onde todas as fotos aparecem em coluna.
  const shown = images.slice(0, 3)
  const extra = n - shown.length
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5" style={{ height: maxHeight * 0.8 }}>
      <Tile src={shown[0]} alt={alt} i={0} onOpen={open} className="row-span-2" />
      {shown.slice(1).map((src, i) => {
        const idx = i + 1
        const isLast = idx === shown.length - 1
        return (
          <div key={idx} className="relative overflow-hidden" onClick={() => open(idx)}>
            <img src={src} alt={`${alt || 'Imagem'} ${idx + 1}`} loading="lazy" decoding="async"
              className="w-full h-full object-cover cursor-pointer" />
            {isLast && extra > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold text-lg">+{extra}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PhotoGrid
