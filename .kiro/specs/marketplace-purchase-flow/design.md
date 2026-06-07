# Design Document — marketplace-purchase-flow

## Overview

Esta funcionalidade adiciona o fluxo completo de compra ao marketplace da aplicação iagromoz. O design integra-se na arquitetura React + Vite + Tailwind CSS existente, reutilizando os padrões já estabelecidos: estado local com `useState`/`useEffect`, autenticação via JWT no `localStorage`, serviço de API singleton em `services/api.js`, e modais como JSX inline dentro do componente pai.

O fluxo cobre três superfícies:
1. **ProductDetail.jsx** — substituição do botão estático "Comprar Agora" por lógica de compra real.
2. **Transactions.jsx** (nova página) — listagem e gestão do ciclo de vida das transações.
3. **Navegação** — adição do item "Transações" na `DesktopSidebar` e `MobileNav`, e nova rota protegida em `App.jsx`.

---

## Architecture

### Fluxo de dados de alto nível

```
Utilizador
    │
    ▼
ProductDetail.jsx
    │  clica "Comprar Agora"
    ▼
api.buyProduct(productId)  ──►  POST /marketplace/products/{id}/buy/
    │
    ├── sucesso → mostra mensagem + botão "Ver transações"
    └── erro    → mostra banner de erro inline
    
Utilizador navega para /transactions
    │
    ▼
Transactions.jsx (ProtectedRoute)
    │  monta
    ▼
api.getTransactions()  ──►  GET /marketplace/transactions/
    │
    ▼
Lista de TransactionCard
    │
    ├── Vendedor vê: Confirmar / Concluir / Cancelar
    └── Comprador vê: Cancelar (só RESERVED)
    
Ação de gestão
    │  (Cancelar mostra CancelConfirmModal primeiro)
    ▼
api.confirmTransaction(id)   ──►  POST /marketplace/transactions/{id}/confirm/
api.concludeTransaction(id)  ──►  POST /marketplace/transactions/{id}/conclude/
api.cancelTransaction(id)    ──►  POST /marketplace/transactions/{id}/cancel/
    │
    └── atualiza estado local da transação (sem reload)
```

### Diagrama de hierarquia de componentes

```
App.jsx
├── Route /product/:id  →  ProtectedRoute → ProductDetail.jsx
│     ├── [BuyButton logic — inline, não componente separado]
│     └── [CancelConfirmModal não se aplica aqui]
│
└── Route /transactions  →  ProtectedRoute → Transactions.jsx
      ├── DesktopSidebar
      ├── MobileNav
      ├── TransactionCard.jsx  (×N)
      │     └── Botões de ação (Confirmar / Concluir / Cancelar)
      └── CancelConfirmModal.jsx  (renderizado inline em Transactions.jsx)
```

---

## Components and Interfaces

### 1. ProductDetail.jsx — modificações

**Novos estados a adicionar:**

```js
const [buyLoading, setBuyLoading]   = useState(false)
const [buyError, setBuyError]       = useState('')
const [buySuccess, setBuySuccess]   = useState(false)
```

**Lógica de deteção de vendedor:**

O botão "Comprar Agora" é ocultado quando o utilizador autenticado é o vendedor do produto. A deteção usa a função `isOwner(product)` já existente no componente — que compara `userId` do `localStorage` com os campos `seller?.id`, `seller_id`, `vendedor_id`, etc.

**Handler `handleBuy`:**

```js
const handleBuy = async () => {
  if (!token) { navigate('/login'); return }
  setBuyLoading(true)
  setBuyError('')
  setBuySuccess(false)
  try {
    await api.buyProduct(id)
    setBuySuccess(true)
  } catch (err) {
    const msg = err?.data
      ? Object.entries(err.data).map(([k, v]) => `${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
      : err?.message || 'Erro ao processar compra.'
    setBuyError(msg)
  } finally {
    setBuyLoading(false)
  }
}
```

**Substituição do botão estático:**

O botão "Comprar Agora" existente é substituído por lógica condicional:
- Se `isOwner(product)` → não renderiza o botão (vendedor não compra o próprio produto).
- Se `buySuccess` → mostra banner de sucesso + botão "Ver as minhas transações".
- Caso contrário → mostra botão "Comprar Agora" (desativado e com spinner durante `buyLoading`).
- Se `buyError` → mostra banner de erro inline acima do botão.

---

### 2. Transactions.jsx (nova página)

**Props:** nenhuma (lê contexto do `localStorage` diretamente).

**Estado:**

```js
const [transactions, setTransactions] = useState([])
const [loading, setLoading]           = useState(true)
const [error, setError]               = useState('')
const [actionLoading, setActionLoading] = useState(null)  // id da transação em curso
const [actionError, setActionError]   = useState('')
const [cancelTarget, setCancelTarget] = useState(null)    // transação a cancelar
```

**Deteção de papel do utilizador:**

```js
const userId   = localStorage.getItem('userId')
const userRole = localStorage.getItem('userRole')
const isSeller = userRole === 'seller' || userRole === 'producer' || userRole === 'admin'
```

Para cada transação, o papel é determinado comparando `transaction.buyer?.id` (ou `transaction.buyer_id`) com `userId`:
- Se `String(transaction.buyer?.id) === String(userId)` → utilizador é o **Comprador** desta transação.
- Caso contrário (e `isSeller`) → utilizador é o **Vendedor**.

**Handlers:**

```js
const handleConfirm = async (txId) => { ... }   // chama api.confirmTransaction(txId)
const handleConclude = async (txId) => { ... }  // chama api.concludeTransaction(txId)
const handleCancelRequest = (tx) => setCancelTarget(tx)  // abre modal
const handleCancelConfirm = async () => { ... } // chama api.cancelTransaction(cancelTarget.id)
```

Após cada ação bem-sucedida, o estado local é atualizado com `setTransactions(prev => prev.map(...))` sem recarregar a página.

**Estrutura de layout:**

```jsx
<div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">
  <DesktopSidebar />
  <div className="flex-1 min-w-0 flex flex-col">
    {/* Header */}
    {/* Error banner (actionError) */}
    {/* Loading / Error / Empty / List states */}
    {cancelTarget && <CancelConfirmModal ... />}
    <MobileNav />
  </div>
</div>
```

---

### 3. TransactionCard.jsx (novo componente)

**Props:**

```ts
{
  transaction: {
    id: number,
    status: 'RESERVED' | 'AWAITING_PAYMENT' | 'COMPLETED' | 'CANCELLED',
    product: { id, name, price, photo },
    buyer: { id, first_name, last_name },
    seller: { id, first_name, last_name },
    created_at: string,
    quantity?: number,
    total_price?: number,
  },
  isBuyer: boolean,        // true se o utilizador atual é o comprador
  isSeller: boolean,       // true se o utilizador atual é o vendedor
  isLoading: boolean,      // true enquanto uma ação está em curso para este card
  onConfirm: (id) => void,
  onConclude: (id) => void,
  onCancelRequest: (tx) => void,
}
```

**Lógica de botões visíveis:**

| Status              | Comprador vê       | Vendedor vê                  |
|---------------------|--------------------|------------------------------|
| RESERVED            | Cancelar           | Confirmar + Cancelar         |
| AWAITING_PAYMENT    | —                  | Concluir + Cancelar          |
| COMPLETED           | —                  | —                            |
| CANCELLED           | —                  | —                            |

**Badge de status:**

```js
const STATUS_CONFIG = {
  RESERVED:         { label: 'Reservado',          color: 'bg-yellow-100 text-yellow-800' },
  AWAITING_PAYMENT: { label: 'Aguarda Pagamento',  color: 'bg-blue-100 text-blue-800'   },
  COMPLETED:        { label: 'Concluído',           color: 'bg-green-100 text-green-800' },
  CANCELLED:        { label: 'Cancelado',           color: 'bg-red-100 text-red-800'     },
}
```

---

### 4. CancelConfirmModal.jsx (novo componente reutilizável)

**Props:**

```ts
{
  transaction: object | null,  // transação a cancelar (null = modal fechado)
  loading: boolean,
  onConfirm: () => void,
  onClose: () => void,
}
```

Segue o padrão dos modais existentes no projeto: `fixed inset-0 bg-black/50`, card centrado com `rounded-2xl`, botões "Cancelar" e "Confirmar cancelamento".

---

### 5. App.jsx — nova rota

```jsx
import Transactions from './pages/Transactions'
// ...
<Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
```

---

### 6. DesktopSidebar.jsx — novo item de navegação

Adicionado ao array `mainItems` (após "Mercado"):

```js
{ path: '/transactions', icon: 'bi-receipt', label: 'Transações', roles: ['user', 'seller', 'producer', 'admin'] },
```

---

### 7. MobileNav.jsx — novo item de navegação

Adicionado ao `defaultNavItems` (para todos os roles) e ao `sellerNavItems` (substituindo o item "Pedidos" que atualmente aponta para `/notifications`):

```js
// defaultNavItems — adicionar:
{ path: '/transactions', icon: 'bi-receipt', label: 'Transações', roles: ['user', 'admin', 'seller', 'producer'] },

// sellerNavItems — substituir o item "Pedidos":
{ path: '/transactions', icon: 'bi-receipt', label: 'Pedidos' },
```

---

## Data Models

### Objeto Transaction (resposta da API)

```ts
interface Transaction {
  id: number
  status: 'RESERVED' | 'AWAITING_PAYMENT' | 'COMPLETED' | 'CANCELLED'
  product: {
    id: number
    name: string
    price: string        // decimal como string, ex: "150.00"
    photo: string | null
  }
  buyer: {
    id: number
    first_name: string
    last_name: string
    username: string
  }
  seller: {
    id: number
    first_name: string
    last_name: string
    username: string
  }
  quantity: number
  total_price: string    // decimal como string
  created_at: string     // ISO 8601
  updated_at: string
}
```

### Normalização defensiva

A API pode retornar campos com nomes alternativos. O componente `Transactions.jsx` deve normalizar:

```js
const normTx = (tx) => ({
  id:          tx.id,
  status:      tx.status || 'RESERVED',
  product:     tx.product || {},
  buyer:       tx.buyer   || {},
  seller:      tx.seller  || {},
  quantity:    tx.quantity    || 1,
  total_price: tx.total_price || tx.price || '0',
  created_at:  tx.created_at  || '',
})
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Compra chama API com ID correto

*Para qualquer* ID de produto válido, quando o utilizador autenticado clica em "Comprar Agora", o sistema deve chamar `api.buyProduct` exatamente uma vez com esse ID de produto.

**Validates: Requirements 1.2**

---

### Property 2: Estado pós-compra bem-sucedida

*Para qualquer* resposta de sucesso retornada por `api.buyProduct`, o componente `ProductDetail` deve renderizar uma mensagem de confirmação de reserva E um botão de navegação para `/transactions`.

**Validates: Requirements 1.3, 1.4, 5.4**

---

### Property 3: Erro de compra exibe mensagem sem navegar

*Para qualquer* erro lançado por `api.buyProduct` (variando status HTTP, mensagem e estrutura do objeto de erro), o componente deve exibir uma mensagem de erro não vazia e não deve navegar para outra página.

**Validates: Requirements 1.5**

---

### Property 4: Botão de compra oculto para o vendedor do produto

*Para qualquer* produto onde `product.seller?.id` (ou campos equivalentes) coincide com o `userId` do `localStorage`, o botão "Comprar Agora" não deve estar presente no DOM renderizado.

**Validates: Requirements 1.8**

---

### Property 5: Transações carregadas são todas renderizadas

*Para qualquer* array de objetos de transação retornado por `api.getTransactions()`, cada transação deve ser renderizada como um `TransactionCard` na `TransactionsPage` — o número de cards renderizados deve ser igual ao comprimento do array.

**Validates: Requirements 2.2, 2.6**

---

### Property 6: Badge de status tem cor correta

*Para qualquer* transação com status em `{RESERVED, AWAITING_PAYMENT, COMPLETED, CANCELLED}`, o `TransactionCard` renderizado deve conter um elemento com a classe de cor correspondente: amarelo para RESERVED, azul para AWAITING_PAYMENT, verde para COMPLETED, vermelho para CANCELLED.

**Validates: Requirements 2.7**

---

### Property 7: Erro no carregamento exibe mensagem e botão de retry

*Para qualquer* erro lançado por `api.getTransactions()`, a `TransactionsPage` deve exibir uma mensagem de erro não vazia e um botão de "tentar novamente" clicável.

**Validates: Requirements 2.5**

---

### Property 8: Botões de ação corretos por papel e status

*Para qualquer* transação e qualquer combinação de (papel do utilizador, status da transação), os botões de ação renderizados no `TransactionCard` devem corresponder exatamente à tabela de visibilidade definida:
- Vendedor + RESERVED → Confirmar + Cancelar
- Vendedor + AWAITING_PAYMENT → Concluir + Cancelar
- Comprador + RESERVED → Cancelar
- Comprador + AWAITING_PAYMENT → nenhum botão de ação
- Qualquer papel + COMPLETED ou CANCELLED → nenhum botão de ação

**Validates: Requirements 3.1, 3.2, 4.1, 4.4**

---

### Property 9: Modal de cancelamento aparece antes da chamada à API

*Para qualquer* transação cancelável (RESERVED para comprador; RESERVED ou AWAITING_PAYMENT para vendedor), clicar em "Cancelar" deve exibir o `CancelConfirmModal` sem chamar `api.cancelTransaction`.

**Validates: Requirements 3.5, 4.2**

---

### Property 10: Transições de estado são corretas e locais

*Para qualquer* transação, após uma ação de gestão bem-sucedida, o estado local da transação deve transitar para o status esperado sem recarregar a página:
- confirm → AWAITING_PAYMENT
- conclude → COMPLETED
- cancel (confirmado) → CANCELLED

**Validates: Requirements 3.3, 3.4, 3.6, 4.3**

---

### Property 11: Falha de ação não altera estado visual

*Para qualquer* transação e qualquer erro lançado por uma ação de gestão (confirm, conclude, cancel), o status da transação no estado do componente deve permanecer inalterado e uma mensagem de erro deve ser exibida.

**Validates: Requirements 3.7, 4.5**

---

## Error Handling

### Estratégia geral

Todos os erros de API são capturados em blocos `try/catch`. O objeto de erro lançado pelo `APIService` tem a forma `{ status, message, data }`. A extração da mensagem segue o padrão já usado no projeto:

```js
const msg = err?.data
  ? Object.entries(err.data).map(([k, v]) => `${Array.isArray(v) ? v.join(', ') : v}`).join(' | ')
  : err?.message || 'Erro desconhecido.'
```

### Erros específicos por contexto

| Contexto                  | Tratamento                                                                 |
|---------------------------|----------------------------------------------------------------------------|
| `buyProduct` — 409        | Mensagem: "Já tens uma transação ativa para este produto."                 |
| `buyProduct` — 400        | Exibe campos de validação da API                                           |
| `buyProduct` — rede       | Mensagem genérica de erro de rede                                          |
| `getTransactions` — erro  | Banner de erro + botão "Tentar novamente" que chama `loadTransactions()`   |
| Ação de gestão — erro     | Banner de erro inline na página; estado da transação não é alterado        |
| Utilizador não autenticado | Redirecionamento para `/login` (gerido pelo `ProtectedRoute` na rota, e pelo handler `handleBuy` no botão) |

### Estados de UI

Cada componente tem estados de UI bem definidos:

**ProductDetail (secção de compra):**
- `idle` — botão "Comprar Agora" ativo
- `loading` — botão desativado, spinner
- `success` — banner verde + botão "Ver transações"
- `error` — banner vermelho com mensagem

**TransactionsPage:**
- `loading` — indicador de carregamento centralizado
- `error` — banner de erro + botão retry
- `empty` — mensagem informativa com CTA para o marketplace
- `loaded` — lista de TransactionCards

**TransactionCard (por ação):**
- `idle` — botões de ação ativos
- `loading` — botões desativados, spinner no botão ativo
- `error` — propagado para o banner da página pai

---

## Testing Strategy

### Abordagem dual

A estratégia combina testes de exemplo (para comportamentos específicos e determinísticos) com testes baseados em propriedades (para comportamentos universais que devem valer para qualquer input).

### Testes de exemplo (unit tests)

Focados em cenários específicos e estados de UI determinísticos:

- Renderização do botão "Comprar Agora" para utilizador autenticado não-vendedor
- Estado de loading durante `buyProduct` (botão desativado)
- Redirecionamento para `/login` quando não autenticado
- Indicador de loading durante `getTransactions`
- Estado vazio quando `getTransactions` retorna `[]`
- Botões desativados durante ação de gestão em curso
- Renderização do `CancelConfirmModal` com dados corretos da transação

### Testes baseados em propriedades (property-based tests)

Biblioteca recomendada: **[fast-check](https://fast-check.dev/)** (compatível com Vitest/Jest, sem dependências externas pesadas).

Configuração mínima: **100 iterações** por propriedade.

Cada teste de propriedade deve ser anotado com um comentário de rastreabilidade:

```js
// Feature: marketplace-purchase-flow, Property N: <texto da propriedade>
```

**Geradores de dados necessários:**

```js
// Gerador de ID de produto
const arbProductId = fc.integer({ min: 1, max: 99999 })

// Gerador de status de transação
const arbStatus = fc.constantFrom('RESERVED', 'AWAITING_PAYMENT', 'COMPLETED', 'CANCELLED')

// Gerador de objeto de transação
const arbTransaction = fc.record({
  id: fc.integer({ min: 1 }),
  status: arbStatus,
  product: fc.record({ id: fc.integer(), name: fc.string(), price: fc.string() }),
  buyer: fc.record({ id: fc.integer(), first_name: fc.string(), last_name: fc.string() }),
  seller: fc.record({ id: fc.integer(), first_name: fc.string(), last_name: fc.string() }),
  created_at: fc.date().map(d => d.toISOString()),
  total_price: fc.float({ min: 0.01 }).map(n => n.toFixed(2)),
})

// Gerador de erro de API
const arbApiError = fc.record({
  status: fc.integer({ min: 400, max: 599 }),
  message: fc.string({ minLength: 1 }),
  data: fc.option(fc.dictionary(fc.string(), fc.string())),
})
```

**Mapeamento propriedade → teste:**

| Propriedade | Componente testado         | Gerador principal         |
|-------------|----------------------------|---------------------------|
| 1           | ProductDetail (handleBuy)  | `arbProductId`            |
| 2           | ProductDetail (pós-compra) | `arbTransaction`          |
| 3           | ProductDetail (erro)       | `arbApiError`             |
| 4           | ProductDetail (visibilidade botão) | `arbTransaction` com seller.id = userId |
| 5           | TransactionsPage           | `fc.array(arbTransaction)` |
| 6           | TransactionCard            | `arbStatus`               |
| 7           | TransactionsPage (erro)    | `arbApiError`             |
| 8           | TransactionCard (botões)   | `arbTransaction` × papel  |
| 9           | TransactionCard + Modal    | `arbTransaction` (cancelável) |
| 10          | TransactionsPage (state)   | `arbTransaction`          |
| 11          | TransactionsPage (erro ação) | `arbTransaction` × `arbApiError` |

### Testes de integração

- Verificar que a rota `/transactions` existe em `App.jsx` e está envolvida por `ProtectedRoute`.
- Verificar que `DesktopSidebar` e `MobileNav` contêm um link para `/transactions`.
- Verificar que utilizador não autenticado em `/transactions` é redirecionado para `/login`.

### Cobertura esperada

- Todos os 11 correctness properties cobertos por testes de propriedade.
- Estados de UI determinísticos cobertos por testes de exemplo.
- Configuração de rotas coberta por testes de integração/smoke.
