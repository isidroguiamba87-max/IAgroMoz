import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterLayout, FieldInput, LocationFields, useLocation_, loginAfterRegister } from "./RegisterBase"

import api from "../services/api"
import { API_BASE as _API_BASE } from '../config/api'
const API_BASE = _API_BASE

function RegisterNormal() {
  const navigate = useNavigate()
  const { provinces, districts, loadingProvinces, loadDistricts } = useLocation_()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", password: "", confirmPassword: "",
    gender: "", provinceId: "", districtId: ""
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
    setLoading(true)
    try {
      await api.registerNormal({
        email: form.email,
        password: form.password,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        district_id: Number(form.districtId),
        gender: form.gender || undefined,
      })
      await loginAfterRegister(form.email, form.password, navigate)
    } catch (err) {
      // api throws {status,message,data} or Error
      const msg = err?.message || (err?.data ? JSON.stringify(err.data) : null) || "Erro ao criar conta."
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterLayout
      title="Conta de Utilizador"
      subtitle="Aceda ao feed, compre produtos e interaja com a comunidade"
      icon="bi-person-fill"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      linkText="Quer vender ou publicar técnicas?"
      linkTo="/register/producer"
      linkLabel="Criar conta de Produtor"
    >
      <div className="grid grid-cols-2 gap-3">
        <FieldInput label="Primeiro nome" value={form.first_name} onChange={f("first_name")} placeholder="João" required icon="bi-person" />
        <FieldInput label="Apelido" value={form.last_name} onChange={f("last_name")} placeholder="Silva" required />
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

      <FieldInput label="Senha" type="password" value={form.password} onChange={f("password")} placeholder="Mínimo 8 caracteres" required icon="bi-lock" />
      <FieldInput label="Confirmar senha" type="password" value={form.confirmPassword} onChange={f("confirmPassword")} placeholder="Repita a senha" required icon="bi-lock-fill" />
    </RegisterLayout>
  )
}

export default RegisterNormal
