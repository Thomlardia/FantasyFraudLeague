// Importing the functions we need from the SDKs we will be using
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";

// Adding SDK for the appcheck service
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// Adding SDK for the authentication service
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";

// Adding SDK for the database on Firestore
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Adding SDK for the function in database service
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOtM0OkuE-PPueNeidkfBHh0a-pYR255k",
  authDomain: "wario-fantasy-fraud-league.firebaseapp.com",
  projectId: "wario-fantasy-fraud-league",
  storageBucket: "wario-fantasy-fraud-league.firebasestorage.app",
  messagingSenderId: "916165333209",
  appId: "1:916165333209:web:2a04a590c3bed91cc32ec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Determine if we should use emulators
const shouldUseEmulators =
  process.env.REACT_APP_USE_EMULATORS === "1" ||
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

// Enable AppCheck debug tokens in local development
// This bypasses reCAPTCHA and generates fake tokens (like Auth Emulator does for JWTs)
if (shouldUseEmulators) {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Initialize Firebase App Check (reCAPTCHA Enterprise) with auto refresh
// this is a public site key
const appCheckSiteKey = "6Le9b9QrAAAAAGA5Hh0rxlqA_6GqQATw9r6V3EeR";
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
  isTokenAutoRefreshEnabled: true,
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Functions and get a reference to the service
export const functions = getFunctions(app, "africa-south1");

// Connect to Firebase Emulators in local development
if (shouldUseEmulators) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  console.log("Connected to Firebase Emulators");
}
