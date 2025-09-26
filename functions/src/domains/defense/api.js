import { 
  getUserDefenses, 
  buyDefense, 
  upgradeDefense,
  clearDefenseCache
} from "./service.js";

/**
 * API: Get user defenses with ownership status.
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of defense objects with user levels
 */
export async function apiGetUserDefenses(userId) {
  return getUserDefenses(userId);
}

/**
 * API: Buy a defense for a user.
 * @param {string} userId - The user ID
 * @param {string} defenseId - The defense to buy
 * @returns {Promise<Object>} Purchased defense object
 */
export async function apiBuyDefense(userId, defenseId) {
  return buyDefense(userId, defenseId);
}

/**
 * API: Upgrade a defense for a user.
 * @param {string} userId - The user ID  
 * @param {string} defenseId - The defense to upgrade
 * @returns {Promise<Object>} Upgraded defense object
 */
export async function apiUpgradeDefense(userId, defenseId) {
  return upgradeDefense(userId, defenseId);
}

/**
 * API: Clear defense cache (admin only).
 * @param {string} adminUserId - Admin user ID for authorization
 * @returns {Promise<void>}
 */
export async function apiClearDefenseCache(adminUserId) {
  return clearDefenseCache();
}