# IAgroMOZ — Documentação Completa da Plataforma

> Versão 1.0 · Maio 2026

---

## 1. O QUE É O IAGROMOZ

IAgroMOZ é uma plataforma digital de agricultura inteligente desenvolvida para Moçambique.
O objetivo é conectar agricultores, produtores e vendedores num único ecossistema digital onde
podem partilhar conhecimento, comprar e vender produtos agrícolas, e obter assistência de
inteligência artificial especializada em agricultura.

**Missão:** Digitalizar e democratizar o acesso ao mercado agrícola moçambicano.

**Público-alvo:**
- Agricultores e produtores rurais
- Vendedores e comerciantes de produtos agrícolas
- Consumidores que querem comprar produtos frescos diretamente
- Administradores da plataforma

---

## 2. STACK TECNOLÓGICA

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.2 | Framework principal |
| React Router DOM | 6.20 | Roteamento SPA |
| Vite | 5.0 | Build tool e dev server |
| Tailwind CSS | 3.4 | Estilização |
| Bootstrap Icons | 1.11 | Ícones |
| React Markdown | 10.1 | Renderização de markdown no chat IA |
| Vitest | 4.x | Testes unitários |

### Backend (API)
- Django REST Framework
- JWT (JSON Web Tokens) para autenticação
- Base URL: configurável em `react-app/src/config/api.js`
- Padrão atual: `http://192.168.0.111:8000/api`

---

## 3. ESTRUTURA DO PROJETO

```
iagromoz-site/
├── react-app/                  ← Aplicação React (frontend principal)
│   ├── src/
│   │   ├── pages/              ← Páginas da aplicação
│   │   ├── components/         ← Componentes reutilizáveis
│   │   ├── services/api.js     ← Serviço central de chamadas à API
│   │   ├── config/api.js       ← Configuração do servidor (URL base)
│   │   ├── context/            ← Contextos React (ThemeContext)
│   │   ├── App.jsx             ← Roteamento principal
│   │   ├── main.jsx            ← Ponto de entrada
│   │   └── index.css           ← Estilos globais + Tailwind
│   ├── public/logo.png         ← Logo da plataforma
│   ├── index.html              ← HTML base
│   └── package.json
├── api/                        ← Utilitários JS legados (auth, config)
├── js/                         ← Scripts JS legados (login, registo)
├── iagromoz-site/src/          ← Site HTML estático (landing page)
└── .env.example                ← Variáveis de ambiente de exemplo
```

---

## 4. PAPÉIS DE UTILIZADOR (ROLES)

A plataforma tem 4 papéis distintos com permissões diferentes:

| Role | Valor localStorage | Descrição |
|---|---|---|
| Normal | `user` | Utilizador padrão — pode comprar, comentar, fazer posts |
| Produtor | `producer` | Pode vender produtos + tudo do Normal |
| Vendedor | `seller` | Acesso restrito: Dashboard, Perfil, Transações, Marketplace |
| Admin | `admin` | Acesso total à plataforma e painel administrativo |

### Registo por tipo
- `/register/normal` — Registo de utilizador normal
- `/register/producer` — Registo de produtor (requer contacto e endereço da exploração)
- `/register/seller` — Registo de vendedor (requer tipo, nome da loja, NUIT, contacto)

### Upgrade de Normal para Produtor
Um utilizador normal pode solicitar upgrade para Produtor via `POST /api/users/upgrade-to-producer/`.
O pedido fica PENDING até um admin aprovar. Após aprovação, o role muda automaticamente.

---

## 5. AUTENTICAÇÃO E CONTROLO DE ACESSO

### Como funciona
1. Login via `POST /api/token/` com email + password
2. API retorna `access_token` + `refresh_token`
3. Tokens guardados no `localStorage`
4. `getUserProfile()` é chamado automaticamente após login para guardar `userRole`, `userId`, `userName`
5. Todas as chamadas autenticadas enviam `Authorization: Bearer <access_token>`
6. Refresh automático do token antes de expirar (30s de antecedência)

### Redirecionamento pós-login
- **Seller** → `/seller-dashboard` (sempre, ignora parâmetro `?next=`)
- **Outros** → parâmetro `?next=` ou `/feed` por padrão

### ProtectedRoute
Componente que guarda rotas autenticadas. Suporta:
- `adminOnly` — só admins acedem
- `allowedRoles` — lista de roles permitidos
- Sellers têm lista de rotas permitidas hardcoded:
  `/seller-dashboard`, `/profile`, `/transactions`, `/marketplace`, `/create-product`, `/product/*`

### Logout
`POST /api/users/logout/` com refresh token → limpa `access_token`, `refresh_token`, `userRole` do localStorage.

---

## 6. PÁGINAS DA APLICAÇÃO

### 6.1 Páginas Públicas (sem login)

#### `/` e `/feed` — Feed Principal
- Lista de posts da comunidade agrícola
- Filtros por categoria: Agricultura / Pecuária
- Qualquer visitante pode ler posts e comentários
- Utilizadores autenticados podem: criar posts, comentar, dar like
- Paginação infinita (scroll)

#### `/post/:id` — Detalhe de Post
- Conteúdo completo do post
- Árvore de comentários aninhados
- Botão de like (toggle)
- Edição/eliminação para o autor (dentro de 10 minutos)

#### `/login` — Login
- Formulário email + password
- Redirecionamento inteligente por role após login
- Link para registo

#### `/register` — Escolha de tipo de registo
- Redireciona para `/register/normal`, `/register/producer` ou `/register/seller`

---

### 6.2 Páginas Autenticadas

#### `/marketplace` — Mercado
- Lista todos os produtos agrícolas disponíveis
- Filtros por categoria (Agricultura / Pecuária) e pesquisa por nome
- Secções: "Destaques" (melhor avaliados) e "Novos produtos"
- Botão "Anunciar" para produtores/vendedores
- Utilizadores sem permissão de venda veem modal de pedido de upgrade
- Cards de produto com: foto, nome, preço, localização, vendedor, avaliação

#### `/product/:id` — Detalhe de Produto
- Foto, nome, descrição, preço base, stock disponível
- Seletor de unidades de venda (Dúzia, Caixa, Saco, etc.)
- Seletor de quantidade com cálculo de total estimado
- **Botão "Reservar produto"** — cria transação com status RESERVED
- Informação do vendedor com avaliação
- Botão de contacto via WhatsApp
- Botões de avaliação (produto e vendedor)
- Dono do produto vê botões: editar, apagar, gerir unidades

#### `/create-product` — Criar Produto
- Formulário completo: nome, descrição, preço, foto, categoria, subcategoria, distrito, stock, unidade base
- Apenas para roles com `can_sell = true` (seller, producer, admin)

#### `/product/:productId/units` — Gerir Unidades de Venda
- Lista as unidades de venda do produto (Dúzia, Caixa, Saco, Outro...)
- Criar, editar e eliminar unidades
- Cada unidade tem: tipo, nome personalizado, multiplicador, preço, estado ativo/inativo

#### `/transactions` — Transações
- **Aba "As minhas compras"** — perspetiva do comprador
  - RESERVED: aguarda confirmação do vendedor + pode cancelar
  - AWAITING_PAYMENT: botão "Efetuar pagamento" + pode cancelar
  - PAID: aguarda entrega do vendedor
  - COMPLETED: entrega concluída
- **Aba "As minhas vendas"** — perspetiva do vendedor
  - RESERVED: botão "Confirmar disponibilidade" + cancelar
  - AWAITING_PAYMENT: aguarda pagamento do comprador
  - PAID: botão "Confirmar entrega"
  - COMPLETED: venda concluída
- **Aba "Histórico"** — transações concluídas e canceladas
- Badges com contagem de ações pendentes em cada aba
- Guia visual do fluxo no topo

---

#### `/seller-dashboard` — Painel do Vendedor
- Acesso exclusivo: seller, producer, admin
- **Produtos:** total, novos nos últimos 30 dias, lista de produtos com stock baixo
- **Transações:** total, novas nos últimos 7 dias, receita total, receita últimos 30 dias, distribuição por estado, lista das 5 mais recentes
- **Pagamentos:** total recebido, recebido nos últimos 30 dias, distribuição por método (M-Pesa, e-Mola, Cartão, Banco)
- **Avaliações:** média como vendedor, média dos produtos
- Botão de atualização manual
- Link direto para `/transactions`

#### `/chat` — Chat com IA Agrícola
- Assistente de IA especializado em agricultura moçambicana
- Histórico de sessões de conversa
- Suporte a upload de fotos (análise de plantas, doenças, etc.)
- Respostas em Markdown com formatação
- Indicador de digitação animado
- Sidebar com lista de sessões anteriores
- Criação automática de nova sessão se não existir

#### `/techniques` — Técnicas Agrícolas
- Lista de técnicas agrícolas submetidas pela comunidade
- Sistema de votação: APPROVE / REJECT
- Com 100+ votos: ≥80% aprovação → VALIDATED; ≥20% rejeição → DISCARDED
- Acesso: user, producer, admin (sellers não têm acesso)

#### `/technique/:id` — Detalhe de Técnica
- Conteúdo completo da técnica
- Botões de votação (Aprovar / Rejeitar)
- Estado atual: PENDING / VALIDATED / DISCARDED

#### `/profile` — Perfil Próprio
- Foto de perfil, nome, localização
- Edição de dados pessoais
- Alteração de password
- Perfil de produtor (contacto, endereço da exploração)
- Perfil de vendedor (tipo, nome da loja, NUIT, contacto, endereço)

#### `/profile/:id` — Perfil Público
- Visualização pública do perfil de qualquer utilizador
- Sem dados sensíveis
- Avaliações do vendedor (se aplicável)

#### `/notifications` — Notificações
- Lista de notificações do utilizador
- Marcar como lida
- Notificações automáticas: reserva criada, confirmação, pagamento, aprovação de upgrade

---

#### `/dashboard` — Painel Administrativo
- Acesso exclusivo: admin, seller, producer
- Métricas gerais da plataforma
- Gestão de utilizadores, produtos, posts, técnicas, transações
- Audit logs
- Aprovação/rejeição de pedidos de upgrade

---

## 7. FLUXO COMPLETO DE COMPRA E VENDA

```
1. COMPRADOR reserva produto
   POST /api/marketplace/products/{id}/buy/
   → Transação criada com status: RESERVED
   → Stock deduzido imediatamente
   → Vendedor recebe notificação automática

2. VENDEDOR confirma disponibilidade
   POST /api/marketplace/transactions/{id}/confirm/
   → Status muda para: AWAITING_PAYMENT
   → Comprador recebe notificação para pagar

3. COMPRADOR efetua pagamento
   POST /api/payments/initiate/
   → Payment criado com status: PENDING → PROCESSING → SUCCESS
   → Quando SUCCESS: Transação muda para PAID
   → Vendedor recebe notificação de pagamento recebido

4. VENDEDOR entrega o produto e conclui
   POST /api/marketplace/transactions/{id}/conclude/
   → Status muda para: COMPLETED

   OU em qualquer ponto:
   POST /api/marketplace/transactions/{id}/cancel/
   → Status muda para: CANCELLED
   → Stock devolvido automaticamente
```

### Estados da Transação
| Estado | Quem age | Ação |
|---|---|---|
| RESERVED | Vendedor | Confirmar ou Cancelar |
| AWAITING_PAYMENT | Comprador | Pagar ou Cancelar |
| PAID | Vendedor | Concluir entrega |
| COMPLETED | — | Finalizado |
| CANCELLED | — | Cancelado (stock devolvido) |

### Métodos de Pagamento Suportados
- **M-Pesa** — Carteira móvel Vodacom
- **e-Mola** — Carteira móvel Movitel
- **Cartão** — Cartão bancário
- **Banco** — Transferência bancária
- Modo MOCK disponível para testes (sem chamadas externas reais)

---

## 8. SISTEMA DE UNIDADES DE VENDA

Cada produto tem uma **unidade base** (KG, TON, LITER, UNIT) e pode ter múltiplas
**unidades de venda** definidas pelo vendedor.

### Tipos de unidade disponíveis
| Tipo | Label | Exemplo |
|---|---|---|
| UNIT | Unidade | 1 ovo |
| DOZEN | Dúzia | 12 ovos |
| FAVO | Favo | — |
| BOX | Caixa | — |
| SACK | Saco | — |
| OTHER | Outro | "Fardo" (nome livre) |

### Cálculo de stock
```
total_base_quantity = quantity × unit.multiplier
amount              = quantity × unit.price
stock após compra   = stock_quantity - total_base_quantity
```

**Exemplo:** Produto Ovos, base_unit=UNIT, stock=1000
- Compra de 2 Dúzias: deduz 24 unidades, cobra 220 MZN

---

## 9. COMPONENTES REUTILIZÁVEIS

| Componente | Descrição |
|---|---|
| `DesktopSidebar` | Navegação lateral para desktop com itens filtrados por role |
| `MobileNav` | Barra de navegação inferior para mobile |
| `ProtectedRoute` | Guarda de rotas com verificação de autenticação e role |
| `TransactionCard` | Card de transação com perspetiva diferente para comprador/vendedor |
| `PaymentModal` | Modal de pagamento com seleção de método e número de telefone |
| `CancelConfirmModal` | Modal de confirmação de cancelamento de transação |
| `StarRating` | Componente de avaliação por estrelas (readonly ou interativo) |
| `ChatMessage` | Mensagem individual do chat IA com suporte a Markdown |
| `ChatSidebar` | Sidebar com histórico de sessões do chat IA |
| `TypingIndicator` | Animação de "a escrever..." no chat IA |
| `ImageViewer` | Visualizador de imagem com zoom |
| `ImageEditor` | Editor básico de imagem |
| `NetworkErrorModal` | Modal de erro de rede + overlay de loading do servidor |
| `LoadingPlant` | Animação de loading temática (planta) |
| `Avatar` | Avatar de utilizador com iniciais ou foto |
| `AgroCard` | Card genérico para conteúdo agrícola |
| `RegionBadge` | Badge de localização/região |
| `CultureIcon` | Ícone de cultura agrícola |
| `Logo` | Componente do logo IAgroMOZ |
| `Comment` | Componente de comentário com suporte a respostas aninhadas |

---

## 10. ROTAS COMPLETAS DA APLICAÇÃO

| Rota | Componente | Auth | Roles permitidos |
|---|---|---|---|
| `/` | Feed | Não | Todos |
| `/feed` | Feed | Não | Todos |
| `/agricultores` | Feed | Não | Todos |
| `/login` | Login | Não | Todos |
| `/register` | Register | Não | Todos |
| `/register/normal` | RegisterNormal | Não | Todos |
| `/register/producer` | RegisterProducer | Não | Todos |
| `/register/seller` | RegisterSeller | Não | Todos |
| `/post/:id` | PostDetail | Não | Todos |
| `/chat` | ChatAI | Sim | Todos autenticados |
| `/marketplace` | Marketplace | Sim | Todos autenticados |
| `/product/:id` | ProductDetail | Sim | Todos autenticados |
| `/product/:productId/units` | ProductUnits | Sim | Todos autenticados |
| `/create-product` | CreateProduct | Sim | Todos autenticados |
| `/techniques` | Techniques | Sim | user, producer, admin |
| `/technique/:id` | TechniqueDetail | Sim | user, producer, admin |
| `/profile` | Profile | Sim | Todos autenticados |
| `/profile/:id` | Profile (público) | Não | Todos |
| `/notifications` | Notifications | Sim | Todos autenticados |
| `/create-post` | CreatePost | Sim | user, producer, admin |
| `/transactions` | Transactions | Sim | Todos autenticados |
| `/seller-dashboard` | SellerDashboard | Sim | seller, producer, admin |
| `/dashboard` | Dashboard | Sim | admin, seller, producer |

---

## 11. SERVIÇO DE API (api.js)

O ficheiro `react-app/src/services/api.js` é o ponto central de todas as chamadas à API.
Implementa a classe `APIService` com as seguintes funcionalidades:

### Autenticação automática
- Injeta `Authorization: Bearer <token>` em todos os pedidos autenticados
- Refresh preventivo do token 30 segundos antes de expirar
- Retry automático após refresh bem-sucedido
- Limpeza da sessão em caso de 401 irrecuperável

### Métodos disponíveis

**Auth**
- `login(email, password)` — autentica e guarda tokens + perfil
- `logout()` — invalida refresh token e limpa localStorage
- `refreshToken()` — renova access token

**Perfil**
- `getUserProfile()` — GET /users/me/ — guarda role, nome, foto no localStorage
- `updateUserProfile(data)` — PATCH /users/me/update/
- `getUserPublicProfile(id)` — GET /users/{id}/public-profile/
- `getFullProfile()` — GET /users/me/full-profile/
- `getSellerProfile()` — GET /users/me/seller-profile/
- `updateSellerProfile(data)` — PATCH /users/me/seller-profile/update/
- `getProducerProfile()` — GET /users/me/producer-profile/
- `updateProducerProfile(data)` — PATCH /users/me/producer-profile/update/
- `changePassword(old, new)` — POST /users/change-password/
- `checkPublishPermission()` — verifica se pode publicar produtos

**Registo**
- `registerNormal(data)` — POST /users/register/normal/
- `registerProducer(data)` — POST /users/register/producer/
- `registerSeller(data)` — POST /users/register/seller/

**Upgrade**
- `requestUpgradeToProducer(contact, farmAddress)` — POST /users/upgrade-to-producer/
- `getUpgradeStatus()` — GET /users/upgrade-to-producer/status/

**Localização**
- `getProvinces()` — GET /provinces/
- `getDistricts(provinceId)` — GET /districts/?id=

**Marketplace — Produtos**
- `getProducts(params)` — GET /marketplace/products/
- `getProduct(id)` — GET /marketplace/products/{id}/
- `createProduct(data)` — POST /marketplace/products/
- `updateProduct(id, data)` — PATCH /marketplace/products/{id}/
- `deleteProduct(id)` — DELETE /marketplace/products/{id}/
- `getProductCategories()` — GET /marketplace/products/categories/
- `buyProduct(id, unitId, quantity)` — POST /marketplace/products/{id}/buy/

**Marketplace — Unidades**
- `getSaleUnitChoices()` — GET /marketplace/product-units/sale_unit_choices/
- `getMyProductUnits()` — GET /marketplace/product-units/
- `createProductUnit(data)` — POST /marketplace/product-units/
- `updateProductUnit(id, data)` — PATCH /marketplace/product-units/{id}/
- `deleteProductUnit(id)` — DELETE /marketplace/product-units/{id}/

**Marketplace — Transações**
- `getTransactions()` — GET /marketplace/transactions/
- `confirmTransaction(id)` — POST /marketplace/transactions/{id}/confirm/
- `cancelTransaction(id)` — POST /marketplace/transactions/{id}/cancel/
- `concludeTransaction(id)` — POST /marketplace/transactions/{id}/conclude/

**Pagamentos**
- `initiatePayment(txId, method, provider, phone)` — POST /payments/initiate/
- `getPayments()` — GET /payments/
- `verifyPayment(uuid)` — POST /payments/{uuid}/verify/

**Avaliações**
- `rateProduct(productId, score, comment)` — POST /marketplace/ratings/{id}/rate_product/
- `rateVendedor(sellerId, score, comment)` — POST /marketplace/ratings/{id}/rate_seller/

**Feed**
- `getFeedPosts(params)` — GET /feed/posts/
- `getFeedPost(id)` — GET /feed/posts/{id}/
- `createFeedPost(data)` — POST /feed/posts/
- `updateFeedPost(id, data)` — PATCH /feed/posts/{id}/
- `deleteFeedPost(id)` — DELETE /feed/posts/{id}/
- `likeFeedPost(postId)` — POST /feed/posts/{id}/like/
- `getFeedComments(postId)` — GET /feed/comments/?post=
- `createFeedComment(postId, message, parentId)` — POST /feed/comments/

**Técnicas**
- `getTechniques()` — GET /techniques/
- `getTechnique(id)` — GET /techniques/{id}/
- `createTechnique(data)` — POST /techniques/
- `voteTechnique(id, vote)` — POST /techniques/{id}/vote/

**Chat IA**
- `getChatSessions()` — GET /chat/sessions/
- `createChatSession(title)` — POST /chat/sessions/
- `getChatMessages(sessionId)` — GET /chat/messages/?session_id=
- `sendChatMessage(message, sessionId, photo)` — POST /chat/messages/

**Notificações**
- `getNotifications()` — GET /notifications/
- `markNotificationRead(id)` — POST /notifications/{id}/read/

**Dashboards**
- `getSellerDashboard()` — GET /seller-dashboard/
- `getAdminDashboard()` — GET /admin-dashboard/
- `getAdminUsers(params)` — GET /admin-dashboard/users/
- `getAdminProducts(params)` — GET /admin-dashboard/products/
- `getAdminTransactions(params)` — GET /admin-dashboard/transactions/
- `getAdminMetrics(params)` — GET /admin-dashboard/metrics/
- `getAuditLogs(params)` — GET /audit-logs/
- `approveUpgrade(userId, decision)` — POST /users/{id}/approve-upgrade/

---

## 12. NAVEGAÇÃO POR ROLE

### Utilizador Normal (`user`)
**Sidebar desktop mostra:**
- Feed, Chat IA, Técnicas, Mercado, Notificações, Perfil

**Acesso permitido:**
- Feed, posts, comentários, likes
- Marketplace (só comprar)
- Chat IA
- Técnicas (ler e votar)
- Notificações, Perfil, Transações

**Não pode:**
- Criar produtos
- Aceder ao Painel do Vendedor
- Criar técnicas (apenas votar)

---

### Produtor (`producer`)
**Sidebar desktop mostra:**
- Feed, Chat IA, Técnicas, Mercado, Painel Vendedor, Notificações, Perfil

**Acesso permitido:**
- Tudo do utilizador normal
- Criar e gerir produtos
- Painel do Vendedor
- Criar técnicas agrícolas

---

### Vendedor (`seller`)
**Sidebar desktop mostra APENAS:**
- Painel Vendedor, Transações, Meu Perfil

**Sidebar mobile mostra APENAS:**
- Painel, Pedidos, Produtos, Perfil

**Acesso permitido:**
- Painel do Vendedor (`/seller-dashboard`)
- Transações (`/transactions`)
- Perfil (`/profile`, `/profile/:id`)
- Marketplace (`/marketplace`)
- Criar produto (`/create-product`)
- Detalhe de produto (`/product/:id`, `/product/:id/units`)

**Não pode:**
- Feed (posts e comentários)
- Chat IA
- Técnicas agrícolas
- Notificações (rota bloqueada)

**Redirecionamento:** Ao fazer login, vai sempre para `/seller-dashboard`.
Qualquer tentativa de aceder a rota não permitida redireciona para `/seller-dashboard`.

---

### Admin (`admin`)
**Acesso total à plataforma:**
- Todas as rotas
- Painel administrativo completo
- Gestão de utilizadores, produtos, posts, técnicas, transações
- Aprovação/rejeição de upgrades
- Audit logs
- Métricas e relatórios

---

## 13. SISTEMA DE NOTIFICAÇÕES AUTOMÁTICAS

A API envia notificações automáticas nos seguintes eventos:

| Evento | Quem recebe | Mensagem |
|---|---|---|
| Produto reservado (RESERVED) | Vendedor | "{comprador} quer comprar '{produto}'" |
| Reserva confirmada (AWAITING_PAYMENT) | Comprador | "'{produto}' foi confirmado. Proceda ao pagamento." |
| Pagamento recebido (PAID) | Vendedor | "Pagamento recebido de {comprador} para '{produto}'." |
| Pedido de upgrade submetido | Todos os admins | "User '{nome}' requested an upgrade to Producer." |
| Pedido aprovado/rejeitado | Utilizador | "Your upgrade request has been approved/rejected." |

As notificações são lidas via `GET /api/notifications/` e marcadas como lidas via
`POST /api/notifications/{id}/read/`.

---

## 14. CATEGORIAS DE PRODUTOS

### Agricultura
- Citrinos, Tubérculos, Frutas, Cereais, Leguminosas, Hortícolas, Outro

### Pecuária
- Aves, Ovos, Suínos, Peixe, Bovinos, Caprinos, Ovinos, Apicultura, Outro

---

## 15. LOCALIZAÇÃO

A plataforma usa um sistema de localização hierárquico:
- **Províncias** — 11 províncias de Moçambique
- **Distritos** — derivados automaticamente da província selecionada

Endpoints públicos (sem autenticação):
- `GET /api/provinces/` — lista todas as províncias
- `GET /api/districts/?id={province_id}` — lista distritos de uma província

---

## 16. IDENTIDADE VISUAL

### Cores principais
- **Verde primário:** `#006D3F` / `#00A846` — cor da marca, botões principais
- **Verde escuro:** `#003D20` — gradientes, headers
- **Verde claro:** `#F8FAF8` — fundo das páginas
- **Branco:** `#FFFFFF` — cards, modais

### Classes CSS personalizadas (index.css)
- `.btn-primary` — botão verde principal com gradiente
- `.form-input` — campo de formulário estilizado
- `.avatar-gradient` — gradiente para avatares sem foto
- `.hero-overlay` — overlay para imagens de fundo
- `.region-badge` — badge de localização
- `.loading-plant` — animação de loading temática

### Tipografia
- Font-weight black (900) para títulos e valores importantes
- Font-weight semibold para labels e subtítulos
- Tamanhos: text-xs (10-12px), text-sm (14px), text-base (16px), text-xl/2xl para títulos

### Ícones
Bootstrap Icons 1.11 — prefixo `bi bi-*`

### Logo
`/public/logo.png` — logo circular da IAgroMOZ

---

## 17. GESTÃO DE ERROS

### NetworkErrorModal
Quando o servidor está inacessível (Failed to fetch), aparece um modal informando o utilizador
que o servidor pode estar a iniciar após inatividade (Render free tier) e pede para aguardar 30s.

### ErrorBoundary
Componente React que captura erros de renderização e mostra uma tela de erro amigável
com botão de recarregar.

### Tratamento de 401
- Token expirado → refresh automático → retry do pedido original
- Refresh inválido → limpa sessão → redireciona para login

### Overlay de loading do servidor
No primeiro pedido da sessão, aparece um overlay enquanto o servidor responde
(útil para servidores em cold start como Render free tier).

---

## 18. CONFIGURAÇÃO DO SERVIDOR

Para mudar o servidor da API, editar **apenas** o ficheiro:
```
react-app/src/config/api.js
```

```javascript
export const API_URL = 'http://SEU_SERVIDOR:PORTA';
export const API_BASE = `${API_URL}/api`;
export const API_MEDIA = API_URL;
```

Configuração atual: `http://192.168.0.111:8000` (rede local)

---

## 19. COMO INICIAR O PROJETO

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Backend Django a correr (ver documentação do backend)

### Instalar dependências
```bash
cd react-app
npm install
```

### Iniciar em desenvolvimento
```bash
npm run dev
```
A aplicação fica disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
```
Os ficheiros ficam em `react-app/dist/`

### Executar testes
```bash
npm run test
```

---

## 20. ACESSO EM REDE LOCAL

Para aceder à plataforma a partir de outros dispositivos na mesma rede Wi-Fi:

1. Descobrir o IP da máquina onde corre o servidor:
   - Windows: `ipconfig` → IPv4 Address
   - Linux/Mac: `ifconfig` ou `ip addr`

2. Atualizar `react-app/src/config/api.js` com o IP correto

3. Iniciar o Vite com host exposto:
```bash
npm run dev -- --host
```

4. Aceder de outro dispositivo: `http://IP_DA_MAQUINA:5173`

---

## 21. AUDIT TRAIL (REGISTO DE AUDITORIA)

A plataforma regista automaticamente todas as operações importantes:

**Modelos auditados automaticamente:**
Product, Post, Comment, Technique, Transaction, Rating, UpgradeRequest,
User, Province, District, SellerProfile, ProducerProfile, Notification,
ChatSession, ChatMessage, TechniqueVote

**Eventos de autenticação:**
- LOGIN, LOGIN_FAILED → via `/api/token/`
- LOGOUT → via `/api/users/logout/`

**Cada registo contém:**
- user_email, action, resource, resource_id
- status (SUCCESS/FAILED)
- before/after (estado antes e depois da alteração)
- ip_address, user_agent, source, request_id, timestamp

Acessível via `GET /api/audit-logs/` (apenas admins).

---

## 22. PERMISSÕES DETALHADAS POR ROLE

### ADMIN
- ✅ Deletar qualquer conteúdo (posts, comentários, produtos, técnicas)
- ✅ Acesso total ao dashboard, métricas e audit logs
- ✅ Aprovar/rejeitar pedidos de upgrade
- ✅ Desativar/eliminar utilizadores (exceto outros admins)
- ❌ Editar conteúdo de outros utilizadores
- ❌ Editar dados de outras contas

### PRODUCER / SELLER (can_sell = true)
- ✅ Criar e gerir os seus próprios produtos
- ✅ Ver transações dos seus produtos
- ✅ Aceder ao Painel do Vendedor

### NORMAL
- ✅ Criar posts e comentários
- ✅ Comprar produtos
- ✅ Pedir upgrade para PRODUCER (aguarda aprovação)
- ❌ Criar produtos
- ❌ Aceder ao Painel do Vendedor

### TODOS
- ✅ Editar apenas o próprio perfil
- ✅ Editar os próprios posts/comentários (dentro de 10 minutos)
- ✅ Ver apenas as suas próprias notificações

---

## 23. FLUXO DE TÉCNICAS AGRÍCOLAS

1. Utilizador (user/producer/admin) submete técnica via `POST /api/techniques/`
2. Técnica fica com status `PENDING`
3. Outros utilizadores votam: APPROVE ou REJECT via `POST /api/techniques/{id}/vote/`
4. Com 100+ votos:
   - ≥ 80% aprovação → status muda para `VALIDATED`
   - ≥ 20% rejeição → status muda para `DISCARDED`
5. Admin pode forçar validação ou descarte a qualquer momento

---

## 24. CHAT COM IA — FUNCIONAMENTO

- Assistente especializado em agricultura moçambicana
- Cada conversa é uma **sessão** com título automático (primeiras 6 palavras)
- Suporta envio de **fotos** para análise (doenças de plantas, identificação de culturas)
- Respostas em **Markdown** com formatação rica
- Histórico persistente por sessão
- Sessão criada automaticamente se não existir
- Acessível sem login (sessões anónimas suportadas pela API)

---

## 25. LOCALSTORAGE — DADOS GUARDADOS

| Chave | Tipo | Descrição |
|---|---|---|
| `access_token` | string | JWT de acesso (curta duração) |
| `refresh_token` | string | JWT de refresh (longa duração) |
| `userRole` | string | Role do utilizador: user/seller/producer/admin |
| `userId` | string | ID numérico do utilizador |
| `userName` | string | Nome completo do utilizador |
| `userFoto` | string | URL da foto de perfil |
| `myProductIds` | JSON array | IDs de produtos criados pelo utilizador (cache local) |
| `app_notifications_{userId}` | JSON array | Notificações locais (aprovação de role, etc.) |

---

## 26. TRATAMENTO DE ERROS DA API

### Códigos HTTP
| Código | Significado |
|---|---|
| 200 | Sucesso |
| 201 | Recurso criado |
| 204 | Eliminado com sucesso |
| 400 | Dados inválidos ou regra de negócio violada |
| 401 | Token ausente ou inválido |
| 403 | Sem permissão |
| 404 | Recurso não encontrado |

### Erros comuns e como são tratados no frontend
- **401** → refresh automático → retry → se falhar, limpa sessão
- **403** → mensagem de "sem permissão" ou redirecionamento
- **400 "produto já do próprio utilizador"** → mensagem clara no botão de reserva
- **400 "stock insuficiente"** → mensagem de erro no formulário de compra
- **Falha de rede** → NetworkErrorModal com instrução de aguardar

---

## 27. TEMAS (DARK/LIGHT MODE)

A plataforma suporta tema claro e escuro via `ThemeContext`.
O contexto está disponível em `react-app/src/context/ThemeContext.jsx`.
O tema é aplicado globalmente e persistido entre sessões.

---

## 28. RESUMO DAS FUNCIONALIDADES IMPLEMENTADAS

| Funcionalidade | Estado |
|---|---|
| Autenticação JWT com refresh automático | ✅ Implementado |
| Registo por tipo (Normal, Produtor, Vendedor) | ✅ Implementado |
| Feed de posts com likes e comentários aninhados | ✅ Implementado |
| Marketplace com filtros e pesquisa | ✅ Implementado |
| Sistema de unidades de venda personalizadas | ✅ Implementado |
| Fluxo completo de compra/venda/pagamento | ✅ Implementado |
| Painel do Vendedor com métricas | ✅ Implementado |
| Chat com IA agrícola (com fotos) | ✅ Implementado |
| Técnicas agrícolas com votação | ✅ Implementado |
| Notificações automáticas | ✅ Implementado |
| Perfil com edição e foto | ✅ Implementado |
| Controlo de acesso por role (RBAC) | ✅ Implementado |
| Seller restrito ao seu painel | ✅ Implementado |
| Redirecionamento pós-login por role | ✅ Implementado |
| Painel administrativo | ✅ Implementado |
| Audit trail | ✅ Implementado |
| Avaliações de produtos e vendedores | ✅ Implementado |
| Upgrade de Normal para Produtor | ✅ Implementado |
| Localização por província/distrito | ✅ Implementado |
| Modo dark/light | ✅ Implementado |
| Tratamento de erros de rede | ✅ Implementado |
| Design responsivo (mobile + desktop) | ✅ Implementado |
| Testes unitários (Vitest) | ✅ Configurado |

---

## 29. ENDPOINTS DA API — RESUMO

### Autenticação
- `POST /api/token/` — Login
- `POST /api/token/refresh/` — Refresh token
- `POST /api/users/logout/` — Logout

### Utilizadores
- `GET/PATCH /api/users/me/` — Perfil próprio
- `GET /api/users/{id}/public-profile/` — Perfil público
- `POST /api/users/register/normal|producer|seller/` — Registo
- `POST /api/users/upgrade-to-producer/` — Pedido de upgrade
- `GET /api/users/upgrade-to-producer/status/` — Estado do pedido

### Marketplace
- `GET/POST /api/marketplace/products/` — Produtos
- `GET/PATCH/DELETE /api/marketplace/products/{id}/` — Produto específico
- `POST /api/marketplace/products/{id}/buy/` — Reservar produto
- `GET/POST /api/marketplace/product-units/` — Unidades de venda
- `GET/POST /api/marketplace/transactions/` — Transações
- `POST /api/marketplace/transactions/{id}/confirm|cancel|conclude/` — Ações

### Pagamentos
- `POST /api/payments/initiate/` — Iniciar pagamento
- `GET /api/payments/` — Listar pagamentos
- `POST /api/payments/{uuid}/verify/` — Verificar estado

### Feed
- `GET/POST /api/feed/posts/` — Posts
- `POST /api/feed/posts/{id}/like/` — Like/unlike
- `GET/POST /api/feed/comments/` — Comentários

### Técnicas
- `GET/POST /api/techniques/` — Técnicas
- `POST /api/techniques/{id}/vote/` — Votar

### Chat IA
- `GET/POST /api/chat/sessions/` — Sessões
- `GET/POST /api/chat/messages/` — Mensagens

### Dashboards
- `GET /api/seller-dashboard/` — Painel vendedor
- `GET /api/admin-dashboard/` — Painel admin
- `GET /api/audit-logs/` — Audit trail

### Localização
- `GET /api/provinces/` — Províncias
- `GET /api/districts/` — Distritos

---

*Documentação gerada em Maio 2026 — IAgroMOZ v1.0*
