import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const AuthContext = createContext()

const DEFAULT_WALL_MESSAGE = 'Para continuar, entra na tua conta.'

// O popup só existe nos ecrãs onde o visitante pode "passear" sem sessão —
// Feed, Mercado, Técnicas e Chat. Em qualquer outro sítio (ex: Perfil), essas
// rotas continuam atrás do ProtectedRoute normal, que já redireciona
// diretamente para /login sem popup nenhum — não duplicar esse comportamento aqui.
const WALL_SCREENS = ['/', '/feed', '/agricultores', '/post', '/marketplace', '/product', '/techniques', '/technique', '/recommendations', '/chat']
const isWallScreen = (pathname) => WALL_SCREENS.some(p => pathname === p || pathname.startsWith(p + '/'))

export function AuthProvider({ children }) {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('access_token'))
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null)
  const [wallOpen, setWallOpen] = useState(false)
  const [wallMessage, setWallMessage] = useState(DEFAULT_WALL_MESSAGE)
  // Ação e caminho pendentes ficam em ref (não state) — não são serializáveis
  // e não devem disparar novo render; sobrevivem porque o login normal não
  // recarrega a página (navigate() do react-router, não window.location).
  const pendingAction = useRef(null)
  const pendingPath = useRef(null)

  const refreshAuthState = () => {
    setIsLoggedIn(!!localStorage.getItem('access_token'))
    setUserRole(localStorage.getItem('userRole') || null)
  }

  useEffect(() => {
    window.addEventListener('auth-changed', refreshAuthState)
    return () => window.removeEventListener('auth-changed', refreshAuthState)
  }, [])

  // Assim que o login acontece sem sair da página, retoma a ação que o
  // utilizador tentou originalmente (ex: o "gostar" em que clicou).
  useEffect(() => {
    if (!isLoggedIn || !pendingAction.current) return
    if (pendingPath.current && pendingPath.current !== window.location.pathname) return
    const fn = pendingAction.current
    pendingAction.current = null
    pendingPath.current = null
    fn()
  }, [isLoggedIn])

  useEffect(() => {
    const onAuthRequired = (event) => {
      // Fora dos 4 ecrãs públicos, quem trata disto é o ProtectedRoute da
      // própria rota (redireciona para /login sem popup) — não duplicar.
      if (!isWallScreen(window.location.pathname)) return
      setWallMessage(event?.detail?.message || DEFAULT_WALL_MESSAGE)
      setWallOpen(true)
    }
    window.addEventListener('auth-required', onAuthRequired)
    return () => window.removeEventListener('auth-required', onAuthRequired)
  }, [])

  // Nunca deixar o popup sobreposto numa página diferente daquela onde foi
  // aberto — ex: abrir ao votar em Técnicas e depois navegar para o Perfil.
  useEffect(() => {
    setWallOpen(false)
  }, [location.pathname])

  const hasRole = (...roles) => !!userRole && roles.includes(userRole)

  // Substituto direto de `if (!token) { navigate('/login'); return }`:
  // devolve true (e não faz mais nada) se já autenticado; caso contrário
  // guarda a ação para retomar, mostra o popup e devolve false.
  const requireAuth = (retryFn, message) => {
    if (isLoggedIn) return true
    pendingAction.current = retryFn || null
    pendingPath.current = window.location.pathname
    try {
      sessionStorage.setItem('authWallNext', window.location.pathname + window.location.search)
    } catch (_) { /* sessionStorage indisponível — degrada para o comportamento sem retomar caminho */ }
    setWallMessage(message || DEFAULT_WALL_MESSAGE)
    setWallOpen(true)
    return false
  }

  // Fecha e CANCELA a intenção — usado no X / clique fora (o utilizador
  // desistiu, não faz sentido retomar a ação mais tarde).
  const closeWall = () => {
    setWallOpen(false)
    pendingAction.current = null
    pendingPath.current = null
  }

  // Só esconde o popup, sem cancelar a ação guardada — usado quando o
  // utilizador vai mesmo autenticar-se (Entrar/Criar conta), para a ação
  // poder retomar sozinha depois do login.
  const hideWall = () => setWallOpen(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, hasRole, requireAuth, wallOpen, wallMessage, closeWall, hideWall, refreshAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
