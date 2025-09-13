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

run-hosting:
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

# seed defenses for all users (explicit)
seed-users-defenses:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed all-users-defenses

# seed all users
seed-users-from-auth:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth

# seed users and defenses
seed-complete:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth
	$(EMULATOR_ENV) node functions/scripts/seed.js seed all-users-defenses	

# seed defenses for specific user (usage: make seed-user USER=user123)
seed-user:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed user-defenses --user $(USER)

# Update defense summary for specific user (usage: make update-user-defense-summary USER=user123)
update-user-defense-summary:
	$(EMULATOR_ENV) node functions/scripts/seed.js update user-defense-summary --user $(USER)

# Update defense summaries for all users
update-all-users-defense-summaries:
	$(EMULATOR_ENV) node functions/scripts/seed.js update all-users-defense-summaries

# Complete seed and update process (seed users, defenses, then update summaries)
seed-complete-with-summaries:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth
	$(EMULATOR_ENV) node functions/scripts/seed.js seed all-users-defenses
	$(EMULATOR_ENV) node functions/scripts/seed.js update all-users-defense-summaries

# clear defenses summaries for specific user (usage: make clear-user USER=user123)
clear-user-defense-summaries:
	$(EMULATOR_ENV) node functions/scripts/seed.js clear user-defenses --user $(USER)

# list all users
seed-list-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js list users

# usage: make seed-list-user USER=user123
seed-list-user:
	$(EMULATOR_ENV) node functions/scripts/seed.js list user-defenses --user $(USER)

seed-prod:
	node functions/scripts/seed.js seed --production --force

seed-prod-user:
	node functions/scripts/seed.js seed user-defenses --user $(USER) --production --force

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
