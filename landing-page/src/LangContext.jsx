import { createContext, useContext, useState, useEffect } from 'react'
import { copy } from './langData'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('pt')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: copy[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
