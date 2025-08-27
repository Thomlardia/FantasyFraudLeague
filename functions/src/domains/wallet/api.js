/**
 * This file exposes the wallet operations to the api layer.
 */

import { getUserBalance, updateUserBalance } from "./service.js"; /* import the logic functions from service.js */

/**
 * API: Get user balance.
 * @param {string} userId 
 * @returns {Promise<number>}
 */
export async function apiGetUserBalance(userId) {
  return getUserBalance(userId); /* call service function to get user balance */
}

/**
 * API: Update user balance.
 * @param {string} userId
 * @param {number} newBalance
 * @returns {Promise<void>}
 */
export async function apiUpdateUserBalance(userId, newBalance) {
  return updateUserBalance(userId, newBalance); /* call service function to update user balance */
}