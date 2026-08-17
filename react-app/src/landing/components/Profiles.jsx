import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LangContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useTiltCards } from '../hooks/useTiltCards'
import userImg from '../assets/screens/perfil-user.png'
import producerImg from '../assets/screens/perfil-producer.png'
import sellerImg from '../assets/screens/perfil-seller.png'

const SCREENS = { criar: userImg, tecnicas: producerImg, mercado: sellerImg }

const BADGE_STYLE = {
  user: { background: '#e7f0e2', color: '#1E6B3A' },
  producer: { background: '#eef7e1', color: '#3E8E2E', borderColor: '#7CBE3C' },
  seller: { background: '#fbe9e5', color: '#D24A2E' },
}

const PROF_STAGE_MS = 7000

function Profiles() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)
  useTiltCards(sectionRef)
  const cards = t.profiles.cards
  const [active, setActive] = useState(0)

  // Só o desktop mostra um perfil de cada vez (imagem à direita, texto à
  // esquerda), a trocar sozinho a cada 7s — no mobile mantém-se a lista dos
  // 3 cartões em texto, como já estava.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = setInterval(() => setActive((i) => (i + 1) % cards.length), PROF_STAGE_MS)
    return () => clearInterval(interval)
  }, [cards.length])

  return (
    <section className="block" id="perfis" style={{ background: 'linear-gradient(180deg,#EDF2E4,#e6eedb)' }} ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.profiles.eyebrow}</span>
          <h2>{t.profiles.title}</h2>
          <p>{t.profiles.lead}</p>
        </div>

        {/* Mobile (<900px) — os 3 cartões em texto, um por baixo do outro */}
        <div className="profiles">
          {cards.map((card) => (
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

        {/* Desktop (≥900px) — um perfil de cada vez, texto à esquerda, foto à direita */}
        <div className="prof-stage reveal">
          <div className="prof-stage-info">
            {cards.map((card, i) => (
              <div className={`prof-pane${i === active ? ' active' : ''}`} key={card.key}>
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
            <div className="dots prof-stage-dots">
              {cards.map((card, i) => (
                <button key={card.key} className={`dot${i === active ? ' on' : ''}`}
                  aria-label={card.title} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>
          <div className="prof-stage-shot">
            {cards.map((card, i) => (
              SCREENS[card.screen] && (
                <img key={card.key} src={SCREENS[card.screen]} alt={card.title}
                  className={`prof-stage-img${i === active ? ' active' : ''}`} />
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profiles
