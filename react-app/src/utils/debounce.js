// Cria uma versão debounced da função: só executa após `wait`ms sem chamadas novas
export function debounce(fn, wait = 300) {
  let timer = null
  const debounced = (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
  debounced.cancel = () => clearTimeout(timer)
  return debounced
}

// Throttle por chave: garante que só há 1 chamada em voo por chave ao mesmo tempo.
// Ideal para botões de like (chave = postId) — evita spam sem bloquear outros posts.
export function createKeyedThrottle() {
  const inFlight = new Set()
  return async (key, fn) => {
    if (inFlight.has(key)) return
    inFlight.add(key)
    try {
      await fn()
    } finally {
      inFlight.delete(key)
    }
  }
}
