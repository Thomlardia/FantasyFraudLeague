// Firebase Admin SDK initialization and configuration module

import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
      projectId: 'wario-fantasy-fraud-league',           // which firebase app to connect to
      credential: admin.credential.applicationDefault()  // how to authenticate
    }
  );   // runs once at first import (cold start)
}

export const db = getFirestore();
export const auth = admin.auth();

// Environment detection variables
// Connects to firestore, either in emulator or production
let isEmulator = false;
let environment = 'development';

// Detect environment based on environment variables
// Only use emulator if explicitly told to via emulator environment variables
const useEmulator = !!(process.env.FUNCTIONS_EMULATOR || process.env.FIRESTORE_EMULATOR_HOST);

// Set environment detection variables
if (useEmulator) {
  isEmulator = true;
  environment = 'emulator';
  console.log('Connected to Firestore emulator for seeding');
} else {
  environment = 'production';
}
console.log(`Database configured for: ${environment}`);

export const getCollection = (name) => db.collection(name);
export const createBatch = () => db.batch();
export { isEmulator, environment };