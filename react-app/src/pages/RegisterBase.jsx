import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"

import { API_BASE as _API_BASE, API_MEDIA } from '../config/api'
const API_BASE = _API_BASE

// ─── Layout partilhado para todos os formulários de registo ──────────────────
export function RegisterLayout({ title, subtitle, icon, children, onSubmit, loading, error, linkText, linkTo, linkLabel }) {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-end pb-0"
      style={{ background: "linear-gradient(160deg, #003D20 0%, #006D3F 40%, #00A846 100%)" }}
    >
      {/* Hero image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
          alt="Campo agrícola"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Logo */}
      <div className="relative z-10 text-center pt-10 pb-4 px-6 flex-1 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-3 shadow-2xl overflow-hidden">
          <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain" />
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-1">IAgroMOZ</h1>
        <p className="text-green-200 text-sm font-medium">Agricultura Inteligente para Moçambique</p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-t-[32px] px-6 pt-6 pb-10 shadow-2xl max-h-[82vh] overflow-y-auto">
          {/* Header do formulário */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <i className={`${icon} text-green-700 text-xl`}></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">{title}</h2>
              <p className="text-gray-500 text-xs">{subtitle}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-start gap-2">
              <i className="bi bi-exclamation-circle-fill mt-0.5 flex-shrink-0"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3.5">
            {children}
            <button
              type="submit" disabled={loading}
              className="btn-primary w-full text-white py-4 rounded-2xl font-bold text-base disabled:opacity-60 mt-1"
            >
              {loading
                ? <span className="flex items-center justify-center gap-2"><i className="bi bi-arrow-repeat animate-spin"></i> A criar conta...</span>
                : "Criar Conta"}
            </button>
          </form>

          <div className="mt-5 text-center space-y-2">
            <p className="text-gray-500 text-sm">
              Já tem conta?{" "}
              <Link to="/login" className="font-bold text-green-700 hover:text-green-800">Entrar</Link>
            </p>
            {linkTo && (
              <p className="text-gray-400 text-xs">
                {linkText}{" "}
                <Link to={linkTo} className="font-bold text-green-600 hover:text-green-700">{linkLabel}</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Hook partilhado para localização ────────────────────────────────────────
export function useLocation_() {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [loadingProvinces, setLoadingProvinces] = useState(false)

  useEffect(() => {
    setLoadingProvinces(true)
    fetch(`${API_BASE}/provinces/`)
      .then(r => r.json())
      .then(d => setProvinces(Array.isArray(d) ? d : (d.results || [])))
      .catch(() => {})
      .finally(() => setLoadingProvinces(false))
  }, [])

  const loadDistricts = (provinceId) => {
    setDistricts([])
    if (!provinceId) return
    fetch(`${API_BASE}/districts/?id=${provinceId}`)
      .then(r => r.json())
      .then(d => setDistricts(Array.isArray(d) ? d : (d.results || [])))
      .catch(() => {})
  }

  return { provinces, districts, loadingProvinces, loadDistricts }
}

// ─── Campos partilhados ───────────────────────────────────────────────────────
export function FieldInput({ label, type = "text", value, onChange, placeholder, required = false, icon }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1.5 text-sm">{label}{required && " *"}</label>
      <div className="relative">
        {icon && <i className={`bi ${icon} absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400`}></i>}
        <input
          type={type} value={value} onChange={onChange}
          className={`form-input w-full py-3 rounded-xl text-sm ${icon ? "pl-10 pr-4" : "px-4"}`}
          placeholder={placeholder} required={required}
        />
      </div>
    </div>
  )
}

export function FieldSelect({ label, value, onChange, options, placeholder, required = false, disabled = false }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1.5 text-sm">{label}{required && " *"}</label>
      <select
        value={value} onChange={onChange} disabled={disabled} required={required}
        className="w-full px-4 py-3 rounded-xl text-sm border-2 border-gray-200 bg-white text-gray-900 focus:border-green-400 focus:outline-none disabled:opacity-50"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

export function LocationFields({ provinces, districts, loadingProvinces, provinceId, districtId, onProvinceChange, onDistrictChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <FieldSelect
        label={`Província${provinces.length > 0 ? ` (${provinces.length})` : ""}`}
        value={provinceId}
        onChange={e => onProvinceChange(e.target.value)}
        options={provinces.map(p => ({ value: p.id, label: p.name || p.nome }))}
        placeholder={loadingProvinces ? "A carregar..." : "Selecione"}
        required
      />
      <FieldSelect
        label={`Distrito${districts.length > 0 ? ` (${districts.length})` : ""}`}
        value={districtId}
        onChange={e => onDistrictChange(e.target.value)}
        options={districts.map(d => ({ value: d.id, label: d.name || d.nome }))}
        placeholder={!provinceId ? "Selecione a província" : "Selecione"}
        required
        disabled={!provinceId}
      />
    </div>
  )
}

// ─── Função de login após registo ─────────────────────────────────────────────
export async function loginAfterRegister(email, password, navigate) {
  try {
    await api.login(email, password)
    // Após login, o userRole foi guardado no localStorage por getUserProfile()
    const userRole = localStorage.getItem('userRole') || 'user'
    if (userRole === 'seller' || userRole === 'producer') {
      const dashboardPath = userRole === 'producer' ? '/producer/dashboard' : '/seller/dashboard'
      navigate(dashboardPath, { replace: true })
    } else {
      navigate('/feed', { replace: true })
    }
  } catch (err) {
    console.error('Erro ao fazer login após registo:', err)
    throw err
  }
}
