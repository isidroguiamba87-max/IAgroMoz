import { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { captureError } from '../utils/errorTracking'

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    captureError(error, {
      componentStack: info.componentStack,
      type: 'route_error_boundary',
      route: window.location.pathname,
    })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const { onBack } = this.props
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-exclamation-triangle text-2xl text-red-400"></i>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Esta página encontrou um erro</h2>
          <p className="text-gray-500 text-sm mb-5">
            {this.state.error?.message || 'Erro inesperado. Tente recarregar a página.'}
          </p>
          <div className="flex gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50"
              >
                Voltar
              </button>
            )}
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="flex-1 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm"
            >
              Tentar de novo
            </button>
          </div>
        </div>
      </div>
    )
  }
}

// Wrapper funcional para aceder ao useNavigate dentro de um class component
export function RouteErrorBoundaryWithNav({ children }) {
  const navigate = useNavigate()
  return (
    <RouteErrorBoundary onBack={() => navigate(-1)}>
      {children}
    </RouteErrorBoundary>
  )
}

export default RouteErrorBoundary
