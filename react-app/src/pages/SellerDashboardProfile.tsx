import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useSellerProfile } from '../context/SellerProfileContext'

function ProfileDetail({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-gray-100 bg-white p-4">
      <div className="flex items-center gap-3 flex-1">
        {icon && <i className={`bi ${icon} text-green-600 text-lg`}></i>}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900 text-right">{value || 'Não definido'}</span>
    </div>
  )
}

function SellerDashboardProfile() {
  const navigate = useNavigate()
  const profile = useSellerProfile()

  // Dados pessoais
  const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || profile?.username || 'Utilizador'
  const email = profile?.email || 'Não definido'
  const phone = profile?.contact || profile?.phone || profile?.telefone || 'Não definido'
  const district = profile?.district?.name || profile?.distrito || profile?.location || 'Não definido'
  const gender = profile?.gender === 'M' ? 'Masculino' : profile?.gender === 'F' ? 'Feminino' : profile?.gender === 'O' ? 'Outro' : 'Não definido'

  // Dados de vendedor
  const storeType = profile?.seller_type || 'Não definido'
  const storeName = profile?.store_name || 'Não definido'
  const nuit = profile?.nuit || 'Não definido'
  const storeAddress = profile?.store_address || 'Não definido'
  const canSell = profile?.can_sell ? 'Sim' : 'Não'
  const role = profile?.role?.toUpperCase() === 'SELLER' ? 'Vendedor' : profile?.role?.toUpperCase() === 'PRODUCER' ? 'Produtor' : 'Utilizador'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Meu Perfil</h2>
          <p className="text-sm text-gray-500">Dados do seu perfil de vendedor.</p>
        </div>
        <button onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
          <i className="bi bi-pencil"></i> Editar perfil
        </button>
      </div>

      {/* ─── Informações Pessoais ─── */}
      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-4 px-1 uppercase tracking-[0.1em]">Informações Pessoais</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <ProfileDetail label="Nome Completo" value={fullName} icon="bi-person" />
          <ProfileDetail label="Email" value={email} icon="bi-envelope" />
          <ProfileDetail label="Contacto" value={phone} icon="bi-telephone" />
          <ProfileDetail label="Género" value={gender} icon="bi-person-badge" />
          <ProfileDetail label="Localização" value={district} icon="bi-geo-alt" />
          <ProfileDetail label="Tipo de Conta" value={role} icon="bi-briefcase" />
        </div>
      </div>

      {/* ─── Informações da Loja ─── */}
      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-4 px-1 uppercase tracking-[0.1em]">Informações da Loja</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <ProfileDetail label="Nome da Loja" value={storeName} icon="bi-shop" />
          <ProfileDetail label="Tipo de Vendedor" value={storeType} icon="bi-tag" />
          <ProfileDetail label="NUIT" value={nuit} icon="bi-card-text" />
          <ProfileDetail label="Endereço da Loja" value={storeAddress} icon="bi-house-door" />
          <ProfileDetail label="Permissão de Venda" value={canSell} icon="bi-check-circle" />
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardProfile
