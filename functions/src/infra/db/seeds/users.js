// User management and seeding operations for Firestore database
import { db, createBatch, isEmulator, environment, auth, getCollection} from "../index.js";
import { defenses as defensesObject } from "./defenses.js";
import { updateUserDefenseSummary } from "../../../domains/defense/repo.js";
import { getAllUsers } from "./index.js";
import { getUserBalance } from "../../../domains/wallet/service.js";
import { getUserDefenses } from "./index.js";

// Convert defenses object to array
export const defenses = Object.values(defensesObject);

/**
 * Retrieves a specific user from Firestore
 * @param {string} userId - The user ID to retrieve
 * @returns {Promise<Object>} User object with data
 */
export const getUser = async (userId) => {
    const usersCollection = getCollection('users');
    const userDoc = await usersCollection.doc(userId).get();
    
    if (!userDoc.exists) {
        throw new Error(`User ${userId} not found`);
    }
    
    return { id: userDoc.id, ...userDoc.data() };
}

/**
 * Retrieves all authenticated users from Firebase Auth
 * @returns {Promise<Array>} Array of authenticated user objects
 */
export const getAllAuthenticatedUsers = async () => {
    console.log(`Retrieving authenticated users from ${environment} ...`);

    try {
        const listUsers = await auth.listUsers();
        const users = listUsers.users.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));

        console.log(`Found ${users.length} authenticated users`);
        return users;
    } catch (error) {
        console.log('Error retrieving authenticated users:', error);
    }
}

/**
 * Seeds users from Firebase Auth into Firestore
 * @param {Object} options - Configuration options
 * @returns {Promise} Result of the user seeding operation
 */
export const seedUsersFromAuth = async (options = {}) => {
    const { force = false } = options;
    console.log(`Seeding users from authentication in ${environment} environment`);

    // Safety check for production operations
    if (!isEmulator && !force) {
        throw new Error('Production seeding requires --force flag for safety');
    }

    try {
        const authenticatedUsers = await getAllAuthenticatedUsers();

        if (authenticatedUsers.length === 0) {
            console.log('No authenticated users found')
            return { success: true, usersSeeded: 0};
        }

        const usersCollection = getCollection('users');
        const batch = createBatch();
        let seedCount = 0;
        
        // Process each authenticated user
        for (const authUser of authenticatedUsers) {
            const userDoc = await usersCollection.doc(authUser.uid).get();

            if (!userDoc.exists) {
                const userData = {
                    id: authUser.uid,
                    email: authUser.email,
                    name: authUser.displayName || authUser.email?.split('@')[0] || 'Unknown User',
                    currentBalance: 1_000_000, // Starting balance
                    userType: 'player',
                    ownedDefenses: {},
                    totalDefensesOwned: 0
                };
                batch.set(usersCollection.doc(authUser.uid), userData, { merge: true});
                seedCount++;
                console.log(`${userDoc.exists ? 'Updating' : 'Creating'} user: ${authUser.email}`);
            } else {
                console.log(`User already exists: ${authUser.email}`);
            }
        }

        if (seedCount > 0) {
            await batch.commit();
            console.log(`Successfully seeded ${seedCount} users from authentication`);
        } else {
            console.log('No users needed seeding');
        }

        return {
            success: true,
            usersSeeded: seedCount
        };
    } catch (error) {
        console.error('Error seeding users from auth:', error);
    }
}

/**
 * Updates a user document with their owned defenses summary
 * @param {string} userId - The user ID to update
 * @param {Object} options - Configuration options
 * @returns {Promise} Result of the update operation
 */
<<<<<<< HEAD
export async function updateUserDefensesSummary(userId, { force } = {}) {
  return updateUserDefenseSummary(userId);
}
=======
export const updateUserDefensesSummary = async (userId, options = {}) => {
    const { force = false } = options;

    if (!userId) {
        throw new Error('User ID is required');
    }

    console.log(`Updating defense summary for user ${userId}`);

    // Safety check for production operations
    if (!isEmulator && !force) {
        throw new Error('Production operations require --force flag for safety');
    }

    try {
        // Get all defenses for this user
        const userDefenses = await getUserDefenses(userId);
        
        // Filter owned defenses and create summary
        const ownedDefenses = userDefenses.filter(defense => defense.owned === true);
        
        // Create defense summary object
        const defenseSummary = {};
        const defensesList = [];
        
        ownedDefenses.forEach(defense => {
            // Add to summary object (for easy querying)
            defenseSummary[defense.defenseId] = {
                owned: true,
                level: defense.level,
                buyCost: defense.buyCost,
                upgradeCost: defense.upgradeCost,
                defendsAgainst: defense.defendsAgainst
            };
            
            // Add to list format (for easy display)
            defensesList.push({
                defenseId: defense.defenseId,
                level: defense.level,
            });
        });

        // Update user document with defense information
        const userDoc = db.collection('users').doc(userId);
        await userDoc.update({
            ownedDefenses: defenseSummary,
            ownedDefensesList: defensesList,
            totalDefensesOwned: ownedDefenses.length,
        });

        console.log(`Updated defense summary for user ${userId} - ${ownedDefenses.length} defenses owned`);
        
        return {
            success: true,
            defensesOwned: ownedDefenses.length,
            summary: defenseSummary
        };

    } catch (error) {
        console.error(`Error updating defense summary for user ${userId}:`, error);
        throw error;
    }
};
>>>>>>> origin/develop

/**
 * Updates defense summaries for all users
 * @param {Object} options - Configuration options
 * @returns {Promise} Results of the operation
 */
export async function updateAllUsersDefensesSummary({ force } = {}) {
  const users = await getAllUsers();
  for (const user of users) {
    await updateUserDefenseSummary(user.id);
  }
}