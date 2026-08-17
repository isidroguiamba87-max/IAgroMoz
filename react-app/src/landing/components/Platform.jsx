import { useRef } from 'react'
import { useLang } from '../LangContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useTiltCards } from '../hooks/useTiltCards'

// "A plataforma" — explica a proposta de valor e os 4 módulos antes de
// revelar os perfis (cria curiosidade primeiro, "porquê perfis" depois).
function Platform() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)
  useTiltCards(sectionRef)

  return (
    <section className="block" id="plataforma" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.platform.eyebrow}</span>
          <h2>{t.platform.title}</h2>
          <p>{t.platform.lead}</p>
        </div>
        <div className="platform-grid">
          {t.platform.modules.map((mod) => (
            <div className="platform-card tilt3 reveal" key={mod.title}>
              <div className="platform-icon"><i className={`bi ${mod.icon}`}></i></div>
              <h3>{mod.title}</h3>
              <p>{mod.desc}</p>
            </div>
          ))}
        </div>
        <div className="platform-diffs reveal">
          <span className="platform-diffs-title">{t.platform.diffTitle}</span>
          <div className="chips">
            {t.platform.differentiators.map((d) => (
              <span className="chip" key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
