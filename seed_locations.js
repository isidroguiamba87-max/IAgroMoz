// Script para popular províncias e distritos de Moçambique no backend
// Uso: node seed_locations.js <email_admin> <senha_admin>
// Exemplo: node seed_locations.js admin@iagromoz.com Minhasenha123

const API = 'http://65.21.165.103/api'

const PROVINCES_AND_DISTRICTS = [
  {
    name: 'Niassa',
    districts: ['Lichinga', 'Cuamba', 'Mandimba', 'Marrupa', 'Mecanhelas', 'Metarica', 'Muembe', 'Ngauma', 'Nipepe', 'Lago', 'Majune', 'Sanga'],
  },
  {
    name: 'Cabo Delgado',
    districts: ['Pemba', 'Chiure', 'Ibo', 'Macomia', 'Mecufi', 'Meluco', 'Mocímboa da Praia', 'Montepuez', 'Mueda', 'Muidumbe', 'Namuno', 'Nangade', 'Palma', 'Quissanga'],
  },
  {
    name: 'Nampula',
    districts: ['Nampula Cidade', 'Angoche', 'Erati', 'Ilha de Moçambique', 'Lalaua', 'Larde', 'Liúpo', 'Malema', 'Meconta', 'Mecubúri', 'Memba', 'Mongicual', 'Mogovolas', 'Moma', 'Monapo', 'Mossuril', 'Muecate', 'Murrupula', 'Nacarôa', 'Namapa-Eráti', 'Rapale', 'Ribáuè'],
  },
  {
    name: 'Zambézia',
    districts: ['Quelimane', 'Alto Molócuè', 'Chinde', 'Derre', 'Gile', 'Gurue', 'Ile', 'Inhassunge', 'Luabo', 'Lugela', 'Maganja da Costa', 'Milange', 'Mocuba', 'Mopeia', 'Morrumbala', 'Mulevala', 'Namacurra', 'Namarroi', 'Nicoadala', 'Pebane'],
  },
  {
    name: 'Tete',
    districts: ['Tete Cidade', 'Angonia', 'Cahora-Bassa', 'Changara', 'Chifunde', 'Chiuta', 'Dôa', 'Macanga', 'Marávia', 'Marara', 'Moatize', 'Mutarara', 'Tsangano', 'Zumbo'],
  },
  {
    name: 'Manica',
    districts: ['Chimoio', 'Barue', 'Gondola', 'Guro', 'Machaze', 'Macossa', 'Manica', 'Mossurize', 'Sussundenga', 'Tambara'],
  },
  {
    name: 'Sofala',
    districts: ['Beira', 'Buzi', 'Caia', 'Chemba', 'Cheringoma', 'Chibabava', 'Dondo', 'Gorongosa', 'Machanga', 'Maringue', 'Marromeu', 'Muanza', 'Nhamatanda'],
  },
  {
    name: 'Inhambane',
    districts: ['Inhambane Cidade', 'Funhalouro', 'Govuro', 'Homoíne', 'Inharrime', 'Inhassoro', 'Jangamo', 'Mabote', 'Massinga', 'Maxixe', 'Morrumbene', 'Panda', 'Vilankulo', 'Zavala'],
  },
  {
    name: 'Gaza',
    districts: ['Xai-Xai', 'Bilene', 'Chibuto', 'Chicualacuala', 'Chigubo', 'Chokwé', 'Guijá', 'Limpopo', 'Mabalane', 'Manjacaze', 'Massangena', 'Massingir', 'Pafuri'],
  },
  {
    name: 'Maputo Província',
    districts: ['Matola', 'Boane', 'Magude', 'Manhiça', 'Marracuene', 'Matutuíne', 'Moamba', 'Namaacha'],
  },
  {
    name: 'Maputo Cidade',
    districts: ['KaMpfumo', 'Nlhamankulu', 'KaMaxakeni', 'KaMubukwana', 'KaMavota', 'KaTembe', 'KaNyaka'],
  },
]

async function getToken(email, password) {
  const res = await fetch(`${API}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Login falhou: ${JSON.stringify(err)}`)
  }
  const data = await res.json()
  return data.access
}

async function getExistingProvinces(token) {
  const res = await fetch(`${API}/provinces/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

async function createProvince(token, name) {
  const res = await fetch(`${API}/provinces/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Erro ao criar província "${name}": ${JSON.stringify(err)}`)
  }
  return res.json()
}

async function createDistrict(token, name, provinceId) {
  const res = await fetch(`${API}/districts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, province_id: provinceId }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Erro ao criar distrito "${name}": ${JSON.stringify(err)}`)
  }
  return res.json()
}

async function main() {
  const [, , email, password] = process.argv
  if (!email || !password) {
    console.error('Uso: node seed_locations.js <email_admin> <senha_admin>')
    process.exit(1)
  }

  console.log('A autenticar...')
  const token = await getToken(email, password)
  console.log('Autenticado com sucesso.')

  const existing = await getExistingProvinces(token)
  const existingNames = new Set(existing.map(p => p.name.toLowerCase()))
  console.log(`Províncias existentes: ${existing.map(p => p.name).join(', ')}`)

  for (const { name, districts } of PROVINCES_AND_DISTRICTS) {
    let province
    if (existingNames.has(name.toLowerCase())) {
      province = existing.find(p => p.name.toLowerCase() === name.toLowerCase())
      console.log(`✓ Província "${name}" já existe (id=${province.id})`)
    } else {
      province = await createProvince(token, name)
      console.log(`+ Criou província "${name}" (id=${province.id})`)
    }

    // Buscar distritos existentes para esta província
    const distRes = await fetch(`${API}/districts/?id=${province.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const existingDistricts = await distRes.json()
    const existingDistrictNames = new Set(
      (Array.isArray(existingDistricts) ? existingDistricts : []).map(d => d.name.toLowerCase())
    )

    for (const dname of districts) {
      if (existingDistrictNames.has(dname.toLowerCase())) {
        console.log(`  · Distrito "${dname}" já existe`)
      } else {
        await createDistrict(token, dname, province.id)
        console.log(`  + Criou distrito "${dname}"`)
      }
    }
  }

  console.log('\nSeed concluído!')
}

main().catch(err => {
  console.error('Erro:', err.message)
  process.exit(1)
})
