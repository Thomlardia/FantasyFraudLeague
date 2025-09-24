# ------------- INSTALL --------------

install: install-dev-tools install-dependencies

install-dev-tools:
	npm install

install-dependencies:
	npm --prefix frontend install
	npm --prefix functions install

# ---------- BUILD FRONTEND -----------

build:
	npm --prefix frontend run build

# ------------- RUNNING --------------
run: build
	npx firebase-tools emulators:start

run-functions:
	npx firebase-tools emulators:start --only functions

run-hosting: build
	npx firebase-tools emulators:start --only hosting

run-hosting-functions:
	npx firebase-tools emulators:start --only hosting,functions

run-front:
	npm --prefix frontend start

run-front-warnings:
	npm --tracewarnings --prefix frontend start

# ----------DATABASE SEEDING --------
# Seed commands for development (requries emulator to be running)

EMULATOR_ENV = FIRESTORE_EMULATOR_HOST=localhost:8080 FIREBASE_AUTH_EMULATOR_HOST=localhost:9099

# seed defenses for all users (global)
seed-global-defenses:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed global-defense

# seed all users
seed-users-from-auth:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth

# seed users and defenses
seed-complete:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth
	$(EMULATOR_ENV) node functions/scripts/seed.js seed global-defenses


# Complete seed and update process (seed users, defenses, then update summaries)
seed-complete-with-summaries:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth
	$(EMULATOR_ENV) node functions/scripts/seed.js seed global-defenses
	$(EMULATOR_ENV) node functions/scripts/seed.js update all-users-defense-summaries

# list all users
seed-list-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js list users

seed-prod:
	node functions/scripts/seed.js seed --production --force

seed-prod-global-defenses:
	node functions/scripts/seed.js seed global-defenses --production --force

# ------------- LINTER --------------

lint:
	npm --prefix functions run lint

# ------------- DEPLOY --------------
# Building should be done automatically as specified in firebase.json,
# but I haven't confirmed yet.

deploy-hosting:
	npx firebase-tools deploy --only hosting

deploy-functions:
	npx firebase-tools deploy --only functions

deploy-hosting-functions:
	npx firebase-tools deploy --only hosting,functions

deploy:
	npx firebase-tools deploy

# ------------- CLEAN --------------

clean:
	rm -rf frontend/build

clean-node:
	rm -rf node_modules frontend/node_modules functions/node_modules

# This allows you to reset all the dependency versions
clean-hard: clean
	rm -f package-lock.json frontend/package-lock.json functions/package-lock.json


# -------- STATS GENERATION ---------
# Create git statistics (University Standard)
stats:
	gitinspector --grading --format htmlembedded > git-stats/stats.html
