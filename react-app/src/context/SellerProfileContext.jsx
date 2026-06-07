import { createContext, useContext } from 'react'

const SellerProfileContext = createContext(null)

export function useSellerProfile() {
  const context = useContext(SellerProfileContext)
  if (!context) {
    throw new Error('useSellerProfile must be used within SellerProfileProvider')
  }
  return context
}

export function SellerProfileProvider({ children, profile }) {
  return (
    <SellerProfileContext.Provider value={profile}>
      {children}
    </SellerProfileContext.Provider>
  )
}

export default SellerProfileContext
