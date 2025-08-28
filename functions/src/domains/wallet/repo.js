/**
 * This file contains the wallet repository for accessing and updating user balance in Firestore.
 */

import { db } from "../../infra/db/index.js";
const USERS_COLLECTION = "users"; /* Firestore collection name */

/**
 * Gets the balance for a user.
 * @param {string} userId
 * returns the user's balance from the database (defaults to 0 if not set).
 */
export async function getBalance(userId) {
  const doc = await db.collection(USERS_COLLECTION).doc(userId).get(); /* get user document */
  if (!doc.exists) return 0; /* if no document, return 0 */
  const data = doc.data(); /* get document data */
  return typeof data.balance === "number" ? data.balance : 0; /* return balance if it exists, else 0 */
}

/**
 * Sets the balance for a user.
 * @param {string} userId
 * @param {number} balance
 * returns nothing, updates the user's balance in the database.
 */
export async function setBalance(userId, balance) {
    /* Update or create the balance of the user in firestore*/
  await db.collection(USERS_COLLECTION).doc(userId).set(
    { balance },
    { merge: true }
  );
}