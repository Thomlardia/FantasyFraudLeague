# Fantasy Fraud League Docs  

At some point we can turn this into something more formal, but for now it just serves as a wiki type documentation system for quick access while coding.  
Regarding future more formal usage, think things like usage guides, information about how code should be maintained, et cetera.  

## Contents  

***Files keeping track of all the strategies and conventions to be used when developing:***  
- [Development Strategies](docs/summary_development_conventions.md)  
- [Development Strategies](docs/development_strategies.md)  
- [Scrum Information](docs/scrum_info.md)  

***The record of all scrum processes we have completed. (Containing detailed minutes for example):***  
- [Scrum Record](docs/scrum_record.md)  

***Miscellaneous:***  
- [Model View Controller and Security](docs/model_view_controller.md)  
- [Introduction by AB](docs/ab_introduction)  

## Environment Setup

***Firestore***
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\trekv\OneDrive\Documenten\ai.stellenbosh\software.engineering\Wario-RW344\secrets\keyfile"

>> $env:FIREBASE_CONFIG="{`"projectId`":`"wario-fantasy-fraud-league`"}"

***Emulator***
$env:FIRESTORE_EMULATOR_HOST="localhost:8080"

>> $env:FIREBASE_CONFIG="{`"projectId`":`"wario-fantasy-fraud-league`"}"

## Frontend Development (CRA and Vite)

This repo supports running the frontend with either CRA (react-scripts) or Vite.

- CRA (default)
  - Dev: `make run-front` (or `npm --prefix frontend start`)
  - Build: `make build` (outputs to `frontend/build/`)

- Vite (optional, faster dev/builds)
  - Dev: `make vrun-front` (or `npm --prefix frontend run dev`)
  - Build: `make vbuild` (builds to `frontend/dist/` then copies into `frontend/build/` for Firebase Hosting)
  - Emulator with Vite build: `make vrun-hosting` or `make vrun`

Environment variables
- The frontend checks `REACT_APP_USE_EMULATORS=1` at build time. Set it when running locally if needed, e.g.:
  - `REACT_APP_USE_EMULATORS=1 make vrun-front`
  - `REACT_APP_USE_EMULATORS=1 make run-front`

Notes
- Firebase Hosting stays configured to `frontend/build/`. The Vite build flow copies `dist/` into `build/` to remain compatible.
- Keeping both toolchains is supported but requires avoiding tool-specific config drift. Prefer one for production builds to reduce maintenance.
