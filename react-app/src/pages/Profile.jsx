import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import MobileNav from '../components/MobileNav'
import DesktopSidebar from '../components/DesktopSidebar'
import LoadingPlant from '../components/LoadingPlant'
import Comment from '../components/Comment'
import Avatar from '../components/Avatar'
import api from '../services/api'
import { addNotification } from './Notifications'
import { useTheme } from '../context/ThemeContext'
import { FieldInput, FieldSelect } from './RegisterBase'
import { getConnections, addConnection, removeConnection, isConnected } from '../components/FeedRightPanel'
import { API_BASE, API_MEDIA } from '../config/api'

// Normaliza a URL de uma imagem — garante URL absoluta
const resolveImg = (url) => {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_MEDIA}${url.startsWith('/') ? '' : '/'}${url}`
}

function Profile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('posts') // posts | produtos | info | edit | password
  const location = useLocation()

  // Publicações do feed
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(false)

  // Produtos do marketplace
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  // Edição
  const [editForm, setEditForm] = useState({ first_name: '', last_name: '', username: '', email: '', foto_perfil: null })
  const [editFotoPreview, setEditFotoPreview] = useState(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState('')
  const [editSuccess, setEditSuccess] = useState('')

  // Producer / Seller profiles
  const [producerProfile, setProducerProfile] = useState(null)
  const [sellerProfile, setSellerProfile] = useState(null)
  const [psLoading, setPsLoading] = useState(false)
  const [psError, setPsError] = useState('')
  const [upgradeReq, setUpgradeReq] = useState(null)
  const [showUpgradeForm, setShowUpgradeForm] = useState(false)
  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const [upgradeContact, setUpgradeContact] = useState('')
  const [upgradeFarmAddress, setUpgradeFarmAddress] = useState('')

  // Senha
  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', confirm: '' })
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')

  const myId = localStorage.getItem('userId')
  const token = localStorage.getItem('access_token')
  const isOwnProfile = !id || String(id) === String(myId)
  const profileId = id || myId
  const profileLoadRef = useRef(false)

  useEffect(() => {
    if (!isOwnProfile) return
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    const validTabs = ['posts', 'produtos', 'info', 'edit', 'password', 'settings']
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab)
    }
  }, [location.search, isOwnProfile])

  const isAuthorized = profile && (
    ['PRODUCER', 'SELLER', 'ADMIN'].includes((profile.role || '').toUpperCase())
  )

  useEffect(() => {
    if (!profile) return
    const availableTabs = isOwnProfile
      ? [...(isAuthorized ? ['posts', 'produtos'] : []), 'settings']
      : [...(isAuthorized ? ['posts', 'produtos'] : []), 'info']
    if (!availableTabs.includes(activeTab) && !activeTab.startsWith('settings_')) {
      setActiveTab(availableTabs[0])
    }
  }, [activeTab, isOwnProfile, isAuthorized, profile])

  const { dark, setDark } = useTheme()
  const [myConnections, setMyConnections] = useState(getConnections())

  useEffect(() => {
    if (profileLoadRef.current) return
    profileLoadRef.current = true
    const bootstrap = async () => {
      const profileData = await loadProfile()
      if (isOwnProfile) await loadProducerSeller(profileData)
    }
    bootstrap()
  }, [id])

  const loadProducerSeller = async (currentProfile = null) => {
    setPsLoading(true); setPsError('')
    try {
      const localRole = (localStorage.getItem('userRole') || '').toUpperCase()
      const role = (currentProfile?.role || profile?.role || localRole || '').toUpperCase()
      const prod = role === 'PRODUCER'
        ? await api.getProducerProfile().catch(() => null)
        : null
      const sell = role === 'SELLER'
        ? await api.getSellerProfile().catch(() => null)
        : null
      setProducerProfile(prod || null)
      setSellerProfile(sell || null)
      // Só carregar o estado do pedido de upgrade para utilizadores normais
      if (role !== 'PRODUCER' && role !== 'SELLER') {
        if (localRole !== 'PRODUCER' && localRole !== 'SELLER') {
          try {
            const st = await api.getUpgradeStatus()
            setUpgradeReq(st || null)
          } catch (_) {
            setUpgradeReq(null)
          }
        } else {
          setUpgradeReq(null)
        }
      } else {
        setUpgradeReq(null)
      }
    } catch (err) {
      setPsError('Erro ao carregar perfis complementares')
    } finally { setPsLoading(false) }
  }

  const handleUpgradeSubmit = async (e) => {
    e.preventDefault(); setUpgradeLoading(true)
    try {
      await api.requestUpgradeToProducer(upgradeContact, upgradeFarmAddress)
      const st = await api.getUpgradeStatus()
      setUpgradeReq(st)
      setShowUpgradeForm(false)
      setEditSuccess('Pedido de upgrade submetido. Aguarde aprovação do admin.')
      addNotification({ type: 'upgrade_request', message: 'Pedido de upgrade submetido com sucesso. Aguarde aprovação do admin.', icon: 'bi-arrow-up-circle' }, true)
    } catch (err) {
      setPsError(err?.data ? Object.entries(err.data).map(([k,v]) => Array.isArray(v)?v.join(', '):v).join(' | ') : (err?.message || 'Erro ao submeter pedido'))
    } finally { setUpgradeLoading(false) }
  }

  useEffect(() => {
    if (!profile) return
    if (activeTab === 'posts') loadPosts()
    if (activeTab === 'produtos') loadProducts()
  }, [activeTab, profile])

  const loadProfile = async () => {
    setLoading(true)
    try {
      const data = isOwnProfile
        ? await api.getFullProfile().catch(async () => await api.getUserProfile())
        : await api.getUserPublicProfile(id)
      setProfile(data)
      setEditForm({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        username: data.username || '',
        email: data.email || '',
        gender: data.gender || '',
        contact: data.contact || data.telefone || data.phone || '',
        location: data.district?.name || data.location || data.store_address || data.farm_address || '',
        foto_perfil: null
      })
      setEditFotoPreview(data.profile_photo || data.foto_perfil || null)
      return data
    } catch (err) {
      console.error(err)
      return null
    } finally { setLoading(false) }
  }

  const normalizeText = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ')

  const loadPosts = async () => {
    setLoadingPosts(true)
    try {
      // GET /feed/posts/ — filtra pelo autor no frontend (API não tem filtro por autor)
      const data = await api.getFeedPosts()
      const list = Array.isArray(data) ? data : (data.results || [])
      const userName = profile?.nome_completo || `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()
      const userNameNormalized = normalizeText(userName)
      const filtered = list.filter(p => {
        const authorId = p.autor?.id || p.autor_id || p.author_id || p.autor || p.author?.id || null
        if (authorId && profileId && String(authorId) === String(profileId)) return true
        if (!userNameNormalized) return false

        const autorNome = p.nome_completo || p.autor_nome || p.author_name
          || p.autor?.nome_completo
          || (p.autor?.first_name && p.autor?.last_name ? `${p.autor.first_name} ${p.autor.last_name}`.trim() : null)
          || p.autor?.first_name
          || p.autor?.username
          || (p.autor?.email ? p.autor.email.split('@')[0] : null)
          || ''

        const autorNomeNormalized = normalizeText(autorNome)
        if (!autorNomeNormalized) return false
        return autorNomeNormalized === userNameNormalized
      })
      setPosts(filtered)
    } catch (err) { setPosts([]) }
    finally { setLoadingPosts(false) }
  }

  const loadProducts = async () => {
    setLoadingProducts(true)
    try {
      const data = await api.getProducts()
      const list = Array.isArray(data) ? data : (data.results || [])

      // Normalizar campos da API (inglês) e construir URLs absolutas
      const normalized = list.map(p => ({
        id:    p.id,
        nome:  p.name  || p.nome  || '',
        preco: p.price || p.preco || '0',
        foto:  resolveImg(p.photo || p.foto || null),
        seller_id: p.seller?.id || p.seller_id || p.vendedor_id || p.user_id || p.owner_id || null,
        vendedor:  p.seller
          ? `${p.seller.first_name || ''} ${p.seller.last_name || ''}`.trim()
          : (p.vendedor || ''),
      }))

      // Filtrar pelos produtos do utilizador do perfil
      const targetId = profileId || localStorage.getItem('userId')
      const userName = profile?.nome_completo || `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()
      const userNameNormalized = normalizeText(userName)

      const filtered = normalized.filter(p => {
        if (targetId && p.seller_id && String(p.seller_id) === String(targetId)) return true
        if (!userNameNormalized) return false
        const vendedorNormalized = normalizeText(p.vendedor)
        return vendedorNormalized && vendedorNormalized === userNameNormalized
      })

      setProducts(filtered)
    } catch (err) { setProducts([]) }
    finally { setLoadingProducts(false) }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true); setEditError(''); setEditSuccess('')
    try {
      let updated
      if (editForm.foto_perfil) {
        const fd = new FormData()
        fd.append('first_name', editForm.first_name.trim())
        fd.append('last_name', editForm.last_name.trim())
        fd.append('profile_photo', editForm.foto_perfil)
        updated = await api.updateUserProfile(fd)
      } else {
        updated = await api.updateUserProfile({
          first_name: editForm.first_name.trim(),
          last_name: editForm.last_name.trim(),
        })
      }
      setProfile(prev => ({ ...prev, ...updated }))
      if (updated.profile_photo || updated.foto_perfil) {
        const foto = updated.profile_photo || updated.foto_perfil
        setEditFotoPreview(foto)
        localStorage.setItem('userFoto', foto)
      }
      const fullName = `${updated.first_name || ''} ${updated.last_name || ''}`.trim()
      if (fullName) localStorage.setItem('userName', fullName)
      setEditSuccess('Perfil atualizado com sucesso.')
    } catch (err) { setEditError(err?.message || 'Erro ao atualizar.') }
    finally { setEditLoading(false) }
  }

  const handleProducerSubmit = async (e) => {
    e.preventDefault(); setPsError('')
    try {
      const payload = {
        contact: producerProfile?.contact || '',
        farm_address: producerProfile?.farm_address || ''
      }
      const updated = await api.updateProducerProfile(payload)
      setProducerProfile(updated)
      setEditSuccess('Perfil de produtor atualizado com sucesso.')
    } catch (err) { setPsError(err?.message || 'Erro ao atualizar perfil de produtor.') }
  }

  const handleSellerSubmit = async (e) => {
    e.preventDefault(); setPsError('')
    try {
      const payload = {
        seller_type: sellerProfile?.seller_type || 'INDIVIDUAL',
        store_name: sellerProfile?.store_name || '',
        nuit: sellerProfile?.nuit || undefined,
        contact: sellerProfile?.contact || '',
        store_address: sellerProfile?.store_address || ''
      }
      const updated = await api.updateSellerProfile(payload)
      setSellerProfile(updated)
      setEditSuccess('Perfil de vendedor atualizado com sucesso.')
    } catch (err) { setPsError(err?.message || 'Erro ao atualizar perfil de vendedor.') }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault(); setPwError(''); setPwSuccess('')
    if (pwForm.new_password !== pwForm.confirm) return setPwError('As senhas não coincidem.')
    if (pwForm.new_password.length < 8) return setPwError('Mínimo 8 caracteres.')
    setPwLoading(true)
    try { await api.changePassword(pwForm.old_password, pwForm.new_password); setPwSuccess('Senha alterada.'); setPwForm({ old_password: '', new_password: '', confirm: '' }) }
    catch (err) { setPwError(err?.message || 'Erro ao alterar senha.') }
    finally { setPwLoading(false) }
  }

  const handleLogout = () => { localStorage.clear(); navigate('/login') }

  // Determinar role a partir do campo role da API (NORMAL/PRODUCER/SELLER/ADMIN)
  const getRoleLabel = (p) => {
    if (!p) return 'Utilizador'
    const role = (p.role || '').toUpperCase()
    if (role === 'ADMIN') return 'Administrador'
    if (role === 'PRODUCER') return 'Produtor'
    if (role === 'SELLER') return 'Vendedor'
    return 'Utilizador'
  }
  const getRoleColor = (p) => {
    if (!p) return 'bg-gray-100 text-gray-600'
    const role = (p.role || '').toUpperCase()
    if (role === 'ADMIN') return 'bg-red-100 text-red-700'
    if (role === 'PRODUCER') return 'bg-green-100 text-green-700'
    if (role === 'SELLER') return 'bg-blue-100 text-blue-700'
    return 'bg-gray-100 text-gray-600'
  }

  const initials = profile ? `${profile.first_name?.charAt(0) || ''}${profile.last_name?.charAt(0) || ''}`.toUpperCase() || '?' : '?'

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingPlant /></div>
  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Utilizador não encontrado</p>
        <button onClick={() => navigate(-1)} className="btn-primary text-white px-6 py-2 rounded-xl">Voltar</button>
      </div>
    </div>
  )

  // Tabs disponíveis
  const tabs = isOwnProfile
    ? [
        ...(isAuthorized ? [{ id: 'posts', label: 'Publicações', icon: 'bi-grid-3x3' }] : []),
        ...(isAuthorized ? [{ id: 'produtos', label: 'Produtos', icon: 'bi-shop' }] : []),
        { id: 'settings', label: 'Definições', icon: 'bi-gear' },
      ]
    : [
        ...(isAuthorized ? [{ id: 'posts', label: 'Publicações', icon: 'bi-grid-3x3' }] : []),
        ...(isAuthorized ? [{ id: 'produtos', label: 'Produtos', icon: 'bi-shop' }] : []),
        { id: 'info', label: 'Info', icon: 'bi-person' },
      ]

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex">
      <DesktopSidebar />
      <div className="flex-1 min-w-0">
        <header className="glass-effect sticky top-0 z-40 border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-end">
            {isOwnProfile && (
              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                <i className="bi bi-box-arrow-right"></i> Sair
              </button>
            )}
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6 pb-24 lg:pb-6">
          <div className="flex gap-6 items-start">
            {/* LEFT — sticky profile card */}
            <div className="hidden lg:block w-72 flex-shrink-0 sticky top-20">
              {/* Card de perfil */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-4">
                <div className="flex flex-col items-center text-center">
                  {(profile.profile_photo || profile.foto_perfil) ? (
                    <img src={profile.profile_photo || profile.foto_perfil} alt={initials}
                      className="w-24 h-24 rounded-full object-cover shadow-lg mb-3 border-4 border-green-100" />
                  ) : (
                    <div className="w-24 h-24 rounded-full avatar-gradient flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-3">
                      {initials}
                    </div>
                  )}
                  <h1 className="text-lg font-black text-gray-900 mb-0.5">
                    {`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username || 'Utilizador'}
                  </h1>
                  {isOwnProfile && <p className="text-gray-400 text-xs mb-2">{profile.email}</p>}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${getRoleColor(profile)}`}>
                    {getRoleLabel(profile)}
                  </span>

                  {/* Avaliação pública do vendedor (se aplicável) */}
                  {(!isOwnProfile) && (profile.pode_vender || profile.can_sell || profile.seller_profile) && (
                    (() => {
                      const avg = profile.ratings?.average_as_seller || profile.average_as_seller || profile.ratings?.average || null
                      const total = profile.ratings?.total_as_seller || profile.total_as_seller || profile.ratings?.total || 0
                      if (!avg && !total) return null
                      return (
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <i className="bi bi-star-fill text-yellow-400"></i>
                          <span className="font-semibold">{avg ? `${avg} / 5` : '—'}</span>
                          <span className="text-gray-400">({total} avaliações)</span>
                        </div>
                      )
                    })()
                  )}
                  {(profile.district?.name || profile.distrito?.nome) && (
                    <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                      <i className="bi bi-geo-alt text-green-600"></i> {profile.district?.name || profile.distrito?.nome}
                    </p>
                  )}
                </div>
              </div>

              {/* Tabs no lado esquerdo — desktop */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all border-b border-gray-50 last:border-0 ${
                      activeTab === tab.id ? 'bg-green-50 text-green-700 border-l-2 border-l-green-500' : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                    <i className={`${tab.icon} text-base`}></i>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <i className="bi bi-chevron-right ml-auto text-green-500 text-xs"></i>}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — scrollable content */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* Mobile: card de perfil compacto */}
              <div className="lg:hidden bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  {profile.foto_perfil ? (
                    <img src={profile.foto_perfil} alt={initials}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0 shadow-lg border-2 border-green-100" />
                  ) : (
                    <div className="w-16 h-16 rounded-full avatar-gradient flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
                      {initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-base font-black text-gray-900 truncate">
                      {`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username || 'Utilizador'}
                    </h1>
                    {isOwnProfile && <p className="text-gray-400 text-xs truncate">{profile.email}</p>}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold mt-1 inline-block ${getRoleColor(profile)}`}>
                      {getRoleLabel(profile)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile: tabs horizontais */}
              <div className="lg:hidden flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 overflow-x-auto">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-fit py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 whitespace-nowrap transition-all ${
                      activeTab === tab.id ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:bg-gray-50'
                    }`}>
                    <i className={tab.icon}></i> {tab.label}
                  </button>
                ))}
              </div>
              {/* Tab content starts here */}

              {/* Tab: Publicações do Feed */}
          {activeTab === 'posts' && (
            <div>
              {loadingPosts ? <LoadingPlant /> : posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <i className="bi bi-journal-text text-3xl text-gray-300"></i>
                  </div>
                  <p className="text-gray-500 text-sm">Nenhuma publicação ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map(post => {
                    const img = (() => {
                      const i = post.imagem || post.image
                      if (!i) return null
                      if (i.startsWith('http')) return i
                      return `${API_MEDIA}/media/` + i.replace(/^\/?(media\/)?/, '')
                    })()
                    return (
                      <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3">
                          <Avatar name={profile.nome_completo || `${profile.first_name} ${profile.last_name}`.trim()} foto={profile.foto_perfil} size="sm" />
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{profile.nome_completo || `${profile.first_name} ${profile.last_name}`.trim()}</p>
                            <p className="text-xs text-gray-400">
                              {post.criado_em || post.created_at ? new Date(post.criado_em || post.created_at).toLocaleDateString('pt-PT') : ''}
                            </p>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="px-4 pb-3">
                          {(post.titulo || post.title) && <p className="font-bold text-gray-900 text-sm mb-1">{post.titulo || post.title}</p>}
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.conteudo || post.body}</p>
                        </div>

                        {/* Imagem */}
                        {img && <img src={img} alt="" className="w-full aspect-[4/3] object-cover" />}

                        {/* Acções */}
                        <div className="border-t border-gray-100 px-2 py-1 flex items-center">
                          <button
                            onClick={() => navigate(`/post/${post.id}`)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 text-sm font-semibold">
                            <i className="bi bi-hand-thumbs-up text-lg"></i> Gostar
                          </button>
                          <button
                            onClick={() => navigate(`/post/${post.id}`)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 text-sm font-semibold">
                            <i className="bi bi-chat text-lg"></i> Comentar
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.origin + '/post/' + post.id)
                              alert('Link copiado!')
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-gray-50 text-gray-500 text-sm font-semibold">
                            <i className="bi bi-share text-lg"></i> Partilhar
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tab: Produtos do Marketplace */}
          {activeTab === 'produtos' && (
            <div>
              {loadingProducts ? <LoadingPlant /> : products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <i className="bi bi-shop text-3xl text-gray-300"></i>
                  </div>
                  <p className="text-gray-500 text-sm">Nenhum produto publicado</p>
                  {isOwnProfile && (
                    <button onClick={() => navigate('/create-product')} className="mt-3 btn-primary text-white px-5 py-2 rounded-xl text-sm font-semibold">
                      Publicar produto
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                      onClick={() => navigate(`/product/${p.id}`)}>
                      {p.foto
                        ? <img src={p.foto} alt={p.nome} className="w-full h-44 object-cover" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                        : null}
                      <div className={`w-full h-44 bg-gradient-to-br from-green-50 to-green-100 items-center justify-center ${p.foto ? 'hidden' : 'flex'}`}>
                        <i className="bi bi-image text-4xl text-green-300"></i>
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight">{p.nome}</p>
                        <p className="text-green-700 font-black text-base mt-1">{p.preco} MZN</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Info */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <h2 className="font-bold text-gray-800">Informações</h2>
              {[
                { label: 'Nome', value: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username || 'Utilizador' },
                ...(isOwnProfile ? [{ label: 'Email', value: profile.email }] : []),
                { label: 'Tipo', value: getRoleLabel(profile), badge: getRoleColor(profile) },
                { label: 'Pode vender', value: profile.pode_vender ? 'Sim' : 'Não' },
              ].map(({ label, value, badge }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500 text-sm">{label}</span>
                  {badge
                    ? <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}`}>{value}</span>
                    : <span className="font-medium text-gray-800 text-sm">{value}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Tab: Editar (só próprio) */}
          {activeTab === 'edit' && isOwnProfile && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Editar perfil</h2>
              {editError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{editError}</div>}
              {editSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl mb-3 text-sm">{editSuccess}</div>}
              <form onSubmit={handleEditSubmit} className="space-y-3">
                {/* Foto de perfil */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Foto de perfil</label>
                  <div className="flex items-center gap-3">
                    {editFotoPreview ? (
                      <img src={editFotoPreview} alt="foto" className="w-14 h-14 rounded-full object-cover border-2 border-green-200" />
                    ) : (
                      <div className="w-14 h-14 rounded-full avatar-gradient flex items-center justify-center text-white font-bold text-xl">{initials}</div>
                    )}
                    <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all text-sm text-gray-500">
                      <i className="bi bi-camera text-green-600"></i>
                      {editFotoPreview ? 'Trocar foto' : 'Adicionar foto'}
                      <input type="file" accept="image/*" className="hidden"
                        onChange={e => {
                          const f = e.target.files[0]
                          if (!f) return
                          setEditForm(p => ({ ...p, foto_perfil: f }))
                          const r = new FileReader(); r.onloadend = () => setEditFotoPreview(r.result); r.readAsDataURL(f)
                        }} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Primeiro nome</label>
                  <input type="text" value={editForm.first_name} onChange={e => setEditForm(p => ({ ...p, first_name: e.target.value }))} className="form-input w-full px-3 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Apelido</label>
                  <input type="text" value={editForm.last_name} onChange={e => setEditForm(p => ({ ...p, last_name: e.target.value }))} className="form-input w-full px-3 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Username</label>
                  <input type="text" value={editForm.username} onChange={e => setEditForm(p => ({ ...p, username: e.target.value }))} className="form-input w-full px-3 py-2.5 rounded-xl text-sm" placeholder="@username" />
                </div>
                <button type="submit" disabled={editLoading} className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50">
                  {editLoading ? 'A guardar...' : 'Guardar alterações'}
                </button>
              </form>
              {/* Producer / Seller editors (se aplicável) */}
              {producerProfile && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-4">
                  <h3 className="font-bold mb-3">Perfil de Produtor</h3>
                  <form onSubmit={handleProducerSubmit} className="space-y-3">
                    <FieldInput label="Contacto (telefone)" value={producerProfile.contact || ''} onChange={e => setProducerProfile(p => ({ ...p, contact: e.target.value }))} placeholder="+258841234567" />
                    <FieldInput label="Endereço da exploração" value={producerProfile.farm_address || ''} onChange={e => setProducerProfile(p => ({ ...p, farm_address: e.target.value }))} placeholder="Bairro Central" />
                    <button type="submit" className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">Guardar Produtor</button>
                  </form>
                </div>
              )}

              {sellerProfile && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-4">
                  <h3 className="font-bold mb-3">Perfil de Vendedor</h3>
                  <form onSubmit={handleSellerSubmit} className="space-y-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm">Tipo de vendedor</label>
                      <FieldSelect value={sellerProfile.seller_type || 'INDIVIDUAL'} onChange={e => setSellerProfile(p => ({ ...p, seller_type: e.target.value }))} options={[{value:'INDIVIDUAL',label:'Individual'},{value:'COMPANY',label:'Empresa'},{value:'COOPERATIVE',label:'Cooperativa'}]} placeholder="Selecione" />
                    </div>
                    <FieldInput label="Nome da loja" value={sellerProfile.store_name || ''} onChange={e => setSellerProfile(p => ({ ...p, store_name: e.target.value }))} placeholder="Loja do Carlos" />
                    <FieldInput label="NUIT" value={sellerProfile.nuit || ''} onChange={e => setSellerProfile(p => ({ ...p, nuit: e.target.value }))} placeholder="123456789" />
                    <FieldInput label="Contacto (telefone)" value={sellerProfile.contact || ''} onChange={e => setSellerProfile(p => ({ ...p, contact: e.target.value }))} placeholder="+258841234567" />
                    <FieldInput label="Endereço da loja" value={sellerProfile.store_address || ''} onChange={e => setSellerProfile(p => ({ ...p, store_address: e.target.value }))} placeholder="Av. Eduardo Mondlane" />
                    <button type="submit" className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">Guardar Vendedor</button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Tab: Senha (só próprio) */}
          {activeTab === 'password' && isOwnProfile && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Alterar senha</h2>
              {pwError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{pwError}</div>}
              {pwSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl mb-3 text-sm">{pwSuccess}</div>}
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                {[
                  { label: 'Senha atual', key: 'old_password', placeholder: '••••••••' },
                  { label: 'Nova senha', key: 'new_password', placeholder: 'Mínimo 8 caracteres' },
                  { label: 'Confirmar nova senha', key: 'confirm', placeholder: 'Repita a nova senha' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">{label}</label>
                    <input type="password" value={pwForm[key]} onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))} className="form-input w-full px-3 py-2.5 rounded-xl text-sm" placeholder={placeholder} required />
                  </div>
                ))}
                <button type="submit" disabled={pwLoading} className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50">
                  {pwLoading ? 'A alterar...' : 'Alterar senha'}
                </button>
              </form>
            </div>
          )}

          {/* Tab: Definições (só próprio) */}
          {activeTab === 'settings' && isOwnProfile && (
            <div className="space-y-3">
              <h2 className="font-bold text-gray-800 text-base px-1">Definições</h2>

              {/* Informações */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <button
                  onClick={() => setActiveTab('settings_info')}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-person text-blue-600 text-lg"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 text-sm">Informações</p>
                    <p className="text-xs text-gray-400">Ver os seus dados de perfil</p>
                  </div>
                  <i className="bi bi-chevron-right text-gray-400 text-sm"></i>
                </button>
              </div>

              {/* Editar perfil */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <button
                  onClick={() => setActiveTab('settings_edit')}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-pencil text-green-600 text-lg"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 text-sm">Editar perfil</p>
                    <p className="text-xs text-gray-400">Alterar nome e dados pessoais</p>
                  </div>
                  <i className="bi bi-chevron-right text-gray-400 text-sm"></i>
                </button>
              </div>

              {/* Senha */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <button
                  onClick={() => setActiveTab('settings_password')}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-lock text-orange-500 text-lg"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 text-sm">Alterar senha</p>
                    <p className="text-xs text-gray-400">Mudar a sua palavra-passe</p>
                  </div>
                  <i className="bi bi-chevron-right text-gray-400 text-sm"></i>
                </button>
              </div>

              {/* Tema */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                      <i className={`bi ${dark ? 'bi-moon-fill text-indigo-500' : 'bi-sun-fill text-yellow-500'} text-lg`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Tema</p>
                      <p className="text-gray-400 text-xs">{dark ? 'Modo escuro activo' : 'Modo claro activo'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDark(d => !d)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${dark ? 'bg-green-600' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-0'}`}></span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab: Informações */}
          {activeTab === 'settings_info' && isOwnProfile && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setActiveTab('settings')} className="text-gray-400 hover:text-gray-600">
                  <i className="bi bi-arrow-left"></i>
                </button>
                <h2 className="font-bold text-gray-800">Informações</h2>
              </div>
              {[
                { label: 'Nome Completo', value: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username || 'Utilizador' },
                { label: 'Email', value: profile.email || 'Não definido' },
                { label: 'Contacto', value: profile.contact || profile.telefone || profile.phone || 'Não definido' },
                { label: 'Género', value: profile.gender === 'M' ? 'Masculino' : profile.gender === 'F' ? 'Feminino' : profile.gender === 'O' ? 'Outro' : 'Não definido' },
                { label: 'Localização', value: profile.district?.name || profile.location || profile.store_address || profile.farm_address || 'Não definido' },
                { label: 'Tipo de Conta', value: getRoleLabel(profile) },
                { label: 'Nome da Loja', value: sellerProfile?.store_name || profile.store_name || 'Não definido' },
                { label: 'Tipo de Vendedor', value: sellerProfile?.seller_type || profile.seller_type || 'Não definido' },
                { label: 'NUIT', value: sellerProfile?.nuit || profile.nuit || 'Não definido' },
                { label: 'Endereço da Loja', value: sellerProfile?.store_address || profile.store_address || 'Não definido' },
                { label: 'Permissão de Venda', value: (profile.can_sell || profile.pode_vender) ? 'Sim' : 'Não' },
              ].map(({ label, value, badge }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500 text-sm">{label}</span>
                  {badge
                    ? <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}`}>{value}</span>
                    : <span className="font-medium text-gray-800 text-sm">{value}</span>}
                </div>
              ))}

              {/* Upgrade para Produtor (apenas para NORMAL) */}
              {((profile.role || '').toUpperCase() === 'NORMAL') && (
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Pedido de Upgrade para Produtor</h3>
                  {upgradeReq ? (
                    <div className="text-sm text-gray-600">
                      <p>Status: <span className="font-semibold">{upgradeReq.status}</span></p>
                      {upgradeReq.contact && <p>Contacto: {upgradeReq.contact}</p>}
                      {upgradeReq.farm_address && <p>Exploração: {upgradeReq.farm_address}</p>}
                      <p className="text-xs text-gray-400 mt-2">Enviado: {upgradeReq.created_at || upgradeReq.created || '—'}</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p>Ainda não submeteu um pedido de upgrade. Submeta o pedido para ser analisado pelo administrador.</p>
                      {!showUpgradeForm ? (
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => setShowUpgradeForm(true)} className="btn-primary text-white py-2 px-3 rounded-xl text-sm">Solicitar Upgrade</button>
                        </div>
                      ) : (
                        <form onSubmit={handleUpgradeSubmit} className="space-y-2 mt-3">
                          <div>
                            <label className="block text-gray-700 text-xs mb-1">Contacto (telefone) *</label>
                            <input value={upgradeContact} onChange={e => setUpgradeContact(e.target.value)} required className="form-input w-full px-3 py-2.5 rounded-xl text-sm" />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-xs mb-1">Endereço da exploração *</label>
                            <textarea value={upgradeFarmAddress} onChange={e => setUpgradeFarmAddress(e.target.value)} required className="form-input w-full px-3 py-2.5 rounded-xl text-sm" rows={2} />
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => setShowUpgradeForm(false)} className="flex-1 py-2 rounded-xl border-2 border-gray-200 text-sm">Cancelar</button>
                            <button type="submit" disabled={upgradeLoading} className="flex-1 py-2 rounded-xl btn-primary text-white text-sm">{upgradeLoading ? 'A enviar...' : 'Enviar pedido'}</button>
                          </div>
                          {psError && <div className="text-sm text-red-600">{psError}</div>}
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sub-tab: Editar */}
          {activeTab === 'settings_edit' && isOwnProfile && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setActiveTab('settings')} className="text-gray-400 hover:text-gray-600">
                  <i className="bi bi-arrow-left"></i>
                </button>
                <h2 className="font-bold text-gray-800">Editar perfil</h2>
              </div>
              {editError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{editError}</div>}
              {editSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl mb-3 text-sm">{editSuccess}</div>}
              <form onSubmit={handleEditSubmit} className="space-y-3">
                {/* Foto de perfil */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Foto de perfil</label>
                  <div className="flex items-center gap-3">
                    {editFotoPreview ? (
                      <img src={editFotoPreview} alt="foto" className="w-14 h-14 rounded-full object-cover border-2 border-green-200" />
                    ) : (
                      <div className="w-14 h-14 rounded-full avatar-gradient flex items-center justify-center text-white font-bold text-xl">{initials}</div>
                    )}
                    <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all text-sm text-gray-500">
                      <i className="bi bi-camera text-green-600"></i>
                      {editFotoPreview ? 'Trocar foto' : 'Adicionar foto'}
                      <input type="file" accept="image/*" className="hidden"
                        onChange={e => {
                          const f = e.target.files[0]
                          if (!f) return
                          setEditForm(p => ({ ...p, foto_perfil: f }))
                          const r = new FileReader(); r.onloadend = () => setEditFotoPreview(r.result); r.readAsDataURL(f)
                        }} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Primeiro nome</label>
                  <input type="text" value={editForm.first_name}
                    onChange={e => setEditForm(p => ({ ...p, first_name: e.target.value }))}
                    className="form-input w-full px-3 py-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Apelido</label>
                  <input type="text" value={editForm.last_name}
                    onChange={e => setEditForm(p => ({ ...p, last_name: e.target.value }))}
                    className="form-input w-full px-3 py-2.5 rounded-xl text-sm" />
                </div>
                <button type="submit" disabled={editLoading}
                  className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50">
                  {editLoading ? 'A guardar...' : 'Guardar alterações'}
                </button>
              </form>
            </div>
          )}

          {/* Sub-tab: Senha */}
          {activeTab === 'settings_password' && isOwnProfile && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setActiveTab('settings')} className="text-gray-400 hover:text-gray-600">
                  <i className="bi bi-arrow-left"></i>
                </button>
                <h2 className="font-bold text-gray-800">Alterar senha</h2>
              </div>
              {pwError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mb-3 text-sm">{pwError}</div>}
              {pwSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl mb-3 text-sm">{pwSuccess}</div>}
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                {[
                  { label: 'Senha atual', key: 'old_password', placeholder: '••••••••' },
                  { label: 'Nova senha', key: 'new_password', placeholder: 'Mínimo 8 caracteres' },
                  { label: 'Confirmar nova senha', key: 'confirm', placeholder: 'Repita a nova senha' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">{label}</label>
                    <input type="password" value={pwForm[key]}
                      onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                      className="form-input w-full px-3 py-2.5 rounded-xl text-sm"
                      placeholder={placeholder} required />
                  </div>
                ))}
                <button type="submit" disabled={pwLoading}
                  className="w-full btn-primary text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50">
                  {pwLoading ? 'A alterar...' : 'Alterar senha'}
                </button>
              </form>
            </div>
          )}
            </div>{/* end RIGHT column */}
          </div>{/* end flex gap-6 */}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default Profile
