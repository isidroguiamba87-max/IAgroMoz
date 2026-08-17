import { useRef, useState } from 'react'
import { useLang } from '../LangContext'
import { useParticleScene } from '../hooks/useParticleScene'
import { useTourScrollAnimation } from '../hooks/useTourScrollAnimation'
import feedImg from '../assets/screens/feed.jpg'
import chatImg from '../assets/screens/chat.jpg'
import tecnicasImg from '../assets/screens/tecnicas.jpg'
import mercadoImg from '../assets/screens/mercado.jpg'

const SCREENS = { feed: feedImg, chat: chatImg, tecnicas: tecnicasImg, mercado: mercadoImg }

function Tour() {
  const { t } = useLang()
  const netCanvasRef = useRef(null)
  const stageRef = useRef(null)
  const stickyRef = useRef(null)
  const screenRef = useRef(null)
  const tiltRef = useRef(null)
  const [active, setActive] = useState(0)

  useParticleScene(netCanvasRef)
  const { goTo } = useTourScrollAnimation({ stickyRef, screenRef, tiltRef, count: t.tour.captions.length, active, setActive })

  return (
    <div className="tour" id="tour">
      <canvas id="net" ref={netCanvasRef}></canvas>
      <div className="tour-head reveal">
        <span className="eyebrow">{t.tour.eyebrow}</span>
        <h2>{t.tour.title}</h2>
        <p>{t.tour.lead}</p>
      </div>
      <section className="stage" id="stage" ref={stageRef}>
        <div className="stage-sticky" id="stageSticky" ref={stickyRef}>
          <div className="captions">
            {t.tour.captions.map((cap, i) => (
              <div className={`cap${i === active ? ' active' : ''}`} key={cap.num}>
                <span className="num">{cap.num}</span>
                <h2>{cap.title}</h2>
                <p>{cap.body}</p>
                <img className="cap-shot" src={SCREENS[cap.screen]} alt={cap.title} />
              </div>
            ))}
          </div>
          <div className="phone-col">
            <div className="device-tilt" id="tilt" ref={tiltRef}>
              <div className="device">
                <span className="power"></span>
                <div className="screen" id="screen" ref={screenRef}>
                  {t.tour.captions.map((cap, i) => (
                    <div className="slide" key={cap.num} style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : 1 }}>
                      <img src={SCREENS[cap.screen]} alt={cap.title} data-screen={cap.screen} />
                    </div>
                  ))}
                  <div className="gloss"></div>
                </div>
              </div>
            </div>
            <div className="dots" id="dots">
              {t.tour.dotLabels.map((label, i) => (
                <button
                  key={label}
                  className={`dot${i === active ? ' on' : ''}`}
                  aria-label={label}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tour
