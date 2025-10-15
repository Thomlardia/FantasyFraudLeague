// This file contains the logic for all attack related operations.
import { getAllAttacks, saveAttackLogToDatabase } from "./repo.js";
import { getUserBalance, updateUserBalance} from "../wallet/service.js";
import { getUserOwnedDefensesComplete, getAllUsers } from "../defense/repo.js";
import { db } from "../../infra/db/index.js";

/**
 * Finds and returns the attack object for a given attack id
 * @param {string} attackId
 * @returns {object|null} The attack object or null if the object isn't found.
 */
export function getAttackInfo(attackId) {
  return getAllAttacks().find(a => a.attackId === attackId) || null;
}

/**
 * Generates a random wave of 4 attacks.
 * @returns {Array<object>} Array of 4 attack objects
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
 * @returns {Array<object>} Array of 3 attack objects
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
 * @returns {Array<object>} array of 4 attack objects
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
 * @returns {Array<object>} Array of 5 attack objects
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
 * Attack log is automatically saved to the database.
 * @param {string} userId - The user's ID
 * @param {Array<object>} wave - Array of attack objects 
 */
export async function attackDeduction(userId, wave) {
  // Get user's owned defenses with details
  const ownedDefenses = await getUserOwnedDefensesComplete(userId);
  const currentBalance = await getUserBalance(userId);

  // Initialize attack log
  const attackLog = {
    oldBalance: currentBalance,
    attacks: [],
    totalDamage: 0,
    newBalance: 0
  };

  // Calculate total damage after applying defenses
  let totalDamage = 0;
  
  for (const attack of wave) {
    let reducedDamage = attack.baseDamage || 0;
    const originalDamage = reducedDamage;
    const defensesApplied = [];
    
    // For each defense, check if it defends against this attack
    for (const defenseKey in ownedDefenses) {
      const defense = ownedDefenses[defenseKey];
      if (defense.defendsAgainst && defense.defendsAgainst[attack.attackId || attack.type]) {
        const percentages = defense.defendsAgainst[attack.attackId || attack.type];
        const level = defense.level || 1;
        // Level is 1-based, array is 0-based
        const percent = percentages[level - 1] || 0;
        
        if (percent > 0) {
          // Record defense effectiveness
          defensesApplied.push({
            defenseName: defense.name || defenseKey,
            level: level,
            reductionPercent: percent,
            damageBeforeDefense: reducedDamage,
            damageAfterDefense: reducedDamage * (1 - percent / 100)
          });
          
          // Reduce damage by this percentage
          reducedDamage = reducedDamage * (1 - percent / 100);
        }
      }
    }
    
    // Add attack details to log
    attackLog.attacks.push({
      attackName: attack.attackId || attack.type || attack.name,
      originalDamage: originalDamage,
      finalDamage: Math.round(reducedDamage),
      damageReduced: Math.round(originalDamage - reducedDamage),
      reductionPercent: originalDamage > 0 ? Math.round(((originalDamage - reducedDamage) / originalDamage) * 100) : 0,
      defensesApplied: defensesApplied
    });
    
    totalDamage += reducedDamage;
  }

  // Use transaction to update both balance and netWorth atomically
  const damage = Math.round(totalDamage);

  const newBalance = await db.runTransaction(async (transaction) => {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await transaction.get(userDocRef);

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const currentBalance = userData.balance || 0;
    const currentNetWorth = userData.netWorth || 0;

    const newBalance = currentBalance - damage;
    const newNetWorth = currentNetWorth - damage; // NetWorth decreases by damage amount
    let income = 0;
    if (newNetWorth > 0) {
      income = newNetWorth * 0.1;
    }
    const netWorthAfterIncome = newNetWorth + income

    transaction.update(userDocRef, {
      balance: newBalance,
      netWorth: netWorthAfterIncome,
    });

    return newBalance;
  });

  // Complete the attack log and save it after transaction
  attackLog.totalDamage = damage;
  attackLog.newBalance = newBalance;

  // Save attack log to database
  await saveAttackLogToDatabase(userId, attackLog);

  return newBalance;
}

/**
 * Executes attacks against all users in the system, using the attackDeduction function.
 * Attack logs are automatically saved to the database for each user.
 * @param {Array<object>} wave - Array of attack objects
 */
export async function massAttackDeduction(wave) {
  // Get all users
  const allUsers = await getAllUsers();

  // Process each user using the existing attackDeduction function
  for (const user of allUsers) {
    try {
      // Use the existing attackDeduction function to process the attack for this user
      await attackDeduction(user.id, wave);

    } catch (error) {
      // Log error for this user but continue with others
      console.error(`Failed to process attack for user ${user.id}:`, error.message);
    }
  }
}