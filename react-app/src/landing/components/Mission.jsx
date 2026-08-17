import { useRef } from 'react'
import { useLang } from '../LangContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

function Mission() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)

  return (
    <section className="block" id="missao" style={{ paddingBottom: 0 }} ref={sectionRef}>
      <div className="wrap">
        <div className="mission reveal">
          <span className="eyebrow">{t.mission.eyebrow}</span>
          <blockquote>{t.mission.quote}</blockquote>
        </div>
      </div>
    </section>
  )
}

export default Mission
