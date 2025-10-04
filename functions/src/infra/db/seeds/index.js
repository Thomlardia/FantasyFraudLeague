// Database seeding - defense seeding operations

import { getCollection, environment, isEmulator, db, createBatch } from '../index.js';
import { defenses as defensesObject} from './defenses.js';
// Convert defenses object to array for easier iteration
export const defenses = Object.values(defensesObject);

export const seedGlobalDefenses = async(options = {}) => {
  const { force = false } = options;
  console.log(`Seeding global defenses collection in ${environment} environment`);

  if (!isEmulator && !force) {
    throw new Error('Production seeding requires --force flag for safety');
  }

  const batch = createBatch();
  const defensesCollection = db.collection('defenses');

  defenses.forEach(defense => {
    const docRef = defensesCollection.doc(defense.defenseId);
    batch.set(docRef, defense, {merge: true});
  });

  try {
    await batch.commit();
    console.log(`Successfully seeded ${defenses.length} defenses globally`);
    return {
      success: true,
      message: `Seeded ${defenses.length} defenses globally`,
      environment
    };
  } catch (error) {
    console.error('Error seeding global defenses:', error);
    throw error;
  }
};

/**
 * Retrieves all defenses for a specific user
 * @param {string} userId - The user ID to retrieve defenses for
 * @returns {Promise<Array>} Array of defenses objects for the user
 */
export const getUserDefenses = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const userDoc = getCollection('users').doc(userId).get();
    const userData = (await userDoc).data();

    return userData?.ownedDefenses || {};

};