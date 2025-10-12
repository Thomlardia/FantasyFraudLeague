// This file contains the logic for all attack related operations.
import { getAllAttacks } from "./repo.js";
import { getUserBalance, updateUserBalance} from "../wallet/service.js";
import { getUserOwnedDefensesComplete } from "../defense/repo.js";
import { db } from "../../infra/db/index.js";

/**
 * Finds and returns the attack object for a given attack id
 * @param {string} attackId
 * returns the attack object or null if the object isnt found.
 */
export function getAttackInfo(attackId) {
  return getAllAttacks().find(a => a.attackId === attackId) || null;
}

/**
 * Generates a random wave of 4 attacks.
 * returns array of 4 attack objects
 */
export function getRandomWave() {
  const attacksList = [...getAllAttacks()];
  for (let currentIndex = attacksList.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [attacksList[currentIndex], attacksList[randomIndex]] = [attacksList[randomIndex], attacksList[currentIndex]];
  }
  return attacksList.slice(0, 4);
}

/**
 * Generates an easy wave: 3 attacks, dangerLevel 1-2
 * returns array of 3 attack objects
 */
export function getEasyWave() {
  const eligibleAttacks = getAllAttacks().filter(attack => attack.dangerLevel >= 1 && attack.dangerLevel <= 2);
  const shuffledAttacks = [...eligibleAttacks];
  for (let currentIndex = shuffledAttacks.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledAttacks[currentIndex], shuffledAttacks[randomIndex]] = [shuffledAttacks[randomIndex], shuffledAttacks[currentIndex]];
  }
  return shuffledAttacks.slice(0, 3);
}

/**
 * Generates a medium wave: 4 attacks, dangerLevel 1-3
 * returns array of 4 attack obj
 */
export function getMediumWave() {
  const eligibleAttacks = getAllAttacks().filter(attack => attack.dangerLevel >= 1 && attack.dangerLevel <= 3);
  const shuffledAttacks = [...eligibleAttacks];
  for (let currentIndex = shuffledAttacks.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledAttacks[currentIndex], shuffledAttacks[randomIndex]] = [shuffledAttacks[randomIndex], shuffledAttacks[currentIndex]];
  }
  return shuffledAttacks.slice(0, 4);
}

/**
 * Generates a hard wave: 5 attacks, dangerLevel 2-4
 * returns array of 5 attack obj
 */
export function getHardWave() {
  const eligibleAttacks = getAllAttacks().filter(attack => attack.dangerLevel >= 2 && attack.dangerLevel <= 4);
  const shuffledAttacks = [...eligibleAttacks];
  for (let currentIndex = shuffledAttacks.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledAttacks[currentIndex], shuffledAttacks[randomIndex]] = [shuffledAttacks[randomIndex], shuffledAttacks[currentIndex]];
  }
  return shuffledAttacks.slice(0, 5);
}

/**
 * Deducts money from the user's wallet after an attack wave, considering owned defenses.
 * @param {string} userId - The user's ID
 * @param {Array<object>} wave - Array of attack objects 
 * returns the new user balance after deduction
 */
export async function attackDeduction(userId, wave) {
  // Get user's owned defenses with details
  const ownedDefenses = await getUserOwnedDefensesComplete(userId);

  // Calculate total damage after applying defenses
  let totalDamage = 0;
  for (const attack of wave) {
    let reducedDamage = attack.baseDamage || 0;
    // For each defense, check if it defends against this attack
    for (const defenseKey in ownedDefenses) {
      const defense = ownedDefenses[defenseKey];
      if (defense.defendsAgainst && defense.defendsAgainst[attack.attackId || attack.type]) {
        const percentages = defense.defendsAgainst[attack.attackId || attack.type];
        const level = defense.level || 1;
        // Level is 1-based, array is 0-based
        const percent = percentages[level - 1] || 0;
        // Reduce damage by this percentage
        reducedDamage = reducedDamage * (1 - percent / 100);
      }
    }
    totalDamage += reducedDamage;
  }

  // Use transaction to update both balance and netWorth atomically
  const damage = Math.round(totalDamage);

  return await db.runTransaction(async (transaction) => {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await transaction.get(userDocRef);

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const currentBalance = userData.balance || 0;
    const currentNetWorth = userData.netWorth || 0;

    const newBalance = Math.max(0, currentBalance - damage);
    const newNetWorth = currentNetWorth - damage; // NetWorth decreases by damage amount

    transaction.update(userDocRef, {
      balance: newBalance,
      netWorth: newNetWorth,
    });

    return newBalance;
  });
}