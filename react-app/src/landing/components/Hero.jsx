import { useRef } from 'react'
import { useLang } from '../LangContext'
import { useHeroSlideshow } from '../hooks/useHeroSlideshow'
import { HERO_MEDIA } from '../heroMedia'

function Hero() {
  const { t, lang } = useLang()
  const photosRef = useRef(null)
  const { active } = useHeroSlideshow(HERO_MEDIA.length, photosRef)

  return (
    <section className="hero" id="top">
      {HERO_MEDIA.length > 0 && (
        <div className="hero-photos" ref={photosRef}>
          {HERO_MEDIA.map((media, i) => (
            <img
              key={media.src}
              src={media.src}
              alt={media.alt[lang] || media.alt.pt}
              className={`hero-photo${i === active ? ' active' : ''}`}
            />
          ))}
          <div className="hero-scrim"></div>
        </div>
      )}
      <div className="wrap">
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1>{t.hero.titlePre}<span className="em">{t.hero.titleEm}</span>{t.hero.titlePost}</h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="hero-cta">
          <a className="btn btn-light" href="https://www.iagromoz.com/feed">{t.hero.ctaPrimary}</a>
          <a className="btn btn-ghost" href="#tour">{t.hero.ctaGhost}</a>
        </div>
        <div className="chips">
          {t.hero.chips.map((chip) => (
            <span className="chip" key={chip}>{chip}</span>
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
