// This file contains the attack repository for accessing attack info directly from the model.
// the attack info is not stored in the database. 
import { attacks } from "./model.js";

/**
 * Gets all attack objects.
 * @returns {Array<object>} Array of all attack objects
 */
export function getAllAttacks() {
  return attacks;
}
