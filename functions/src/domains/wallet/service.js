/**
 * This file contains the logic for all wallet-related operations.
 * eg. getting and updating user balances.
 */

import { getBalance, setBalance } from "./repo.js"; /* functions for firestore acces*/

/**
 * Calls the repository function to fetch the balance for the given user ID.
 * @param {string} userId
 * returns the repository function result, the user's balance 
 */
export async function getUserBalance(userId) {
  return getBalance(userId); 
}

/**
 * Updates the user's balance to a specific value.
 * @param {string} userId
 * @param {number} newBalance
 * Returns noting, calls the repository function to update the balance.
 */
export async function updateUserBalance(userId, newBalance) {
    /* Validate that the new balance is a valid number, throw an error if not.*/
  if (typeof newBalance !== "number" || isNaN(newBalance)) {
    throw new Error("Invalid balance value");
  }
  /* Call the repository function to update the user's balance */
  await setBalance(userId, newBalance);
}