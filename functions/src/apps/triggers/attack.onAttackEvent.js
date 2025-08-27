/**
 * Trigger: Deducts money from the user's wallet after a fraud attack event.
 */
import { apiGetUserBalance, apiUpdateUserBalance } from "../../domains/wallet/api.js"; 

/**
 * This function still needs to be changed after calculating the actual damage, for now it assumes no defenses.
 * 
 * Handles a game attack event by deducting the specified amount from the user's (defender's) wallet.
 * @param {Object} attackEvent - The event data for the attack.
 * @param {string} attackEvent.userId - The user ID of the defender.
 * @param {number} attackEvent.baseDamage - The amount to deduct from the user's wallet.
 * @returns {Promise<void>}
 */
export async function onAttackEvent(attackEvent) {
  const { userId, baseDamage } = attackEvent; /* Get the user id and the amount lost from the attack */
  if (typeof userId === "string" && typeof baseDamage === "number") { /* Check for correct input types */
    const userBalance = await apiGetUserBalance(userId); /* Get the current balance of the user */
    await apiUpdateUserBalance(userId, userBalance - amount); /* Deduct the amount from the user's balance */
  } else {
    throw new Error("Invalid attack event data"); /* Error if no correct input types */
  }
}
