# Domains

This folder contains the **core logic** of the application, organized by domain  
(e.g. `users/`, `buy-defenses/`, `examples/`).  

## Explanation

The idea comes from Domain-Driven Design (DDD), where *domain* = the problem space your application is about.  
For our game, domains might include: `attacks/`, `defenses/`, `scores/`.

### In short

A domain is just a problem area or concept that is important in our application.

***You create a domain when:***
- It has data of its own (e.g. defenseType, price, prereqs ).
- It has rules (e.g. only users with enough money and necessary prerequisites can purchase).
- It has behaviors / actions (e.g. add defense to user list of defenses).

When a concept has data + rules + behaviors, it’s usually worth modeling as a domain.

---

## Structure

Each domain is self-contained and typically includes:

- **`repo.js`** – Data access layer (Firestore in our case).  
- **`service.js`** – Game rules and use-cases (validation, workflows, invariants).  
- **`api.js`** – Thin facade that exposes the domain to the API layer (`apps/*`).  

---

###  Important
- Domains never import from `apps/` (the API edge).  
- All database access must go through `infra/` (e.g. `infra/db`).  
- Keep the direction of dependencies strict: **infra → domains → apps → index.js**.  
- I.e. for example don't import `api.js` directly into `src/index.js`. Instead, routes in `apps/*` should call into domains. The root index should only wire up HTTP functions and triggers.  

---

### Summary
`domains/` is where you put the application’s **brains**: the rules, use-cases, and persistence logic that define how the system works.  
Everything else in the project (APIs, triggers, frontends) exists to deliver requests into the domain and send responses back.

