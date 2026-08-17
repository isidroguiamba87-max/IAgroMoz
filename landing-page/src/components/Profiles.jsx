import { useRef } from 'react'
import { useLang } from '../LangContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useTiltCards } from '../hooks/useTiltCards'

const BADGE_STYLE = {
  user: { background: '#e7f0e2', color: '#1E6B3A' },
  producer: { background: '#eef7e1', color: '#3E8E2E', borderColor: '#7CBE3C' },
  seller: { background: '#fbe9e5', color: '#D24A2E' },
}

function Profiles() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)
  useTiltCards(sectionRef)

  return (
    <section className="block" id="perfis" style={{ background: 'linear-gradient(180deg,#EDF2E4,#e6eedb)' }} ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.profiles.eyebrow}</span>
          <h2>{t.profiles.title}</h2>
          <p>{t.profiles.lead}</p>
        </div>
        <div className="profiles">
          {t.profiles.cards.map((card) => (
            <div className="prof tilt3 reveal" key={card.key} style={card.key === 'producer' ? { borderColor: '#7CBE3C' } : undefined}>
              <span className="badge" style={BADGE_STYLE[card.key]}>{card.badge}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="can">
                {card.can.map((item) => (
                  <span key={item}><i>✓</i>{item}</span>
                ))}
                {card.cannot.map((item) => (
                  <span className="no" key={item}><i>✕</i>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Profiles
