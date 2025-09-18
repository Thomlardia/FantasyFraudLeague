import { 
  getDefenseTemplate,
  getAllDefenseTemplates,
  updateUserDefenseOwnership, 
  updateUserDefenseSummary,
  getUserOwnedDefenses 
} from "./repo.js";
import { getUserBalance, updateUserBalance } from "../wallet/service.js";

/**
 * Retrieves all defense templates with the user's current level for each defense.
 * @param {string} userId - The ID of the user to retrieve defenses for
 * @returns {Promise<Array<Object>>} Array of defense template objects with data
 */
export async function getUserDefenses(userId) {
  const [allTemplates, ownedList] = await Promise.all([
    getAllDefenseTemplates(),
    getUserOwnedDefenses(userId)       // get user's owned defenses with levels
  ]);
  
  // create ownership lookup map (defenseId -> level)
  const ownedMap = new Map(ownedList.map(d => [d.defenseId, d.level]));
  
  return allTemplates.map(template => {
    const userLevel = ownedMap.get(template.defenseId);
    return {
      ...template,                     // defense template data (cost, defendsAgainst, etc.)
      level: userLevel || 1,           // User's actual level OR default 1
    };
  });
}

/**
 * Buys a defense for a user if they don't already own it and have enough balance.
 * @param {string} userId - The ID of the user to buy the defense for
 * @param {string} defenseId - The ID of the defense to buy
 * @returns {Promise<Object>} The defense template object with the user's new level
 * @throws {Error} If the defense is not found, the user already owns it, the user doesn't have enough balance, or the defense cannot be purchased
 */
export async function buyDefense(userId, defenseId) {
  // check if defense template exists
  const template = await getDefenseTemplate(defenseId);
  if (!template) {
    throw new Error("Defense not found");
  }
  
  // check if user already owns it
  const ownedList = await getUserOwnedDefenses(userId);
  const alreadyOwned = ownedList.some(d => d.defenseId === defenseId);
  if (alreadyOwned) {
    throw new Error("You already own this defense");
  }
  
  const buyCost = template.cost[0]; // first element is buy cost
  if (!buyCost || buyCost <= 0) {
    throw new Error("This defense cannot be purchased");
  }
  
  const balance = await getUserBalance(userId);
  if (balance < buyCost) {
    throw new Error("Insufficient funds");
  }
  
  // deduct cost from user's balance
  await updateUserBalance(userId, balance - buyCost);
  
  await updateUserDefenseOwnership(userId, defenseId, 1);
  await updateUserDefenseSummary(userId);
  
  // return the defense with ownership info
  return {
    ...template,
    level: 1,
  };
}

/**
 * Upgrades a defense the user owns to the next level.
 * @param {string} userId - The ID of the user to upgrade the defense for
 * @param {string} defenseId - The ID of the defense to upgrade
 * @returns {Promise<Object>} The defense template object with the user's new level
 * @throws {Error} If the defense is not found, the user doesn't own it, the user doesn't have enough balance, or the defense cannot be upgraded further
 */
export async function upgradeDefense(userId, defenseId) {
  // get template and check ownership in parallel
  const [template, ownedList] = await Promise.all([
    getDefenseTemplate(defenseId),
    getUserOwnedDefenses(userId)
  ]);
  
  if (!template) {
    throw new Error("Defense not found");
  }
  
  const ownedDefense = ownedList.find(d => d.defenseId === defenseId);
  if (!ownedDefense) {
    throw new Error("You don't own this defense yet");
  }
  
  const currentLevel = ownedDefense.level;
  const upgradeCost = template.cost[currentLevel]; // next level cost
  
  if (!upgradeCost || upgradeCost <= 0) {
    throw new Error("This defense cannot be upgraded further");
  }
  
  if (currentLevel >= template.cost.length - 1) {
    throw new Error("Defense is already at maximum level");
  }
  
  const balance = await getUserBalance(userId);
  if (balance < upgradeCost) {
    throw new Error("Insufficient funds");
  }
  
  // deduct upgrade cost from user's balance
  await updateUserBalance(userId, balance - upgradeCost);
  
  // update ownership
  const newLevel = currentLevel + 1;
  await updateUserDefenseOwnership(userId, defenseId, newLevel);
  await updateUserDefenseSummary(userId);
  
  return {
    ...template,
    level: newLevel,
  };
}