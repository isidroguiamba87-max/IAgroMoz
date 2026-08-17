import { useLang } from '../LangContext'
import logo from '../assets/logo.png'

// Nota: o texto exato do footer original perdeu-se ao recriar o index.html
// como projeto Vite — este é um footer razoável, coerente com o resto da
// página (mesma marca, mesmos links de navegação, crédito já confirmado no
// CTA). Ajustar se não bater certo com o original.
function Footer() {
  const { t } = useLang()

  return (
    <footer>
      <div className="wrap foot">
        <a className="brand" href="#top">
          <img src={logo} alt="" style={{ width: 44, height: 44 }} />
          <span>IAgro<b>Moz</b></span>
        </a>
        <small>{t.footer.small}</small>
        <nav style={{ display: 'flex', gap: '1.2rem' }}>
          {t.nav.links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a href="mailto:kukuladevz@gmail.com">kukuladevz@gmail.com</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
