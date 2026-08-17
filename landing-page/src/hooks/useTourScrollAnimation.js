import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

// Desktop (≥900px): pina #stageSticky e avança as legendas conforme o
// progresso do scroll (GSAP ScrollTrigger). Mobile (<900px): carrossel
// autoplay + swipe. O React continua a ser dono do slide activo (`active`/
// `setActive`) — este hook só decide QUANDO mudar, a troca visual em si já
// é feita pelo Tour.jsx via opacidade condicional.
export function useTourScrollAnimation({ stickyRef, screenRef, tiltRef, count, active, setActive }) {
  const stRef = useRef(null)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document.body.classList.add('tour-static')
      return
    }
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger)
      registered = true
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const sticky = stickyRef.current
      if (!sticky) return
      const st = ScrollTrigger.create({
        trigger: sticky,
        start: 'top top',
        end: () => `+=${(count - 1) * window.innerHeight * 1.05}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(count - 1, Math.round(self.progress * (count - 1)))
          if (idx !== activeRef.current) setActive(idx)
        },
      })
      stRef.current = st
      return () => { stRef.current = null; st.kill() }
    })

    mm.add('(max-width: 899px)', () => {
      let i = activeRef.current
      const advance = () => { i = (i + 1) % count; setActive(i) }
      const timer = setInterval(advance, 3600)

      const screen = screenRef.current
      let startX = 0
      const onStart = (e) => { startX = e.touches ? e.touches[0].clientX : e.clientX }
      const onEnd = (e) => {
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
        const dx = endX - startX
        if (Math.abs(dx) > 40) {
          i = dx < 0 ? (i + 1) % count : (i - 1 + count) % count
          setActive(i)
        }
      }
      screen?.addEventListener('touchstart', onStart)
      screen?.addEventListener('touchend', onEnd)

      return () => {
        clearInterval(timer)
        screen?.removeEventListener('touchstart', onStart)
        screen?.removeEventListener('touchend', onEnd)
      }
    })

    return () => mm.revert()
  }, [stickyRef, screenRef, count, setActive])

  // Pequena inclinação do telemóvel a cada mudança de ecrã.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tilt = tiltRef.current
    if (!tilt || reduce) return
    gsap.fromTo(tilt, { rotateY: 10 }, { rotateY: 0, duration: 0.6, ease: 'power2.out' })
  }, [active, tiltRef])

  const goTo = useCallback((i) => {
    setActive(i)
    const st = stRef.current
    if (st) {
      const pos = st.start + (i / (count - 1)) * (st.end - st.start)
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }, [count, setActive])

  return { goTo }
}
