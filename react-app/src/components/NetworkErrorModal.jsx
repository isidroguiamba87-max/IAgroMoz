import { useState, useEffect, useRef } from 'react'

// Evento global para mostrar o modal de erro
export const showNetworkError = (msg) => {
  window.dispatchEvent(new CustomEvent('network-error', { detail: msg || null }))
}

// ─── Loading do servidor (logo + pontos) ─────────────────────────────────────
// Mostra logo pequena + pontos animados imediatamente.
// Após 10 minutos sem resposta, mostra mensagem "servidor a dormir".
export function ServerLoadingOverlay({ visible }) {
  const [showSleepMsg, setShowSleepMsg] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (visible) {
      setShowSleepMsg(false)
      timerRef.current = setTimeout(() => setShowSleepMsg(true), 600_000) // 10 minutos
    } else {
      setShowSleepMsg(false)
      clearTimeout(timerRef.current)
    }
    return () => clearTimeout(timerRef.current)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-[9998]">
      <div className="flex flex-col items-center gap-4">
        {/* Logo pequena */}
        <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80" />
        {/* Pontos animados */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-green-500"
              style={{
                animation: 'bounce 1.2s infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        {/* Mensagem de servidor a dormir — só após 10 minutos */}
        {showSleepMsg && (
          <div className="mt-2 max-w-xs text-center px-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">O servidor está a acordar...</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              O servidor IAgroMOZ entra em modo de espera após inatividade. Aguarda mais alguns segundos.
            </p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─── Modal de erro de rede ────────────────────────────────────────────────────
function NetworkErrorModal() {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const handler = (e) => setMessage(e.detail || 'Erro de rede')
    window.addEventListener('network-error', handler)
    return () => window.removeEventListener('network-error', handler)
  }, [])

  if (!message) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <i className="bi bi-wifi-off text-orange-500 text-xl"></i>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm mb-1">Sem ligação ao servidor</p>
            <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 mb-4 flex items-start gap-2">
          <i className="bi bi-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <p className="text-xs text-blue-700">
            O servidor IAgroMOZ pode estar a iniciar após inatividade. Aguarda 30 segundos e tenta novamente.
          </p>
        </div>
        <button onClick={() => setMessage(null)}
          className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">
          Entendido
        </button>
      </div>
    </div>
  )
}

export default NetworkErrorModal
