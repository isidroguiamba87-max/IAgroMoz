import { Navigate } from 'react-router-dom'
import '../landing/landing.css'
import { LangProvider } from '../landing/LangContext'
import pageBg from '../landing/assets/hero/01.jpeg'
import Nav from '../landing/components/Nav'
import Hero from '../landing/components/Hero'
import Tour from '../landing/components/Tour'
import Platform from '../landing/components/Platform'
import Profiles from '../landing/components/Profiles'
import FeedbackMarquee from '../landing/components/FeedbackMarquee'
import Mission from '../landing/components/Mission'
import Cta from '../landing/components/Cta'
import Footer from '../landing/components/Footer'

// Página inicial pública (marketing) — só para quem ainda não tem sessão.
// Quem já está autenticado passa direto para o Feed, sem ver a landing outra vez.
function Landing() {
  const isLoggedIn = !!localStorage.getItem('access_token')
  if (isLoggedIn) return <Navigate replace to="/feed" />

  return (
    <div className="lp-root">
      <div className="lp-page-bg">
        <img src={pageBg} alt="" />
        <div className="lp-page-scrim"></div>
      </div>
      <LangProvider>
        <Nav />
        <Hero />
        <Tour />
        <Platform />
        <Profiles />
        <FeedbackMarquee />
        <Mission />
        <Cta />
        <Footer />
      </LangProvider>
    </div>
  )
}

export default Landing
