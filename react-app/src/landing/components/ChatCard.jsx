import { forwardRef } from 'react'
import { useLang } from '../LangContext'

function initials(name) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

// O cartão "chat/testemunho" partilhado pelo marquee mobile e pela roda
// desktop. forwardRef porque a roda posiciona o próprio nó .chatcard
// diretamente (fora do React, por frame) — não pode ser um wrapper à volta.
const ChatCard = forwardRef(function ChatCard({ item, style }, ref) {
  const { lang } = useLang()

  return (
    <div className="chatcard" style={style} ref={ref}>
      <div className="cc-head">
        <div className="cc-av" style={{ background: item.color }}>{initials(item.name)}</div>
        <div>
          <div className="cc-name">{item.name}</div>
          <div className="cc-sub">{item.sub[lang]}</div>
        </div>
      </div>
      <div className="cc-body">
        {item.type === 'chat' ? (
          <>
            <div className="bubble me">{item.q[lang]}</div>
            <div className="bubble ai">{item.a[lang]}</div>
          </>
        ) : (
          <div className="bubble note"><span className="em">{item.emoji}</span> {item.msg[lang]}</div>
        )}
      </div>
    </div>
  )
})

export default ChatCard
