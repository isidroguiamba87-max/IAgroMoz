import { useLang } from '../LangContext'
import logo from '../assets/logo.png'
import { TEAM_CREDITS, PARTNERS } from '../footerData'

function Footer() {
  const { t, lang } = useLang()

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <a className="brand" href="#top">
            <img src={logo} alt="" style={{ width: 44, height: 44 }} />
            <span>IAgro<b>Moz</b></span>
          </a>
          <p className="foot-developed">{t.footer.developedBy}<b>{t.footer.developedByBrand}</b></p>
          <nav style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            {t.nav.links.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <a href="mailto:kukuladevz@gmail.com">kukuladevz@gmail.com</a>
          </nav>
        </div>

        {TEAM_CREDITS.length > 0 && (
          <div className="foot-block">
            <span className="foot-block-title">{t.footer.devsTitle}</span>
            <div className="foot-credits">
              {TEAM_CREDITS.map((person) => (
                <a key={person.name} href={person.url || undefined} className="foot-credit">
                  {person.name}{person.role && <small> · {person.role[lang]}</small>}
                </a>
              ))}
            </div>
          </div>
        )}

        {PARTNERS.length > 0 && (
          <div className="foot-block">
            <span className="foot-block-title">{t.footer.partnersTitle}</span>
            <div className="foot-partners">
              {PARTNERS.map((p) => (
                <a key={p.name} href={p.url || undefined} title={p.name}>
                  <img src={p.logo} alt={p.name} />
                </a>
              ))}
            </div>
          </div>
        )}

        <p className="foot-altnames">{t.footer.altNames}</p>
        <small className="foot-copy">{t.footer.small}</small>
      </div>
    </footer>
  )
}

export default Footer
