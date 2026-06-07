import { useState } from 'react'

interface BuyerDetailsFormProps {
  transaction: any
  onSubmit: (data: { name: string; phone: string; location: string }) => void
  loading?: boolean
  error?: string
}

function BuyerDetailsForm({ transaction, onSubmit, loading = false, error = '' }: BuyerDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
      return
    }
    onSubmit(formData)
  }

  const isValid = formData.name.trim() && formData.phone.trim() && formData.location.trim()

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Confirmação de Entrega</h3>
        <p className="text-sm text-gray-500 mb-4">O vendedor confirmou sua reserva. Forneça seus dados para procedermos com a entrega.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <i className="bi bi-person mr-2"></i>Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            disabled={loading}
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <i className="bi bi-telephone mr-2"></i>Contacto (Telefone)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ex: +258 82 123 4567"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            disabled={loading}
          />
          <p className="text-xs text-gray-400 mt-1">O vendedor usará este contacto para a entrega</p>
        </div>

        {/* Localização */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <i className="bi bi-geo-alt mr-2"></i>Localização de Entrega
          </label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Rua Principal, Casa nº 123, Perto do mercado, Maputo"
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
            disabled={loading}
          />
          <p className="text-xs text-gray-400 mt-1">Descreva sua localização de forma detalhada</p>
        </div>

        {/* Botão Enviar */}
        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin"></i>
              Enviando dados...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle"></i>
              Confirmar e Prosseguir
            </>
          )}
        </button>
      </form>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700">
        <i className="bi bi-info-circle mr-2"></i>
        <strong>Importante:</strong> Certifique-se de que seus dados estão corretos. O vendedor usará estas informações para contactá-lo e efetuar a entrega.
      </div>
    </div>
  )
}

export default BuyerDetailsForm
