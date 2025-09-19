import { db } from "../../infra/db/index.js";

/**
 * Retrieves all users from Firestore
 * @returns {Promise<Array<Object>>} Array of user objects with data
 */
export const getAllUsers = async () => {
  const usersCollection = db.collection("users");
  const snapshot = await usersCollection.get();
  const users = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    users.push({ id: doc.id, ...data});
  });
  return users;
}

/**
 * Retrieves all documents from the "defenses" collection in the Firestore database.
 * @returns {Promise<Array<Object>>} Array of defense template objects with data
 */
export async function getAllDefenseTemplates() {
  const querySnapshot = await db.collection("defenses").get();
  return querySnapshot.docs.map(doc => ({
    defenseId: doc.id,
    ...doc.data(),
  }));
}

/**
 * Retrieves a single defense template from the "defenses" collection in the Firestore database.
 * @param {string} defenseId - The ID of the defense to retrieve
 * @returns {Promise<Object|Null>} Defense template object with data, or null if it doesn't exist
 */
export async function getDefenseTemplate(defenseId) {
  const doc = await db.collection("defenses").doc(defenseId).get();
  return doc.exists ? { defenseId: doc.id, ...doc.data() } : null;
}

/**
 * Returns the complete owned defense data of the fraud attacks each defense owned protest against & effectiveness levels,
 * buy & upgrade cost for the currently owned defense, and the level that the user currently owns the defense at.
 * @param {string} userId - The ID of the user to retrieve owned defenses for
 * @returns {Promise<Object>} Owned defense templates object with complete data
 */
export async function getUserOwnedDefensesComplete(userId) {
  const userDoc = await db.collection("users").doc(userId).get();
  if (!userDoc.exists) return {};
  return userDoc.data().ownedDefenses || {};
}


/**
 * Retrieves the list of owned defense templates for a user from the "users" collection in the Firestore database.
 * This retrieves the a list of defense id and associated level only i.e. "ownedDefensesList" field in the user document.
 * @param {string} userId - The ID of the user to retrieve owned defenses for
 * @returns {Promise<Array<Object>>} Array of owned defense templates with data
 */
export async function getUserOwnedDefenses(userId) {
  const userDoc = await db.collection("users").doc(userId).get();
  
  if (!userDoc.exists) {
    return [];
  }
  
  const userData = userDoc.data();
  return userData.ownedDefensesList || [];
}

/**
 * Updates a user's owned defense templates list in the "users" collection in the Firestore database.
 * @param {string} userId - The ID of the user to update owned defenses for
 * @param {string} defenseId - The ID of the defense to update
 * @param {number} level - The level of the defense to update
 * @returns {Promise<void>} Result of the update operation
 */
export async function updateUserDefenseOwnership(userId, defenseId, level) {
  const userDoc = await db.collection("users").doc(userId).get();
  const userData = userDoc.data() || {};
  const currentList = userData.ownedDefensesList || [];
  
  // update or add the defense
  const existingIndex = currentList.findIndex(d => d.defenseId === defenseId);
  if (existingIndex >= 0) {
    currentList[existingIndex].level = level;
  } else {
    currentList.push({ defenseId, level });
  }
  
  await db.collection("users").doc(userId).update({
    ownedDefensesList: currentList
  });
}

/**
 * Updates a user's defense summary in the "users" collection in the Firestore database.
 * 
 * This function retrieves the user's owned defenses and all defense templates from Firestore,
 * creates a lookup map for the defense templates, and then populates the defense summary
 * object with the relevant data from the owned defenses and defense templates.
 * 
 * @param {string} userId - The ID of the user to update the defense summary for
 * @returns {Promise<void>} Result of the update operation
 */
export async function updateUserDefenseSummary(userId) {
  const [ownedDefenses, templates] = await Promise.all([
    getUserOwnedDefenses(userId),
    getAllDefenseTemplates()
  ]);
  
  // create template lookup map
  const templateMap = new Map(templates.map(t => [t.defenseId, t]));
  
  const defenseSummary = {};
  
  // populate summary
  ownedDefenses.forEach(ownedDefense => {
    const template = templateMap.get(ownedDefense.defenseId);
    if (template) {
      defenseSummary[ownedDefense.defenseId] = {
        level: ownedDefense.level,
        buyCost: template.cost[0],
        upgradeCost: template.cost[ownedDefense.level] || 0,
        defendsAgainst: template.defendsAgainst,
      };
    }
  });
  
  await db.collection("users").doc(userId).update({
    ownedDefenses: defenseSummary,
    ownedDefensesList: ownedDefenses, // Keep in sync
    totalDefensesOwned: ownedDefenses.length,
  });
}