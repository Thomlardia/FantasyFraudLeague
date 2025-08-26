# Infra

This folder contains the **infrastructure layer** of the application — the shared plumbing that other parts of the system depend on.  
Examples: database clients, authentication helpers, configuration loaders, logging utilities.

Unlike `domains/` (which models the business/game logic), `infra/` is about **technical concerns**: connecting to external services and providing reusable building blocks.

---

## Structure

Typical modules include:

- **`db/`** – Database clients (For use Firestore). Initialize once here, then reuse across domains.  
- **`auth/`** – Auth utilities (e.g. Firebase Admin helpers, token verification) - Check note at end.  
- **`logger/`** – Centralized logging setup.  
- **`config/`** – Environment variable loading and runtime config.  
- **`…`** – Any other cross-cutting infrastructure (e.g. queues, caching, monitoring).

---

## Important

- `infra/` **should not depend on** `domains/` or `apps/`.  
- `infra/` is the bottom layer of the dependency graph: **infra → domains → apps → index.js**  
- This makes it possible to reuse `infra/` modules in any domain without creating circular dependencies.  
- Keep each infra module minimal and focused — it’s meant to provide connections, not game rules.

---

## Summary

`infra/` is the **plumbing** of the application: shared technical services that domains rely on.  
It provides things like DB clients, auth verifiers, and config loaders.  
Domains then consume these infra modules to implement the application’s rules and use-cases.

---


## Why is there authentication code here?

This took me a while to understand, but concisely,
authentication shows up in **different layers** of the project for different reasons:

- **Frontend (client auth)**:  
  Handles the actual sign-in flow (Google login, email/password, etc.).  
  The client receives a Firebase ID token once the user is signed in.   
  This part is safe to do fully in the client — it never talks directly to your database with admin rights.

- **Backend (infra/auth)**:  
  Processes those ID tokens. The backend verifies the token with the Firebase Admin SDK, and may write identity/claims to the database.  
  This is where you attach role information and enforce server-side trust.

- **Middleware (apps/<usertype>-api/middleware)**:  
  Sits between incoming HTTP requests and your domain logic.  
  It calls the backend verification helpers and rejects requests without valid tokens or required roles.  
  Middleware ensures that even if a client fakes a request, they can’t bypass authorization.
  I also looked at protection from fake requests, this can be done through App Check from firebase, stretch goal :)

In short:  
- **Client = get a token**  
- **Backend = verify and persist identity**  
- **Middleware = enforce access control**  

That’s why you see “auth” code in multiple places — each layer has its own responsibility.
