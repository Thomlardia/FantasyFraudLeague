// This file contains the logic for all attack related operations.
import { getAllAttacks } from "./repo.js";
import { getUserBalance, updateUserBalance} from "../wallet/service.js";

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
 * Deducts money from the user's wallet after an attack wave. Assumes no defense are in place
 * @param {string} userId - The user's ID
 * @param {Array<object>} wave - Array of attack objects (each with baseDamage)
 * returns the new user balance after deduction
 */
export async function attackDeduction(userId, wave) {
  // Calculate total damage from the wave
  const totalDamage = wave.reduce((sum, attack) => sum + (attack.baseDamage || 0), 0);
  // Get current user balance
  const currentBalance = await getUserBalance(userId);
  // Deduct damage, but don't allow negative balance
  const newBalance = Math.max(0, currentBalance - totalDamage);
  // Update user balance
  await updateUserBalance(userId, newBalance);
  return newBalance;
}