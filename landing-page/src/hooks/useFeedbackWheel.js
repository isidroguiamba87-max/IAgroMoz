import { useEffect } from 'react'

const SWEEP = 220 // graus percorridos ao longo do scroll da secção

// Posiciona os cartões de testemunho num círculo à volta de --wd (definido em
// .wheel-rim), combinando progresso de scroll + rotação lenta em repouso.
// Manipula os elementos diretamente via ref (fora do ciclo do React) — é um
// loop por frame, tal como as cenas Three.js, não faz sentido passar por state.
export function useFeedbackWheel({ sectionRef, rimRef, cardRefs }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    const rim = rimRef.current
    const cards = cardRefs.current.filter(Boolean)
    if (!section || !rim || !cards.length) return

    let cx = 0
    let cy = 0
    let R = 380

    function measure() {
      const rect = section.getBoundingClientRect()
      const h = window.innerHeight
      cy = h / 2
      cx = 0
      R = Math.min(430, h * 0.42, rect.width * 0.34)
      rim.style.setProperty('--wd', `${R * 2}px`)
    }
    measure()
    window.addEventListener('resize', measure)

    const vis = { v: true }
    const io = new IntersectionObserver(([entry]) => { vis.v = entry.isIntersecting }, { threshold: 0.05 })
    io.observe(section)

    function prog() {
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      if (total <= 0) return 0
      const scrolled = -rect.top
      return Math.min(1, Math.max(0, scrolled / total))
    }

    const step = (2 * Math.PI) / cards.length

    function render(angle) {
      cards.forEach((card, i) => {
        let a = i * step - angle
        a = ((a + Math.PI) % (2 * Math.PI)) - Math.PI // normaliza -180..180
        const deg = (a * 180) / Math.PI
        if (Math.abs(deg) > 86) {
          card.style.opacity = 0
          card.style.pointerEvents = 'none'
          return
        }
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        const scale = 0.72 + (1 - Math.abs(deg) / 86) * 0.4
        const opacity = 1 - Math.abs(deg) / 100
        card.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`
        card.style.opacity = opacity
        card.style.pointerEvents = 'auto'
        card.style.zIndex = String(1000 - Math.round(Math.abs(deg)))
      })
    }

    let handle = null
    function frame(t) {
      if (vis.v) {
        const angle = prog() * (SWEEP * Math.PI / 180) + t * 0.00012
        render(angle)
      }
      if (!reduce) handle = requestAnimationFrame(frame)
    }
    if (reduce) {
      render(0)
    } else {
      handle = requestAnimationFrame(frame)
    }

    return () => {
      if (handle) cancelAnimationFrame(handle)
      window.removeEventListener('resize', measure)
      io.disconnect()
    }
  }, [sectionRef, rimRef, cardRefs])
}
