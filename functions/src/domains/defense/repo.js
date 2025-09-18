// repo.js
import { db } from "../../infra/db/index.js";

/**
 * Saves a defense object to Firestore for a given user
 * @param {Object} defense - The defense object to save
 * @returns {Promise} Result of the save operation
 */
export async function saveDefense(defense) {
  await db.collection("users")
    .doc(defense.userId)
    .collection("defenses")
    .doc(defense.defenseId)
    .set(defense.toJSON(), { merge: true });
}


/**
 * Retrieves a specific defense for a given user
 * @param {string} userId - The user ID to retrieve the defense for
 * @param {string} defenseId - The defense ID to retrieve
 * @returns {Promise<Object | null>} The defense object if it exists, null otherwise.
 */
export async function getDefense(userId, defenseId) {
  const doc = await db.collection("users")
    .doc(userId)
    .collection("defenses")
    .doc(defenseId)
    .get();

  return doc.exists ? doc.data() : null;
}


/**
 * Retrieves all defenses for a given user
 * @param {string} userId - The user ID to retrieve the defenses for
 * @returns {Promise<Array>} Array of defense objects for the user
 */
export async function getAllDefenses(userId) {
  const querySnapshot = await db.collection("users")
    .doc(userId)
    .collection("defenses")
    .get();

  return querySnapshot.docs.map(doc => ({
    defenseId: doc.id,
    ...doc.data(),
  }));
}

/**
 * Retrieves defense summaries for a user from a Firestore database.
 * It calls the asynchronous function, getAllDefenses, to retrieve all the defenses for the user. 
 * It then filters the defenses to only include those that are owned by the user.
 * Populates the defenseSummary object with the defense details (level, buy cost, upgrade cost, and the defenses it can protect against). 
 * It also adds the defense details to the defensesList array.

Finally, it updates the user document in the Firestore database with the ownedDefenses, ownedDefensesList, and totalDefensesOwned
 * 
 * @param {string} userId - The user ID to retrieve the defenses for.
 * @returns {Promise<Object>} Defense summary object with data.
 * @param {Object} defenseSummary
 * @param {Array} ownedDefensesList
 * @param {number} totalDefensesOwned
 */
export async function updateUserDefenseSummary(userId) {
  const allDefenses = await getAllDefenses(userId);
  const ownedDefenses = allDefenses.filter(d => d.owned);

  const defenseSummary = {};
  const defensesList = [];

  ownedDefenses.forEach(d => {
    defenseSummary[d.defenseId] = {
      owned: true,
      level: d.level,
      buyCost: d.buyCost,
      upgradeCost: d.upgradeCost,
      defendsAgainst: d.defendsAgainst,
    };
    defensesList.push({ defenseId: d.defenseId, level: d.level });
  });

  await db.collection("users").doc(userId).update({
    ownedDefenses: defenseSummary,
    ownedDefensesList: defensesList,
    totalDefensesOwned: ownedDefenses.length,
  });
}

