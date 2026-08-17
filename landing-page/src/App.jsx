import { LangProvider } from './LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Tour from './components/Tour'
import Profiles from './components/Profiles'
import FeedbackWheel from './components/FeedbackWheel'
import FeedbackMarquee from './components/FeedbackMarquee'
import Mission from './components/Mission'
import Cta from './components/Cta'
import Footer from './components/Footer'

function App() {
  return (
    <LangProvider>
      <Nav />
      <Hero />
      <Tour />
      <Profiles />
      <FeedbackWheel />
      <FeedbackMarquee />
      <Mission />
      <Cta />
      <Footer />
    </LangProvider>
  )
}

export default App
