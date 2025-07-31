[will remove this: Hello guys this is my suggestion for the directory structure
for the project. It will obviosly change and grow as we decide how to setup
  backend and all of that but yeah i think this is a nice start]

[oh and also a lot of the stuff in here is automatically made by npx create-react-app so we can remove all unnececary stuff later]

Usage:
  - to launch the frontend 'make start'


Directory structure target
Wario-RW344/\n
├── frontend/                        # React frontend\n
│   ├── public/\n
│   ├── src/\n
│   │   ├── assets/                 # Images, icons, etc.\n
│   │   ├── components/            # Reusable UI components (e.g., Navbar, ToolCard)\n
│   │   ├── pages/                 # One page per fraud type, home, login, dashboard\n
│   │   │   ├── LoginPage.jsx\n
│   │   │   ├── Dashboard.jsx\n
│   │   │   ├── FraudPages/\n
│   │   │   │   ├── Phishing.jsx\n
│   │   │   │   ├── ATMFraud.jsx\n
│   │   │   │   ├── DeepfakeFraud.jsx\n
│   │   │   │   └── ...\n
│   │   ├── services/              # API calls to backend or Firebase\n
│   │   ├── contexts/              # React Contexts for auth, game state, etc.\n
│   │   ├── App.jsx\n
│   │   └── index.js\n
│   ├── .env                       # Frontend config vars (e.g., Firebase)\n
│   ├── package.json\n
│   └── README.md\n
│\n
├── backend/\n
│   ├── still undecided software\n
│   └── README.md\n
│\n
├── database/                      # Optional: Firebase rules, schemas\n
│   ├── schema.md                 # Human-readable DB design\n
│   └── actual_database\n
│\n
├── .gitignore\n
├── Makefile\n
├── README.md\n
└── docs/                         # Extra docs: design choices, team notes, research\n
    ├── fraud_types.md\n
    └── prevention_tools.md\n

