
 ┌───────────󰉕   on  feat/FFL-2-player-sign-in [?] ./Wario-RW344 
 │ is 📦 v1.0.0 via  v22.18.0 
 └───󰣉  npx firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /home/raymond/Documents/coding_projects/computer_science_344/Wario-RW344

✔ Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Firestore: Configure security rules and indexes files for Firestore, 
Functions: Configure a Cloud Functions directory and its files, Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys, Storage: Configure a security rules file for Cloud 
Storage, Emulators: Set up local emulators for Firebase products, Extensions: Set up an empty Extensions manifest

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

✔ Please select an option: Use an existing project
✔ Select a default Firebase project for this directory: wario-fantasy-fraud-league (Wario - Fantasy Fraud League)
i  Using project wario-fantasy-fraud-league (Wario - Fantasy Fraud League)

=== Firestore Setup
i  firestore: ensuring required API firestore.googleapis.com is enabled...
⚠  firestore: missing required API firestore.googleapis.com. Enabling now...
✔ Please select the location of your Firestore database: africa-south1

Firestore Security Rules allow you to define how and when to allow
requests. You can keep these rules in your project directory
and publish them with firebase deploy.

✔ What file should be used for Firestore Rules? firestore.rules

Firestore indexes allow you to perform complex queries while
maintaining performance that scales with the size of the result
set. You can keep index definitions in your project directory
and publish them with firebase deploy.

✔ What file should be used for Firestore indexes? firestore.indexes.json
✔  Wrote firestore.rules
✔  Wrote firestore.indexes.json

=== Functions Setup
Let's create a new codebase for your functions.
A directory corresponding to the codebase will be created in your project
with sample code pre-configured.

See https://firebase.google.com/docs/functions/organize-functions for
more information on organizing your functions using codebases.

Functions can be deployed with firebase deploy.

✔ What language would you like to use to write Cloud Functions? JavaScript
✔ Do you want to use ESLint to catch probable bugs and enforce style? Yes
✔  Wrote functions/package.json
✔  Wrote functions/.eslintrc.js
✔  Wrote functions/index.js
✔  Wrote functions/.gitignore
✔ Do you want to install dependencies with npm now? Yes
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.

added 599 packages, and audited 600 packages in 50s

85 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

✔ What do you want to use as your public directory? frontend/build
✔ Configure as a single-page app (rewrite all urls to /index.html)? Yes
✔ Set up automatic builds and deploys with GitHub? No
✔  Wrote frontend/build/index.html

=== Storage Setup

Firebase Storage Security Rules allow you to define how and when to allow
uploads and downloads. You can keep these rules in your project directory
and publish them with firebase deploy.

✔ What file should be used for Storage Rules? storage.rules
✔  Wrote storage.rules

=== Emulators Setup
✔ Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. Authentication Emulator, Functions Emulator, Firestore Emulator, Hosting Emulator, Pub/Sub 
Emulator, Storage Emulator, Cloud Tasks Emulator
✔ Which port do you want to use for the auth emulator? 9099
✔ Which port do you want to use for the functions emulator? 5001
✔ Which port do you want to use for the firestore emulator? 8080
✔ Which port do you want to use for the hosting emulator? 5000
✔ Which port do you want to use for the pubsub emulator? 8085
✔ Which port do you want to use for the storage emulator? 9199
✔ Which port do you want to use for the tasks emulator? 9499
✔ Would you like to enable the Emulator UI? Yes
✔ Which port do you want to use for the Emulator UI (leave empty to use any available port)? 
✔ Would you like to download the emulators now? Yes
i  pubsub: downloading pubsub-emulator-0.8.14.zip...
Progress: =========================================================================================================================================================================================> (100% of 67MB)
i  storage: downloading cloud-storage-rules-runtime-v1.1.3.jar...
Progress: =========================================================================================================================================================================================> (100% of 53MB)

=== Extensions Setup

✔  Wrote configuration info to firebase.json
✔  Wrote project information to .firebaserc

✔  Firebase initialization complete!
