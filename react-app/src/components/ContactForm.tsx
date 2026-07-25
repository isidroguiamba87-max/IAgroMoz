import { useState } from 'react'

interface ContactFormProps {
  profileWhatsapp?: string
  onSubmit: (whatsapp: string) => void
  loading?: boolean
  error?: string
}

function ContactForm({ profileWhatsapp, onSubmit, loading = false, error = '' }: ContactFormProps) {
  const [whatsapp, setWhatsapp] = useState('')
  const hasProfileNumber = Boolean(profileWhatsapp && profileWhatsapp.trim())

  const handleUseProfile = () => {
    if (profileWhatsapp) onSubmit(profileWhatsapp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!whatsapp.trim()) return
    onSubmit(whatsapp.trim())
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Reserva confirmada!</h3>
        <p className="text-sm text-gray-500">Digite o seu número de WhatsApp para interação com o vendedor.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {hasProfileNumber ? (
        <button
          type="button"
          onClick={handleUseProfile}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <><i className="bi bi-arrow-repeat animate-spin"></i> A enviar...</>
          ) : (
            <><i className="bi bi-whatsapp"></i> Enviar número da plataforma ({profileWhatsapp})</>
          )}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
            <input
              type="tel"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="Ex: 258821234567"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">Indicativo + número, sem espaços (ex: 258821234567).</p>
          </div>

          <button
            type="submit"
            disabled={loading || !whatsapp.trim()}
            className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <><i className="bi bi-arrow-repeat animate-spin"></i> A confirmar...</>
            ) : (
              <><i className="bi bi-check-circle"></i> Confirmar número</>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactForm
