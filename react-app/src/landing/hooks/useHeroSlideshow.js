import { useEffect, useRef, useState } from 'react'

const SLIDE_MS = 5000

// Faz o slideshow do Hero avançar por ordem (índice 0, 1, 2, ...) e dá um
// parallax 3D subtil à camada de fotos ao mover o rato — desliga-se sozinho
// se o utilizador preferir menos movimento.
export function useHeroSlideshow(count, layerRef) {
  const [active, setActive] = useState(0)
  const reducedRef = useRef(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (count <= 1) return
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % count)
    }, SLIDE_MS)
    return () => clearInterval(interval)
  }, [count])

  useEffect(() => {
    const el = layerRef.current
    if (!el || reducedRef.current) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `scale(1.08) translate3d(${-x * 18}px, ${-y * 14}px, 0)`
    }
    const onLeave = () => { el.style.transform = 'scale(1.08) translate3d(0, 0, 0)' }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [layerRef])

  return { active, reduced: reducedRef.current }
}
