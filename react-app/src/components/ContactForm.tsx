import { useState } from 'react'

interface ContactFormProps {
  transaction: any
  onSubmit: (data: { name: string; whatsapp: string }) => void
  loading?: boolean
  error?: string
}

function ContactForm({ transaction, onSubmit, loading = false, error = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: transaction?.buyer_contact_name || '',
    whatsapp: transaction?.buyer_contact_whatsapp || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      return
    }
    onSubmit(formData)
  }

  const isValid = formData.name.trim() && formData.whatsapp.trim()

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Dados de Contacto</h3>
        <p className="text-sm text-gray-500">Informe o seu nome completo e número de WhatsApp para que o vendedor possa contactar.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Joaquim Alberto"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="Ex: +258 82 123 4567"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            disabled={loading}
          />
          <p className="text-xs text-gray-400 mt-1">Use o número que estiver disponível no WhatsApp.</p>
        </div>

        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin"></i>
              A guardar...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle"></i>
              Guardar contacto
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
