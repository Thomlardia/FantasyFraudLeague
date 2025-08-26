import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp();   // runs once at first import (cold start)
}

export const db = getFirestore();
export const auth = admin.auth();
