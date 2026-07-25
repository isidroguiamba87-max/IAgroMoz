import { describe, it, expect, vi, beforeEach } from 'vitest'
import { captureError, captureMessage } from '../utils/errorTracking'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('captureError', () => {
  it('chama console.error em modo dev', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    captureError(new Error('teste'))
    expect(spy).toHaveBeenCalled()
  })

  it('aceita string em vez de Error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => captureError('erro de string')).not.toThrow()
    expect(spy).toHaveBeenCalled()
  })

  it('inclui contexto adicional no log', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    captureError(new Error('ctx'), { type: 'test_type' })
    const args = spy.mock.calls[0]
    expect(JSON.stringify(args)).toContain('test_type')
  })
})

describe('captureMessage', () => {
  it('chama console.info em modo dev', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {})
    captureMessage('mensagem de teste')
    expect(spy).toHaveBeenCalled()
  })

  it('não lança exceção com level inválido', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {})
    expect(() => captureMessage('msg', 'debug')).not.toThrow()
  })
})

describe('i18n', () => {
  it('resolve chave aninhada correctamente', async () => {
    const { t } = await import('../i18n/index.js')
    expect(t('common.loading')).toBe('Carregando...')
    expect(t('transactions.status.RESERVED')).toBe('Reservado')
    expect(t('marketplace.title')).toBe('Mercado')
  })

  it('retorna a chave quando não encontrada', async () => {
    const { t } = await import('../i18n/index.js')
    expect(t('chave.inexistente')).toBe('chave.inexistente')
  })

  it('usa fallback quando fornecido', async () => {
    const { t } = await import('../i18n/index.js')
    expect(t('nao.existe', 'Valor padrão')).toBe('Valor padrão')
  })
})
