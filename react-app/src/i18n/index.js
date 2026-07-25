// Micro-sistema i18n sem dependências externas.
// Para migrar para react-i18next: substituir `t()` por `useTranslation().t` e
// mover os dicionários para ficheiros JSON.

import pt from './pt.js'

const LOCALES = { pt }

const locale = 'pt' // futuramente: navigator.language.split('-')[0] || 'pt'

const dict = LOCALES[locale] || LOCALES.pt

// Resolve 'marketplace.title' → dict.marketplace.title
export function t(key, fallback = key) {
  const parts = key.split('.')
  let node = dict
  for (const part of parts) {
    if (node == null || typeof node !== 'object') return fallback
    node = node[part]
  }
  return node != null ? String(node) : fallback
}

export default { t, locale }
