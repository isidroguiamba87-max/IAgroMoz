import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'
import api from "../services/api"

// Só aceita caminhos internos (mesma validação do Login.jsx) — evita
// redireccionamento aberto via ?next=//site-malicioso.com
const sanitizeNext = (raw) => (raw && raw.startsWith('/') && !raw.startsWith('//') && !raw.includes('://')) ? raw : null

const GOOGLE_ERROR_MESSAGES = {
  invalid_google_token: 'Token Google inválido. Tente novamente.',
  expired_google_token: 'A sessão do Google expirou. Tente novamente.',
  invalid_audience: 'Configuração do Google inválida. Contacte o suporte.',
  email_not_verified: 'O seu email Google não está verificado.',
  account_locked: 'Conta bloqueada. Tente novamente mais tarde.',
}

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const nextPath = sanitizeNext(new URLSearchParams(location.search).get('next'))
  const [googleError, setGoogleError] = useState('')
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleError('')
    try {
      const data = await api.loginWithGoogle(credentialResponse.credential)
      if (data.profile_completed === false) {
        navigate('/complete-profile', { replace: true, state: { missingFields: data.missing_fields || [] } })
        return
      }
      const userRole = localStorage.getItem('userRole')
      navigate(nextPath || (userRole === 'seller' ? '/seller/dashboard' : '/feed'), { replace: true })
    } catch (err) {
      setGoogleError(GOOGLE_ERROR_MESSAGES[err?.data?.error] || err?.data?.detail || 'Não foi possível continuar com Google.')
    }
  }

  const types = [
    {
      path: "/register/normal",
      icon: "bi-person-fill",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400",
      iconColor: "text-blue-600 bg-blue-100",
      title: "Utilizador",
      desc: "Acede ao feed, compra produtos e interage com a comunidade agrícola.",
      badge: "Gratuito",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      path: "/register/producer",
      icon: "bi-tree-fill",
      color: "bg-green-50 border-green-200 hover:border-green-500",
      iconColor: "text-green-700 bg-green-100",
      title: "Produtor",
      desc: "Publica técnicas agrícolas, vende e compra produtos no mercado.",
      badge: "Conta activa",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      path: "/register/seller",
      icon: "bi-shop-window",
      color: "bg-orange-50 border-orange-200 hover:border-orange-400",
      iconColor: "text-orange-600 bg-orange-100",
      title: "Vendedor",
      desc: "Cria uma loja, anuncia produtos e gere as suas vendas.",
      badge: "Conta comercial",
      badgeColor: "bg-orange-100 text-orange-700",
    },
  ]

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
          alt="Campo agrícola"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 text-center">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mx-auto mb-3 shadow-2xl overflow-hidden">
          <img src="/logo.png" alt="IAgroMOZ" className="w-14 h-14 object-contain" />
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-1">IAgroMOZ</h1>
        <p className="text-white/80 text-sm font-medium">Agricultura Inteligente para Moçambique</p>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl px-6 pt-6 pb-8 shadow-2xl">
          <div className="text-center mb-5">
            <h2 className="text-xl font-black text-gray-900 mb-1">Criar Conta</h2>
            <p className="text-gray-500 text-sm">Escolha o tipo de conta que melhor se adequa a si</p>
          </div>

          <div className="space-y-3">
            {types.map(t => (
              <button
                key={t.path}
                onClick={() => navigate(nextPath ? `${t.path}?next=${encodeURIComponent(nextPath)}` : t.path)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${t.color}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${t.iconColor}`}>
                  <i className={`bi ${t.icon} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-gray-900 text-sm">{t.title}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.badgeColor}`}>{t.badge}</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                </div>
                <i className="bi bi-chevron-right text-gray-400 flex-shrink-0"></i>
              </button>
            ))}
          </div>

          {googleClientId && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 font-medium">ou</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              {googleError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-3 text-sm flex items-center gap-2">
                  <i className="bi bi-exclamation-circle-fill"></i> {googleError}
                </div>
              )}
              <div className="flex justify-center [&>div]:w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setGoogleError('Não foi possível continuar com Google.')}
                  locale="pt"
                  text="signup_with"
                />
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Já tem conta?{" "}
              <Link to={nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : '/login'} className="font-bold text-green-700 hover:text-green-800">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
