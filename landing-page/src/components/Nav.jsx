import { useLang } from '../LangContext'
import logo from '../assets/logo.png'

function Nav() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top">
          <img src={logo} alt="IAgroMoz" />
          <span>IAgro<b>Moz</b></span>
        </a>
        <nav className="nav-links">
          {t.nav.links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang">
            <button className={lang === 'pt' ? 'on' : ''} onClick={() => setLang('pt')}>PT</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="btn btn-primary" href="https://www.iagromoz.com">{t.nav.cta}</a>
        </div>
      </div>
    </header>
  )
}

export default Nav
