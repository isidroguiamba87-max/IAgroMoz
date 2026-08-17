import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Popup único, montado uma vez em App.jsx, que se sobrepõe a qualquer rota.
// Substitui os redirecionamentos diretos para /login espalhados pelas
// páginas — dá sempre a escolher Entrar ou Criar conta, e devolve o
// visitante ao mesmo ecrã (via ?next=) depois de autenticar.
function AuthWallModal() {
  const navigate = useNavigate()
  const { wallOpen, wallMessage, closeWall, hideWall } = useAuth()

  if (!wallOpen) return null

  const nextParam = (() => {
    try {
      const stored = sessionStorage.getItem('authWallNext')
      return stored ? `?next=${encodeURIComponent(stored)}` : ''
    } catch (_) {
      return ''
    }
  })()

  // Só esconde (não cancela) — a ação pendente tem de sobreviver para
  // poder retomar sozinha assim que o login/registo tiver sucesso.
  const goTo = (path) => {
    hideWall()
    navigate(`${path}${nextParam}`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeWall}>
      <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="bi bi-lock-fill text-green-600 mr-1"></i>Entra para continuar
          </h3>
          <button onClick={closeWall} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-6">{wallMessage}</p>
        <div className="flex gap-3">
          <button onClick={() => goTo('/login')}
            className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50">
            Entrar
          </button>
          <button onClick={() => goTo('/register')}
            className="flex-1 btn-primary text-white py-3 rounded-xl font-semibold text-sm">
            Criar conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthWallModal
