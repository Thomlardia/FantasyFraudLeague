install:
	npm --prefix frontend install
	npm install

	npx firebase-tools use wario-fantasy-fraud-league

rr:
	npm --prefix frontend start

re:
	npx firebase-tools emulators:start
