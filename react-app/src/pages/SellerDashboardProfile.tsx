import { useState } from 'react'
import api from '../services/api'
import { useSellerProfile } from '../context/SellerProfileContext'
import { setUserCache } from '../utils/userCache'
import { FieldInput, FieldSelect } from './RegisterBase'

// Comprime imagem no cliente antes do upload para evitar 413 (mesma lógica de Profile.jsx)
function compressImage(file: File, maxWidth = 1024, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      const img = new Image()
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * ratio)
        canvas.height = Math.round(img.height * ratio)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => resolve(blob ? new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }) : file),
          'image/jpeg', quality
        )
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function ProfileDetail({ label, value, icon }: any) {
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
  const profile: any = useSellerProfile()
  const [editing, setEditing] = useState(false)

  // Dados pessoais
  const isSeller = profile?.role?.toUpperCase() === 'SELLER'
  const isProducer = profile?.role?.toUpperCase() === 'PRODUCER'
  const roleLabel = isSeller ? 'Vendedor' : isProducer ? 'Produtor' : 'Utilizador'
  const canSell = profile?.can_sell ? 'Sim' : 'Não'
  const genderLabel = profile?.gender === 'M' ? 'Masculino' : profile?.gender === 'F' ? 'Feminino' : profile?.gender === 'O' ? 'Outro' : 'Não definido'
  const districtLabel = profile?.district?.name || profile?.distrito || profile?.location || 'Não definido'

  // Overrides locais — refletem imediatamente o que foi guardado, sem esperar
  // por um refresh do contexto partilhado do painel (que só recarrega no próximo F5).
  const [nameOverride, setNameOverride] = useState<{ first_name: string; last_name: string } | null>(null)
  const [fotoOverride, setFotoOverride] = useState<string | null>(null)
  const [contactOverride, setContactOverride] = useState<string | null>(null)
  const [producerOverride, setProducerOverride] = useState<any>(null)
  const [sellerOverride, setSellerOverride] = useState<any>(null)

  const firstName = nameOverride?.first_name ?? profile?.first_name ?? ''
  const lastName = nameOverride?.last_name ?? profile?.last_name ?? ''
  const fullName = `${firstName} ${lastName}`.trim() || profile?.username || 'Utilizador'
  const contact = contactOverride ?? (profile?.contact || profile?.phone || profile?.telefone || '')
  const farmAddress = producerOverride?.farm_address ?? profile?.farm_address ?? ''
  const storeType = sellerOverride?.seller_type ?? profile?.seller_type ?? 'INDIVIDUAL'
  const storeName = sellerOverride?.store_name ?? profile?.store_name ?? ''
  const nuit = sellerOverride?.nuit ?? profile?.nuit ?? ''
  const storeAddress = sellerOverride?.store_address ?? profile?.store_address ?? ''

  // ─── Formulário de edição ──────────────────────────────────────────────────
  const [form, setForm] = useState({ first_name: firstName, last_name: lastName, contact, foto_perfil: null as File | null })
  const [fotoPreview, setFotoPreview] = useState<string | null>(fotoOverride)
  const [producerForm, setProducerForm] = useState({ farm_address: farmAddress })
  const [sellerForm, setSellerForm] = useState({ seller_type: storeType, store_name: storeName, nuit, store_address: storeAddress })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const openEdit = () => {
    setForm({ first_name: firstName, last_name: lastName, contact, foto_perfil: null })
    setFotoPreview(fotoOverride)
    setProducerForm({ farm_address: farmAddress })
    setSellerForm({ seller_type: storeType, store_name: storeName, nuit, store_address: storeAddress })
    setError(''); setSuccess('')
    setEditing(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError(''); setSuccess('')
    try {
      let updated: any
      if (form.foto_perfil) {
        const fd = new FormData()
        fd.append('first_name', form.first_name.trim())
        fd.append('last_name', form.last_name.trim())
        fd.append('profile_photo', form.foto_perfil)
        updated = await api.updateUserProfile(fd)
      } else {
        updated = await api.updateUserProfile({ first_name: form.first_name.trim(), last_name: form.last_name.trim() })
      }
      setNameOverride({ first_name: updated.first_name || form.first_name, last_name: updated.last_name || form.last_name })
      const foto = updated.profile_photo || updated.foto_perfil
      if (foto) { setFotoOverride(foto); localStorage.setItem('userFoto', foto) }
      const savedFullName = `${updated.first_name || form.first_name} ${updated.last_name || form.last_name}`.trim()
      if (savedFullName) localStorage.setItem('userName', savedFullName)
      if (form.contact) { setContactOverride(form.contact); setUserCache({ contact: form.contact }) }

      if (isProducer) {
        const payload = { contact: form.contact || '', farm_address: producerForm.farm_address || '' }
        const updatedProducer: any = await api.updateProducerProfile(payload)
        setProducerOverride(updatedProducer)
        setUserCache({ contact: updatedProducer.contact || '', farmAddress: updatedProducer.farm_address || '' })
      }
      if (isSeller) {
        const payload = {
          seller_type: sellerForm.seller_type || 'INDIVIDUAL',
          store_name: sellerForm.store_name || '',
          nuit: sellerForm.nuit || undefined,
          contact: form.contact || '',
          store_address: sellerForm.store_address || '',
        }
        const updatedSeller: any = await api.updateSellerProfile(payload)
        setSellerOverride(updatedSeller)
        setUserCache({ contact: updatedSeller.contact || '', storeName: updatedSeller.store_name || '', storeAddress: updatedSeller.store_address || '', nuit: updatedSeller.nuit || '', sellerType: updatedSeller.seller_type || '' })
      }

      setSuccess('Perfil atualizado com sucesso.')
      setEditing(false)
    } catch (err: any) {
      setError(err?.message || 'Erro ao atualizar perfil.')
    } finally {
      setSaving(false)
    }
  }

  const initials = (fullName || 'U').charAt(0).toUpperCase()

  if (editing) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-2">
          <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-600">
            <i className="bi bi-arrow-left text-lg"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-900">Editar perfil</h2>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-sm">{error}</div>}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-[0.1em]">Dados pessoais</h3>
            <div className="flex items-center gap-3">
              {fotoPreview ? (
                <img src={fotoPreview} alt="foto" className="w-14 h-14 rounded-full object-cover border-2 border-green-200" />
              ) : (
                <div className="w-14 h-14 rounded-full avatar-gradient flex items-center justify-center text-white font-bold text-xl">{initials}</div>
              )}
              <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all text-sm text-gray-500">
                <i className="bi bi-camera text-green-600"></i>
                {fotoPreview ? 'Trocar foto' : 'Adicionar foto'}
                <input type="file" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0]
                    if (!f) return
                    const compressed = await compressImage(f)
                    setForm(p => ({ ...p, foto_perfil: compressed }))
                    const r = new FileReader()
                    r.onloadend = () => setFotoPreview(r.result as string)
                    r.readAsDataURL(compressed)
                  }} />
              </label>
            </div>
            <FieldInput label="Primeiro nome" value={form.first_name} onChange={(e: any) => setForm(p => ({ ...p, first_name: e.target.value }))} icon="bi-person" />
            <FieldInput label="Apelido" value={form.last_name} onChange={(e: any) => setForm(p => ({ ...p, last_name: e.target.value }))} icon="bi-person" />
            <FieldInput label="Contacto (telefone)" value={form.contact} onChange={(e: any) => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="+258841234567" icon="bi-telephone" />
          </div>

          {isProducer && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-[0.1em]">Exploração agrícola</h3>
              <FieldInput label="Endereço da exploração" value={producerForm.farm_address} onChange={(e: any) => setProducerForm(p => ({ ...p, farm_address: e.target.value }))} placeholder="Bairro Central" icon="bi-geo-alt" />
            </div>
          )}

          {isSeller && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-[0.1em]">Loja</h3>
              <FieldSelect label="Tipo de vendedor" value={sellerForm.seller_type}
                onChange={(e: any) => setSellerForm(p => ({ ...p, seller_type: e.target.value }))}
                options={[{ value: 'INDIVIDUAL', label: 'Individual' }, { value: 'COMPANY', label: 'Empresa' }, { value: 'COOPERATIVE', label: 'Cooperativa' }]}
                placeholder="Selecione" />
              <FieldInput label="Nome da loja" value={sellerForm.store_name} onChange={(e: any) => setSellerForm(p => ({ ...p, store_name: e.target.value }))} placeholder="Loja do Carlos" icon="bi-shop" />
              <FieldInput label="NUIT (opcional)" value={sellerForm.nuit} onChange={(e: any) => setSellerForm(p => ({ ...p, nuit: e.target.value }))} placeholder="123456789" icon="bi-card-text" />
              <FieldInput label="Endereço da loja" value={sellerForm.store_address} onChange={(e: any) => setSellerForm(p => ({ ...p, store_address: e.target.value }))} placeholder="Av. Eduardo Mondlane" icon="bi-geo-alt" />
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setEditing(false)}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 btn-primary text-white py-3 rounded-2xl font-semibold text-sm disabled:opacity-50">
              {saving ? 'A guardar...' : 'Guardar alterações'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Meu Perfil</h2>
          <p className="text-sm text-gray-500">Dados do seu perfil de {isProducer ? 'produtor' : 'vendedor'}.</p>
        </div>
        <button onClick={openEdit}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
          <i className="bi bi-pencil"></i> Editar perfil
        </button>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-xl text-sm">{success}</div>}

      {/* ─── Informações Pessoais ─── */}
      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-4 px-1 uppercase tracking-[0.1em]">Informações Pessoais</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <ProfileDetail label="Nome Completo" value={fullName} icon="bi-person" />
          <ProfileDetail label="Email" value={profile?.email} icon="bi-envelope" />
          <ProfileDetail label="Contacto" value={contact} icon="bi-telephone" />
          <ProfileDetail label="Género" value={genderLabel} icon="bi-person-badge" />
          <ProfileDetail label="Localização" value={districtLabel} icon="bi-geo-alt" />
          <ProfileDetail label="Tipo de Conta" value={roleLabel} icon="bi-briefcase" />
        </div>
      </div>

      {/* ─── Informações da Loja (vendedor) ─── */}
      {isSeller && (
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
      )}

      {/* ─── Informações da Exploração (produtor) ─── */}
      {isProducer && (
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-4 px-1 uppercase tracking-[0.1em]">Informações da Exploração</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <ProfileDetail label="Endereço da Exploração" value={farmAddress} icon="bi-house-door" />
            <ProfileDetail label="Permissão de Venda" value={canSell} icon="bi-check-circle" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerDashboardProfile
