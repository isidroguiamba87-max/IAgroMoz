import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Component, useState, useEffect, lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ServerLoadingOverlay } from './components/NetworkErrorModal'
import AdminRouteBlocker from './components/AdminRouteBlocker'
import ProtectedRoute from './components/ProtectedRoute'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const RegisterNormal = lazy(() => import('./pages/RegisterNormal'))
const RegisterProducer = lazy(() => import('./pages/RegisterProducer'))
const RegisterSeller = lazy(() => import('./pages/RegisterSeller'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Feed = lazy(() => import('./pages/Feed'))
const PostDetail = lazy(() => import('./pages/PostDetail'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
const ChatAI = lazy(() => import('./pages/ChatAI'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const CreateProduct = lazy(() => import('./pages/CreateProduct'))
const Techniques = lazy(() => import('./pages/Techniques'))
const TechniqueDetail = lazy(() => import('./pages/TechniqueDetail'))
const Profile = lazy(() => import('./pages/Profile'))
const Notifications = lazy(() => import('./pages/Notifications'))
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'))
const Transactions = lazy(() => import('./pages/Transactions'))
const TransactionDetail = lazy(() => import('./pages/TransactionDetail'))
const ProductUnits = lazy(() => import('./pages/ProductUnits'))
const SellerDashboardLayout = lazy(() => import('./pages/SellerDashboardLayout'))
const SellerDashboardOverview = lazy(() => import('./pages/SellerDashboardOverview'))
const SellerDashboardProducts = lazy(() => import('./pages/SellerDashboardProducts'))
const SellerDashboardSales = lazy(() => import('./pages/SellerDashboardSales'))
const SellerDashboardPurchases = lazy(() => import('./pages/SellerDashboardPurchases'))
const SellerDashboardNotifications = lazy(() => import('./pages/SellerDashboardNotifications'))
const SellerDashboardProfile = lazy(() => import('./pages/SellerDashboardProfile'))

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-sm">
            <p className="text-4xl mb-4">🌱</p>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Algo correu mal</h2>
            <p className="text-gray-500 text-sm mb-4">{this.state.error?.message || 'Erro inesperado'}</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
              className="btn-primary text-white px-6 py-2 rounded-xl text-sm font-semibold"
            >
              Recarregar
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  const [serverLoading, setServerLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')

  useEffect(() => {
    const onStart = () => setServerLoading(true)
    const onEnd = () => setServerLoading(false)
    window.addEventListener('server-loading-start', onStart)
    window.addEventListener('server-loading-end', onEnd)
    return () => {
      window.removeEventListener('server-loading-start', onStart)
      window.removeEventListener('server-loading-end', onEnd)
    }
  }, [])

  useEffect(() => {
    const onForbidden = (event) => {
      const message = event?.detail?.message || 'Acesso negado. Você não tem permissão para esta ação.'
      setGlobalError(message)
    }
    window.addEventListener('api-forbidden', onForbidden)
    return () => window.removeEventListener('api-forbidden', onForbidden)
  }, [])

  useEffect(() => {
    if (!globalError) return
    const timer = setTimeout(() => setGlobalError(''), 6000)
    return () => clearTimeout(timer)
  }, [globalError])

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ServerLoadingOverlay visible={serverLoading} />
          {globalError && (
            <div className="fixed right-4 top-4 z-50 w-full max-w-sm">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-red-600">
                    <i className="bi bi-shield-lock-fill text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-700">Acesso negado</p>
                    <p className="text-sm text-red-600 leading-relaxed">{globalError}</p>
                  </div>
                  <button onClick={() => setGlobalError('')} className="text-red-500 hover:text-red-700">
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-6 text-gray-700">Carregando...</div>}>
            <Routes>
          {/* Feed é a página inicial — acessível sem login */}
          <Route path="/" element={<AdminRouteBlocker><Feed /></AdminRouteBlocker>} />
          <Route path="/feed" element={<AdminRouteBlocker><Feed /></AdminRouteBlocker>} />
          <Route path="/producer" element={<Navigate replace to="/feed" />} />
          <Route path="/producer/*" element={<Navigate replace to="/feed" />} />
          <Route path="/agricultores" element={<AdminRouteBlocker><Feed /></AdminRouteBlocker>} />
          <Route path="/login" element={<AdminRouteBlocker><Login /></AdminRouteBlocker>} />
          <Route path="/register" element={<AdminRouteBlocker><Register /></AdminRouteBlocker>} />
          <Route path="/register/normal" element={<AdminRouteBlocker><RegisterNormal /></AdminRouteBlocker>} />
          <Route path="/register/producer" element={<AdminRouteBlocker><RegisterProducer /></AdminRouteBlocker>} />
          <Route path="/register/seller" element={<AdminRouteBlocker><RegisterSeller /></AdminRouteBlocker>} />
          <Route path="/post/:id" element={<AdminRouteBlocker><PostDetail /></AdminRouteBlocker>} />
          {/* Rotas que requerem login */}
          <Route path="/chat" element={<AdminRouteBlocker><ProtectedRoute><ChatAI /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/marketplace" element={<AdminRouteBlocker><ProtectedRoute><Marketplace /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/product/:id" element={<AdminRouteBlocker><ProtectedRoute><ProductDetail /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/techniques" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['user', 'producer', 'admin']}><Techniques /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/technique/:id" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['user', 'producer', 'admin']}><TechniqueDetail /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/profile" element={<AdminRouteBlocker><ProtectedRoute><Profile /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/profile/:id" element={<AdminRouteBlocker><Profile /></AdminRouteBlocker>} />
          <Route path="/notifications" element={<AdminRouteBlocker><ProtectedRoute><Notifications /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/create-post" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['user', 'producer', 'admin']}><CreatePost /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/create-product" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><CreateProduct /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/transactions/*" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><Navigate replace to="/minhas-reservas" /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/transactions" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><Navigate replace to="/minhas-reservas" /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/minhas-reservas/*" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><Transactions /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/minhas-reservas" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><Transactions /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/transactions/:id/*" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><TransactionDetail /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/transactions/:id" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller', 'producer', 'admin']}><TransactionDetail /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/product/:productId/units" element={<AdminRouteBlocker><ProtectedRoute><ProductUnits /></ProtectedRoute></AdminRouteBlocker>} />
          <Route path="/seller/dashboard/*" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['seller']}><SellerDashboardLayout /></ProtectedRoute></AdminRouteBlocker>}>
            <Route index element={<SellerDashboardOverview />} />
            <Route path="produtos" element={<SellerDashboardProducts />} />
            <Route path="anuncios" element={<SellerDashboardProducts />} />
            <Route path="notificacoes" element={<SellerDashboardNotifications />} />
            <Route path="perfil" element={<SellerDashboardProfile />} />
          </Route>
          <Route path="/producer/dashboard/*" element={<AdminRouteBlocker><ProtectedRoute allowedRoles={['producer']}><SellerDashboardLayout /></ProtectedRoute></AdminRouteBlocker>}>
            <Route index element={<SellerDashboardOverview />} />
            <Route path="produtos" element={<SellerDashboardProducts />} />
            <Route path="anuncios" element={<SellerDashboardProducts />} />
            <Route path="notificacoes" element={<SellerDashboardNotifications />} />
            <Route path="perfil" element={<SellerDashboardProfile />} />
          </Route>
          <Route path="/seller-dashboard" element={<Navigate replace to="/seller/dashboard" />} />
          <Route path="/producer-dashboard" element={<Navigate replace to="/producer/dashboard" />} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'seller', 'producer']}><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
        </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
