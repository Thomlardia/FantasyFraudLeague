// Importing the functions we need from the SDKs we will be using
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Functions and get a reference to the service
export const functions = getFunctions(app, "africa-south1");

// Connect Emulators to the correct ports
// Use env flag or common local hostnames to decide
const shouldUseEmulators =
  process.env.REACT_APP_USE_EMULATORS === "1" ||
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

if (shouldUseEmulators) {
  // Disable warning banner for emulator connections
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
