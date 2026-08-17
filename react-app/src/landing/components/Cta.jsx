import { useRef } from 'react'
import { useLang } from '../LangContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

function Cta() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)

  return (
    <section className="block" id="cta" ref={sectionRef}>
      <div className="wrap">
        <div className="cta reveal">
          <span className="eyebrow">{t.cta.eyebrow}</span>
          <h2>{t.cta.title}</h2>
          <p>{t.cta.lead}</p>
          <a className="btn btn-light" href="https://www.iagromoz.com">{t.cta.button}</a>
          <div className="team">
            {t.cta.team}<b>Ku_kulaDevz</b> · <a href="mailto:kukuladevz@gmail.com">kukuladevz@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta
