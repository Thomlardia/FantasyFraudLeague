# Database Infrastructure & Seeding
This directory contains the database infrastructure layer for the pplication.

## Structure
```
src/infra/db/
├── index.js              # Firebase Admin initialization & connection
├── seeds/
│   ├── index.js          # Main seeding exports
│   ├── users.js          # User and defense seeding operations
│   └── defenses.js       # Defense data definitions
scripts/
└── seed.js               # CLI interface for seeding operations
```
Environment Detection
The system automatically detects whether you're running against the Firebase emulator or production:

Emulator: Detected when FIRESTORE_EMULATOR_HOST is set or NODE_ENV != 'production'
Production: Requires explicit --production --force flags for safety

# CLI Commands
All commands support the emulator by default. Production operations require --production --force flags.

## Initial Setup
Complete database setup (users + defenses + summaries)
`make seed-complete-with-summaries`

Production setup (pushing to production)
`make seed-prod`

## User Management
Import users from Firebase Auth to Firestore
`make seed-users-from-auth`

Seed all defenses for all users
`make seed-users-defenses`

Seed specific user's defenses
`make seed-user USER=user123`

List all users
`make seed-list-users`

## Defense Management
Update defense summaries in user documents
`make update-all-users-defense-summaries`

Update specific user's defense summary
`make update-user-defense-summary USER=user123`

List specific user
`make seed-list-user USER=user123`

Clear user's defenses
`make clear-user-defense-summaries USER=user123`

# Production Commands
Production user seeding
`make seed-prod`

Production specific user seeding
`make seed-prod-user USER=user123`

Data Structure
User Document
```
{
  "id": "user123",
  "email": "user@example.com",
  "name": "User Name",
  "currentBalance": 1000000,
  "userType": "player",
  "ownedDefenses": {
    "atmInspection": {
      "owned": true,
      "level": 2,
      "nextLevelCost": 42000,
      "defendsAgainst": { "skimming": 40, "tampering": 40 }
    }
  },
  "totalDefensesOwned": 1,
}
```
Defense Subcollection
```
{
  "defenseId": "atmInspection",
  "owned": false,
  "level": 1,
  "buyCost": 55000,
  "upgradeCost": 35000,
  "defendsAgainst": {
    "skimming": 40,
    "tampering": 40
  },
  "userId": "user123"
}
```