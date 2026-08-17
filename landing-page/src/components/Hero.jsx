import { useRef } from 'react'
import { useLang } from '../LangContext'
import { useParticleScene } from '../hooks/useParticleScene'

function Hero() {
  const { t } = useLang()
  const canvasRef = useRef(null)
  useParticleScene(canvasRef, 'leaves')

  return (
    <section className="hero" id="top">
      <canvas id="leaves" ref={canvasRef}></canvas>
      <div className="wrap">
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1>{t.hero.titlePre}<span className="em">{t.hero.titleEm}</span>{t.hero.titlePost}</h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="hero-cta">
          <a className="btn btn-light" href="https://www.iagromoz.com">{t.hero.ctaPrimary}</a>
          <a className="btn btn-ghost" href="#tour">{t.hero.ctaGhost}</a>
        </div>
        <div className="chips">
          {t.hero.chips.map((chip) => (
            <span className="chip" key={chip}>✳ <b>{chip}</b></span>
          ))}
        </div>
        <div className="scroll-hint">
          <div className="mouse"></div>
          <span>{t.hero.scrollHint}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
