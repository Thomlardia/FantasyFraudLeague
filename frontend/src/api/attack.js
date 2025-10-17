import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

/**
 * Fetch user's attack logs from the backend
 * @param {number|null} limit - Optional limit for number of logs to retrieve
 * @returns {Promise<Array>} Array of attack log objects
 */
export async function getUserAttackLogs(limit = null) {
  const fn = httpsCallable(functions, "user_getAttackLogs");
  const result = await fn({ limit });
  return result.data;
}

/**
 * Fetch upcoming scheduled attacks
 * @param {number|null} limit - Optional limit for number of scheduled attacks to retrieve
 * @returns {Promise<Array>} Array of scheduled attack objects
 */
export async function getScheduledAttacks(limit = null) {
  const fn = httpsCallable(functions, "user_getScheduledAttacks");
  const result = await fn({ limit });
  return result.data;
}

/**
 * Admin: Trigger random mass attack wave (4 random attacks)
 * @returns {Promise<void>}
 */
export async function adminMassAttackRandom() {
  const fn = httpsCallable(functions, "admin_massAttackRandom", {
    limitedUseAppCheckTokens: true  // Prevent replay attacks
  });
  const result = await fn();
  return result.data;
}

/**
 * Admin: Trigger easy mass attack wave (3 attacks, danger 1-2)
 * @returns {Promise<void>}
 */
export async function adminMassAttackEasy() {
  const fn = httpsCallable(functions, "admin_massAttackEasy", {
    limitedUseAppCheckTokens: true  // Prevent replay attacks
  });
  const result = await fn();
  return result.data;
}

/**
 * Admin: Trigger medium mass attack wave (4 attacks, danger 1-3)
 * @returns {Promise<void>}
 */
export async function adminMassAttackMedium() {
  const fn = httpsCallable(functions, "admin_massAttackMedium", {
    limitedUseAppCheckTokens: true  // Prevent replay attacks
  });
  const result = await fn();
  return result.data;
}

/**
 * Admin: Trigger hard mass attack wave (5 attacks, danger 2-4)
 * @returns {Promise<void>}
 */
export async function adminMassAttackHard() {
  const fn = httpsCallable(functions, "admin_massAttackHard", {
    limitedUseAppCheckTokens: true  // Prevent replay attacks
  });
  const result = await fn();
  return result.data;
}

/**
 * Admin: Trigger custom mass attack wave
 * @param {Array<object>} wave - Array of attack objects with attackId and baseDamage
 * @returns {Promise<void>}
 */
export async function adminMassAttackCustom(wave) {
  const fn = httpsCallable(functions, "admin_massAttackCustom", {
    limitedUseAppCheckTokens: true  // Prevent replay attacks
  });
  const result = await fn({ wave });
  return result.data;
}

/**
 * Admin: Schedule a mass attack for future execution
 * @param {Array<object>} wave - Array of attack objects
 * @param {Date|string|number} scheduledAt - Time the attack should execute
 * @param {string} [notes] - Optional description
 * @returns {Promise<object>} Scheduled attack metadata
 */
export async function adminScheduleAttack(wave, scheduledAt, notes = "") {
  const fn = httpsCallable(functions, "admin_scheduleAttack", {
    limitedUseAppCheckTokens: true
  });
  const result = await fn({ wave, scheduledAt, notes });
  return result.data;
}
