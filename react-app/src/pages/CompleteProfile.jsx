import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../services/api"
import { RegisterLayout, useLocation_, FieldInput, LocationFields, extractRegisterError } from "./RegisterBase"

// Passo final do login com Google quando o perfil ainda está incompleto
// (profile_completed=false). Os campos em falta vêm em location.state.missingFields.
function CompleteProfile() {
  const navigate = useNavigate()
  const routeLocation = useLocation()
  const missingFields = routeLocation.state?.missingFields || []
  const needs = (field) => missingFields.length === 0 || missingFields.includes(field)

  const { provinces, districts, loadingProvinces, loadDistricts } = useLocation_()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [provinceId, setProvinceId] = useState("")
  const [districtId, setDistrictId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleProvinceChange = (id) => {
    setProvinceId(id)
    setDistrictId("")
    loadDistricts(id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = {}
      if (needs('first_name')) data.first_name = firstName.trim()
      if (needs('last_name')) data.last_name = lastName.trim()
      if (needs('district')) data.district_id = districtId
      if (needs('phone')) data.phone = phone.trim()
      await api.completeProfile(data)
      const userRole = localStorage.getItem('userRole') || 'user'
      navigate(userRole === 'seller' ? '/seller/dashboard' : '/feed', { replace: true })
    } catch (err) {
      setError(extractRegisterError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterLayout
      title="Complete o seu perfil"
      subtitle="Falta pouco — só precisamos de mais alguns dados"
      icon="bi-person-check"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    >
      {needs('first_name') && (
        <FieldInput label="Primeiro nome" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ex: Mércia" required icon="bi-person" />
      )}
      {needs('last_name') && (
        <FieldInput label="Apelido" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ex: Alexandre" required icon="bi-person" />
      )}
      {needs('phone') && (
        <FieldInput label="Telefone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="84XXXXXXX" icon="bi-telephone" />
      )}
      {needs('district') && (
        <LocationFields
          provinces={provinces} districts={districts} loadingProvinces={loadingProvinces}
          provinceId={provinceId} districtId={districtId}
          onProvinceChange={handleProvinceChange} onDistrictChange={setDistrictId}
        />
      )}
    </RegisterLayout>
  )
}

export default CompleteProfile
