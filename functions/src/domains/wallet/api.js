/**
 * This file exposes the wallet operations to the api layer.
 */

import { getUserBalance } from "./service.js"; /* import the logic functions from service.js */

/**
 * API: Get user balance.
 * @param {string} userId
 * returns the service function for getting user balance
 */
export async function apiGetUserBalance(userId) {
  return getUserBalance(userId); /* call service function to get user balance */
}
