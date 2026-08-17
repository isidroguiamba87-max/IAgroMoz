import { useRef } from 'react'
import { useLang } from '../LangContext'
import { FEEDBACK } from '../feedbackData'
import { useFeedbackWheel } from '../hooks/useFeedbackWheel'
import ChatCard from './ChatCard'

function FeedbackWheel() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const rimRef = useRef(null)
  const cardRefs = useRef([])

  useFeedbackWheel({ sectionRef, rimRef, cardRefs })

  return (
    <section className="fb-web feedback-web" id="feedbackWeb" ref={sectionRef}>
      <div className="fb-sticky">
        <div className="wheel-rim" ref={rimRef}></div>
        <div className="wheel" id="wheel">
          {FEEDBACK.map((item, i) => (
            <ChatCard item={item} key={item.name} ref={(el) => { cardRefs.current[i] = el }} />
          ))}
        </div>
        <div className="wheel-hub"></div>
        <div className="fb-copy">
          <span className="eyebrow">{t.feedback.web.eyebrow}</span>
          <h2>{t.feedback.web.title}</h2>
          <p>{t.feedback.web.lead}</p>
          <div className="hint">{t.feedback.web.hint}</div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackWheel
