/**
 * Triggers for updating the wallet balance of a user
 */
import { apiGetUserBalance, apiUpdateUserBalance } from "../../../domains/wallet/api.js"; 

/**
 * This function still needs to be changed after calculating the actual damage, for now it assumes no defenses.
 * 
 * Handles a game attack event by deducting the specified amount from the user's (defender's) wallet.
 * @param {Object} attackEvent - The event data for the attack.
 * @param {string} attackEvent.userId - The user ID of the defender.
 * @param {number} attackEvent.baseDamage - The amount to deduct from the user's wallet.
 * returns nothing, only updates the balance
 */
export async function onAttackDeduction(attackEvent) {
  const { userId, baseDamage } = attackEvent; /* Get the user id and the amount lost from the attack */
  if (typeof userId === "string" && typeof baseDamage === "number") { /* Check for correct input types */
    const userBalance = await apiGetUserBalance(userId); /* Get the current balance of the user */
    await apiUpdateUserBalance(userId, userBalance - baseDamage); /* Deduct the amount from the user's balance */
  } else {
    throw new Error("Invalid attack event data"); /* Error if no correct input types */
  }
}

/* Empty functions for future use */

/**
 * Substracts money from wallet after buying a defense
 * @param {Object} defense 
 * @param {string} defense.userId
 * @param {Integer} defense.buyCost
 * returns nothing, only updates the balance
 */
export async function onDefenseDeduction(defense) {}

/**
 * Substracts money from wallet after upgrading a defense
 * @param {Object} defense 
 * @param {string} defense.userId
 * @param {Integer} defense.upgradeCost
 * returns nothing, only updates the balance
 */
export async function onUpgradeDeduction(defense) {}

/**
 * Adds money to wallet after income
 * @param {integer} income
 * @param {string} userId
 * returns nothing, only updates the balance
 */
export async function onIncomeAddition(income, userId) {}
