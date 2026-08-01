// Mapeamento de chaves semânticas → chaves de localStorage
const KEYS = {
  id:           'userId',
  name:         'userName',
  email:        'userEmail',
  foto:         'userFoto',
  role:         'userRole',
  contact:      'userContact',
  gender:       'userGender',
  username:     'userUsername',
  districtId:   'userDistrictId',
  districtName: 'userDistrictName',
  provinceId:   'userProvinceId',
  provinceName: 'userProvinceName',
  farmAddress:  'userFarmAddress',
  storeName:    'userStoreName',
  storeAddress: 'userStoreAddress',
  nuit:         'userNuit',
  sellerType:   'userSellerType',
}

// Lê todos os dados do utilizador do localStorage
export function getUserCache() {
  return Object.fromEntries(
    Object.entries(KEYS).map(([key, lsKey]) => [key, localStorage.getItem(lsKey) || ''])
  )
}

// Guarda dados parciais do utilizador no localStorage
export function setUserCache(partial = {}) {
  Object.entries(partial).forEach(([key, value]) => {
    const lsKey = KEYS[key]
    if (!lsKey) return
    if (value != null && value !== '') {
      localStorage.setItem(lsKey, String(value))
    } else {
      localStorage.removeItem(lsKey)
    }
  })
}

// Label legível do género
export function genderLabel(g) {
  return g === 'M' ? 'Masculino' : g === 'F' ? 'Feminino' : g === 'O' ? 'Outro' : ''
}

// Label legível do role
export function roleLabel(r) {
  const m = { admin: 'Administrador', producer: 'Produtor', seller: 'Vendedor', user: 'Utilizador' }
  return m[(r || '').toLowerCase()] || 'Utilizador'
}
