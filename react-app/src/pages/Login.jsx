import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import api from '../services/api'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  // Destino após login — usa ?next= ou /feed por defeito
  const nextPath = new URLSearchParams(location.search).get('next') || '/feed'
  const registerSuccess = location.state?.registerSuccess

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.login(formData.email, formData.password)
      // api.login já chama getUserProfile() internamente e guarda userRole
      const userRole = localStorage.getItem('userRole')
      if (userRole === 'seller') {
        navigate('/seller/dashboard', { replace: true })
      } else {
        navigate(nextPath, { replace: true })
      }
    } catch {
      setError('Email ou senha incorretos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-6 px-4 py-10">

      {/* Imagem de fundo a 100% */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
          alt="Campo agrícola"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Logo + tagline */}
      <div className="relative z-10 text-center">
        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mx-auto mb-3 shadow-2xl overflow-hidden">
          <img src="/logo.png" alt="IAgroMOZ" className="w-20 h-20 object-contain" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-1">IAgroMOZ</h1>
        <p className="text-white/80 text-base font-medium">Agricultura Inteligente para Moçambique</p>
      </div>

      {/* Card de login */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white rounded-3xl px-6 pt-8 pb-8 shadow-2xl">
          <h2 className="text-2xl font-black text-gray-900 mb-1">Bem-vindo de volta <i className="bi bi-hand-wave text-yellow-500"></i></h2>
          <p className="text-gray-500 text-sm mb-6">Entre na sua conta para continuar</p>

          {registerSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl mb-4 text-sm flex items-center gap-2">
              <i className="bi bi-check-circle-fill"></i> Conta criada com sucesso! Faça login para continuar.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-4 text-sm flex items-center gap-2">
              <i className="bi bi-exclamation-circle-fill"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5 text-sm">Email</label>
              <div className="relative">
                <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="form-input w-full pl-11 pr-4 py-3.5"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1.5 text-sm">Senha</label>
              <div className="relative">
                <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                  className="form-input w-full pl-11 pr-12 py-3.5"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full text-white py-4 rounded-2xl font-bold text-base disabled:opacity-60 mt-2">
              {loading
                ? <span className="flex items-center justify-center gap-2"><i className="bi bi-arrow-repeat animate-spin"></i> A entrar...</span>
                : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Não tem conta?{' '}
              <Link to="/register" className="font-bold text-green-700 hover:text-green-800">
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
