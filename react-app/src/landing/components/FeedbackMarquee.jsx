import { useRef } from 'react'
import { useLang } from '../LangContext'
import { FEEDBACK } from '../feedbackData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import ChatCard from './ChatCard'

// Marquee mobile (<900px) — 2 filas, cada uma com metade dos testemunhos,
// duplicados para o loop de scroll parecer contínuo (CSS anima translateX -50%).
function Row({ items, className }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee reveal" style={className === 'r2' ? { marginTop: '.4rem' } : undefined}>
      <div className={`mtrack ${className}`}>
        {doubled.map((item, i) => <ChatCard item={item} key={`${item.name}-${i}`} />)}
      </div>
    </div>
  )
}

function FeedbackMarquee() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)
  const half = Math.ceil(FEEDBACK.length / 2)

  return (
    <section className="fb-mobile block" id="feedbackMobile" style={{ background: 'linear-gradient(180deg,#e6eedb,#EDF2E4)', paddingBottom: '5rem' }} ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.feedback.mobile.eyebrow}</span>
          <h2>{t.feedback.mobile.title}</h2>
          <p>{t.feedback.mobile.lead}</p>
        </div>
      </div>
      <Row items={FEEDBACK.slice(0, half)} className="r1" />
      <Row items={FEEDBACK.slice(half)} className="r2" />
    </section>
  )
}

export default FeedbackMarquee
