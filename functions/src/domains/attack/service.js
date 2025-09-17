// This file contains the logic for all attack related operations.
import { getAllAttacks } from "./repo.js";

/**
 * Finds and returns the attack object for a given attack id
 * @param {string} attackId
 * returns the attack object or null if the object isnt found.
 */
export function getAttackInfo(attackId) {
  return getAllAttacks().find(a => a.attackId === attackId) || null;
}

/**
 * Generates a random wave of 5 unique attacks.
 * returns array of 5 attack objects
 */
export function getRandomWave() {
  const attacksList = [...getAllAttacks()];
  for (let currentIndex = attacksList.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [attacksList[currentIndex], attacksList[randomIndex]] = [attacksList[randomIndex], attacksList[currentIndex]];
  }
  return attacksList.slice(0, 5);
}