import { describe, it, expect } from 'vitest'
import {
  normTx,
  normProduct,
  normalizeUserDisplayName,
  extractAuthorName,
  normalizeComment,
  normalizePhoneForWhatsapp,
  extractApiErrorMessage,
} from '../utils/normalizers'

describe('normTx', () => {
  it('normaliza campos essenciais de uma transação completa', () => {
    const raw = {
      id: 1,
      status: 'RESERVED',
      product: { id: 10, name: 'Tomate', photo: '/img/t.jpg' },
      quantity: 3,
      unit_name: 'KG',
      amount: '150.00',
      buyer: { id: 5, first_name: 'Ana', last_name: 'Silva' },
      seller: { id: 9, first_name: 'João', last_name: 'Costa' },
      created_at: '2025-01-01T00:00:00Z',
    }
    const tx = normTx(raw)
    expect(tx.id).toBe(1)
    expect(tx.status).toBe('RESERVED')
    expect(tx.product_name).toBe('Tomate')
    expect(tx.product_id).toBe(10)
    expect(tx.buyer_id).toBe(5)
    expect(tx.buyer_name).toBe('Ana Silva')
    expect(tx.seller_id).toBe(9)
    expect(tx.seller_name).toBe('João Costa')
    expect(tx.quantity).toBe(3)
    expect(tx.amount).toBe('150.00')
  })

  it('usa fallbacks quando campos estão em falta', () => {
    const tx = normTx({ id: 2 })
    expect(tx.status).toBe('RESERVED')
    expect(tx.product_name).toBe('Produto')
    expect(tx.buyer_name).toBe('Comprador')
    expect(tx.seller_name).toBe('Vendedor')
    expect(tx.quantity).toBe(1)
    expect(tx.amount).toBe('0')
    expect(tx.unit_name).toBe('un')
  })

  it('resolve buyer_id de string direta', () => {
    const tx = normTx({ id: 3, buyer: '42' })
    expect(tx.buyer_id).toBe('42')
  })

  it('usa product_name do payload se não há objeto product', () => {
    const tx = normTx({ id: 4, product_name: 'Milho' })
    expect(tx.product_name).toBe('Milho')
  })
})

describe('normProduct', () => {
  it('normaliza campos essenciais de produto', () => {
    const raw = {
      id: 1, name: 'Milho', price: '50',
      seller: { id: 3, first_name: 'Maria', last_name: 'Neves' },
      average_rating: '4.5', total_ratings: 10,
    }
    const p = normProduct(raw)
    expect(p.name).toBe('Milho')
    expect(p.price).toBe('50')
    expect(p.seller).toBe('Maria Neves')
    expect(p.seller_id).toBe(3)
    expect(p.avg_rating).toBe(4.5)
    expect(p.total_ratings).toBe(10)
  })

  it('suporta campos antigos em português', () => {
    const p = normProduct({ id: 2, nome: 'Feijão', preco: '30', vendedor: 'Carlos' })
    expect(p.name).toBe('Feijão')
    expect(p.price).toBe('30')
    expect(p.seller).toBe('Carlos')
  })

  it('retorna avg_rating=0 se não há avaliações', () => {
    const p = normProduct({ id: 3, name: 'X' })
    expect(p.avg_rating).toBe(0)
  })
})

describe('normalizeUserDisplayName', () => {
  it('combina first_name e last_name', () => {
    expect(normalizeUserDisplayName({ first_name: 'Ana', last_name: 'Silva' })).toBe('Ana Silva')
  })

  it('usa username como fallback', () => {
    expect(normalizeUserDisplayName({ username: 'agricola1' })).toBe('agricola1')
  })

  it('extrai prefixo do email como último fallback', () => {
    expect(normalizeUserDisplayName({ email: 'joao@example.com' })).toBe('joao')
  })

  it('retorna null para input nulo', () => {
    expect(normalizeUserDisplayName(null)).toBe(null)
  })
})

describe('extractAuthorName', () => {
  it('retorna full_name se disponível', () => {
    expect(extractAuthorName({ full_name: 'Carlos Matos' })).toBe('Carlos Matos')
  })

  it('extrai nome do objeto autor aninhado', () => {
    const obj = { author: { first_name: 'Joana', last_name: 'Dias' } }
    expect(extractAuthorName(obj)).toBe('Joana Dias')
  })

  it('retorna "Utilizador" para input nulo', () => {
    expect(extractAuthorName(null)).toBe('Utilizador')
  })
})

describe('normalizeComment', () => {
  it('normaliza comentário com campos portugueses', () => {
    const c = {
      id: 1,
      mensagem: 'Bom dia!',
      autor: { id: 5, first_name: 'Rui', last_name: 'Lopes' },
      criado_em: '2025-01-01',
    }
    const nc = normalizeComment(c)
    expect(nc.body).toBe('Bom dia!')
    expect(nc.author_id).toBe(5) // autor.id extraído via c.autor?.id
    expect(nc.created_at).toBe('2025-01-01')
    expect(nc.replies).toEqual([])
  })

  it('normaliza respostas aninhadas', () => {
    const c = {
      id: 2, body: 'Olá',
      replies: [{ id: 3, body: 'Resposta', replies: [] }],
    }
    const nc = normalizeComment(c)
    expect(nc.replies).toHaveLength(1)
    expect(nc.replies[0].body).toBe('Resposta')
  })
})

describe('normalizePhoneForWhatsapp', () => {
  it('converte número para URL wa.me', () => {
    expect(normalizePhoneForWhatsapp('+258841234567')).toBe('https://wa.me/258841234567')
  })

  it('retorna null para input vazio', () => {
    expect(normalizePhoneForWhatsapp('')).toBe(null)
    expect(normalizePhoneForWhatsapp(null)).toBe(null)
  })
})

describe('extractApiErrorMessage', () => {
  it('extrai mensagens de um objeto data com arrays', () => {
    const err = { data: { email: ['Este email já existe.'], password: ['Demasiado curta.'] } }
    const msg = extractApiErrorMessage(err)
    expect(msg).toContain('Este email já existe.')
    expect(msg).toContain('Demasiado curta.')
  })

  it('usa err.message como fallback', () => {
    expect(extractApiErrorMessage({ message: 'Acesso negado.' })).toBe('Acesso negado.')
  })

  it('usa fallback fornecido quando err é nulo', () => {
    expect(extractApiErrorMessage(null, 'Erro desconhecido.')).toBe('Erro desconhecido.')
  })
})
