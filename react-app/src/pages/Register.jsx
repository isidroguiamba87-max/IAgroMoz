import { useNavigate, Link } from "react-router-dom"

function Register() {
  const navigate = useNavigate()

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
                onClick={() => navigate(t.path)}
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

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Já tem conta?{" "}
              <Link to="/login" className="font-bold text-green-700 hover:text-green-800">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
