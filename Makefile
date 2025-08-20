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
