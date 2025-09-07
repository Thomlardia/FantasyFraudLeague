/**
 * Where Defenses are stored
 * Handles persistence (how data is saved/retrieved).
 * At first, this might just be in-memory (like an array or object in JS) so you can test quickly.
 * Later, this would call Firestore (via infra/db).
 */

import { db } from "../../infra/db/index.js";

const DEFENSES_COLLECTION = "defenses";

/**
 * Saves a defense object to a Firestore database. It creates or updates a document with a unique ID
 * based on the user's ID and defense ID, and merges the provided defense object with any existing data.
 *
 * @param {object} defense - A `Defense` object.
 * @returns {Promise<void>} Resolves when the defense is saved.
 */
export async function saveDefense(defense) {
  console.log("Saving defense:", defense.userId, defense.defenseId, defense);
  await db.collection(DEFENSES_COLLECTION)
    .doc(`${defense.userId}_${defense.defenseId}`)
    .set({ ...defense }, { merge: true });
}

/**
 * Retrieves a defense document from a Firestore database. It takes a userId and defenseId as parameters,
 * constructs a unique document ID by concatenating them, and then fetches the corresponding document from 
 * the DEFENSES_COLLECTION. If the document exists, it returns the document's data; otherwise, it returns null.
 *
 * @param {string} userId - The ID of the user who owns the defense.
 * @param {string} defenseId - The ID of the defense to retrieve.
 * @returns {Promise<object|null>} A Promise that resolves to the requested Defense object if it exists,
 *   or null if it doesn't.
 */
export async function getDefense(userId, defenseId) {
  console.log("Fetching defense:", userId, defenseId);
  const doc = await db.collection(DEFENSES_COLLECTION)
    .doc(`${userId}_${defenseId}`)
    .get();
  console.log("Fetched doc:", doc.exists ? doc.data() : null);
  return doc.exists ? doc.data() : null;
}

/**
 * Retrieves an array of all defense documents from a Firestore database for a given user. It takes a userId
 * as a parameter, constructs a Firestore query to fetch all documents from the DEFENSES_COLLECTION where the
 * userId field matches the parameter, and then fetches the corresponding documents. It returns an array of
 * Defense objects, each containing the data of a document from the query result.
 *
 * @param {string} userId - The ID of the user whose defenses to retrieve.
 * @returns {Promise<object[]>} A Promise that resolves to an array of Defense objects representing the
 *   user's defenses.
 */
export async function getAllDefenses(userId) {
  const querySnapshot = await db.collection(DEFENSES_COLLECTION).where("userId", "==", userId).get();
  return querySnapshot.docs.map((doc) => doc.data());
}
