import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { API_MEDIA } from '../config/api'

const resolveImg = (url) => {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_MEDIA}${url.startsWith('/') ? '' : '/'}${url}`
}

function SellerDashboardProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    setError('')
    try {
      // GET /marketplace/products/?seller= não é um filtro suportado pela API —
      // devolvia a lista geral paginada (20 produtos de todos os vendedores) e o
      // produto do utilizador podia simplesmente não estar nessa primeira página.
      // /feed/posts/my-products/ devolve mesmo só os produtos do utilizador autenticado.
      const data = await api.getMyLinkableProducts()
      const list = Array.isArray(data) ? data : data.results || []
      setProducts(list)
    } catch (err) {
      setError('Não foi possível carregar os produtos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Meus Produtos</h2>
          <p className="text-sm text-gray-500">Veja e gerencie seu catálogo de produtos.</p>
        </div>
        <button onClick={() => navigate('/create-product')}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
          <i className="bi bi-plus-lg"></i> Publicar novo produto
        </button>
      </div>

      {error && <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">Carregando produtos...</div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 text-center text-gray-500">
          Nenhum produto encontrado. Publique seu primeiro produto para começar a vender.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map(product => (
            <div key={product.id} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
              <button type="button" onClick={() => navigate(`/product/${product.id}`)} className="w-full text-left">
                <div className="h-44 bg-gray-100">
                  {product.photo || product.foto ? (
                    <img src={resolveImg(product.photo || product.foto)} alt={product.name || product.nome} className="h-44 w-full object-cover" />
                  ) : (
                    <div className="flex h-44 items-center justify-center text-3xl text-green-300">
                      <i className="bi bi-box-seam"></i>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{product.name || product.nome || 'Produto sem nome'}</h3>
                  <p className="text-sm text-green-700 font-black mt-2">{product.price || product.preco || '0'} MZN</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description || product.descricao || 'Sem descrição'}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SellerDashboardProducts
