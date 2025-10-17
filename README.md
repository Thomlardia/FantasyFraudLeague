# Fantasy Fraud League  

## Authors 
- Abraham De Villiers (26936844@sun.ac.za)
- Corbin Nathan (27475808@sun.ac.za)
- Priyal Bhana (27040607@sun.ac.za)
- Raymond Van Rooijen (26590565@sun.ac.za)
- Thomas Rekvelt (29941601@sun.ac.za)

## About the Project
**Fantasy Fraud League (FFL)** is a security-based fantasy game where players act as bank managers defending against financial fraud.
Inspired by fantasy sports leagues, players use a virtual budget to buy fraud prevention tools that protect their banks from admin-triggered attacks.

When an attack occurs, players’ defenses are evaluated, and their virtual balance increases or decreases depending on how well their tools mitigate the threat.

## Core Functionality
* **Player Accounts**: Secure authentication and registration with persistent user data.
* **Fraud Tool Shop**: Players begin with a virtual balance of $1,000,000 to purchase fraud prevention tools that defend against specific attack types.
* **Fraud Wiki**: An in-game knowledge base where players can explore different types of fraud and learn which tools provide protection against them.
* **Admin Dashboard**: Accessible only to users with the "admin" role. Enables triggering random attack waves based on easy, medium or hard difficulty or custom fraud attack selections that are sent out at once and automatically updates player balances based on outcomes.
* **Attack Log & Game Logic**: Implements the core simulation such as calculating money gained or lost depending on defense effectiveness and maintaining a history of past attacks and results.
* **Help Page**: Provides guidance and FAQs to assist users in understanding gameplay, tool usage, and system navigation.
* **Data Storage**: Built on Google Firestore, handling all player data, tool inventories, attack records, and game state synchronization.

# Project Structure
```
.
├── docs
│   ├── ab_introduction.md
│   ├── assets
│   │   ├── apikey-restrictions.png
│   │   ├── image-20250807112846909.png
│   │   ├── image-20250807113028325.png
│   │   ├── image-20250807113053735.png
│   │   ├── JWT-and-SID.jpeg
│   │   ├── project-settings.png
│   │   ├── teams_screenshot.jpeg
│   │   └── web_based-MVC.jpeg
│   ├── DefenseUpgradePlanning.pdf
│   ├── development_strategies.md
│   ├── firebase_setup.md
│   ├── Fraud Attacks.odt
│   ├── FraudDefenseDescriptions.odt
│   ├── model_view_controller.md
│   ├── PotentialPricing.pdf
│   ├── scrum_info.md
│   ├── scrum_record.md
│   ├── security_report.md
│   └── summary_development_conventions.md
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   ├── src
│   │   ├── api
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── auth
│   │   ├── components
│   │   ├── contexts
│   │   ├── firebase.js
│   │   ├── hooks
│   │   ├── images
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pages
│   │   ├── reportWebVitals.js
│   │   ├── routes
│   │   ├── setupTests.js
│   │   ├── styles
│   │   └── utils
│   └── vite.config.mjs
├── functions
│   ├── manualAttackLogTest.mjs
│   ├── manualAttackTest.mjs
│   ├── manualDefenseTest.mjs
│   ├── manualWalletTest.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── scripts
│   │   ├── grant-admin.js
│   │   ├── seed.js
│   │   ├── test-firebase-auth-demi.sh
│   │   └── test-firebase-auth-live.sh
│   ├── src
│   │   ├── apps
│   │   ├── domains
│   │   ├── index.js
│   │   └── infra
│   └── __tests__
│       ├── test-runner-demo.js
│       └── test-runner.js
├── Makefile
├── package.json
├── package-lock.json
├── README.md
└── storage.rules

22 directories, 65 files

```
## Installation and Running Instructions
### Install Dependencies
`make install`

### Frontend Development (CRA and Vite)
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

### For Admin Access
- `make grant-admin EMAIL=<userEmail@example.com>`

## Documentation

### Development & Processes
- [Development Strategies](./docs/summary_development_conventions.md)
- [Development Strategies (Detailed)](./docs/development_strategies.md)
- [Scrum Information](./docs/scrum_info.md)
- [Scrum Record](./docs/scrum_record.md)

### Technical Documentation
- [Model View Controller and Security](./docs/model_view_controller.md)
- [Firebase Setup Guide](./docs/firebase_setup.md)
- [Security Report](./docs/security_report.md)

### Performance & Maintenance
- [Performance Monitoring](./docs/PERFORMANCE.md)
- [Maintenance](./docs/MAINTENANCE.md)

### Miscellaneous
- [Introduction by AB](./docs/ab_introduction.md)

