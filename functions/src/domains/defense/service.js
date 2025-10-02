import { 
  getAllDefenseTemplates,
  getUserOwnedDefenses 
} from "./repo.js";
import { db } from "../../infra/db/index.js";

// in-memory cache for defense templates
let defenseTemplatesCache = null;
let cacheLastUpdated = null;
let cachePromise = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves the list of defense templates from the in-memory cache.
 * If the cache is empty or has expired, it fetches new data from Firestore
 * @returns {Promise<Array<Object>>} List of defense templates
 */
async function getCachedDefenseTemplates() {
  const now = Date.now();
  const expired = !defenseTemplatesCache || !cacheLastUpdated || (now - cacheLastUpdated > CACHE_DURATION);

  if (expired) {
    if (!cachePromise) {
      console.log("Refreshing defense templates cache...");
      cachePromise = getAllDefenseTemplates().then((data) => {
        defenseTemplatesCache = data;
        cacheLastUpdated = Date.now();
        cachePromise = null;  // reset after successful update
        return defenseTemplatesCache;
      }).catch((error) => {
        cachePromise = null;  // reset after error as well
        throw error;
      })
    }

    return cachePromise; // all callers share this promise
  }

  return defenseTemplatesCache;
}

/**
 * Retrieves a single defense template from the in-memory cache.
 * If the cache is empty or has expired, it fetches new data from Firestore
 * @param {string} defenseId - The ID of the defense to retrieve
 * @returns {Promise<Object|Null>} The defense template object with data, or null if it doesn't exist
 */
async function getCachedDefenseTemplate(defenseId) {
  const templates = await getCachedDefenseTemplates();
  return templates.find(t => t.defenseId === defenseId) || null;
}

/**
 * Retrieves all defense templates with the user's current level for each defense.
 * @param {string} userId - The ID of the user to retrieve defenses for
 * @returns {Promise<Array<Object>>} Array of defense template objects with data
 */
export async function getUserDefenses(userId) {
  const [allTemplates, ownedList] = await Promise.all([
    getCachedDefenseTemplates(),    // use cache instead of direct DB read
    getUserOwnedDefenses(userId)    // get user's owned defenses with levels
  ]);
  
  // create ownership lookup map (defenseId -> level)
  const ownedMap = new Map(ownedList.map(d => [d.defenseId, d.level]));
  
  return allTemplates.map(template => {
    const userLevel = ownedMap.get(template.defenseId);
    
    // More consistent level handling:
    // - If not owned: level = 0, displayLevel = 0
    // - If owned at level 1: level = 1, displayLevel = 1
    // - If owned at level 2: level = 2, displayLevel = 2, etc.
    
    const actualLevel = userLevel || 0;
    const isOwned = actualLevel > 0;
    
    return {
      ...template,
      level: actualLevel,
      isOwned: isOwned,
      displayLevel: actualLevel,
      // Add cost for next action (buy if not owned, upgrade if owned)
      nextActionCost: isOwned ? template.cost[actualLevel] || 0 : template.cost[0] || 0,
      canUpgrade: isOwned && actualLevel < template.cost.length,
      isMaxLevel: isOwned && actualLevel >= template.cost.length
    };
  });
}

/**
 * Get a specific defense with user's ownership status (uses cache)
 * @param {string} userId - User ID
 * @param {string} defenseId - Defense ID to get
 * @returns {Promise<Object|null>} Defense object with user's level
 */
export async function getUserDefense(userId, defenseId) {
  const allDefenses = await getUserDefenses(userId);
  return allDefenses.find(d => d.defenseId === defenseId) || null;
}

/**
 * Buys a defense for a user if they don't already own it and have enough balance.
 * Uses Firestore transaction to prevent concurrency issues.
 * @param {string} userId - The ID of the user to buy the defense for
 * @param {string} defenseId - The ID of the defense to buy
 * @returns {Promise<Object>} The defense template object with the user's new level
 * @throws {Error} If the defense is not found, the user already owns it, the user doesn't have enough balance, or the defense cannot be purchased
 */
export async function buyDefense(userId, defenseId) {
  // check if defense template exists from cache
  const template = await getCachedDefenseTemplate(defenseId);
  if (!template) {
    throw new NotFoundError();
  }

  const buyCost = template.cost[0]; // first element is buy cost
  if (!buyCost || buyCost <= 0) {
    throw new Error("This defense cannot be purchased");
  }

  // use Firestore transaction to prevent concurrency issues
  return await db.runTransaction(async (transaction) => {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await transaction.get(userDocRef);
    
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const currentBalance = userData.balance || 0;
    const ownedDefensesList = userData.ownedDefensesList || [];

    // check if user already owns the defense
    const alreadyOwned = ownedDefensesList.some(d => d.defenseId === defenseId);
    if (alreadyOwned) {
      throw new AlreadyOwnedError();
    }

    // check if user has enough balance
    if (currentBalance < buyCost) {
      throw new InsufficientFundsError();
    }

    // update user's balance atomically
    const newBalance = currentBalance - buyCost;
    const newOwnedList = [...ownedDefensesList, { defenseId, level: 1 }];

    // create defense summary entry
    const currentOwnedDefenses = userData.ownedDefenses || {};
    const newOwnedDefenses = {
      ...currentOwnedDefenses,
      [defenseId]: {
        level: 1,
        buyCost: template.cost[0],
        upgradeCost: template.cost[1] || 0,
        defendsAgainst: template.defendsAgainst,
      }
    };

    transaction.update(userDocRef, {
      balance: newBalance,
      ownedDefensesList: newOwnedList,
      ownedDefenses: newOwnedDefenses,
      totalDefensesOwned: newOwnedList.length,
    });
    
    return {
      ...template,
      level: 1
    };
  });
}

/**
 * Upgrades a defense the user owns to the next level.
 * Uses Firestore transaction to prevent concurrency issues.
 * @param {string} userId - The ID of the user to upgrade the defense for
 * @param {string} defenseId - The ID of the defense to upgrade
 * @returns {Promise<Object>} The defense template object with the user's new level
 * @throws {Error} If the defense is not found, the user doesn't own it, the user doesn't have enough balance, or the defense cannot be upgraded further
 */
export async function upgradeDefense(userId, defenseId) {
  // get template from cache
  const template = await getCachedDefenseTemplate(defenseId);  
  if (!template) {
    throw new NotFoundError();
  }
  
  // use Firestore transaction to prevent concurrency issues
  return await db.runTransaction(async (transaction) => {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await transaction.get(userDocRef);
    
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const currentBalance = userData.balance || 0;
    const ownedDefensesList = userData.ownedDefensesList || [];

    // find the owned defense
    const ownedIndex = ownedDefensesList.findIndex(d => d.defenseId === defenseId);
    if (ownedIndex < 0) {
      throw new Error("You don't own this defense");
    }

    const currentLevel = ownedDefensesList[ownedIndex].level;
    if (currentLevel >= template.cost.length) {
      throw new Error("This defense has reached its maximum level");
    }

    const upgradeCost = template.cost[currentLevel];  // next level cost
    if (!upgradeCost || upgradeCost <= 0) {
      throw new Error("This defense cannot be upgraded further");
    }

    // check if user has enough balance
    if (currentBalance < upgradeCost) {
      throw new InsufficientFundsError();
    }

    // update user's balance atomically
    const newBalance = currentBalance - upgradeCost;
    const newLevel = currentLevel + 1;

    // update owned defenses list
    const newOwnedList = [...ownedDefensesList];
    newOwnedList[ownedIndex] = { defenseId, level: newLevel };

    // update defense summary
    const currentOwnedDefenses = userData.ownedDefenses || {};
    const newOwnedDefenses = {
      ...currentOwnedDefenses,
      [defenseId]: {
        level: newLevel,
        buyCost: template.cost[0],
        upgradeCost: template.cost[newLevel] || 0,
        defendsAgainst: template.defendsAgainst,
      }
    };

    transaction.update(userDocRef, {
      balance: newBalance,
      ownedDefensesList: newOwnedList,
      ownedDefenses: newOwnedDefenses,
      totalDefensesOwned: newOwnedList.length,
    });
    
    return {
      ...template,
      level: newLevel,
    };
  });
}

/**
 * Clears the in-memory cache for defense templates.
 * This can be used for testing or when templates are updated
 */
export function clearDefenseCache() {
  defenseTemplatesCache = null;
  cacheLastUpdated = null;
  cachePromise = null;
}

export class InsufficientFundsError extends Error {
/**
 * Constructor for InsufficientFundsError class.
 * 
 * @param {string} [message] - Optional message to be passed to the Error constructor.
 */
  constructor() {
    super("Insufficient funds");
    this.name = "InsufficientFundsError";
  }
}

export class AlreadyOwnedError extends Error {
/**
 * Constructor for AlreadyOwnedError class.
 * 
 * @param {string} [message] - Optional message to be passed to the Error constructor.
 */
  constructor() {
    super("You already own this defense");
    this.name = "AlreadyOwnedError";
  }
}

export class NotFoundError extends Error {
/**
 * Constructor for NotFoundError class.
 * 
 * @param {string} [message] - Optional message to be passed to the Error constructor.
 * Defaults to "Defense not found".
 */
  constructor(message = "Defense not found") {
    super(message);
    this.name = "NotFoundError";
  }
}
