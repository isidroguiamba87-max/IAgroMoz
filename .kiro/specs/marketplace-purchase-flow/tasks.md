# Implementation Plan: marketplace-purchase-flow

## Overview

Implement the complete marketplace purchase flow: a "Buy Now" button in `ProductDetail.jsx`, a new `Transactions.jsx` page with `TransactionCard.jsx` and `CancelConfirmModal.jsx` components, API service methods, navigation updates in `DesktopSidebar.jsx` and `MobileNav.jsx`, and a new protected route in `App.jsx`.

## Tasks

- [ ] 1. Add transaction API methods to `services/api.js` and set up Vitest + fast-check
  - Verify that `buyProduct`, `getTransactions`, `confirmTransaction`, `concludeTransaction`, and `cancelTransaction` methods already exist in `react-app/src/services/api.js` (they do — confirm no changes needed)
  - Install `fast-check` as a dev dependency if not already present: `npm install --save-dev fast-check`
  - Create `react-app/src/tests/` directory and add a `setup.js` (or confirm Vitest config) so tests can import React components with jsdom
  - _Requirements: 1.2, 2.2, 3.3, 3.4, 3.6, 4.3_

- [x] 2. Create `CancelConfirmModal.jsx` component
  - [x] 2.1 Implement `CancelConfirmModal.jsx` in `react-app/src/components/`
    - Accept props: `transaction`, `loading`, `onConfirm`, `onClose`
    - Render `fixed inset-0 bg-black/50` overlay with centered card (`rounded-2xl`)
    - Show product name from `transaction.product?.name` in the modal body
    - Render "Cancelar" (calls `onClose`) and "Confirmar cancelamento" (calls `onConfirm`) buttons
    - Disable both buttons and show spinner text while `loading` is true
    - Return `null` when `transaction` is `null`
    - _Requirements: 3.5, 4.2_

  - [ ] 2.2 Write property test for CancelConfirmModal
    - **Property 9: Modal de cancelamento aparece antes da chamada à API**
    - For any cancelable transaction (RESERVED for buyer; RESERVED or AWAITING_PAYMENT for seller), clicking "Cancelar" must render `CancelConfirmModal` without calling `api.cancelTransaction`
    - Use `arbTransaction` generator with status filtered to cancelable statuses
    - **Validates: Requirements 3.5, 4.2**

- [x] 3. Create `TransactionCard.jsx` component
  - [x] 3.1 Implement `TransactionCard.jsx` in `react-app/src/components/`
    - Accept props: `transaction`, `isBuyer`, `isSeller`, `isLoading`, `onConfirm`, `onConclude`, `onCancelRequest`
    - Define `STATUS_CONFIG` map with label and Tailwind color classes: RESERVED → `bg-yellow-100 text-yellow-800`, AWAITING_PAYMENT → `bg-blue-100 text-blue-800`, COMPLETED → `bg-green-100 text-green-800`, CANCELLED → `bg-red-100 text-red-800`
    - Render status badge using `STATUS_CONFIG[transaction.status]`
    - Display: product name, total price, buyer/seller name (show buyer name when `isSeller`, seller name when `isBuyer`), formatted `created_at` date
    - Render action buttons per the visibility table: Seller+RESERVED → Confirmar+Cancelar; Seller+AWAITING_PAYMENT → Concluir+Cancelar; Buyer+RESERVED → Cancelar; all other combinations → no action buttons
    - Disable all action buttons and show loading indicator when `isLoading` is true
    - _Requirements: 2.6, 2.7, 3.1, 3.2, 3.8, 4.1, 4.4_

  - [ ] 3.2 Write property test for status badge color
    - **Property 6: Badge de status tem cor correta**
    - For any transaction with status in `{RESERVED, AWAITING_PAYMENT, COMPLETED, CANCELLED}`, the rendered `TransactionCard` must contain an element with the correct color class
    - Use `arbStatus` generator (`fc.constantFrom(...)`)
    - **Validates: Requirements 2.7**

  - [ ] 3.3 Write property test for action button visibility
    - **Property 8: Botões de ação corretos por papel e status**
    - For any combination of (user role, transaction status), the rendered buttons must match the visibility table exactly
    - Use `arbTransaction` generator combined with `isBuyer`/`isSeller` boolean arbitraries
    - **Validates: Requirements 3.1, 3.2, 4.1, 4.4**

- [ ] 4. Modify `ProductDetail.jsx` to implement the buy button logic
  - [x] 4.1 Add buy state variables and `handleBuy` handler to `ProductDetail.jsx`
    - Add `useState` declarations: `buyLoading`, `buyError`, `buySuccess`
    - Implement `handleBuy`: check `token` (redirect to `/login` if missing), call `api.buyProduct(id)`, set `buySuccess(true)` on success, extract and set error message on failure using the `err?.data` pattern already used in the file
    - _Requirements: 1.2, 1.5, 1.6, 1.7_

  - [ ] 4.2 Replace the static "Comprar Agora" button with conditional buy UI
    - If `isOwner(product)` → render nothing (hide button entirely)
    - If `buySuccess` → render green success banner + "Ver as minhas transações" button that navigates to `/transactions`
    - Otherwise → render "Comprar Agora" button: disabled and showing spinner text when `buyLoading` is true
    - If `buyError` is non-empty → render red error banner inline above the button
    - _Requirements: 1.1, 1.3, 1.4, 1.6, 1.8, 5.4_

  - [ ] 4.3 Write property test for buy API call
    - **Property 1: Compra chama API com ID correto**
    - For any valid product ID, clicking "Comprar Agora" must call `api.buyProduct` exactly once with that product ID
    - Use `arbProductId` generator (`fc.integer({ min: 1, max: 99999 })`)
    - **Validates: Requirements 1.2**

  - [ ] 4.4 Write property test for post-purchase success state
    - **Property 2: Estado pós-compra bem-sucedida**
    - For any success response from `api.buyProduct`, `ProductDetail` must render a confirmation message AND a navigation button to `/transactions`
    - Use `arbTransaction` generator for the mocked API response
    - **Validates: Requirements 1.3, 1.4, 5.4**

  - [ ] 4.5 Write property test for buy error display
    - **Property 3: Erro de compra exibe mensagem sem navegar**
    - For any error thrown by `api.buyProduct` (varying HTTP status, message, error object structure), the component must display a non-empty error message and must not navigate away
    - Use `arbApiError` generator
    - **Validates: Requirements 1.5**

  - [ ] 4.6 Write property test for buy button hidden for seller
    - **Property 4: Botão de compra oculto para o vendedor do produto**
    - For any product where `product.seller?.id` matches the `userId` in `localStorage`, the "Comprar Agora" button must not be present in the rendered DOM
    - Use `arbTransaction` with `seller.id` set equal to the mocked `userId`
    - **Validates: Requirements 1.8**

- [ ] 5. Create `Transactions.jsx` page
  - [ ] 5.1 Implement `Transactions.jsx` in `react-app/src/pages/`
    - Add state: `transactions`, `loading`, `error`, `actionLoading`, `actionError`, `cancelTarget`
    - Read `userId` and `userRole` from `localStorage`; derive `isSeller` flag
    - Implement `loadTransactions`: call `api.getTransactions()`, normalize each transaction with `normTx()`, set state; handle loading/error states
    - Call `loadTransactions` in `useEffect` on mount
    - Implement `handleConfirm(txId)`: call `api.confirmTransaction(txId)`, update local state to AWAITING_PAYMENT on success, set `actionError` on failure
    - Implement `handleConclude(txId)`: call `api.concludeTransaction(txId)`, update local state to COMPLETED on success, set `actionError` on failure
    - Implement `handleCancelRequest(tx)`: set `cancelTarget` to open modal (no API call yet)
    - Implement `handleCancelConfirm()`: call `api.cancelTransaction(cancelTarget.id)`, update local state to CANCELLED on success, close modal; set `actionError` on failure
    - All action handlers must set `actionLoading` to the transaction ID while in progress and back to `null` when done
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 4.2, 4.3, 4.5_

  - [ ] 5.2 Implement the layout and render logic of `Transactions.jsx`
    - Wrap in `<div className="min-h-screen bg-[#F8FAF8] flex pb-20 lg:pb-0">` with `<DesktopSidebar />` and `<MobileNav />`
    - Render page header with title "Transações"
    - Render `actionError` banner when non-empty (dismissible)
    - Render loading spinner when `loading` is true
    - Render error banner + "Tentar novamente" button (calls `loadTransactions`) when `error` is non-empty
    - Render empty state message when `transactions` is an empty array
    - Render list of `TransactionCard` components when transactions are loaded, passing correct `isBuyer`/`isSeller` derived from comparing `transaction.buyer?.id` with `userId`
    - Render `CancelConfirmModal` when `cancelTarget` is non-null
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [ ] 5.3 Write property test for transactions list rendering
    - **Property 5: Transações carregadas são todas renderizadas**
    - For any array of transaction objects returned by `api.getTransactions()`, each transaction must be rendered as a `TransactionCard` — the count of rendered cards must equal the array length
    - Use `fc.array(arbTransaction)` generator
    - **Validates: Requirements 2.2, 2.6**

  - [ ] 5.4 Write property test for load error state
    - **Property 7: Erro no carregamento exibe mensagem e botão de retry**
    - For any error thrown by `api.getTransactions()`, `TransactionsPage` must display a non-empty error message and a clickable retry button
    - Use `arbApiError` generator
    - **Validates: Requirements 2.5**

  - [ ] 5.5 Write property test for correct state transitions
    - **Property 10: Transições de estado são corretas e locais**
    - For any transaction, after a successful management action, the local transaction state must transition to the expected status without page reload: confirm → AWAITING_PAYMENT, conclude → COMPLETED, cancel (confirmed) → CANCELLED
    - Use `arbTransaction` generator
    - **Validates: Requirements 3.3, 3.4, 3.6, 4.3**

  - [ ] 5.6 Write property test for failed action preserving state
    - **Property 11: Falha de ação não altera estado visual**
    - For any transaction and any error thrown by a management action (confirm, conclude, cancel), the transaction status in component state must remain unchanged and an error message must be displayed
    - Use `arbTransaction` × `arbApiError` generators
    - **Validates: Requirements 3.7, 4.5**

- [ ] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Add `/transactions` route to `App.jsx` and update navigation
  - [ ] 7.1 Add the `/transactions` protected route to `App.jsx`
    - Import `Transactions` from `./pages/Transactions`
    - Add `<Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />` after the `/notifications` route
    - _Requirements: 2.1, 5.1, 5.3_

  - [ ] 7.2 Add "Transações" item to `DesktopSidebar.jsx`
    - In the `mainItems` array, add after the Mercado entry: `{ path: '/transactions', icon: 'bi-receipt', label: 'Transações', roles: ['user', 'seller', 'producer', 'admin'] }`
    - _Requirements: 2.8, 5.1, 5.2_

  - [ ] 7.3 Add "Transações" item to `MobileNav.jsx`
    - In `defaultNavItems`, add: `{ path: '/transactions', icon: 'bi-receipt', label: 'Transações', roles: ['user', 'admin', 'seller', 'producer'] }`
    - In `sellerNavItems`, replace the existing "Pedidos" entry (currently pointing to `/notifications`) with: `{ path: '/transactions', icon: 'bi-receipt', label: 'Pedidos' }`
    - _Requirements: 2.8, 5.1, 5.2_

  - [ ] 7.4 Write integration tests for routing and navigation
    - Verify that the `/transactions` route exists in `App.jsx` and is wrapped by `ProtectedRoute`
    - Verify that `DesktopSidebar` renders a link to `/transactions`
    - Verify that `MobileNav` renders a link to `/transactions`
    - Verify that an unauthenticated user visiting `/transactions` is redirected to `/login`
    - _Requirements: 2.1, 2.8, 5.1, 5.2, 5.3_

- [ ] 8. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The design uses JavaScript/JSX (React + Vite + Tailwind CSS) — all code must follow the existing patterns in the project
- `api.buyProduct`, `api.getTransactions`, `api.confirmTransaction`, `api.concludeTransaction`, and `api.cancelTransaction` already exist in `services/api.js` — no changes needed there
- Property tests use **fast-check** with a minimum of 100 iterations per property
- Each property test file must include the traceability comment: `// Feature: marketplace-purchase-flow, Property N: <property text>`
- The `normTx` normalization function must be applied to all transactions returned by `api.getTransactions()` before storing in state
- `isOwner(product)` already exists in `ProductDetail.jsx` and handles seller detection — reuse it directly for hiding the buy button

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "3.1"] },
    { "id": 1, "tasks": ["2.2", "3.2", "3.3", "4.1"] },
    { "id": 2, "tasks": ["4.2", "5.1"] },
    { "id": 3, "tasks": ["4.3", "4.4", "4.5", "4.6", "5.2"] },
    { "id": 4, "tasks": ["5.3", "5.4", "5.5", "5.6", "7.1", "7.2", "7.3"] },
    { "id": 5, "tasks": ["7.4"] }
  ]
}
```
