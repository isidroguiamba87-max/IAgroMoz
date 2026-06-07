# Design Document — seller-role-access-control

## Overview

This feature adds role-based access control (RBAC) specifically for the `seller` role in the iAgromoz React application. The implementation is intentionally minimal: no new context providers, no new dependencies, and no changes to the existing auth infrastructure. All access control decisions continue to read `userRole` from `localStorage` as the single source of truth.

The three areas of change are:

1. **Post-login redirect** — `Login.jsx` reads `userRole` after `api.login()` resolves and routes sellers to `/seller-dashboard` instead of the `next` param or `/feed`.
2. **Route guard** — `ProtectedRoute.jsx` gains a seller-specific branch: if `userRole === 'seller'` and the current route is not in `SELLER_ALLOWED_ROUTES`, redirect to `/seller-dashboard`.
3. **Navigation filtering** — `DesktopSidebar.jsx` restricts the seller's visible items to three entries; `MobileNav.jsx` already handles this correctly via `sellerNavItems` and requires no change.

All other roles (`user`, `producer`, `admin`) are completely unaffected.

---

## Architecture

The feature follows the existing pattern: stateless, synchronous reads from `localStorage` at render time. No global state, no React context, no new hooks.

```
┌─────────────────────────────────────────────────────────────┐
│                        Login.jsx                            │
│  await api.login()  →  userRole in localStorage             │
│  if seller → navigate('/seller-dashboard')                  │
│  else      → navigate(nextPath)                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     ProtectedRoute.jsx                      │
│  1. No token → /login                                       │
│  2. adminOnly && role !== admin → /feed                     │
│  3. allowedRoles && role not in list → /feed                │
│  4. [NEW] role === seller &&                                │
│     path not in SELLER_ALLOWED_ROUTES → /seller-dashboard  │
│  5. Otherwise → render children                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              DesktopSidebar.jsx / MobileNav.jsx             │
│  Read userRole on mount                                     │
│  seller → restricted item set                               │
│  others → existing role-filtered items                      │
└─────────────────────────────────────────────────────────────┘
```

### Constant: SELLER_ALLOWED_ROUTES

A single exported constant acts as the single source of truth for which routes sellers may access. Both `ProtectedRoute` and any future components import from this file.

```
react-app/src/config/sellerRoutes.js
```

```js
export const SELLER_ALLOWED_ROUTES = [
  '/seller-dashboard',
  '/profile',
  '/transactions',
  '/marketplace',
  '/create-product',
]
// Dynamic routes matched by prefix:
// /profile/:id  → starts with '/profile'
// /product/:productId/units → starts with '/product/'
export const SELLER_ALLOWED_PREFIXES = [
  '/profile',
  '/product/',
]
```

Route matching uses exact match against `SELLER_ALLOWED_ROUTES` OR prefix match against `SELLER_ALLOWED_PREFIXES`, covering parameterised routes like `/profile/:id` and `/product/:productId/units`.

---

## Components and Interfaces

### `ProtectedRoute.jsx` — updated logic

```jsx
import { SELLER_ALLOWED_ROUTES, SELLER_ALLOWED_PREFIXES } from '../config/sellerRoutes'

function isSellerAllowed(pathname) {
  if (SELLER_ALLOWED_ROUTES.includes(pathname)) return true
  return SELLER_ALLOWED_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

function ProtectedRoute({ children, adminOnly = false, allowedRoles = null }) {
  const isAuthenticated = !!localStorage.getItem('access_token')
  const userRole = localStorage.getItem('userRole') || 'guest'
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />
  }
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/feed" replace />
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/feed" replace />
  }
  // NEW: seller-specific route restriction
  if (userRole === 'seller' && !isSellerAllowed(location.pathname)) {
    return <Navigate to="/seller-dashboard" replace />
  }
  return children
}
```

The new branch is appended after all existing checks, so `adminOnly` and `allowedRoles` behaviour for other roles is completely unchanged.

### `Login.jsx` — updated post-login redirect

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)
  try {
    await api.login(formData.email, formData.password)
    // api.login() calls getUserProfile() internally, so userRole is set
    const role = localStorage.getItem('userRole')
    if (role === 'seller') {
      navigate('/seller-dashboard', { replace: true })
    } else {
      navigate(nextPath, { replace: true })
    }
  } catch {
    setError('Email ou senha incorretos. Tente novamente.')
  } finally {
    setLoading(false)
  }
}
```

`api.login()` already calls `getUserProfile()` before returning, so `userRole` is synchronously available in `localStorage` at the point of the `navigate` call. No async race condition exists.

### `DesktopSidebar.jsx` — seller item set

The current sidebar uses two arrays (`mainItems`, `secondaryItems`) filtered by `filterByRole`. For sellers, many items from both arrays are currently visible (chat, marketplace, notifications, etc.) which violates Requirement 3.

**Design decision**: Rather than adding complex per-item role filtering, add a dedicated `sellerItems` array (mirroring the pattern already used in `MobileNav`) and short-circuit the render when `userRole === 'seller'`.

```jsx
const sellerItems = [
  { path: '/seller-dashboard', icon: 'bi-speedometer2', label: 'Painel Vendedor' },
  { path: '/transactions',     icon: 'bi-receipt',      label: 'Transações' },
  { path: '/profile',          icon: 'bi-person-fill',  label: 'Meu Perfil' },
]

// In render:
const visibleMainItems = userRole === 'seller' ? [] : filterByRole(mainItems)
const visibleSecondaryItems = userRole === 'seller' ? sellerItems : filterByRole(secondaryItems)
```

This keeps the change localised and easy to audit.

### `MobileNav.jsx` — no change required

The existing `sellerNavItems` array and `isSeller` branch already satisfy Requirement 3.2. No modification needed.

### `App.jsx` — no change required

The existing route definitions already have the correct `allowedRoles` for seller-relevant routes. The new `ProtectedRoute` seller branch handles the restriction without needing per-route changes.

---

## Data Models

No new data models. The feature relies entirely on the existing `localStorage` keys:

| Key             | Type   | Values                              | Owner          |
|-----------------|--------|-------------------------------------|----------------|
| `access_token`  | string | JWT string                          | `api.login()`  |
| `refresh_token` | string | JWT string                          | `api.login()`  |
| `userRole`      | string | `user`, `seller`, `producer`, `admin` | `getUserProfile()` |

**Normalisation**: `getUserProfile()` in `api.js` must store `userRole` in lowercase. If the API returns `SELLER` (uppercase), the storage call must normalise it: `localStorage.setItem('userRole', profile.role.toLowerCase())`. This should be verified in `api.js` — if not already normalised, a one-line fix is needed there.

**Logout**: The existing `localStorage.clear()` call in `DesktopSidebar` already clears all keys, satisfying Requirement 4.3.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Seller login always redirects to seller-dashboard

*For any* value of the `next` query parameter, when a user with `userRole === 'seller'` completes login, the post-login navigation target SHALL be `/seller-dashboard`.

**Validates: Requirements 1.1**

### Property 2: Non-seller login respects next param or defaults to feed

*For any* role in `['user', 'producer', 'admin']` and any `next` query parameter value (including absent), when the user completes login, the post-login navigation target SHALL be the `next` param if present and non-empty, otherwise `/feed`.

**Validates: Requirements 1.2**

### Property 3: Seller route access is exactly the allowed set

*For any* route pathname, when `userRole === 'seller'`, `ProtectedRoute` SHALL permit access (render children) if and only if the pathname is in `SELLER_ALLOWED_ROUTES` or starts with a prefix in `SELLER_ALLOWED_PREFIXES`; for all other pathnames it SHALL redirect to `/seller-dashboard`.

**Validates: Requirements 2.1, 2.2, 4.4**

### Property 4: Non-seller roles are unaffected by seller restrictions

*For any* role in `['user', 'producer', 'admin']` and any route pathname, `ProtectedRoute` SHALL NOT apply the seller allowed-routes check; the access decision SHALL be determined solely by the existing `adminOnly` and `allowedRoles` logic.

**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

### Property 5: Seller sidebar items are stable across navigations

*For any* sequence of route navigations within a session where `userRole` in `localStorage` remains `seller`, the set of items rendered by `DesktopSidebar` SHALL always be exactly `{/seller-dashboard, /transactions, /profile}` — no more, no fewer.

**Validates: Requirements 3.1, 3.3, 3.5**

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| `getUserProfile()` fails after login | `userRole` absent from localStorage; `Login.jsx` reads `null`, falls through to `nextPath` (which defaults to `/feed`). Seller is not redirected to dashboard but lands on feed — acceptable degraded state. |
| `userRole` missing from localStorage mid-session | `ProtectedRoute` reads `'guest'`; seller branch does not trigger (role is not `'seller'`); existing `allowedRoles` checks apply normally. |
| API returns role in uppercase (`SELLER`) | Must be normalised to lowercase in `api.js` before storage. If not normalised, the seller branch in `ProtectedRoute` and `Login.jsx` will not match. This is a pre-condition that must be verified. |
| Direct URL navigation to restricted route | `ProtectedRoute` intercepts on render and redirects to `/seller-dashboard`. The restricted component is never mounted. |
| Seller navigates back via browser history to a restricted route | React Router re-renders `ProtectedRoute` on every navigation; the redirect fires again. No bypass possible. |

---

## Testing Strategy

### Unit Tests (example-based)

These cover specific scenarios and edge cases:

- `ProtectedRoute` redirects unauthenticated users to `/login` (existing behaviour preserved)
- `ProtectedRoute` redirects `adminOnly` routes for non-admin users to `/feed` (existing behaviour preserved)
- `ProtectedRoute` renders children for a seller on each route in `SELLER_ALLOWED_ROUTES`
- `ProtectedRoute` redirects a seller to `/seller-dashboard` for a sample of restricted routes (`/feed`, `/chat`, `/techniques`)
- `Login.jsx` navigates to `/seller-dashboard` when `userRole` is `seller` after login
- `Login.jsx` navigates to `nextPath` when `userRole` is `user` after login
- `Login.jsx` navigates to `/feed` when `userRole` is absent after login
- `DesktopSidebar` renders exactly 3 items for `userRole === 'seller'`
- `DesktopSidebar` does not render Feed, Chat, Techniques, Notifications for `userRole === 'seller'`
- `getUserProfile()` stores `seller` (lowercase) when API returns `SELLER`
- Logout clears `access_token`, `refresh_token`, and `userRole` from localStorage

### Property-Based Tests

This feature is a good candidate for property-based testing because the core logic — `isSellerAllowed(pathname)` and the redirect decision in `Login.jsx` — are pure functions whose correctness must hold across all possible inputs (arbitrary route strings, arbitrary role values, arbitrary `next` param values).

**Library**: [fast-check](https://github.com/dubzzz/fast-check) (already compatible with Vitest/Jest, no new runtime dependency needed beyond dev).

**Minimum iterations**: 100 per property test.

**Tag format**: `// Feature: seller-role-access-control, Property N: <property text>`

#### Property Test 1 — Seller login always redirects to seller-dashboard

```
// Feature: seller-role-access-control, Property 1: seller login always redirects to /seller-dashboard
fc.assert(fc.property(
  fc.string(), // arbitrary next param
  (nextParam) => {
    // mock localStorage with userRole=seller
    // call the redirect-decision function with nextParam
    // assert result === '/seller-dashboard'
  }
), { numRuns: 100 })
```

#### Property Test 2 — Non-seller login respects next param

```
// Feature: seller-role-access-control, Property 2: non-seller login respects next param or defaults to /feed
fc.assert(fc.property(
  fc.constantFrom('user', 'producer', 'admin'),
  fc.option(fc.webPath()), // arbitrary next path or absent
  (role, nextParam) => {
    const expected = nextParam ?? '/feed'
    // assert redirect-decision(role, nextParam) === expected
  }
), { numRuns: 100 })
```

#### Property Test 3 — Seller route access is exactly the allowed set

```
// Feature: seller-role-access-control, Property 3: seller access iff route in allowed set
fc.assert(fc.property(
  fc.webPath(), // arbitrary pathname
  (pathname) => {
    const allowed = isSellerAllowed(pathname)
    const result = protectedRouteDecision('seller', pathname)
    if (allowed) {
      expect(result).toBe('render')
    } else {
      expect(result).toBe('/seller-dashboard')
    }
  }
), { numRuns: 100 })
```

#### Property Test 4 — Non-seller roles unaffected by seller restrictions

```
// Feature: seller-role-access-control, Property 4: non-seller roles not affected by seller logic
fc.assert(fc.property(
  fc.constantFrom('user', 'producer', 'admin'),
  fc.webPath(),
  (role, pathname) => {
    // seller branch should never fire for non-seller roles
    const result = sellerBranchDecision(role, pathname)
    expect(result).toBe('not-applied')
  }
), { numRuns: 100 })
```

#### Property Test 5 — Seller sidebar items stable across navigations

```
// Feature: seller-role-access-control, Property 5: seller sidebar items stable across navigations
fc.assert(fc.property(
  fc.array(fc.webPath(), { minLength: 1, maxLength: 20 }), // sequence of navigations
  (paths) => {
    // for each path, render DesktopSidebar with userRole=seller
    // assert rendered items are always exactly [/seller-dashboard, /transactions, /profile]
  }
), { numRuns: 100 })
```

### Integration Tests

- Full login flow with mocked API: seller user → lands on `/seller-dashboard`
- Full login flow with mocked API: `user` role with `?next=/feed` → lands on `/feed`
- Direct URL navigation to `/feed` as seller → redirected to `/seller-dashboard`
