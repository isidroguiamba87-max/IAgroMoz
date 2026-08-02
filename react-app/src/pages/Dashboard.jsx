import { useState, useEffect, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import MobileNav from "../components/MobileNav"
import api from "../services/api"
import { resolveProductPhoto } from "../utils/normalizers"

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({ data, color = "#16a34a" }) {
  if (!data || data.length < 2) return null
  const vals = data.map(d => d.count || 0)
  const max = Math.max(...vals) || 1; const min = Math.min(...vals)
  const range = max - min || 1; const w = 300, h = 80
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`).join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={pts} />
      <polyline fill={color + "22"} stroke="none" points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color = "green", onClick }) {
  const C = { green: ["bg-green-50","text-green-600","text-green-700"], blue: ["bg-blue-50","text-blue-600","text-blue-700"], orange: ["bg-orange-50","text-orange-600","text-orange-700"], purple: ["bg-purple-50","text-purple-600","text-purple-700"], teal: ["bg-teal-50","text-teal-600","text-teal-700"], red: ["bg-red-50","text-red-600","text-red-700"] }
  const [bg, ic, val] = C[color] || C.green
  return (
    <div onClick={onClick} className={`${bg} rounded-2xl p-4 flex flex-col gap-1 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
        <i className={`${icon} text-xl ${ic}`}></i>
      </div>
      <span className={`text-2xl font-black ${val}`}>{value ?? "—"}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  )
}

// ─── Badge de status ──────────────────────────────────────────────────────────
function Badge({ status }) {
  const map = { ACTIVE: ["bg-green-100 text-green-700","Activo"], INACTIVE: ["bg-gray-100 text-gray-600","Inactivo"], PENDING: ["bg-yellow-100 text-yellow-700","Pendente"], APPROVED: ["bg-green-100 text-green-700","Aprovado"], REJECTED: ["bg-red-100 text-red-700","Rejeitado"], RESERVED: ["bg-blue-100 text-blue-700","Reservado"], AWAITING_CONFIRMATION: ["bg-orange-100 text-orange-700","Ag. Confirmação"], PROCESSING: ["bg-cyan-100 text-cyan-700","Em Processamento"], IN_TRANSIT: ["bg-purple-100 text-purple-700","A Caminho"], COMPLETED: ["bg-green-100 text-green-700","Concluído"], CANCELLED: ["bg-red-100 text-red-700","Cancelado"], PENDING_VALIDATION: ["bg-yellow-100 text-yellow-700","Pendente"], VALIDATED: ["bg-green-100 text-green-700","Validada"], DISCARDED: ["bg-red-100 text-red-700","Descartada"], NORMAL: ["bg-gray-100 text-gray-700","Normal"], PRODUCER: ["bg-green-100 text-green-700","Produtor"], SELLER: ["bg-blue-100 text-blue-700","Vendedor"], ADMIN: ["bg-red-100 text-red-700","Admin"] }
  const [cls, label] = map[status] || ["bg-gray-100 text-gray-600", status]
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
}

// ─── Tabela genérica ──────────────────────────────────────────────────────────
function Table({ cols, rows, loading, empty = "Sem dados." }) {
  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
  if (!rows || rows.length === 0) return <div className="text-center py-12 text-gray-400 text-sm">{empty}</div>
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {cols.map(c => <th key={c.key} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{c.label}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {cols.map(c => <td key={c.key} className="px-4 py-3 text-gray-700">{c.render ? c.render(row) : (row[c.key] ?? "—")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Seller Sidebar ───────────────────────────────────────────────────────────
function SellerSidebar({ active, setActive, userName, navigate }) {
  const items = [
    { id: "seller_overview",  icon: "bi-grid-fill",        label: "Visão Geral" },
    { id: "seller_products",  icon: "bi-box-seam",         label: "Os Meus Produtos" },
    { id: "seller_sales",     icon: "bi-cash-coin",        label: "Minhas Vendas" },
    { id: "seller_create",    icon: "bi-plus-circle-fill", label: "Anunciar Produto" },
  ]

  const handleNav = (id) => {
    if (id === "seller_overview") setActive(id)
    else if (id === "seller_products") navigate("/marketplace")
    else if (id === "seller_sales") navigate("/minhas-reservas")
    else if (id === "seller_create") navigate("/create-product")
  }

  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-64 h-screen sticky top-0 bg-green-950 text-white flex-shrink-0 overflow-y-auto">
      <div className="px-5 py-5 border-b border-green-900">
        <div className="flex items-center gap-2 mb-1">
          <img src="/logo.png" alt="IAgroMOZ" className="w-8 h-8 object-contain" />
          <span className="text-lg font-black text-white">IAgroMoz</span>
        </div>
        <p className="text-green-300 text-xs">Painel do Produtor / Vendedor</p>
      </div>
      <div className="px-5 py-4 border-b border-green-900 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center flex-shrink-0">
          <i className="bi bi-person-fill text-white text-lg"></i>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{userName}</p>
          <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">Produtor Certificado</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {items.map(item => (
          <button key={item.id} onClick={() => handleNav(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${active === item.id ? "bg-white text-green-950 font-bold shadow" : "text-green-200 hover:bg-green-900 hover:text-white"}`}>
            <i className={`${item.icon} text-base flex-shrink-0`}></i>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
      <button onClick={() => { localStorage.clear(); navigate("/login") }}
        className="mx-3 mb-4 flex items-center gap-2 px-3 py-2 text-green-300 hover:text-red-300 text-sm transition-colors">
        <i className="bi bi-box-arrow-right text-lg"></i><span>Sair</span>
      </button>
    </aside>
  )
}

// ─── Sparkline SVG simples para mobile ───────────────────────────────────────
function MiniSparkline({ data, color = "#16a34a", height = 60 }) {
  if (!data || data.length < 2) {
    // Curva demo quando sem dados
    const demo = [3,5,4,7,6,9,8,11,10,14]
    data = demo.map((v, i) => ({ count: v, date: `d${i}` }))
  }
  const vals = data.map(d => d.count || 0)
  const max = Math.max(...vals) || 1
  const min = Math.min(...vals)
  const range = max - min || 1
  const w = 300, h = height
  const pad = 8
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / range) * (h - pad * 2) - pad}`).join(" ")
  const areaClose = `${w},${h} 0,${h}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polyline fill={`url(#sg-${color.replace('#','')})`} stroke="none" points={`0,${h} ${pts} ${areaClose}`} />
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={pts} />
    </svg>
  )
}

// ─── Status badge colorido para pedidos recentes ──────────────────────────────
function OrderBadge({ status }) {
  const map = {
    RESERVED:              ["bg-blue-100 text-blue-700",   "Reservado"],
    AWAITING_CONFIRMATION: ["bg-yellow-100 text-yellow-700","Pendente"],
    PROCESSING:            ["bg-cyan-100 text-cyan-700",   "Em Processo"],
    IN_TRANSIT:            ["bg-purple-100 text-purple-700","Entregue"],
    COMPLETED:             ["bg-green-100 text-green-700", "Confirmado"],
    CANCELLED:             ["bg-red-100 text-red-700",     "Cancelado"],
    PENDING:               ["bg-yellow-100 text-yellow-700","Pendente"],
  }
  const [cls, label] = map[status] || ["bg-gray-100 text-gray-600", status || "—"]
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
}

// ─── SECÇÃO: Visão Geral do Vendedor — Layout Mobile-First ────────────────────
function SellerOverviewPanel({ data, userName, userRole, navigate }) {
  const [activeTab, setActiveTab] = useState("home") // "home" | "dashboard"
  const userFoto = localStorage.getItem("userFoto")

  if (!data) return (
    <div className="flex justify-center py-24">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const p = data.products || {}
  const t = data.transactions || {}
  const pay = data.payments || {}
  const r = data.ratings || {}
  const salesData = data.sales_chart || data.metrics?.sales || null

  const revenue = Number(t.revenue_completed || 0)
  const revenueLastMonth = Number(t.revenue_last_30_days || 0)
  const revenuePct = revenueLastMonth > 0 && revenue > 0
    ? Math.round(((revenue - revenueLastMonth) / revenueLastMonth) * 100)
    : null

  const recentOrders = t.recent || []
  const topProducts = p.top_selling || p.low_stock || []

  // ── Aba "Início / Home" ────────────────────────────────────────────────────
  const HomeTab = () => (
    <div className="pb-24 space-y-4">
      {/* Header verde com perfil */}
      <div className="bg-green-800 rounded-b-3xl px-4 pt-4 pb-6 -mx-4 -mt-4 lg:-mx-6 lg:-mt-6 mb-2">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
              {userFoto
                ? <img src={userFoto} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-green-700 flex items-center justify-center">
                    <i className="bi bi-person-fill text-white text-2xl"></i>
                  </div>
              }
            </div>
            <div>
              <p className="text-white/70 text-xs">Olá,</p>
              <p className="text-white font-bold text-base leading-tight">{userName} 👋</p>
              <p className="text-green-300 text-xs mt-0.5">
                {userRole === "seller" ? "Vendedor" : "Produtor"} desde {new Date().getFullYear()}
              </p>
              {r.average_as_seller > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <i className="bi bi-star-fill text-yellow-400 text-xs"></i>
                  <span className="text-white font-bold text-xs">{Number(r.average_as_seller).toFixed(1)}</span>
                  <span className="text-green-300 text-xs">({r.total_as_seller || 0} avaliações)</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="relative">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <i className="bi bi-bell-fill text-white text-base"></i>
              </div>
            </Link>
            <Link to="/profile">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <i className="bi bi-gear-fill text-white text-base"></i>
              </div>
            </Link>
          </div>
        </div>
        {/* Badge verificado */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
          <i className="bi bi-patch-check-fill text-green-300 text-xs"></i>
          <span className="text-white text-xs font-semibold">
            {userRole === "seller" ? "Vendedor Verificado" : "Produtor Certificado"}
          </span>
        </div>
      </div>

      {/* Resumo de hoje */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Resumo de hoje</h3>
          <Link to="/minhas-reservas" className="text-green-600 text-xs font-semibold flex items-center gap-1">
            Ver tudo <i className="bi bi-chevron-right text-[10px]"></i>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Novos pedidos",    value: t.new_last_7_days || 0,        icon: "bi-bag-fill",        color: "text-gray-800" },
            { label: "Mensagens",        value: 0,                              icon: "bi-chat-dots-fill",  color: "text-gray-800" },
            { label: "Produtos",         value: p.total || 0,                   icon: "bi-box-seam",        color: "text-gray-800" },
            { label: "Vendas hoje",      value: `${revenue > 0 ? Number(t.revenue_last_30_days || 0).toLocaleString("pt-MZ") : "0"} MT`, icon: "bi-cash-coin", color: "text-green-600" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <span className={`text-xl font-black ${item.color}`}>{item.value}</span>
              <span className="text-[10px] text-gray-400 leading-tight mt-0.5">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visão geral */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Visão geral</h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Este mês</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-green-600 rounded-xl p-3 text-center col-span-1">
            <p className="text-white font-black text-base leading-tight">{revenue > 0 ? `${Number(revenue).toLocaleString("pt-MZ")}` : "0"}</p>
            <p className="text-green-100 text-[10px] font-medium mt-0.5">MT</p>
            <p className="text-green-200 text-[10px] mt-1 leading-tight">Vendas totais</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-gray-800 font-black text-base">{t.total || 0}</p>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Pedidos</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-gray-800 font-black text-base">{t.by_status?.IN_TRANSIT || t.by_status?.COMPLETED || 0}</p>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Entregas</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-0.5">
              <p className="text-gray-800 font-black text-base">{r.average_as_seller ? Number(r.average_as_seller).toFixed(1) : "—"}</p>
              {r.average_as_seller > 0 && <i className="bi bi-star-fill text-yellow-400 text-xs"></i>}
            </div>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Avaliação</p>
          </div>
        </div>
      </div>

      {/* Vendas — gráfico */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-gray-800 text-sm">Vendas</h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Este mês</span>
        </div>
        <p className="text-2xl font-black text-gray-900">{revenue > 0 ? `${Number(revenue).toLocaleString("pt-MZ")} MT` : "0 MT"}</p>
        {revenuePct !== null && (
          <p className={`text-xs font-semibold mt-0.5 ${revenuePct >= 0 ? "text-green-600" : "text-red-500"}`}>
            {revenuePct >= 0 ? "+" : ""}{revenuePct}% em relação ao mês passado
          </p>
        )}
        <div className="mt-3">
          <MiniSparkline data={salesData} color="#16a34a" height={80} />
        </div>
        {salesData && salesData.length > 1 && (
          <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
            <span>{salesData[0]?.date?.slice(5) || ""}</span>
            <span>{salesData[salesData.length - 1]?.date?.slice(5) || ""}</span>
          </div>
        )}
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Pedidos recentes</h3>
          <Link to="/minhas-reservas" className="text-green-600 text-xs font-semibold flex items-center gap-1">
            Ver todos <i className="bi bi-chevron-right text-[10px]"></i>
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Nenhum pedido recente</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.slice(0, 4).map((order, idx) => (
              <div key={order.id || idx} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {order.product_photo
                    ? <img src={order.product_photo} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center">
                        <i className="bi bi-box-seam text-gray-300 text-lg"></i>
                      </div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{order.product_name || "Produto"}</p>
                  <p className="text-gray-400 text-xs truncate">{order.quantity ? `${order.quantity} unidade(s)` : "—"}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <OrderBadge status={order.status} />
                  <p className="text-gray-800 font-bold text-xs mt-1">
                    {order.amount ? `${Number(order.amount).toLocaleString("pt-MZ")} MT` : "—"}
                  </p>
                  <p className="text-gray-400 text-[10px]">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" }) : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // ── Aba "Dashboard" ────────────────────────────────────────────────────────
  const DashboardTab = () => (
    <div className="pb-24 space-y-4">
      {/* Header */}
      <div className="bg-green-800 rounded-b-3xl px-4 pt-4 pb-5 -mx-4 -mt-4 lg:-mx-6 lg:-mt-6 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-base">Dashboard do Vendedor</h2>
          </div>
          <Link to="/notifications" className="relative">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <i className="bi bi-bell-fill text-white text-base"></i>
            </div>
          </Link>
        </div>
      </div>

      {/* Desempenho */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Desempenho</h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Este mês</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-green-600 font-black text-sm leading-tight">{revenue > 0 ? `${Number(revenue).toLocaleString("pt-MZ")}` : "0"}</p>
            <p className="text-green-500 text-[9px] font-bold">MT</p>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Vendas totais</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-gray-800 font-black text-base">{t.total || 0}</p>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Pedidos</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-gray-800 font-black text-base">{(t.by_status?.IN_TRANSIT || 0) + (t.by_status?.COMPLETED || 0)}</p>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Entregas</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-0.5">
              <p className="text-gray-800 font-black text-base">{r.average_as_seller ? Number(r.average_as_seller).toFixed(1) : "—"}</p>
              {r.average_as_seller > 0 && <i className="bi bi-star-fill text-yellow-400 text-xs"></i>}
            </div>
            <p className="text-gray-400 text-[10px] mt-1 leading-tight">Avaliação</p>
          </div>
        </div>
      </div>

      {/* Gráfico de vendas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-gray-800 text-sm">Gráfico de vendas</h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Este mês</span>
        </div>
        <p className="text-2xl font-black text-gray-900 mt-1">{revenue > 0 ? `${Number(revenue).toLocaleString("pt-MZ")} MT` : "0 MT"}</p>
        {revenuePct !== null && (
          <p className={`text-xs font-semibold mt-0.5 ${revenuePct >= 0 ? "text-green-600" : "text-red-500"}`}>
            {revenuePct >= 0 ? "+" : ""}{revenuePct}% em relação ao mês passado
          </p>
        )}
        <div className="mt-3">
          <MiniSparkline data={salesData} color="#16a34a" height={100} />
        </div>
        {salesData && salesData.length > 1 && (
          <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
            <span>{salesData[0]?.date?.slice(5) || ""}</span>
            <span>{salesData[salesData.length - 1]?.date?.slice(5) || ""}</span>
          </div>
        )}
      </div>

      {/* Status dos pedidos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Status dos pedidos</h3>
          <Link to="/minhas-reservas" className="text-green-600 text-xs font-semibold flex items-center gap-1">
            Ver todos <i className="bi bi-chevron-right text-[10px]"></i>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Pendentes",    value: (t.by_status?.RESERVED || 0) + (t.by_status?.AWAITING_CONFIRMATION || 0), color: "text-orange-500" },
            { label: "Confirmados",  value: t.by_status?.PROCESSING || 0,  color: "text-green-600" },
            { label: "Em entrega",   value: t.by_status?.IN_TRANSIT || 0,  color: "text-blue-600" },
            { label: "Concluídos",   value: t.by_status?.COMPLETED || 0,   color: "text-gray-700" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className={`font-black text-xl ${item.color}`}>{item.value}</p>
              <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Produtos mais vendidos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Produtos mais vendidos</h3>
          <Link to="/marketplace" className="text-green-600 text-xs font-semibold flex items-center gap-1">
            Ver todos <i className="bi bi-chevron-right text-[10px]"></i>
          </Link>
        </div>
        {topProducts.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Sem dados de vendas por produto</p>
        ) : (
          <div className="space-y-3">
            {topProducts.slice(0, 5).map((prod, idx) => (
              <div key={prod.id || idx} className="flex items-center gap-3">
                <span className="text-gray-400 font-black text-base w-5 flex-shrink-0">{idx + 1}</span>
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {resolveProductPhoto(prod)
                    ? <img src={resolveProductPhoto(prod)} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center">
                        <i className="bi bi-box-seam text-gray-300"></i>
                      </div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{prod.name || "Produto"}</p>
                  <p className="text-gray-400 text-xs">{prod.total_sold || prod.stock_quantity || 0} {prod.total_sold ? "vendidos" : prod.base_unit || ""}</p>
                </div>
                <p className="text-green-600 font-black text-sm flex-shrink-0">
                  {prod.revenue ? `${Number(prod.revenue).toLocaleString("pt-MZ")} MT` : prod.price ? `${Number(prod.price).toLocaleString("pt-MZ")} MT` : "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Métodos de pagamento */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Métodos de Pagamento</h3>
        <div className="space-y-3">
          {[
            ["MPESA", "M-Pesa", "bg-red-500"],
            ["EMOLA", "e-Mola", "bg-orange-500"],
            ["CARD", "Cartão", "bg-blue-500"],
            ["BANK", "Banco", "bg-purple-500"]
          ].map(([k, l, c]) => {
            const v = pay.by_method?.[k] || 0
            const pct = pay.total > 0 ? Math.round((v / pay.total) * 100) : 0
            return (
              <div key={k}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-semibold">{l}</span>
                  <span className="font-bold text-gray-700">{v} ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`${c} h-1.5 rounded-full`} style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // ── Layout desktop (mantém o original) ────────────────────────────────────
  const DesktopView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard icon="bi-cash-coin"        label="Receita Realizada" value={`${revenue.toLocaleString("pt-MZ")} MT`} color="green" sub={`${Number(t.revenue_last_30_days || 0).toLocaleString("pt-MZ")} MT nos últimos 30 dias`} />
        <StatCard icon="bi-box-seam"         label="Total de Produtos" value={p.total} color="blue" sub={`${p.new_last_30_days || 0} novos nos últimos 30 dias`} />
        <StatCard icon="bi-credit-card-fill" label="Transações de Venda" value={t.total} color="orange" sub={`${t.new_last_7_days || 0} esta semana`} />
        <StatCard icon="bi-star-fill"        label="Avaliação Vendedor" value={r.average_as_seller ? `${r.average_as_seller} / 5` : '—'} color="teal" sub={`${r.total_as_seller || 0} avaliações recebidas`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="bi bi-exclamation-triangle text-amber-500"></i> Stock Baixo
            </h3>
            <div className="space-y-3">
              {!p.low_stock || p.low_stock.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">Nenhum produto com stock baixo! 👍</p>
              ) : (
                p.low_stock.map(prod => (
                  <div key={prod.id} className="flex justify-between items-center bg-amber-50/50 border border-amber-100 p-3 rounded-xl text-sm">
                    <span className="font-bold text-gray-700">{prod.name}</span>
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-xs">{prod.stock_quantity} {prod.base_unit}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50 rounded-xl p-2 text-center">
              <p className="font-black text-blue-700 text-lg">{pay.by_status?.SUCCESS || 0}</p>
              <p className="text-gray-500">Pgtos Confirmados</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-2 text-center">
              <p className="font-black text-orange-700 text-lg">{pay.by_status?.PROCESSING || 0}</p>
              <p className="text-gray-500">Pgtos em Processo</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3">Métodos de Pagamento Recebidos</h3>
          <div className="space-y-3.5">
            {[["MPESA","M-Pesa","bg-red-500"],["EMOLA","e-Mola","bg-orange-500"],["CARD","Cartão de Crédito","bg-blue-500"],["BANK","Transferência Bancária","bg-purple-500"]].map(([k,l,c]) => {
              const v = pay.by_method?.[k] || 0; const pct = pay.total > 0 ? Math.round((v/pay.total)*100) : 0
              return (<div key={k}><div className="flex justify-between text-xs mb-1"><span className="text-gray-600 font-semibold">{l}</span><span className="font-bold text-gray-700">{v} ({pct}%)</span></div><div className="w-full bg-gray-100 rounded-full h-1.5"><div className={`${c} h-1.5 rounded-full`} style={{width:`${pct}%`}}></div></div></div>)
            })}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3">Vendas por Estado</h3>
          <div className="space-y-2 text-sm">
            {[["RESERVED","Reservados","text-blue-600"],["AWAITING_CONFIRMATION","Aguardando Confirmação","text-orange-600"],["PROCESSING","Em Processamento","text-cyan-600"],["IN_TRANSIT","A Caminho","text-purple-600"],["COMPLETED","Concluídos","text-green-600"],["CANCELLED","Cancelados","text-red-600"]].map(([s,l,c]) => (
              <div key={s} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                <span className="text-gray-500">{l}</span>
                <span className={`font-black ${c}`}>{t.by_status?.[s] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Últimas Vendas</h3>
        </div>
        <Table empty="Nenhuma venda registada recentemente."
          cols={[
            { key: "id", label: "ID" },
            { key: "product_name", label: "Produto" },
            { key: "buyer_name", label: "Comprador" },
            { key: "amount", label: "Valor", render: row => `${parseFloat(row.amount || 0).toFixed(2)} MT` },
            { key: "status", label: "Estado", render: row => <Badge status={row.status} /> },
            { key: "created_at", label: "Data", render: row => row.created_at ? new Date(row.created_at).toLocaleDateString("pt-PT") : "—" }
          ]}
          rows={t.recent || []}
        />
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile: tabs de navegação entre Home e Dashboard */}
      <div className="lg:hidden">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-4 -mx-4 mx-0">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "home" ? "bg-white text-green-700 shadow-sm" : "text-gray-500"}`}
          >
            <i className="bi bi-house-fill mr-1.5"></i>Início
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "dashboard" ? "bg-white text-green-700 shadow-sm" : "text-gray-500"}`}
          >
            <i className="bi bi-graph-up mr-1.5"></i>Dashboard
          </button>
        </div>
        {activeTab === "home" ? <HomeTab /> : <DashboardTab />}
      </div>

      {/* Desktop: mantém o layout original */}
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </>
  )
}

// ─── Admin Sidebar ────────────────────────────────────────────────────────────
function AdminSidebar({ active, setActive, userName, navigate }) {
  const items = [
    { id: "overview",     icon: "bi-grid-fill",        label: "Visão Geral" },
    { id: "users",        icon: "bi-people-fill",      label: "Utilizadores" },
    { id: "upgrades",     icon: "bi-arrow-up-circle",  label: "Pedidos de Upgrade" },
    { id: "products",     icon: "bi-box-seam",         label: "Produtos" },
    { id: "posts",        icon: "bi-file-text-fill",   label: "Publicações" },
    { id: "techniques",   icon: "bi-book-fill",        label: "Técnicas" },
    { id: "transactions", icon: "bi-credit-card-fill", label: "Transações" },
    { id: "metrics",      icon: "bi-bar-chart-fill",   label: "Métricas" },
    { id: "audit",        icon: "bi-shield-check",     label: "Audit Trail" },
  ]
  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-64 h-screen sticky top-0 bg-green-900 text-white flex-shrink-0 overflow-y-auto">
      <div className="px-5 py-5 border-b border-green-800">
        <div className="flex items-center gap-2 mb-1">
          <img src="/logo.png" alt="IAgroMOZ" className="w-8 h-8 object-contain" />
          <span className="text-lg font-black text-white">IAgroMoz</span>
        </div>
        <p className="text-green-300 text-xs">Painel Administrativo</p>
      </div>
      <div className="px-5 py-4 border-b border-green-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
          <i className="bi bi-person-fill text-white text-lg"></i>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{userName}</p>
          <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">Administrador</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${active === item.id ? "bg-white text-green-900 font-bold shadow" : "text-green-200 hover:bg-green-800 hover:text-white"}`}>
            <i className={`${item.icon} text-base flex-shrink-0`}></i>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
      <button onClick={() => { localStorage.clear(); navigate("/login") }}
        className="mx-3 mb-4 flex items-center gap-2 px-3 py-2 text-green-300 hover:text-red-300 text-sm transition-colors">
        <i className="bi bi-box-arrow-right text-lg"></i><span>Sair</span>
      </button>
    </aside>
  )
}

// ─── SECÇÃO: Visão Geral ──────────────────────────────────────────────────────
function OverviewPanel({ data, metrics }) {
  if (!data) return <div className="flex justify-center py-24"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
  const u = data.users || {}; const m = data.marketplace || {}; const f = data.feed || {}; const t = data.techniques || {}; const up = data.upgrade_requests || {}; const act = data.activity || {}
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
        <StatCard icon="bi-people-fill"      label="Utilizadores"   value={u.total}              color="green"  sub={`+${u.new_last_7_days||0} esta semana`} />
        <StatCard icon="bi-file-text-fill"   label="Publicações"    value={f.total_posts}         color="blue"   sub={`+${f.posts_last_7_days||0} esta semana`} />
        <StatCard icon="bi-box-seam"         label="Produtos"       value={m.total_products}      color="orange" sub={`+${m.products_last_30_days||0} este mês`} />
        <StatCard icon="bi-credit-card-fill" label="Transações"     value={m.total_transactions}  color="purple" sub={`${m.completed_revenue ? Number(m.completed_revenue).toLocaleString("pt-MZ")+" MT" : "0 MT"} receita`} />
        <StatCard icon="bi-book-fill"        label="Técnicas"       value={t.total}               color="teal"   sub={`${t.by_status?.VALIDATED||0} validadas`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-1">Crescimento de Utilizadores (30 dias)</h3>
          {metrics?.new_users?.length > 0 ? (
            <>
              <Sparkline data={metrics.new_users} color="#16a34a" />
              <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                <span>{metrics.new_users[0]?.date?.slice(5)||""}</span>
                <span>{metrics.new_users[metrics.new_users.length-1]?.date?.slice(5)||""}</span>
              </div>
            </>
          ) : <div className="h-20 flex items-center justify-center text-gray-300 text-sm">Sem dados de métricas</div>}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3">Utilizadores por Tipo</h3>
          <div className="space-y-2.5">
            {[["NORMAL","Normal","bg-gray-400"],["PRODUCER","Produtor","bg-green-500"],["SELLER","Vendedor","bg-blue-500"],["ADMIN","Admin","bg-red-500"]].map(([k,l,c]) => {
              const v = u.by_role?.[k]||0; const pct = u.total > 0 ? Math.round((v/u.total)*100) : 0
              return (
                <div key={k}>
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-600">{l}</span><span className="font-bold text-gray-700">{v} ({pct}%)</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5"><div className={`${c} h-1.5 rounded-full`} style={{width:`${pct}%`}}></div></div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 rounded-xl p-2.5 text-center"><p className="font-black text-green-700 text-lg">{u.active||0}</p><p className="text-gray-500">Activos</p></div>
            <div className="bg-red-50 rounded-xl p-2.5 text-center"><p className="font-black text-red-700 text-lg">{u.inactive||0}</p><p className="text-gray-500">Inactivos</p></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><i className="bi bi-file-text text-blue-500"></i>Feed</h3>
          <div className="space-y-2 text-sm">
            {[["Total posts",f.total_posts],["Total comentários",f.total_comments],["Posts (7 dias)",f.posts_last_7_days],["Posts (30 dias)",f.posts_last_30_days],["Comentários (30 dias)",f.comments_last_30_days]].map(([l,v]) => (
              <div key={l} className="flex justify-between"><span className="text-gray-500">{l}</span><span className="font-bold text-gray-800">{v??0}</span></div>
            ))}
            {Object.entries(f.posts_by_category||{}).map(([cat,count]) => (
              <div key={cat} className="flex justify-between text-xs"><span className="text-gray-400 capitalize">{cat.toLowerCase()}</span><span className="font-semibold text-gray-600">{count}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><i className="bi bi-book text-purple-500"></i>Técnicas</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold text-gray-800">{t.total??0}</span></div>
            {Object.entries(t.by_status||{}).map(([s,c]) => (
              <div key={s} className="flex justify-between"><span className="text-gray-500 capitalize">{s.toLowerCase()}</span><span className="font-bold text-gray-800">{c}</span></div>
            ))}
          </div>
          <div className="mt-4 border-t border-gray-100 pt-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Pedidos de Upgrade</h4>
            {[["Total",up.total,"text-gray-800"],["Pendentes",up.pending,"text-orange-600"],["Aprovados",up.approved,"text-green-600"],["Rejeitados",up.rejected,"text-red-600"]].map(([l,v,c]) => (
              <div key={l} className="flex justify-between text-sm"><span className="text-gray-500">{l}</span><span className={`font-bold ${c}`}>{v??0}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><i className="bi bi-activity text-green-600"></i>Actividade</h3>
          <div className="space-y-2 text-sm">
            {[["Logs (7 dias)",act.logs_last_7_days],["Logs (30 dias)",act.logs_last_30_days],["Logins (30 dias)",act.logins_last_30_days],["Visitantes hoje",act.unique_visitors_today],["Visitantes (7 dias)",act.unique_visitors_last_7_days],["Visitantes (30 dias)",act.unique_visitors_last_30_days]].map(([l,v]) => (
              <div key={l} className="flex justify-between"><span className="text-gray-500">{l}</span><span className="font-bold text-gray-800">{v??0}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SECÇÃO: Utilizadores ─────────────────────────────────────────────────────
// GET /api/admin-dashboard/users/  ?role=  ?is_active=
// POST /api/admin-dashboard/users/{id}/deactivate/
// POST /api/admin-dashboard/users/{id}/activate/
// DELETE /api/admin-dashboard/users/{id}/delete/
function UsersPanel() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState("")
  const [activeFilter, setActiveFilter] = useState("")
  const [actionLoading, setActionLoading] = useState(null)
  const [msg, setMsg] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (roleFilter) params.role = roleFilter
      if (activeFilter !== "") params.is_active = activeFilter
      const data = await api.getAdminUsers(params)
      setUsers(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setUsers([]) }
    finally { setLoading(false) }
  }, [roleFilter, activeFilter])

  useEffect(() => { load() }, [load])

  const doAction = async (id, action) => {
    setActionLoading(id + action); setMsg("")
    try {
      if (action === "deactivate") await api.deactivateUser(id)
      else if (action === "activate") await api.activateUser(id)
      else if (action === "delete") { if (!window.confirm("Eliminar utilizador?")) { setActionLoading(null); return }; await api.deleteUser(id) }
      setMsg("Acção realizada com sucesso.")
      load()
    } catch (err) { setMsg(err?.message || "Erro.") }
    finally { setActionLoading(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Utilizadores</h2>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="">Todos os tipos</option>
          {["NORMAL","PRODUCER","SELLER","ADMIN"].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="">Todos os estados</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm">{msg}</div>}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table
          loading={loading}
          empty="Nenhum utilizador encontrado."
          cols={[
            { key: "id", label: "ID" },
            { key: "name", label: "Nome", render: r => `${r.first_name||""} ${r.last_name||""}`.trim() || r.email },
            { key: "email", label: "Email" },
            { key: "role", label: "Tipo", render: r => <Badge status={r.role} /> },
            { key: "is_active", label: "Estado", render: r => <Badge status={r.is_active ? "ACTIVE" : "INACTIVE"} /> },
            { key: "actions", label: "Ações", render: r => (
              <div className="flex gap-1.5">
                {r.is_active
                  ? <button onClick={() => doAction(r.id, "deactivate")} disabled={actionLoading === r.id+"deactivate"} className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 disabled:opacity-50">Desactivar</button>
                  : <button onClick={() => doAction(r.id, "activate")} disabled={actionLoading === r.id+"activate"} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50">Activar</button>
                }
                {r.role !== "ADMIN" && <button onClick={() => doAction(r.id, "delete")} disabled={actionLoading === r.id+"delete"} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50">Eliminar</button>}
              </div>
            )}
          ]}
          rows={users}
        />
      </div>
    </div>
  )
}

// ─── SECÇÃO: Pedidos de Upgrade ───────────────────────────────────────────────
// GET /api/admin-dashboard/users/upgrade-requests/  ?status=PENDING|APPROVED|REJECTED
// POST /api/users/{user_id}/approve-upgrade/  { decision: "APPROVED"|"REJECTED" }
function UpgradesPanel() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("PENDING")
  const [actionLoading, setActionLoading] = useState(null)
  const [msg, setMsg] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getUpgradeRequests({ status: statusFilter })
      setRequests(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setRequests([]) }
    finally { setLoading(false) }
  }, [statusFilter])

  useEffect(() => { load() }, [load])

  const decide = async (userId, decision) => {
    setActionLoading(userId + decision); setMsg("")
    try {
      await api.approveUpgrade(userId, decision)
      setMsg(`Pedido ${decision === "APPROVED" ? "aprovado" : "rejeitado"} com sucesso.`)
      load()
    } catch (err) { setMsg(err?.message || "Erro.") }
    finally { setActionLoading(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Pedidos de Upgrade para Produtor</h2>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          {["PENDING","APPROVED","REJECTED"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm">{msg}</div>}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table
          loading={loading}
          empty="Nenhum pedido encontrado."
          cols={[
            { key: "id", label: "ID" },
            { key: "user", label: "Utilizador", render: r => r.user?.email || r.user_email || "—" },
            { key: "contact", label: "Contacto" },
            { key: "farm_address", label: "Exploração" },
            { key: "status", label: "Estado", render: r => <Badge status={r.status} /> },
            { key: "created_at", label: "Data", render: r => r.created_at ? new Date(r.created_at).toLocaleDateString("pt-PT") : "—" },
            { key: "actions", label: "Ações", render: r => r.status === "PENDING" ? (
              <div className="flex gap-1.5">
                <button onClick={() => decide(r.user?.id || r.user_id, "APPROVED")} disabled={!!actionLoading} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50">Aprovar</button>
                <button onClick={() => decide(r.user?.id || r.user_id, "REJECTED")} disabled={!!actionLoading} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50">Rejeitar</button>
              </div>
            ) : "—" }
          ]}
          rows={requests}
        />
      </div>
    </div>
  )
}

// ─── SECÇÃO: Produtos ─────────────────────────────────────────────────────────
// GET /api/admin-dashboard/products/  ?category=  ?seller=
// DELETE /api/admin-dashboard/products/{id}/
function ProductsPanel() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState("")
  const [actionLoading, setActionLoading] = useState(null)
  const [msg, setMsg] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}; if (catFilter) params.category = catFilter
      const data = await api.getAdminProducts(params)
      setProducts(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setProducts([]) }
    finally { setLoading(false) }
  }, [catFilter])

  useEffect(() => { load() }, [load])

  const del = async (id) => {
    if (!window.confirm("Eliminar produto?")) return
    setActionLoading(id); setMsg("")
    try { await api.delete(`/admin-dashboard/products/${id}/`); setMsg("Produto eliminado."); load() }
    catch (err) { setMsg(err?.message || "Erro.") }
    finally { setActionLoading(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Produtos</h2>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="">Todas as categorias</option>
          <option value="AGRICULTURE">Agricultura</option>
          <option value="LIVESTOCK">Pecuária</option>
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm">{msg}</div>}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table loading={loading} empty="Nenhum produto encontrado."
          cols={[
            { key: "id", label: "ID" },
            { key: "photo", label: "Foto", render: r => resolveProductPhoto(r) ? <img src={resolveProductPhoto(r)} alt="" className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><i className="bi bi-image text-gray-300"></i></div> },
            { key: "name", label: "Nome" },
            { key: "price", label: "Preço", render: r => `${r.price} MT` },
            { key: "category", label: "Categoria" },
            { key: "seller", label: "Vendedor", render: r => typeof r.seller === "object" ? `${r.seller?.first_name||""} ${r.seller?.last_name||""}`.trim() : (r.seller||"—") },
            { key: "actions", label: "Ações", render: r => <button onClick={() => del(r.id)} disabled={actionLoading === r.id} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50">Eliminar</button> }
          ]}
          rows={products}
        />
      </div>
    </div>
  )
}

// ─── SECÇÃO: Publicações ──────────────────────────────────────────────────────
// GET /api/admin-dashboard/posts/  ?category=
// DELETE /api/admin-dashboard/posts/{id}/
function PostsPanel() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState("")
  const [actionLoading, setActionLoading] = useState(null)
  const [msg, setMsg] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}; if (catFilter) params.category = catFilter
      const data = await api.getAdminPosts(params)
      setPosts(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setPosts([]) }
    finally { setLoading(false) }
  }, [catFilter])

  useEffect(() => { load() }, [load])

  const del = async (id) => {
    if (!window.confirm("Eliminar publicação?")) return
    setActionLoading(id); setMsg("")
    try { await api.delete(`/admin-dashboard/posts/${id}/`); setMsg("Publicação eliminada."); load() }
    catch (err) { setMsg(err?.message || "Erro.") }
    finally { setActionLoading(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Publicações</h2>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="">Todas as categorias</option>
          <option value="AGRICULTURE">Agricultura</option>
          <option value="LIVESTOCK">Pecuária</option>
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm">{msg}</div>}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table loading={loading} empty="Nenhuma publicação encontrada."
          cols={[
            { key: "id", label: "ID" },
            { key: "title", label: "Título", render: r => <span className="line-clamp-1 max-w-[200px]">{r.title||"—"}</span> },
            { key: "category", label: "Categoria" },
            { key: "author", label: "Autor", render: r => r.author?.email || r.author_email || "—" },
            { key: "created_at", label: "Data", render: r => r.created_at ? new Date(r.created_at).toLocaleDateString("pt-PT") : "—" },
            { key: "actions", label: "Ações", render: r => <button onClick={() => del(r.id)} disabled={actionLoading === r.id} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50">Eliminar</button> }
          ]}
          rows={posts}
        />
      </div>
    </div>
  )
}

// ─── SECÇÃO: Técnicas ─────────────────────────────────────────────────────────
// GET /api/admin-dashboard/techniques/  ?status=
// POST /api/admin-dashboard/techniques/{id}/validate/
// POST /api/admin-dashboard/techniques/{id}/discard/
// DELETE /api/admin-dashboard/techniques/{id}/
function TechniquesPanel() {
  const [techniques, setTechniques] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [actionLoading, setActionLoading] = useState(null)
  const [msg, setMsg] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}; if (statusFilter) params.status = statusFilter
      const data = await api.getAdminTechniques(params)
      setTechniques(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setTechniques([]) }
    finally { setLoading(false) }
  }, [statusFilter])

  useEffect(() => { load() }, [load])

  const doAction = async (id, action) => {
    setActionLoading(id + action); setMsg("")
    try {
      if (action === "validate") await api.validateTechnique(id)
      else if (action === "discard") await api.discardTechnique(id)
      else if (action === "delete") { if (!window.confirm("Eliminar técnica?")) { setActionLoading(null); return }; await api.delete(`/admin-dashboard/techniques/${id}/`) }
      setMsg("Acção realizada com sucesso."); load()
    } catch (err) { setMsg(err?.message || "Erro.") }
    finally { setActionLoading(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Técnicas Agrícolas</h2>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="">Todos os estados</option>
          {["PENDING_VALIDATION","VALIDATED","DISCARDED"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm">{msg}</div>}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table loading={loading} empty="Nenhuma técnica encontrada."
          cols={[
            { key: "id", label: "ID" },
            { key: "title", label: "Título", render: r => <span className="line-clamp-1 max-w-[200px]">{r.title||"—"}</span> },
            { key: "status", label: "Estado", render: r => <Badge status={r.status} /> },
            { key: "author", label: "Autor", render: r => r.author?.email || "—" },
            { key: "actions", label: "Ações", render: r => (
              <div className="flex gap-1.5">
                {r.status !== "VALIDATED" && <button onClick={() => doAction(r.id,"validate")} disabled={!!actionLoading} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50">Validar</button>}
                {r.status !== "DISCARDED" && <button onClick={() => doAction(r.id,"discard")} disabled={!!actionLoading} className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 disabled:opacity-50">Descartar</button>}
                <button onClick={() => doAction(r.id,"delete")} disabled={!!actionLoading} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50">Eliminar</button>
              </div>
            )}
          ]}
          rows={techniques}
        />
      </div>
    </div>
  )
}

// ─── SECÇÃO: Transações ───────────────────────────────────────────────────────
// GET /api/admin-dashboard/transactions/  ?status=
function TransactionsPanel() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}; if (statusFilter) params.status = statusFilter
      const data = await api.getAdminTransactions(params)
      setTransactions(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setTransactions([]) }
    finally { setLoading(false) }
  }, [statusFilter])

  useEffect(() => { load() }, [load])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Transações</h2>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="">Todos os estados</option>
          {["RESERVED","AWAITING_CONFIRMATION","PROCESSING","IN_TRANSIT","COMPLETED","CANCELLED"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table loading={loading} empty="Nenhuma transação encontrada."
          cols={[
            { key: "id", label: "ID" },
            { key: "product", label: "Produto", render: r => r.product?.name || r.product_name || "—" },
            { key: "buyer", label: "Comprador", render: r => r.buyer?.email || r.buyer_email || "—" },
            { key: "seller", label: "Vendedor", render: r => r.seller?.email || r.seller_email || "—" },
            { key: "amount", label: "Valor", render: r => r.amount ? `${r.amount} MT` : "—" },
            { key: "status", label: "Estado", render: r => <Badge status={r.status} /> },
            { key: "created_at", label: "Data", render: r => r.created_at ? new Date(r.created_at).toLocaleDateString("pt-PT") : "—" },
          ]}
          rows={transactions}
        />
      </div>
    </div>
  )
}

// ─── SECÇÃO: Métricas ─────────────────────────────────────────────────────────
// GET /api/admin-dashboard/metrics/  ?period=daily|monthly  ?days=7|30|90
function MetricsPanel() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("daily")
  const [days, setDays] = useState("30")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getAdminMetrics({ period, days })
      setMetrics(data)
    } catch (_) { setMetrics(null) }
    finally { setLoading(false) }
  }, [period, days])

  useEffect(() => { load() }, [load])

  const charts = metrics ? [
    { key: "new_users",        label: "Novos Utilizadores",  color: "#16a34a" },
    { key: "new_products",     label: "Novos Produtos",      color: "#2563eb" },
    { key: "new_posts",        label: "Novas Publicações",   color: "#9333ea" },
    { key: "new_transactions", label: "Novas Transações",    color: "#f97316" },
    { key: "logins",           label: "Logins",              color: "#0891b2" },
    { key: "unique_visitors",  label: "Visitantes Únicos",   color: "#dc2626" },
  ] : []

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Métricas e Crescimento</h2>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="daily">Diário</option>
          <option value="monthly">Mensal</option>
        </select>
        <select value={days} onChange={e => setDays(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
          <option value="7">7 dias</option>
          <option value="30">30 dias</option>
          <option value="90">90 dias</option>
        </select>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      {loading ? (
        <div className="flex justify-center py-24"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : !metrics ? (
        <div className="text-center py-12 text-gray-400">Sem dados de métricas.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {charts.map(({ key, label, color }) => {
            const data = metrics[key] || []
            const total = data.reduce((s, d) => s + (d.count || 0), 0)
            return (
              <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 text-sm">{label}</h3>
                  <span className="text-lg font-black" style={{ color }}>{total}</span>
                </div>
                <Sparkline data={data} color={color} />
                {data.length > 0 && (
                  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                    <span>{data[0]?.date?.slice(5)||""}</span>
                    <span>{data[data.length-1]?.date?.slice(5)||""}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── SECÇÃO: Audit Trail ──────────────────────────────────────────────────────
// GET /api/audit-logs/  ?user_email= ?action= ?resource= ?status= ?date_from= ?date_to=
function AuditPanel() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ user_email: "", action: "", resource: "", status: "" })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v })
      const data = await api.getAuditLogs(params)
      setLogs(Array.isArray(data) ? data : (data.results || []))
    } catch (_) { setLogs([]) }
    finally { setLoading(false) }
  }, [filters])

  useEffect(() => { load() }, [load])

  const f = (key) => (e) => setFilters(p => ({ ...p, [key]: e.target.value }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="font-black text-gray-800 text-lg flex-1">Audit Trail</h2>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white hover:bg-gray-50"><i className="bi bi-arrow-clockwise"></i></button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <input value={filters.user_email} onChange={f("user_email")} placeholder="Email do utilizador" className="px-3 py-2 rounded-xl border border-gray-200 text-sm" />
          <select value={filters.action} onChange={f("action")} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="">Todas as acções</option>
            {["CREATE","UPDATE","DELETE","LOGIN","LOGIN_FAILED","LOGOUT","UPGRADE_REQUEST"].map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <input value={filters.resource} onChange={f("resource")} placeholder="Recurso (ex: Product)" className="px-3 py-2 rounded-xl border border-gray-200 text-sm" />
          <select value={filters.status} onChange={f("status")} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="">Todos os estados</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
        <button onClick={load} className="btn-primary text-white px-4 py-2 rounded-xl text-sm font-semibold">Filtrar</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table loading={loading} empty="Nenhum log encontrado."
          cols={[
            { key: "id", label: "ID" },
            { key: "user_email", label: "Utilizador" },
            { key: "action", label: "Acção" },
            { key: "resource", label: "Recurso" },
            { key: "resource_id", label: "ID Recurso" },
            { key: "status", label: "Estado", render: r => <Badge status={r.status} /> },
            { key: "detail", label: "Detalhe", render: r => <span className="line-clamp-1 max-w-[200px] text-xs text-gray-500">{r.detail||"—"}</span> },
            { key: "timestamp", label: "Data/Hora", render: r => r.timestamp ? new Date(r.timestamp).toLocaleString("pt-PT") : "—" },
          ]}
          rows={logs}
        />
      </div>
    </div>
  )
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
function Dashboard() {
  const navigate = useNavigate()
  const userName = localStorage.getItem("userName") || "Utilizador"
  const userRole = localStorage.getItem("userRole") || "user"
  const [activeSection, setActiveSection] = useState("overview")
  const [dashData, setDashData] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [loadingDash, setLoadingDash] = useState(true)
  const [errorDash, setErrorDash] = useState("")

  const isAdmin = userRole === "admin"
  const isSellerOrProducer = userRole === "seller" || userRole === "producer"

  useEffect(() => {
    if (!isAdmin && !isSellerOrProducer) {
      navigate("/feed")
      return
    }
    // Inicializar activeSection com base no papel
    if (isSellerOrProducer) {
      setActiveSection("seller_overview")
    } else {
      setActiveSection("overview")
    }
    loadDashboard()
  }, [userRole])

  const loadDashboard = async () => {
    setLoadingDash(true); setErrorDash("")
    try {
      if (isAdmin) {
        const [dash, met] = await Promise.all([
          api.getAdminDashboard(),
          api.getAdminMetrics({ period: "daily", days: 30 }).catch(() => null)
        ])
        setDashData(dash); setMetrics(met)
      } else if (isSellerOrProducer) {
        const dash = await api.getSellerDashboard()
        setDashData(dash)
      }
    } catch (_) { setErrorDash("Erro ao carregar dados do dashboard.") }
    finally { setLoadingDash(false) }
  }

  const sectionMap = {
    overview:     <OverviewPanel data={dashData} metrics={metrics} />,
    users:        <UsersPanel />,
    upgrades:     <UpgradesPanel />,
    products:     <ProductsPanel />,
    posts:        <PostsPanel />,
    techniques:   <TechniquesPanel />,
    transactions: <TransactionsPanel />,
    metrics:      <MetricsPanel />,
    audit:        <AuditPanel />,
    
    // Secções do Vendedor
    seller_overview: <SellerOverviewPanel data={dashData} userName={userName} userRole={userRole} navigate={navigate} />,
  }

  const isOverview = activeSection === "overview" || activeSection === "seller_overview"

  // ── Mobile: vendedor/produtor tem layout próprio — sem sidebar, sem header ──
  if (isSellerOrProducer) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar apenas desktop */}
        <div className="hidden lg:flex">
          <SellerSidebar active={activeSection} setActive={setActiveSection} userName={userName} navigate={navigate} />
        </div>

        {/* Wrapper desktop com header */}
        <div className="lg:flex lg:pl-56 xl:pl-64 min-h-screen flex-col">
          {/* Header — só desktop */}
          <header className="hidden lg:flex bg-white border-b border-gray-100 sticky top-0 z-40 px-6 py-3 items-center justify-between">
            <div>
              <h1 className="text-lg font-black text-gray-800">Painel do Produtor 👋</h1>
              <p className="text-xs text-gray-400">IAgroMOZ — Gestão das suas vendas e stock</p>
            </div>
            <div className="flex items-center gap-3">
              {isOverview && (
                <button onClick={loadDashboard} className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50">
                  <i className="bi bi-arrow-clockwise"></i> Actualizar
                </button>
              )}
              <button onClick={() => { localStorage.clear(); navigate("/login") }}
                className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50">
                <i className="bi bi-box-arrow-right"></i> Sair
              </button>
            </div>
          </header>

          {/* Conteúdo */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {isOverview && loadingDash ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : isOverview && errorDash ? (
              <div className="text-center py-24">
                <p className="text-red-600 mb-4">{errorDash}</p>
                <button onClick={loadDashboard} className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">Tentar novamente</button>
              </div>
            ) : (
              sectionMap[activeSection] || <div className="text-center py-24 text-gray-400">Secção não encontrada.</div>
            )}
          </main>
        </div>

        <MobileNav />
      </div>
    )
  }

  // ── Admin layout ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar active={activeSection} setActive={setActiveSection} userName={userName} navigate={navigate} />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-gray-800">Painel Administrativo 👋</h1>
            <p className="text-xs text-gray-400">IAgroMOZ — Gestão da plataforma</p>
          </div>
          <div className="flex items-center gap-3">
            {isOverview && (
              <button onClick={loadDashboard} className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50">
                <i className="bi bi-arrow-clockwise"></i> Actualizar
              </button>
            )}
            <button onClick={() => { localStorage.clear(); navigate("/login") }}
              className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50">
              <i className="bi bi-box-arrow-right"></i> Sair
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {isOverview && loadingDash ? (
            <div className="flex items-center justify-center py-24"><div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : isOverview && errorDash ? (
            <div className="text-center py-24">
              <p className="text-red-600 mb-4">{errorDash}</p>
              <button onClick={loadDashboard} className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">Tentar novamente</button>
            </div>
          ) : (
            sectionMap[activeSection] || <div className="text-center py-24 text-gray-400">Secção não encontrada.</div>
          )}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default Dashboard
