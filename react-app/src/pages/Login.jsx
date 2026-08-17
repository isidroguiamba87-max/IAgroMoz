import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import api from '../services/api'

const GOOGLE_ERROR_MESSAGES = {
  invalid_google_token: 'Token Google inválido. Tente novamente.',
  expired_google_token: 'A sessão do Google expirou. Tente novamente.',
  invalid_audience: 'Configuração do Google inválida. Contacte o suporte.',
  email_not_verified: 'O seu email Google não está verificado.',
}

const formatCountdown = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [lockedUntil, setLockedUntil] = useState(null) // timestamp ms
  const [secondsLeft, setSecondsLeft] = useState(0)
  const intervalRef = useRef(null)

  // Destino após login — usa ?next= ou /feed por defeito.
  // Só aceita caminhos internos (começam por "/" mas não "//" nem contêm "://"),
  // para não abrir a porta a redireccionamento aberto (?next=//site-malicioso.com)
  // logo a seguir ao login, quando a confiança do utilizador está mais alta.
  const rawNext = new URLSearchParams(location.search).get('next')
  const nextPath = (rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') && !rawNext.includes('://'))
    ? rawNext
    : '/feed'
  const registerSuccess = location.state?.registerSuccess

  useEffect(() => {
    if (!lockedUntil) return
    intervalRef.current = setInterval(() => {
      const left = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000))
      setSecondsLeft(left)
      if (left <= 0) {
        clearInterval(intervalRef.current)
        setLockedUntil(null)
        setError('')
      }
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [lockedUntil])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (lockedUntil) return
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
    } catch (err) {
      if (err?.data?.error === 'account_locked') {
        const retryAfter = Number(err.data.retry_after) || 0
        setError(err.data.detail || 'Conta bloqueada. Tente novamente mais tarde.')
        setLockedUntil(Date.now() + retryAfter * 1000)
        setSecondsLeft(retryAfter)
      } else {
        setError('Email ou senha incorretos. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('')
    setLoading(true)
    try {
      const idToken = credentialResponse.credential
      const data = await api.loginWithGoogle(idToken)
      if (data.profile_completed === false) {
        navigate('/complete-profile', { replace: true, state: { missingFields: data.missing_fields || [] } })
        return
      }
      const userRole = localStorage.getItem('userRole')
      if (userRole === 'seller') {
        navigate('/seller/dashboard', { replace: true })
      } else {
        navigate(nextPath, { replace: true })
      }
    } catch (err) {
      if (err?.data?.error === 'account_locked') {
        const retryAfter = Number(err.data.retry_after) || 0
        setError(err.data.detail || 'Conta bloqueada. Tente novamente mais tarde.')
        setLockedUntil(Date.now() + retryAfter * 1000)
        setSecondsLeft(retryAfter)
      } else {
        setError(GOOGLE_ERROR_MESSAGES[err?.data?.error] || err?.data?.detail || 'Não foi possível entrar com Google.')
      }
    } finally {
      setLoading(false)
    }
  }

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

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
        <img src="/logo.png" alt="IAgroMOZ" className="w-36 h-36 object-contain mx-auto mb-3 drop-shadow-2xl" />
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
              <i className={`bi ${lockedUntil ? 'bi-lock-fill' : 'bi-exclamation-circle-fill'}`}></i>
              <span>
                {error}
                {lockedUntil && secondsLeft > 0 && (
                  <span className="font-bold"> Tente novamente em {formatCountdown(secondsLeft)}.</span>
                )}
              </span>
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

            <button type="submit" disabled={loading || !!lockedUntil}
              className="btn-primary w-full text-white py-4 rounded-2xl font-bold text-base disabled:opacity-60 mt-2">
              {lockedUntil
                ? <span className="flex items-center justify-center gap-2"><i className="bi bi-lock-fill"></i> Bloqueado ({formatCountdown(secondsLeft)})</span>
                : loading
                  ? <span className="flex items-center justify-center gap-2"><i className="bi bi-arrow-repeat animate-spin"></i> A entrar...</span>
                  : 'Entrar'}
            </button>
          </form>

          {googleClientId && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 font-medium">ou</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <div className="flex justify-center [&>div]:w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Não foi possível entrar com Google.')}
                  locale="pt"
                  text="signin_with"
                />
              </div>
            </>
          )}

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
