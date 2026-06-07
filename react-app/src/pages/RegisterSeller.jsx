import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterLayout, FieldInput, FieldSelect, LocationFields, useLocation_, loginAfterRegister } from "./RegisterBase"

import api from "../services/api"
import { API_BASE as _API_BASE } from '../config/api'
const API_BASE = _API_BASE

const SELLER_TYPES = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "COMPANY", label: "Empresa" },
  { value: "COOPERATIVE", label: "Cooperativa" },
]

function RegisterSeller() {
  const navigate = useNavigate()
  const { provinces, districts, loadingProvinces, loadDistricts } = useLocation_()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", password: "", confirmPassword: "",
    gender: "", provinceId: "", districtId: "",
    seller_type: "INDIVIDUAL", store_name: "", nuit: "", contact: "", store_address: ""
  })

  const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  const handleProvinceChange = (id) => {
    setForm(p => ({ ...p, provinceId: id, districtId: "" }))
    loadDistricts(id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (form.password !== form.confirmPassword) return setError("As senhas não coincidem.")
    if (form.password.length < 8) return setError("A senha deve ter pelo menos 8 caracteres.")
    if (!form.districtId) return setError("Selecione o seu distrito.")
    if (!form.store_name.trim()) return setError("O nome da loja é obrigatório.")
    if (!form.contact.trim()) return setError("O contacto é obrigatório.")
    if (!form.store_address.trim()) return setError("O endereço da loja é obrigatório.")
    setLoading(true)
    try {
      // basic phone validation
      const phoneNormalized = form.contact.trim()
      const phoneRe = /^\+?\d{8,15}$/
      if (!phoneRe.test(phoneNormalized)) return setError('Formato de contacto inválido. Ex: +258841234567')

      // nuit validation when provided (expect 9 digits)
      const nuit = form.nuit.trim()
      if (nuit && !/^\d{9}$/.test(nuit)) return setError('NUIT inválido. Deve conter 9 dígitos numéricos.')

      await api.registerSeller({
        email: form.email,
        password: form.password,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        district_id: Number(form.districtId),
        gender: form.gender || undefined,
        seller_type: form.seller_type,
        store_name: form.store_name.trim(),
        nuit: nuit || undefined,
        contact: phoneNormalized,
        store_address: form.store_address.trim(),
      })
      await loginAfterRegister(form.email, form.password, navigate)
    } catch (err) {
      const msg = err?.message || (err?.data ? JSON.stringify(err.data) : null) || "Erro ao criar conta."
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterLayout
      title="Conta de Vendedor"
      subtitle="Crie a sua loja, anuncie produtos e gira as suas vendas"
      icon="bi-shop-window"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      linkText="Prefere uma conta de produtor?"
      linkTo="/register/producer"
      linkLabel="Criar conta de Produtor"
    >
      {/* Dados pessoais */}
      <div className="bg-orange-50 rounded-xl px-3 py-2">
        <p className="text-xs font-bold text-orange-700 flex items-center gap-1.5">
          <i className="bi bi-person-fill"></i> Dados Pessoais
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FieldInput label="Primeiro nome" value={form.first_name} onChange={f("first_name")} placeholder="Carlos" required icon="bi-person" />
        <FieldInput label="Apelido" value={form.last_name} onChange={f("last_name")} placeholder="Nhantumbo" required />
      </div>
      <FieldInput label="Email" type="email" value={form.email} onChange={f("email")} placeholder="seu@email.com" required icon="bi-envelope" />

      {/* Género */}
      <div>
        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Género</label>
        <div className="grid grid-cols-3 gap-2">
          {[{ v: "M", l: "Masculino", i: "bi-gender-male" }, { v: "F", l: "Feminino", i: "bi-gender-female" }, { v: "O", l: "Outro", i: "bi-person" }].map(g => (
            <button key={g.v} type="button" onClick={() => setForm(p => ({ ...p, gender: g.v }))}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all flex items-center justify-center gap-1.5 ${
                form.gender === g.v ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}>
              <i className={`bi ${g.i}`}></i> {g.l}
            </button>
          ))}
        </div>
      </div>

      <LocationFields
        provinces={provinces} districts={districts} loadingProvinces={loadingProvinces}
        provinceId={form.provinceId} districtId={form.districtId}
        onProvinceChange={handleProvinceChange} onDistrictChange={v => setForm(p => ({ ...p, districtId: v }))}
      />

      {/* Dados da loja */}
      <div className="bg-orange-50 rounded-xl px-3 py-2 mt-1">
        <p className="text-xs font-bold text-orange-700 flex items-center gap-1.5">
          <i className="bi bi-shop-window"></i> Dados da Loja
        </p>
      </div>

      {/* Tipo de vendedor */}
      <div>
        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Tipo de vendedor *</label>
        <div className="grid grid-cols-3 gap-2">
          {SELLER_TYPES.map(t => (
            <button key={t.value} type="button" onClick={() => setForm(p => ({ ...p, seller_type: t.value }))}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all text-center ${
                form.seller_type === t.value ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <FieldInput label="Nome da loja" value={form.store_name} onChange={f("store_name")} placeholder="Ex: Loja do Carlos" required icon="bi-shop" />
      <FieldInput label="NUIT (opcional)" value={form.nuit} onChange={f("nuit")} placeholder="123456789" icon="bi-card-text" />
      <FieldInput label="Contacto (telefone)" value={form.contact} onChange={f("contact")} placeholder="+258 84 XXX XXXX" required icon="bi-telephone" />
      <FieldInput label="Endereço da loja" value={form.store_address} onChange={f("store_address")} placeholder="Ex: Av. Eduardo Mondlane, Maputo" required icon="bi-geo-alt" />

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
        <i className="bi bi-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
        <p className="text-xs text-blue-700">A conta de Vendedor fica activa imediatamente. Pode publicar produtos no mercado após o registo.</p>
      </div>

      <FieldInput label="Senha" type="password" value={form.password} onChange={f("password")} placeholder="Mínimo 8 caracteres" required icon="bi-lock" />
      <FieldInput label="Confirmar senha" type="password" value={form.confirmPassword} onChange={f("confirmPassword")} placeholder="Repita a senha" required icon="bi-lock-fill" />
    </RegisterLayout>
  )
}

export default RegisterSeller
