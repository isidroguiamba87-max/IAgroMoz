import { describe, it, expect, vi } from 'vitest'
import { debounce, createKeyedThrottle } from '../utils/debounce'

describe('debounce', () => {
  it('executa a função após o delay', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const d = debounce(fn, 200)
    d('a')
    d('b')
    d('c')
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
    vi.useRealTimers()
  })

  it('cancel() impede a execução', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const d = debounce(fn, 200)
    d()
    d.cancel()
    vi.advanceTimersByTime(300)
    expect(fn).not.toHaveBeenCalled()
    vi.useRealTimers()
  })
})

describe('createKeyedThrottle', () => {
  it('executa a função uma vez por chave simultânea', async () => {
    const throttle = createKeyedThrottle()
    let count = 0
    const fn = () => new Promise(r => setTimeout(() => { count++; r() }, 10))

    // Disparar 3 chamadas para a mesma chave ao mesmo tempo
    await Promise.all([
      throttle('post-1', fn),
      throttle('post-1', fn),
      throttle('post-1', fn),
    ])

    // Só 1 chamada deveria ter passado (as outras foram ignoradas enquanto estava in-flight)
    expect(count).toBe(1)
  })

  it('chaves diferentes executam em paralelo', async () => {
    const throttle = createKeyedThrottle()
    const results = []
    const fn = (key) => async () => { results.push(key) }

    await Promise.all([
      throttle('post-1', fn('post-1')),
      throttle('post-2', fn('post-2')),
    ])

    expect(results).toContain('post-1')
    expect(results).toContain('post-2')
  })

  it('permite nova chamada depois da anterior terminar', async () => {
    const throttle = createKeyedThrottle()
    let count = 0
    const fn = () => new Promise(r => setTimeout(() => { count++; r() }, 5))

    await throttle('k', fn)
    await throttle('k', fn)

    expect(count).toBe(2)
  })
})
