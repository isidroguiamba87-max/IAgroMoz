import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterLayout, FieldInput, LocationFields, useLocation_, loginAfterRegister, extractRegisterError } from "./RegisterBase"

import api from "../services/api"

function RegisterProducer() {
  const navigate = useNavigate()
  const { provinces, districts, loadingProvinces, loadDistricts } = useLocation_()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", password: "", confirmPassword: "",
    gender: "", provinceId: "", districtId: "",
    contact: "", farm_address: ""
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
    if (!form.contact.trim()) return setError("O contacto é obrigatório.")
    if (!form.farm_address.trim()) return setError("O endereço da exploração é obrigatório.")

    // Validação de telefone antes de iniciar o loading
    const phoneNormalized = form.contact.trim()
    const phoneRe = /^\+?\d{8,15}$/
    if (!phoneRe.test(phoneNormalized)) return setError('Formato de contacto inválido. Ex: +258841234567')

    setLoading(true)
    try {
      await api.registerProducer({
        email: form.email.trim(),
        password: form.password,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        district_id: Number(form.districtId),
        gender: form.gender || undefined,
        contact: phoneNormalized,
        farm_address: form.farm_address.trim(),
      })
      await loginAfterRegister(form.email.trim(), form.password, navigate)
    } catch (err) {
      setError(extractRegisterError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterLayout
      title="Conta de Produtor"
      subtitle="Publique técnicas agrícolas, venda e compre produtos no mercado"
      icon="bi-tree-fill"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      linkText="Prefere uma conta de vendedor?"
      linkTo="/register/seller"
      linkLabel="Criar conta de Vendedor"
    >
      {/* Dados pessoais */}
      <div className="bg-green-50 rounded-xl px-3 py-2 mb-1">
        <p className="text-xs font-bold text-green-700 flex items-center gap-1.5">
          <i className="bi bi-person-fill"></i> Dados Pessoais
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FieldInput label="Primeiro nome" value={form.first_name} onChange={f("first_name")} placeholder="Maria" required icon="bi-person" />
        <FieldInput label="Apelido" value={form.last_name} onChange={f("last_name")} placeholder="Machava" required />
      </div>
      <FieldInput label="Email" type="email" value={form.email} onChange={f("email")} placeholder="seu@email.com" required icon="bi-envelope" />

      {/* Género */}
      <div>
        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Género</label>
        <div className="grid grid-cols-3 gap-2">
          {[{ v: "M", l: "Masculino", i: "bi-gender-male" }, { v: "F", l: "Feminino", i: "bi-gender-female" }, { v: "O", l: "Outro", i: "bi-person" }].map(g => (
            <button key={g.v} type="button" onClick={() => setForm(p => ({ ...p, gender: g.v }))}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all flex items-center justify-center gap-1.5 ${
                form.gender === g.v ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
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

      {/* Dados da exploração */}
      <div className="bg-green-50 rounded-xl px-3 py-2 mt-1">
        <p className="text-xs font-bold text-green-700 flex items-center gap-1.5">
          <i className="bi bi-tree-fill"></i> Dados da Exploração Agrícola
        </p>
      </div>
      <FieldInput label="Contacto (telefone)" value={form.contact} onChange={f("contact")} placeholder="+258 84 XXX XXXX" required icon="bi-telephone" />
      <FieldInput label="Endereço da exploração" value={form.farm_address} onChange={f("farm_address")} placeholder="Ex: Bairro Central, Manica" required icon="bi-geo-alt" />

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5 flex items-start gap-2">
        <i className="bi bi-info-circle text-yellow-600 flex-shrink-0 mt-0.5"></i>
        <p className="text-xs text-yellow-700">A conta de Produtor fica activa imediatamente. Pode publicar técnicas e produtos após o registo.</p>
      </div>

      <FieldInput label="Senha" type="password" value={form.password} onChange={f("password")} placeholder="Mínimo 8 caracteres" required icon="bi-lock" />
      <FieldInput label="Confirmar senha" type="password" value={form.confirmPassword} onChange={f("confirmPassword")} placeholder="Repita a senha" required icon="bi-lock-fill" />
    </RegisterLayout>
  )
}

export default RegisterProducer
