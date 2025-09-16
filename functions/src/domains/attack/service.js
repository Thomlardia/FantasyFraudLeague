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
