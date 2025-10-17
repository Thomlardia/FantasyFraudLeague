import {
  getUserDefenses,
  buyDefense,
  upgradeDefense,
  sellDefense,
  clearDefenseCache,
  InsufficientFundsError,
  NotFoundError,
  AlreadyOwnedError
} from "./service.js";
import { HttpsError } from "firebase-functions/v2/https";

/**
 * API: Get user defenses with ownership status.
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of defense objects with user levels
 */
export async function apiGetUserDefenses(userId) {
  try {
    return getUserDefenses(userId);
  } catch (err) {
    throw new HttpsError("internal", err.message);
  }
  
}

/**
 * API: Buy a defense for a user.
 * @param {string} userId - The user ID
 * @param {string} defenseId - The defense to buy
 * @returns {Promise<Object>} Purchased defense object
 */
export async function apiBuyDefense(userId, defenseId) {
  try {
    return await buyDefense(userId, defenseId);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      throw new HttpsError("failed-precondition", "Not enough funds to buy defense");
    }
    if (err instanceof AlreadyOwnedError) {
      throw new HttpsError("already-exists", "You already own this defense");
    }
    if (err instanceof NotFoundError) {
      throw new HttpsError("not-found", "Defense not found");
    }
    throw new HttpsError("internal", err.message);
  }
}

/**
 * API: Upgrade a defense for a user.
 * @param {string} userId - The user ID
 * @param {string} defenseId - The defense to upgrade
 * @returns {Promise<Object>} Upgraded defense object
 */
export async function apiUpgradeDefense(userId, defenseId) {
  try {
    return await upgradeDefense(userId, defenseId);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      throw new HttpsError("failed-precondition", "Not enough funds to upgrade defense");
    }
    if (err instanceof NotFoundError) {
      throw new HttpsError("not-found", "Defense not found");
    }
    throw new HttpsError("internal", err.message);
  }
}

/**
 * API: Sell a defense for a user.
 * @param {string} userId - The user ID
 * @param {string} defenseId - The defense to sell
 * @returns {Promise<Object>} Sell result with sellPrice and loss
 */
export async function apiSellDefense(userId, defenseId) {
  try {
    return await sellDefense(userId, defenseId);
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw new HttpsError("not-found", "Defense not found");
    }
    if (err.message === "You don't own this defense") {
      throw new HttpsError("failed-precondition", "You don't own this defense");
    }
    throw new HttpsError("internal", err.message);
  }
}

/**
 * API: Clear defense cache (admin only).
 * @param {string} adminUserId - Admin user ID for authorization
 * @returns {Promise<void>}
 */
export async function apiClearDefenseCache(adminUserId) {
  return clearDefenseCache();
}

