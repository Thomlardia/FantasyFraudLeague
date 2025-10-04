# Apps

This folder contains the **API edge layer** of the application.  
Each app is an entrypoint that exposes functionality to the outside world — typically via HTTP endpoints or background triggers.

Where `infra/` is the **plumbing** (database, auth, config) and `domains/` are the **brains** (rules, use-cases, persistence),  
`apps/` are the **edges** — the places where clients (frontend, admin dashboard, 3rd parties) actually connect.

---

## Structure

Typical apps include:

- **`user-api/`** – Public API surface for the game’s users. Routes are protected by user authentication middleware.  
- **`admin-api/`** – Admin-only API surface, protected by admin auth + RBAC middleware.  
- **`triggers/`** – Background function handlers (e.g. `onUserCreated`, scheduled jobs, event listeners).  

It should be noted that files inside triggers have a very unique file naming convention,
so no, the example I put in `triggers/` is not a typo.


- **`app.js`** – Express app wiring routes + middleware.  
- **`middleware/`** – Request guards (auth, RBAC, logging).  
- **routes/** – Route definitions that call into `domains/*` for business logic.  

Note routes also follow this weird naming convention

### Different Apps

Most of the backend will just be done in user-api, and admin-api, and triggers
however we might also have a `jobs/` app and possibly also `webhooks`.
- `jobs/` -> scheduled/background HTTP kickoffs (or onSchedule)
- `webhooks/` -> Stripe, etc. signature-verified

---

## Important

- `apps/` never contain domain logic themselves.  
  Instead, routes call into `domains/` (`api.js` or `service.js`) to perform actions.  
- `apps/` depend on `domains/`, but not the other way around.  
- Authentication and role checks live here as **middleware**, before requests ever reach domain logic.  
- The root `src/index.js` only exports the apps as Firebase Functions, e.g.:  

```js
export const userApi  = onRequest(userApp);
export const adminApi = onRequest(adminApp);
```

