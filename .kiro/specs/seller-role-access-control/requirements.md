# Requirements Document

## Introduction

This feature implements role-based access control (RBAC) for users with the **seller** (`seller`) role on the iAgromoz platform. The goal is to restrict seller access to only the areas relevant to their activity — Seller Dashboard, Profile, and Transactions — and ensure that upon login, the seller is automatically redirected to the Seller Dashboard. Users with other roles (`user`, `admin`, `producer`) are not affected by this feature.

The project is a React application with routing via React Router, JWT-based authentication stored in `localStorage`, and the user role stored under the `userRole` key in `localStorage` (possible values: `user`, `seller`, `producer`, `admin`).

---

## Glossary

- **System**: The iAgromoz React application as a whole.
- **Router**: The React Router component responsible for page routing.
- **ProtectedRoute**: React component that guards authenticated routes and verifies roles via `allowedRoles` and `adminOnly` props.
- **Seller**: An authenticated user whose `userRole` in `localStorage` is `seller`.
- **Seller Dashboard**: Page accessible at `/seller-dashboard`, exclusive to sellers and producers.
- **Restricted Route**: Any application route not in the seller's allowed routes list: `/seller-dashboard`, `/profile`, `/profile/:id`, `/transactions`, `/marketplace`, `/create-product`, `/product/:productId/units`.
- **Sidebar**: Navigation components `DesktopSidebar` (lateral) and `MobileNav` (bottom) that display menu items.
- **Login**: Authentication process that results in storing `access_token`, `refresh_token`, and `userRole` in `localStorage`.
- **Post-Login Redirect**: Automatic navigation to a specific route immediately after successful login.

---

## Requirements

### Requirement 1: Automatic Seller Redirect After Login

**User Story:** As a seller, I want to be automatically redirected to the Seller Dashboard after logging in, so that I directly access the area relevant to my activity.

#### Acceptance Criteria

1. WHEN a user with `userRole` equal to `seller` successfully completes the login process, THE System SHALL redirect the user to the route `/seller-dashboard`, taking precedence over any `next` query parameter.
2. WHEN a user with `userRole` different from `seller` successfully completes the login process, THE System SHALL redirect to the `next` query parameter route if present, otherwise to `/feed` as the default route.
3. IF the `userRole` is not yet available in `localStorage` at the moment of post-login redirect, THEN THE System SHALL call `getUserProfile()` to resolve the role before determining the destination route; IF `getUserProfile()` fails, THEN THE System SHALL redirect to `/feed` as the fallback route.

---

### Requirement 2: Restriction of Access to Non-Permitted Routes for Seller

**User Story:** As a platform administrator, I want sellers to be unable to access pages outside their scope, so that the experience is focused and access security is maintained.

#### Acceptance Criteria

1. WHEN a user with `userRole` equal to `seller` attempts to access a route not in the seller allowed list (`/seller-dashboard`, `/profile`, `/profile/:id`, `/transactions`, `/marketplace`, `/create-product`, `/product/:productId/units`), THE ProtectedRoute SHALL redirect the user to `/seller-dashboard` without rendering the restricted route's component.
2. WHEN a user with `userRole` equal to `seller` accesses any route in the seller allowed list, THE ProtectedRoute SHALL permit access and render the corresponding component.
3. THE ProtectedRoute SHALL read the `userRole` key from `localStorage` to determine whether access is permitted for the current route.
4. IF the user is not authenticated (no `access_token` in `localStorage`), THEN THE ProtectedRoute SHALL redirect to `/login`, regardless of role.

---

### Requirement 3: Sidebar Navigation Filtered by Seller Role

**User Story:** As a seller, I want to see only the menu items relevant to me in the navigation bar, so that the interface is clear and does not present inaccessible options.

#### Acceptance Criteria

1. WHEN the `DesktopSidebar` is rendered for a user with `userRole` equal to `seller`, THE Sidebar SHALL display only the items: Seller Dashboard (`/seller-dashboard`), Transactions (`/transactions`), and My Profile (`/profile`).
2. WHEN the `MobileNav` is rendered for a user with `userRole` equal to `seller`, THE MobileNav SHALL display only the items: Dashboard (`/seller-dashboard`), Orders (`/transactions`), Products (`/marketplace`), and Profile (`/profile`).
3. WHEN the `DesktopSidebar` is rendered for a user with `userRole` equal to `seller`, THE Sidebar SHALL hide the items: Feed, AI Assistant, Recommendations, Marketplace (as buyer), Notifications, Messages, Administrative Dashboard, Saved, Settings, and My Listings.
4. THE Sidebar SHALL read the `userRole` key from `localStorage` (defaulting to `null` if absent) to determine which items to display; the role SHALL be read once on component mount and on each navigation event.
5. WHILE the `userRole` in `localStorage` is `seller`, THE Sidebar SHALL maintain the restricted menu item set across all navigations within the session.

---

### Requirement 4: Consistency of Seller Role Across Components

**User Story:** As a seller, I want access control to be applied consistently throughout the application, so that there are no ways to bypass navigation restrictions.

#### Acceptance Criteria

1. THE System SHALL use the `userRole` value stored in `localStorage` as the single source of truth for frontend access control decisions across all components (`ProtectedRoute`, `DesktopSidebar`, `MobileNav`, and post-login redirect logic).
2. WHEN `getUserProfile()` returns a profile with `role` equal to `SELLER` (uppercase), THE System SHALL store the value `seller` (lowercase) under the `userRole` key in `localStorage`.
3. WHEN a user with the `seller` role logs out, THE System SHALL clear `userRole`, `access_token`, and `refresh_token` from `localStorage`, terminating all role-based access restrictions for that session.
4. IF the `userRole` in `localStorage` is `seller` and the user attempts to navigate directly to a restricted route via URL, THEN THE ProtectedRoute SHALL redirect to `/seller-dashboard` without rendering the restricted route's component; restricted routes are all routes NOT in the seller allowed list defined in Requirement 2, Criterion 1.

---

### Requirement 5: Seller Access to Marketplace for Product Management

**User Story:** As a seller, I want to be able to access the Marketplace to manage my listed products, so that I can publish and administer my listings.

#### Acceptance Criteria

1. WHEN a user with `userRole` equal to `seller` accesses `/marketplace`, THE ProtectedRoute SHALL permit access and render the Marketplace page.
2. WHEN a user with `userRole` equal to `seller` accesses `/create-product`, THE ProtectedRoute SHALL permit access and render the Create Product page.
3. WHEN a user with `userRole` equal to `seller` accesses `/product/:productId/units`, THE ProtectedRoute SHALL permit access and render the product units management page.
4. WHEN a user with `userRole` NOT equal to `seller` attempts to access `/create-product` or `/product/:productId/units` without the required `allowedRoles`, THE ProtectedRoute SHALL redirect the user according to the existing role-based rules for those routes.
5. IF an unauthenticated user (no `access_token` in `localStorage`) attempts to access `/marketplace`, `/create-product`, or `/product/:productId/units`, THEN THE ProtectedRoute SHALL redirect to `/login`.

---

### Requirement 6: Preservation of Behavior for Other Roles

**User Story:** As a user with role `user`, `producer`, or `admin`, I want my access to the platform to be unaffected by seller role restrictions, so that I continue to use all features available for my role.

#### Acceptance Criteria

1. WHEN a user with `userRole` equal to `user` accesses any route permitted for the `user` role, THE ProtectedRoute SHALL permit access and render the requested page without redirecting the user.
2. WHEN a user with `userRole` equal to `admin` accesses any route in the application, THE ProtectedRoute SHALL apply the existing access rules for administrators as defined by the `adminOnly` prop and `allowedRoles` configuration, rendering the requested page without redirecting the user.
3. WHEN a user with `userRole` equal to `producer` accesses any route permitted for producers, THE ProtectedRoute SHALL permit access and render the requested page without redirecting the user.
4. IF the `userRole` in `localStorage` is NOT `seller`, THEN THE ProtectedRoute SHALL NOT apply seller-specific `allowedRoles` restrictions to that user, and the user SHALL NOT be redirected by seller-specific access control logic.
5. THE System SHALL apply seller-based access restrictions exclusively to users whose `userRole` is `seller`; no other role SHALL be subject to the seller allowed routes list.
