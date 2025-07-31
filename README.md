[will remove this: Hello guys this is my suggestion for the directory structure
for the project. It will obviosly change and grow as we decide how to setup
  backend and all of that but yeah i think this is a nice start]

[oh and also a lot of the stuff in here is automatically made by npx create-react-app so we can remove all unnececary stuff later]

Usage:
  - to launch the frontend 'make start'


Directory structure target
Wario-RW344/
├── frontend/                        # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images, icons, etc.
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # One page per fraud type
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FraudPages/
│   │   │   │   ├── Phishing.jsx
│   │   │   │   ├── ATMFraud.jsx
│   │   │   │   ├── DeepfakeFraud.jsx
│   │   │   │   └── ...
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env                       # Frontend config vars (e.g., Firebase)
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── still undecided software
│   └── README.md
│
├── database/                      # Optional: Firebase rules, schemas
│   ├── schema.md                 # Human-readable DB design
│   └── actualDatabase
│
├── .gitignore
├── Makefile
├── README.md
└── docs/                         # Extra docs: design choices, research
    ├── fraud_types.md
    └── prevention_tools.md
