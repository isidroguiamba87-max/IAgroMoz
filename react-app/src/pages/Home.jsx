import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass-effect shadow-2xl sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Logo size="md" showText={true} />
            
            <nav className="hidden md:flex items-center space-x-1">
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">Satélite</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">Comunidade</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">Assistente</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">Recomendações</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">Marketplace</a>
              <Link to="/login" className="btn-primary text-white px-8 py-3 rounded-2xl font-semibold ml-4 shadow-lg">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(26, 95, 26, 0.85) 0%, rgba(45, 125, 45, 0.8) 25%, rgba(76, 175, 80, 0.75) 75%, rgba(102, 187, 106, 0.7) 100%)'
      }}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-white">
              <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <span className="text-sm font-semibold">🚀 Plataforma Líder em AgTech</span>
              </div>
              <h2 className="text-6xl font-bold mb-6 leading-tight">Conectando Agricultura com Inteligência</h2>
              <p className="text-2xl mb-10 opacity-90 font-light">Plante com dados. Venda com comunidade.</p>
              
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                <button className="bg-white text-green-600 p-6 rounded-3xl card-shadow hover:shadow-2xl transition-all duration-300 flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <span className="text-2xl">👥</span>
                  </div>
                  <span className="font-semibold text-sm">Comunidade</span>
                </button>
                <button className="bg-white text-green-600 p-6 rounded-3xl card-shadow hover:shadow-2xl transition-all duration-300 flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <span className="font-semibold text-sm">Assistente IA</span>
                </button>
                <button className="bg-white text-green-600 p-6 rounded-3xl card-shadow hover:shadow-2xl transition-all duration-300 flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📊</span>
                  </div>
                  <span className="font-semibold text-sm">Recomendações</span>
                </button>
                <button className="bg-white text-green-600 p-6 rounded-3xl card-shadow hover:shadow-2xl transition-all duration-300 flex flex-col items-center space-y-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <span className="font-semibold text-sm">Marketplace</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Por que escolher a IAGROMOZ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Descubra como nossa plataforma está revolucionando a agricultura com tecnologia.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="feature-card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Como Funciona</h3>
              <div className="space-y-6 text-left">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Inserir Dados</h4>
                    <p className="text-gray-600 text-sm">Cadastre informações da sua plantação de forma simples e intuitiva</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">IA Analisa</h4>
                    <p className="text-gray-600 text-sm">Nossa inteligência artificial processa e gera recomendações personalizadas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Venda & Conecte</h4>
                    <p className="text-gray-600 text-sm">Comercialize produtos e conecte-se com outros agricultores</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Benefícios</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Comunidade ativa de agricultores</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">IA treinada com dados de várias culturas</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Marketplace com vendas diretas</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Análise de dados em tempo real 24/7</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Suporte técnico especializado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">IAGROMOZ</h3>
                <p className="text-gray-400 text-sm">Agricultura Inteligente</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">Conectando agricultores com tecnologia de ponta para um futuro mais sustentável e produtivo no campo.</p>
          </div>
          
          <div className="text-center text-gray-400">
            <p>© 2025 Iagromoz – Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
