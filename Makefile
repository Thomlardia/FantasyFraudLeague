install:
	npm --prefix frontend install
	npm install

	npx firebase-tools use wario-fantasy-fraud-league

run-front:
	npm --prefix frontend start

run:
	npx firebase-tools emulators:start
