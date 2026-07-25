import { describe, it, expect, beforeEach } from 'vitest'
import {
  getAccessToken, setAccessToken,
  getUserRole, setUserRole,
  getUserFoto, setUserFoto,
  getUserCanSell, setUserCanSell,
  isLoggedIn, clearAuth,
  getNotifications, saveNotifications,
} from '../utils/storage'

beforeEach(() => {
  localStorage.clear()
})

describe('getters e setters de auth', () => {
  it('setAccessToken / getAccessToken', () => {
    setAccessToken('abc123')
    expect(getAccessToken()).toBe('abc123')
  })

  it('getUserRole retorna "user" por defeito', () => {
    expect(getUserRole()).toBe('user')
  })

  it('setUserRole / getUserRole', () => {
    setUserRole('admin')
    expect(getUserRole()).toBe('admin')
  })

  it('isLoggedIn é false sem token', () => {
    expect(isLoggedIn()).toBe(false)
  })

  it('isLoggedIn é true com token', () => {
    setAccessToken('token')
    expect(isLoggedIn()).toBe(true)
  })
})

describe('getUserFoto / setUserFoto', () => {
  it('guarda e lê foto', () => {
    setUserFoto('https://example.com/foto.jpg')
    expect(getUserFoto()).toBe('https://example.com/foto.jpg')
  })

  it('setUserFoto(null) remove a entrada', () => {
    setUserFoto('url')
    setUserFoto(null)
    expect(getUserFoto()).toBe(null)
  })
})

describe('getUserCanSell / setUserCanSell', () => {
  it('retorna false por defeito', () => {
    expect(getUserCanSell()).toBe(false)
  })

  it('true quando definido como true', () => {
    setUserCanSell(true)
    expect(getUserCanSell()).toBe(true)
  })

  it('false quando definido como false', () => {
    setUserCanSell(true)
    setUserCanSell(false)
    expect(getUserCanSell()).toBe(false)
  })
})

describe('clearAuth', () => {
  it('remove todos os campos de auth', () => {
    setAccessToken('tok')
    setUserRole('seller')
    setUserFoto('img')
    clearAuth()
    expect(getAccessToken()).toBe(null)
    expect(getUserRole()).toBe('user')
    expect(getUserFoto()).toBe(null)
    expect(isLoggedIn()).toBe(false)
  })
})

describe('notificações por utilizador', () => {
  it('retorna array vazio sem notificações guardadas', () => {
    expect(getNotifications('user1')).toEqual([])
  })

  it('guarda e recupera notificações', () => {
    const notifs = [{ id: 1, message: 'Teste' }, { id: 2, message: 'Outro' }]
    saveNotifications('user1', notifs)
    expect(getNotifications('user1')).toEqual(notifs)
  })

  it('limita a 50 notificações', () => {
    const notifs = Array.from({ length: 60 }, (_, i) => ({ id: i }))
    saveNotifications('user1', notifs)
    expect(getNotifications('user1')).toHaveLength(50)
  })

  it('notificações são isoladas por userId', () => {
    saveNotifications('user1', [{ id: 1 }])
    expect(getNotifications('user2')).toEqual([])
  })
})
