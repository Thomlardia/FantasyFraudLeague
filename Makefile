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

# ---------- BUILD FRONTEND (Vite) -----------

vbuild:
	npm --prefix frontend run build:vite
	rm -rf frontend/build
	mkdir -p frontend/build
	cp -a frontend/dist/. frontend/build/

# ---------- BUILD FRONTEND (Vite - Windows) -----------

vbuild-win:
	npm --prefix frontend run build:vite
	powershell -Command "if (Test-Path 'frontend/build') { Remove-Item -Recurse -Force 'frontend/build' }"
	powershell -Command "New-Item -ItemType Directory -Path 'frontend/build' -Force"
	powershell -Command "Copy-Item -Path 'frontend/dist/*' -Destination 'frontend/build' -Recurse -Force"

# ------------- RUNNING --------------
run: build
	npx firebase-tools emulators:start

run-functions:
	npx firebase-tools emulators:start --only functions

run-hosting: build
	npx firebase-tools emulators:start --only hosting

run-hosting-functions:
	npx firebase-tools emulators:start --only hosting,functions

# ------------- RUNNING (Vite) --------------

vrun: vbuild
	npx firebase-tools emulators:start

vrun-hosting: vbuild
	npx firebase-tools emulators:start --only hosting

vrun-hosting-functions: vbuild
	npx firebase-tools emulators:start --only hosting,functions

# ------------- RUNNING (Vite - Windows) --------------

vrun-win: vbuild-win
	npx firebase-tools emulators:start

vrun-hosting-win: vbuild-win
	npx firebase-tools emulators:start --only hosting

vrun-hosting-functions-win: vbuild-win
	npx firebase-tools emulators:start --only hosting,functions

run-front:
	npm --prefix frontend start

run-front-warnings:
	npm --tracewarnings --prefix frontend start

vrun-front:
	npm --prefix frontend run dev

# ----------DATABASE SEEDING --------
# Seed commands for development (requires emulator to be running)

EMULATOR_ENV = FIRESTORE_EMULATOR_HOST=localhost:8080 FIREBASE_AUTH_EMULATOR_HOST=localhost:9099

# Show info about reseeding commands
reseed-info:
	@echo "═══════════════════════════════════════════════════════════════"
	@echo "                    DATABASE RESEEDING GUIDE"
	@echo "═══════════════════════════════════════════════════════════════"
	@echo ""
	@echo "EMULATOR (Defense Management):"
	@echo "  make reseed-defenses              - Reseed defense templates"
	@echo "  make seed-complete                - Seed users + defenses"
	@echo "  make update-summaries             - Update user defense summaries (testing only)"
	@echo ""
	@echo "PRODUCTION (Defense Management):"
	@echo "  make reseed-defenses-prod         - Reseed defense templates"
	@echo ""
	@echo "USER MANAGEMENT:"
	@echo "  make list-users                   - List all users (emulator)"
	@echo "  make list-users-prod              - List all users (production)"
	@echo "  make clear-all-auth-users-force   - Delete ALL users (emulator)"
	@echo "  make clear-all-auth-users-prod    - Delete ALL users (production)"
	@echo ""
	@echo "FIRESTORE INFRASTRUCTURE:"
	@echo "  make deploy-firestore-indexes     - Deploy Firestore indexes to production"
	@echo "  make deploy-firestore-rules       - Deploy Firestore security rules"
	@echo ""
	@echo "═══════════════════════════════════════════════════════════════"
	@echo ""
	@echo "SECURITY: All production commands require developer credentials."
	@echo ""
	@echo "═══════════════════════════════════════════════════════════════"
	@echo ""

# -------- DEFENSE SEEDING (Emulator) --------
# seed defenses for all users (global)
seed-global-defenses:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed global-defenses

# Force reseed defenses in emulator (overwrites existing)
reseed-defenses:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed global-defenses --force

# -------- USER SEEDING (Emulator) --------
# seed all users
seed-users-from-auth:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth

seed-test-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed test-users

# seed users and defenses
seed-complete:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed users-from-auth
	$(EMULATOR_ENV) node functions/scripts/seed.js seed global-defenses

# Update user defense summaries (emulator only - for testing)
update-summaries:
	$(EMULATOR_ENV) node functions/scripts/seed.js update all-users-defense-summaries

lazy:
	$(MAKE) seed-test-users
	$(MAKE) seed-global-defenses

lazy-win:
	powershell -Command "$$env:FIRESTORE_EMULATOR_HOST='localhost:8080'; $$env:FIREBASE_AUTH_EMULATOR_HOST='localhost:9099'; node functions/scripts/seed.js seed test-users"
	powershell -Command "$$env:FIRESTORE_EMULATOR_HOST='localhost:8080'; $$env:FIREBASE_AUTH_EMULATOR_HOST='localhost:9099'; node functions/scripts/seed.js seed global-defenses"

# Seed auth users (directly into Firebase Authentication)
seed-auth-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js seed auth-users

# Clear test auth users
clear-auth-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js clear auth-users

# Clear ALL auth users from EMULATOR (requires --force flag for safety)
clear-all-auth-users-force:
	$(EMULATOR_ENV) node functions/scripts/seed.js clear all-auth-users --force

# Clear ALL auth users from PRODUCTION (VERY DANGEROUS!)
clear-all-auth-users-prod:
	@echo "WARNING: This will delete ALL users from PRODUCTION"
	@echo "Project: wario-fantasy-fraud-league"
	@read -p "Type 'DELETE ALL USERS' to confirm: " confirm; \
	if [ "$$confirm" = "DELETE ALL USERS" ]; then \
		node functions/scripts/seed.js clear all-auth-users --force --production; \
	else \
		echo "Cancelled."; \
	fi

# list all users (emulator)
list-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js list users

# list all users (production)
list-users-prod:
	node functions/scripts/seed.js list users --production

clear-test-users:
	$(EMULATOR_ENV) node functions/scripts/seed.js clear users

# Grant admin role to a user (for local emulator) - Linux/Mac
# Usage: make grant-admin EMAIL=test@example.com
grant-admin:
	@if [ -z "$(EMAIL)" ]; then \
		echo "Error: EMAIL parameter is required"; \
		echo "Usage: make grant-admin EMAIL=test@example.com"; \
		exit 1; \
	fi
	$(EMULATOR_ENV) node functions/scripts/grant-admin.js $(EMAIL)

# Grant admin role to a user (for local emulator) - Windows
# Usage: make grant-admin-win EMAIL=test@example.com
grant-admin-win:
	@powershell -Command "if ('$(EMAIL)' -eq '') { Write-Host 'Error: EMAIL parameter is required'; Write-Host 'Usage: make grant-admin-win EMAIL=test@example.com'; exit 1 }"
	powershell -Command "$$env:FIRESTORE_EMULATOR_HOST='localhost:8080'; $$env:FIREBASE_AUTH_EMULATOR_HOST='localhost:9099'; node functions/scripts/grant-admin.js $(EMAIL)"

seed-prod:
	node functions/scripts/seed.js seed --production --force

# -------- DEFENSE SEEDING (Production) --------
seed-prod-global-defenses:
	node functions/scripts/seed.js seed global-defenses --production --force

# Reseed defenses in PRODUCTION with confirmation (safer with prompt)
reseed-defenses-prod:
	@echo "WARNING: This will reseed ALL defenses in PRODUCTION"
	@echo "Project: wario-fantasy-fraud-league"
	@echo "This will overwrite/merge existing defense documents"
	@read -p "Type 'RESEED DEFENSES' to confirm: " confirm; \
	if [ "$$confirm" = "RESEED DEFENSES" ]; then \
		node functions/scripts/seed.js seed global-defenses --production --force; \
	else \
		echo "Cancelled."; \
	fi

# Grant admin role to a user (for PRODUCTION - use with caution)
# Usage: make grant-admin-prod EMAIL=user@example.com
grant-admin-prod:
	@if [ -z "$(EMAIL)" ]; then \
		echo "Error: EMAIL parameter is required"; \
		echo "Usage: make grant-admin-prod EMAIL=user@example.com"; \
		exit 1; \
	fi
	@echo "WARNING: This will grant admin role in PRODUCTION"
	@echo "Email: $(EMAIL)"
	@read -p "Type 'GRANT ADMIN' to confirm: " confirm; \
	if [ "$$confirm" = "GRANT ADMIN" ]; then \
		node functions/scripts/grant-admin.js $(EMAIL); \
	else \
		echo "Cancelled."; \
	fi

# ------------- LINTER --------------

lint:
	npm --prefix functions run lint

# ------------- DEPLOY --------------
# Building should be done automatically as specified in firebase.json,
# but I haven't confirmed yet.

deploy-hosting: vbuild
	npx firebase-tools deploy --only hosting

deploy-functions:
	npx firebase-tools deploy --only functions

deploy-firestore-indexes:
	npx firebase-tools deploy --only firestore:indexes

deploy-firestore-rules:
	npx firebase-tools deploy --only firestore:rules

deploy-hosting-functions:
	npx firebase-tools deploy --only hosting,functions

deploy: vbuild
	npx firebase-tools deploy

# ------------- DEPLOY (Vite) --------------

vdeploy-hosting: vbuild
	npx firebase-tools deploy --only hosting

vdeploy-hosting-functions: vbuild
	npx firebase-tools deploy --only hosting,functions

vdeploy: vbuild
	npx firebase-tools deploy

# ------------- DEPLOY (Vite - Windows) --------------

vdeploy-hosting-win: vbuild-win
	npx firebase-tools deploy --only hosting

vdeploy-hosting-functions-win: vbuild-win
	npx firebase-tools deploy --only hosting,functions

vdeploy-win: vbuild-win
	npx firebase-tools deploy

# ------------- CLEAN --------------

clean:
	rm -rf frontend/build

clean-node:
	rm -rf node_modules frontend/node_modules functions/node_modules

# This allows you to reset all the dependency versions
clean-hard: clean
	rm -f package-lock.json frontend/package-lock.json functions/package-lock.json

# Vite-specific clean
vclean:
	rm -rf frontend/dist frontend/node_modules/.vite


# -------- STATS GENERATION ---------
# Create git statistics (University Standard)
stats:
	gitinspector --grading --format htmlembedded > git-stats/stats.html
