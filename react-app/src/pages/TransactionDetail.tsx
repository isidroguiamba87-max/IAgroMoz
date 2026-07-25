import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DesktopSidebar from '../components/DesktopSidebar'
import MobileNav from '../components/MobileNav'
import CancelConfirmModal from '../components/CancelConfirmModal'
import ContactForm from '../components/ContactForm'
import TransactionStatusWheel from '../components/TransactionStatusWheel'
import api from '../services/api'
import { addNotification } from './Notifications'
import { normTx as _normTx, normalizePhoneForWhatsapp, extractApiErrorMessage } from '../utils/normalizers'

// TransactionDetail usa status AWAITING_PAYMENT em vez de AWAITING_CONFIRMATION
const normTx = (tx) => ({
  ..._normTx(tx),
  status: tx.status === 'AWAITING_CONFIRMATION' ? 'AWAITING_PAYMENT' : (tx.status || 'RESERVED'),
})

const STATUS_LABEL = {
  RESERVED: 'Reservado',
  AWAITING_PAYMENT: 'Aguardando Pagamento',
  AWAITING_CONFIRMATION: 'Aguardando Confirmação',
  PROCESSING: 'Em Processamento',
  IN_TRANSIT: 'A Caminho',
  COMPLETED: 'Entregue/Finalizado',
  CANCELLED: 'Cancelado',
}

function TransactionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [showBuyerForm, setShowBuyerForm] = useState(false)

  const userId = localStorage.getItem('userId')
  const tx = transaction
  const isBuyer = tx && String(tx.buyer_id) === String(userId)
  const isSeller = tx && String(tx.seller_id) === String(userId)

  const buyerContactReady = tx && Boolean(tx.buyer_contact_whatsapp && tx.buyer_contact_name)
  const sellerWhatsappUrl = tx ? normalizePhoneForWhatsapp(tx.seller_whatsapp || tx.seller_phone) : null
  const buyerWhatsappUrl = tx ? normalizePhoneForWhatsapp(tx.buyer_contact_whatsapp) : null
  const shouldShowBuyerContactForm = isBuyer && ['AWAITING_PAYMENT'].includes(tx?.status) && !buyerContactReady

  useEffect(() => {
    if (!id) return
    loadTransaction()
  }, [id])

  const loadTransaction = async (silent = false) => {
    if (!silent) setLoading(true)
    if (!silent) setActionError('')
    try {
      const data = await api.getTransaction(id)
      const normalized = normTx(data)
      setTransaction(normalized)
    } catch (err) {
      if (!silent) {
        setActionError(err?.message || 'Não foi possível carregar a transação.')
      }
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const handleConfirm = async (txId) => {
    setActionLoading(true)
    setActionError('')
    try {
      await api.confirmTransaction(txId)
      setTransaction(prev => prev ? { ...prev, status: 'AWAITING_CONFIRMATION' } : null)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao confirmar transação.'))
    } finally {
      setActionLoading(false)
    }
  }

  const handleConfirmYes = async (txId) => {
    setActionLoading(true)
    setActionError('')
    try {
      await api.confirmTransaction(txId)
      // Refresh transaction from server to pick up any backend changes
      await loadTransaction()
      // Emit a local general notification so buyer clients see it in their app (will be stored in localStorage)
      addNotification({
        type: 'transaction',
        message: 'Reserva confirmada pelo vendedor.',
        icon: 'bi-receipt-cutoff',
        transaction_id: txId,
        transaction_status: 'AWAITING_PAYMENT',
      })
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao confirmar transação.'))
    } finally {
      setActionLoading(false)
    }
  }

  const handleConfirmNo = async (txId) => {
    setCancelTarget(tx)
  }

  useEffect(() => {
    if (!tx) return
    if (isBuyer && tx.status === 'AWAITING_PAYMENT') {
      setShowBuyerForm(true)
    }
  }, [tx, isBuyer])

  const handleSubmitBuyerDetails = async (details) => {
    setActionLoading(true)
    setActionError('')
    try {
      await api.updateTransaction(tx.id, {
        buyer_contact_name: details.name,
        buyer_contact_whatsapp: details.whatsapp,
      })
      setTransaction(prev => prev ? {
        ...prev,
        buyer_contact_name: details.name,
        buyer_contact_whatsapp: details.whatsapp,
      } : null)
      setShowBuyerForm(false)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao enviar dados.'))
    } finally {
      setActionLoading(false)
    }
  }

  const handleConclude = async (txId) => {
    setActionLoading(true)
    setActionError('')
    try {
      await api.concludeTransaction(txId)
      setTransaction(prev => prev ? { ...prev, status: 'COMPLETED' } : null)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao concluir transação.'))
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return
    setCancelLoading(true)
    setActionError('')
    try {
      await api.cancelTransaction(cancelTarget.id)
      setTransaction(prev => prev ? { ...prev, status: 'CANCELLED' } : null)
      setCancelTarget(null)
    } catch (err) {
      setActionError(extractApiErrorMessage(err, 'Erro ao cancelar transação.'))
      setCancelTarget(null)
    } finally {
      setCancelLoading(false)
    }
  }

  useEffect(() => {
    if (!tx || ['COMPLETED', 'CANCELLED'].includes(tx.status)) return
    const timer = setInterval(() => {
      if (!actionLoading) {
        loadTransaction(true)
      }
    }, 15000)
    return () => clearInterval(timer)
  }, [tx, actionLoading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-plant mb-4"></div>
          <p className="text-gray-600">Carregando reserva...</p>
        </div>
      </div>
    )
  }

  if (!tx) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-4">Reserva não encontrada.</p>
          <button onClick={() => navigate('/minhas-reservas')}
            className="btn-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
            Voltar às reservas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
      <DesktopSidebar />
      <CancelConfirmModal
        transaction={cancelTarget}
        loading={cancelLoading}
        onConfirm={handleCancelConfirm}
        onClose={() => setCancelTarget(null)}
      />
      
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 py-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
              <i className="bi bi-arrow-left text-lg"></i>
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-black text-gray-900">Reserva #{tx.id}</h1>
              <p className="text-xs text-gray-400">Detalhes da reserva</p>
            </div>
            <button onClick={loadTransaction}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              title="Recarregar">
              <i className="bi bi-arrow-clockwise text-lg"></i>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 max-w-5xl mx-auto w-full space-y-4">
          
          {actionError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              <div className="flex items-start gap-3">
                <i className="bi bi-exclamation-circle-fill text-lg mt-0.5"></i>
                <div>{actionError}</div>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <TransactionStatusWheel currentStatus={tx.status} statusLabel={STATUS_LABEL[tx.status] || tx.status} />
          </div>

          {/* Layout: Info Left, Actions Right */}
          <div className={`grid gap-4 ${isBuyer && tx.status === 'AWAITING_CONFIRMATION' && showBuyerForm ? 'grid-cols-1' : 'lg:grid-cols-[2fr_1fr]'}`}>
            
            {/* LEFT: Product & Details */}
            <div className="space-y-4">
              {/* Produto */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Produto</h3>
                <div className="space-y-3">
                  <p className="text-xl font-black text-gray-900">{tx.product_name}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Quantidade</span>
                    <span className="font-semibold text-gray-900">{tx.quantity} {tx.unit_name}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg border-t border-gray-100 pt-3">
                    <span className="text-gray-600">Total</span>
                    <span className="font-black text-green-600">{parseFloat(tx.amount || 0).toFixed(2)} MZN</span>
                  </div>
                </div>
                {tx.product_id && (
                  <button onClick={() => navigate(`/product/${tx.product_id}`)}
                    className="w-full mt-4 py-2.5 text-green-600 text-sm font-bold hover:text-green-700">
                    Ver detalhes do produto →
                  </button>
                )}
              </div>

              {/* Comprador & Vendedor */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Participantes</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Comprador</p>
                      <p className="font-bold text-gray-900">{tx.buyer_name}</p>
                    </div>
                    {isBuyer && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">Você</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Vendedor</p>
                      <p className="font-bold text-gray-900">{tx.seller_name}</p>
                    </div>
                    {isSeller && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Você</span>}
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Detalhes</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID da reserva</span>
                    <span className="font-mono text-gray-900">#{tx.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data</span>
                    <span className="text-gray-900">{tx.created_at ? new Date(tx.created_at).toLocaleString('pt-PT') : '—'}</span>
                  </div>
                  {tx.delivery_address && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Endereço</span>
                      <span className="text-gray-900 text-right">{tx.delivery_address}</span>
                    </div>
                  )}
                  {tx.note && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 mb-1"><i className="bi bi-chat-left-text mr-2"></i>Notas:</p>
                      <p className="text-gray-700 italic">{tx.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Actions Panel */}
            <div className="space-y-4">
              
              {/* SELLER ACTIONS */}
              {isSeller && (
                <>
                  {tx.status === 'RESERVED' && (
                    <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 space-y-3">
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700 mb-3">
                        <i className="bi bi-exclamation-circle mr-2"></i>
                        <strong>Nova Reserva!</strong> O comprador deseja este produto. Confirma a disponibilidade?
                      </div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Responder</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleConfirmYes(tx.id)}
                          disabled={actionLoading}
                          className="py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                          <i className="bi bi-check-circle"></i>
                          SIM
                        </button>
                        <button
                          onClick={() => handleConfirmNo(tx.id)}
                          disabled={actionLoading}
                          className="py-3 rounded-2xl border-2 border-red-200 text-red-600 font-bold hover:bg-red-50 disabled:opacity-50 flex items-center justify-center gap-2">
                          <i className="bi bi-x-circle"></i>
                          NÃO
                        </button>
                      </div>
                    </div>
                  )}

                  {(tx.status === 'AWAITING_CONFIRMATION' || tx.status === 'PROCESSING' || tx.status === 'IN_TRANSIT') && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ações</h3>
                      <button
                        onClick={() => handleConclude(tx.id)}
                        disabled={actionLoading}
                        className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">
                        <i className="bi bi-box-seam"></i>
                        Marcar como entregue
                      </button>
                    </div>
                  )}

                  {tx.status === 'COMPLETED' && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-600">
                        <i className="bi bi-check-all mr-2 text-green-600"></i>
                        <strong>Reserva concluída!</strong> Obrigado pela venda.
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* BUYER ACTIONS */}
              {isBuyer && (
                <>
                  {tx.status === 'RESERVED' && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700">
                        <i className="bi bi-hourglass-split mr-2"></i>
                        Aguardando confirmação do vendedor...
                      </div>
                    </div>
                  )}

                  {['AWAITING_PAYMENT'].includes(tx.status) && !buyerContactReady && (
                    <div className="bg-white rounded-3xl border border-green-200 shadow-sm p-6 space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700 mb-3">
                        <i className="bi bi-check-circle mr-2"></i>
                        <strong>Reserva confirmada!</strong> O vendedor confirmou a disponibilidade.
                      </div>
                      <button
                        onClick={() => setShowBuyerForm(true)}
                        className="w-full py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 flex items-center justify-center gap-2">
                        <i className="bi bi-pencil-square"></i>
                        Fornecer dados de contacto
                      </button>
                    </div>
                  )}

                  {shouldShowBuyerContactForm && showBuyerForm && (
                    <ContactForm
                      transaction={tx}
                      onSubmit={handleSubmitBuyerDetails}
                      loading={actionLoading}
                      error={actionError}
                    />
                  )}

                  {buyerContactReady && (
                    <div className="bg-white rounded-3xl border border-green-100 shadow-sm p-6 space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700">
                        <i className="bi bi-whatsapp mr-2"></i>
                        Os contactos foram guardados. Abra o chat e combine os detalhes com a outra parte.
                      </div>
                      {isBuyer && sellerWhatsappUrl && (
                        <a
                          href={sellerWhatsappUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                        >
                          <i className="bi bi-whatsapp"></i>
                          Abrir WhatsApp do vendedor
                        </a>
                      )}
                      {isSeller && buyerWhatsappUrl && (
                        <a
                          href={buyerWhatsappUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                        >
                          <i className="bi bi-whatsapp"></i>
                          Abrir WhatsApp do comprador
                        </a>
                      )}
                      {isBuyer && !sellerWhatsappUrl && (
                        <div className="text-sm text-gray-600">Ainda não temos o número WhatsApp do vendedor. Aguarde até ele partilhar o contacto ou verifique no perfil dele.</div>
                      )}
                      {isSeller && !buyerWhatsappUrl && (
                        <div className="text-sm text-gray-600">Aguardando o comprador preencher o WhatsApp para abrir o chat.</div>
                      )}
                    </div>
                  )}

                  {(tx.status === 'PROCESSING' || tx.status === 'IN_TRANSIT') && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700">
                        <i className="bi bi-truck mr-2"></i>
                        Seu pedido está a caminho. Aguarde a entrega.
                      </div>
                    </div>
                  )}

                  {tx.status === 'COMPLETED' && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-600 mb-3">
                        <i className="bi bi-check-all mr-2 text-green-600"></i>
                        <strong>Reserva concluída!</strong> Você recebeu o produto.
                      </div>
                    </div>
                  )}
                </>
              )}

              {tx.status === 'CANCELLED' && (
                <div className="bg-white rounded-3xl border border-red-200 shadow-sm p-6">
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
                    <i className="bi bi-x-circle-fill mr-2 text-lg"></i>
                    <strong>Reserva cancelada.</strong> Se tiver dúvidas, contacte a outra parte.
                  </div>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>
      
      <MobileNav />
    </div>
  )
}

export default TransactionDetail
