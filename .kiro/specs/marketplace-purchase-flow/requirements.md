# Requirements Document

## Introduction

Esta funcionalidade implementa o fluxo completo de compra no marketplace da aplicação iagromoz. O objetivo é permitir que compradores iniciem transações a partir da página de detalhe de produto, e que compradores e vendedores possam gerir o ciclo de vida das transações (reserva → confirmação → conclusão / cancelamento) através de uma página dedicada de transações no frontend React.

O fluxo baseia-se nos endpoints existentes da API Django REST:
- `POST /api/marketplace/products/{id}/buy/` — cria transação com status `RESERVED`
- `POST /api/marketplace/transactions/{id}/confirm/` — vendedor confirma → `AWAITING_PAYMENT`
- `POST /api/marketplace/transactions/{id}/conclude/` — vendedor conclui → `COMPLETED`
- `POST /api/marketplace/transactions/{id}/cancel/` — vendedor ou comprador cancela → `CANCELLED`
- `GET /api/marketplace/transactions/` — lista transações do utilizador autenticado

---

## Glossary

- **Comprador**: Utilizador autenticado que inicia uma compra clicando em "Comprar Agora" na página de detalhe de produto.
- **Vendedor**: Utilizador com role `PRODUCER` ou `SELLER` que publicou o produto.
- **Transação**: Registo criado pela API que representa um acordo de compra entre Comprador e Vendedor para um determinado produto.
- **PurchaseFlow**: O sistema frontend React responsável por gerir o fluxo de compra, incluindo o botão de compra e a página de transações.
- **TransactionsPage**: Página React dedicada (`/transactions`) que lista e permite gerir as transações do utilizador autenticado.
- **BuyButton**: Componente de botão "Comprar Agora" presente na página `ProductDetail`.
- **TransactionCard**: Componente visual que representa uma transação individual na `TransactionsPage`.
- **Status_RESERVED**: Estado inicial de uma transação após o Comprador clicar em "Comprar Agora".
- **Status_AWAITING_PAYMENT**: Estado após o Vendedor confirmar a transação.
- **Status_COMPLETED**: Estado final após o Vendedor concluir a transação.
- **Status_CANCELLED**: Estado final após cancelamento por Comprador ou Vendedor.
- **API**: Serviço Django REST disponível em `react-app/src/services/api.js`.

---

## Requirements

### Requirement 1: Botão de Compra no Detalhe do Produto

**User Story:** Como Comprador autenticado, quero clicar em "Comprar Agora" na página de detalhe de produto, para que possa iniciar uma transação de compra sem sair da página.

#### Acceptance Criteria

1. WHEN o Comprador autenticado visita a página de detalhe de produto, THE PurchaseFlow SHALL exibir o botão "Comprar Agora" com estado ativo e clicável.
2. WHEN o Comprador clica em "Comprar Agora", THE PurchaseFlow SHALL chamar `POST /api/marketplace/products/{id}/buy/` com o `id` do produto atual.
3. WHEN a API retorna sucesso com a transação criada em `Status_RESERVED`, THE PurchaseFlow SHALL exibir uma mensagem de confirmação indicando que a reserva foi criada com sucesso.
4. WHEN a API retorna sucesso, THE PurchaseFlow SHALL exibir um botão de navegação para a `TransactionsPage`.
5. IF qualquer condição de erro ocorrer durante o processo de compra (resposta de erro da API, produto indisponível, utilizador já tem transação ativa para o produto, ou erro de rede), THEN THE PurchaseFlow SHALL exibir uma mensagem de erro descritiva ao Comprador sem recarregar a página.
6. WHILE o pedido de compra está em curso, THE PurchaseFlow SHALL desativar o botão "Comprar Agora" e exibir um indicador de carregamento.
7. WHEN o utilizador não está autenticado e clica em "Comprar Agora", THE PurchaseFlow SHALL redirecionar o utilizador para a página `/login`.
8. WHEN o Vendedor do produto visita a página de detalhe do seu próprio produto, THE PurchaseFlow SHALL ocultar o botão "Comprar Agora" para esse produto.

---

### Requirement 2: Página de Transações

**User Story:** Como utilizador autenticado (Comprador ou Vendedor), quero aceder a uma página dedicada de transações, para que possa ver todas as minhas transações e o seu estado atual.

#### Acceptance Criteria

1. THE PurchaseFlow SHALL disponibilizar a rota `/transactions` na aplicação React, acessível apenas a utilizadores autenticados.
2. WHEN o utilizador acede a `/transactions`, THE TransactionsPage SHALL chamar `GET /api/marketplace/transactions/` e exibir a lista de transações retornadas.
3. WHEN a lista de transações está a ser carregada, THE TransactionsPage SHALL exibir um indicador de carregamento.
4. WHEN a lista de transações está vazia, THE TransactionsPage SHALL exibir uma mensagem informativa indicando que não existem transações.
5. IF a chamada a `GET /api/marketplace/transactions/` falhar, THEN THE TransactionsPage SHALL exibir uma mensagem de erro e um botão para tentar novamente.
6. WHEN a lista de transações é carregada com sucesso, THE TransactionsPage SHALL exibir cada transação num `TransactionCard` com: nome do produto, preço, nome do Comprador (para o Vendedor) ou nome do Vendedor (para o Comprador), data de criação e estado atual da transação.
7. THE TransactionsPage SHALL exibir o estado de cada transação com uma etiqueta visual diferenciada por cor: `Status_RESERVED` em amarelo, `Status_AWAITING_PAYMENT` em azul, `Status_COMPLETED` em verde, `Status_CANCELLED` em vermelho. As definições de cor das etiquetas aplicam-se independentemente do estado de carregamento da lista.
8. THE TransactionsPage SHALL ser acessível a partir da navegação principal da aplicação (sidebar desktop e navegação mobile).

---

### Requirement 3: Ações de Gestão de Transações pelo Vendedor

**User Story:** Como Vendedor, quero poder confirmar, concluir ou cancelar transações na página de transações, para que possa gerir o ciclo de vida das vendas dos meus produtos.

#### Acceptance Criteria

1. WHEN o Vendedor visualiza um `TransactionCard` com estado `Status_RESERVED`, THE TransactionsPage SHALL exibir os botões "Confirmar" e "Cancelar" nesse cartão.
2. WHEN o Vendedor visualiza um `TransactionCard` com estado `Status_AWAITING_PAYMENT`, THE TransactionsPage SHALL exibir os botões "Concluir" e "Cancelar" nesse cartão.
3. WHEN o Vendedor clica em "Confirmar" numa transação em `Status_RESERVED`, THE TransactionsPage SHALL chamar `POST /api/marketplace/transactions/{id}/confirm/` e atualizar o estado do `TransactionCard` para `Status_AWAITING_PAYMENT` sem recarregar a página.
4. WHEN o Vendedor clica em "Concluir" numa transação em `Status_AWAITING_PAYMENT`, THE TransactionsPage SHALL chamar `POST /api/marketplace/transactions/{id}/conclude/` e atualizar o estado do `TransactionCard` para `Status_COMPLETED` sem recarregar a página.
5. WHEN o Vendedor clica em "Cancelar" numa transação em `Status_RESERVED` ou `Status_AWAITING_PAYMENT`, THE TransactionsPage SHALL exibir um modal de confirmação antes de executar o cancelamento.
6. WHEN o Vendedor confirma o cancelamento no modal, THE TransactionsPage SHALL chamar `POST /api/marketplace/transactions/{id}/cancel/` e atualizar o estado do `TransactionCard` para `Status_CANCELLED`.
7. IF qualquer ação de gestão (confirmar, concluir, cancelar) falhar na API e o estado da transação não se alterar, THEN THE TransactionsPage SHALL exibir uma mensagem de erro descritiva sem alterar o estado visual da transação.
8. WHILE uma ação de gestão está em curso, THE TransactionsPage SHALL desativar os botões de ação do `TransactionCard` correspondente e exibir um indicador de carregamento.

---

### Requirement 4: Ação de Cancelamento pelo Comprador

**User Story:** Como Comprador, quero poder cancelar uma transação que ainda não foi confirmada pelo Vendedor, para que possa desistir de uma compra antes de ser processada.

#### Acceptance Criteria

1. WHEN o Comprador visualiza um `TransactionCard` com estado `Status_RESERVED`, THE TransactionsPage SHALL exibir o botão "Cancelar" nesse cartão.
2. WHEN o Comprador clica em "Cancelar" numa transação em `Status_RESERVED`, THE TransactionsPage SHALL exibir um modal de confirmação antes de executar o cancelamento.
3. WHEN o Comprador confirma o cancelamento no modal, THE TransactionsPage SHALL chamar `POST /api/marketplace/transactions/{id}/cancel/` e, apenas quando a API retornar sucesso, atualizar o estado do `TransactionCard` para `Status_CANCELLED`.
4. WHEN o Comprador visualiza um `TransactionCard` com estado `Status_AWAITING_PAYMENT` ou `Status_COMPLETED`, THE TransactionsPage SHALL não exibir o botão "Cancelar" para esse Comprador.
5. IF o cancelamento pelo Comprador falhar e o estado da transação não se alterar, THEN THE TransactionsPage SHALL exibir uma mensagem de erro descritiva sem alterar o estado visual da transação.

---

### Requirement 5: Navegação e Acesso à Página de Transações

**User Story:** Como utilizador autenticado, quero aceder facilmente à página de transações a partir da navegação principal, para que possa consultar as minhas compras e vendas sem dificuldade.

#### Acceptance Criteria

1. WHEN o utilizador autenticado está na aplicação, THE PurchaseFlow SHALL exibir um item de navegação "Transações" na `DesktopSidebar` e na `MobileNav`.
2. WHEN o utilizador clica no item de navegação "Transações", THE PurchaseFlow SHALL navegar para a rota `/transactions`.
3. THE PurchaseFlow SHALL proteger a rota `/transactions` com o componente `ProtectedRoute`, redirecionando utilizadores não autenticados para `/login`.
4. WHEN o utilizador completa uma compra com sucesso na página de detalhe de produto, THE PurchaseFlow SHALL exibir um botão "Ver as minhas transações" que navega para `/transactions`.
