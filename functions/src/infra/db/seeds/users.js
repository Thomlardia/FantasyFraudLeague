// User management and seeding operations for Firestore database
import { db, createBatch, isEmulator, environment, auth, getCollection} from "../index.js";
import { defenses as defensesObject } from "./defenses.js";

// Convert defenses object to array
export const defenses = Object.values(defensesObject);

/**
 * Seeds defense data for a specific user - mainly used to seedAllUserDefenses 
 * @param {string} userId - The user ID to seed defenses for
 * @param {Object} options - Configuration options
 * @returns {Promise} Result of the seeding operation
 */
export const seedUserDefenses = async (userId, options = {}) => {
    const { force = false} = options;

    // Validate user ID
    if (!userId) {
        throw new Error('User ID is required for seeding defenses');
    }

    console.log(`Seeding defenses for user ${userId} in ${environment} environment`);

    if (!isEmulator && !force) {
        throw new Error('Production seeding requires --force flag for safety');
    }

    // Safety check for production operations
    const batch = createBatch();
    const userDefensesCollection = db.collection('users').doc(userId).collection('defenses');

    // Add all defenses to the batch operation
    defenses.forEach(defense => {
        const docRef = userDefensesCollection.doc(defense.defenseId);
        batch.set(docRef, {
            ...defense,
            userId: userId     // Add user reference to defense data
        }, { merge: true});    // Use merge to preserve existing data
    });

    try {
        await batch.commit();
        console.log(`Successfully seeded ${defenses.length} defenses for user ${userId}`);
        return {
            success: true,
            message: `Seeded ${defenses.length} defenses for user ${userId}`,
            environment
        };
    } catch (error) {
        console.error('Error seeding user defenses', error);
    }
};

/**
 * Seeds defenses for all users in the database
 * @param {Object} options - Configuration options
 * @returns {Promise} Results of the seeding operation
 */
export const seedAllUsersDefenses = async (options = {}) => {
    const { force = false } = options;

    console.log('Seeding defenses for all users');

    // Safety check for production operations
    if (!isEmulator && !force) {
        throw new Error('Production seeding requires --force flag for safety');
    }

    // Get all users from Firestore
    const userSnapshot = await db.collection('users').get();

    // Process each user sequentially
    for (const userDoc of userSnapshot.docs) {
        try {
            await seedUserDefenses(userDoc.id, { force });
            console.log(`Successfully seeded defenses for user ${userDoc.id}`);

        } catch (error) {
            console.error(`Failed to seed defenses for ${userDoc.id}:`, error);
        }
    }

    return {success: true, environment};
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

    const userDefensesCollection = db.collection('users').doc(userId).collection('defenses');
    const snapshot = await userDefensesCollection.get();

    const defenses = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        defenses.push({ id: doc.id, ...data});
    });

    return defenses;
};

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
 * Clears defense summary fields from a user document (not the defenses subcollection)
 * @param {string} userId - The user ID to clear defense summaries for
 * @param {Object} options - Configuration options
 * @returns {Promise<boolean>} Success status
 */
export const clearUserDefensesSummaries = async (userId, options = {}) => {
    const { force = false } = options;

    // Safety check for production operations
    if (!isEmulator && !force) {
        throw new Error('Clearing production data requires force flag');
    }

    if (!userId) {
        throw new Error('User ID is required');
    }

    console.log(`Clearing defense summaries for user ${userId} in ${environment} environment`);

    try {
        // Clear only the summary fields from the user document
        const userDoc = db.collection('users').doc(userId);
        await userDoc.update({
            ownedDefenses: {},
            ownedDefensesList: [],
            totalDefensesOwned: 0,
            lastDefenseUpdate: null
        });

        console.log(`Cleared defense summaries for user ${userId}`);
        return true;
    } catch (error) {
        console.error(`Error clearing defense summaries for user ${userId}:`, error);
        throw error;
    }
};

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
                nextLevelCost: calculateNextLevelCost(defense),
                defendsAgainst: defense.defendsAgainst
            };
            
            // Add to list format (for easy display)
            defensesList.push({
                defenseId: defense.defenseId,
                level: defense.level,
                nextLevelCost: calculateNextLevelCost(defense)
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

/**
 * Calculate the cost for the next level of a defense
 * @param {Object} defense - The defense object
 * @returns {number} Cost for next level upgrade
 */
const calculateNextLevelCost = (defense) => {
    const baseUpgradeCost = defense.upgradeCost || defense.buyCost * 0.6;
    const levelMultiplier = Math.pow(1.2, defense.level - 1); // 20% increase per level
    return Math.floor(baseUpgradeCost * levelMultiplier);
};

/**
 * Updates defense summaries for all users
 * @param {Object} options - Configuration options
 * @returns {Promise} Results of the operation
 */
export const updateAllUsersDefensesSummary = async (options = {}) => {
    const { force = false } = options;

    console.log('Updating defense summaries for all users');

    // Safety check for production operations
    if (!isEmulator && !force) {
        throw new Error('Production operations require --force flag for safety');
    }

    // Get all users from Firestore
    const userSnapshot = await db.collection('users').get();
    let successCount = 0;
    let errorCount = 0;

    // Process each user sequentially
    for (const userDoc of userSnapshot.docs) {
        try {
            await updateUserDefensesSummary(userDoc.id, { force });
            successCount++;
        } catch (error) {
            console.error(`Failed to update defense summary for ${userDoc.id}:`, error);
            errorCount++;
        }
    }

    console.log(`Completed defense summary updates: ${successCount} successful, ${errorCount} failed`);
    
    return {
        success: true,
        successCount,
        errorCount,
        environment
    };
};