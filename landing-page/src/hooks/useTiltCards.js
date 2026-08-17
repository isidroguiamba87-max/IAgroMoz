import { useEffect } from 'react'

// Efeito de inclinação 3D nos cartões .tilt3 ao mover o rato — desligado se
// o utilizador preferir menos movimento.
export function useTiltCards(containerRef) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const root = containerRef.current
    if (!root) return
    const cards = root.querySelectorAll('.tilt3')

    const onMove = (e) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`
    }
    const onLeave = (e) => { e.currentTarget.style.transform = '' }

    cards.forEach((card) => {
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
    })
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [containerRef])
}
