import { useEffect } from 'react'

// Substitui o padrão original: IntersectionObserver genérico que adiciona
// .in a qualquer .reveal dentro do container e para de observar (one-shot).
export function useRevealOnScroll(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    if (!els.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [containerRef])
}
