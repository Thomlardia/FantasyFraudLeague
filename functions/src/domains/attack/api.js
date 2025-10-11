// This file exposes the attack operations to the api layer.
import { getAttackInfo, getEasyWave, getHardWave, getMediumWave, getRandomWave, attackDeduction, massAttackDeduction} from "./service.js";

/**
 * API: Get attack info.
 * @param {string} attackId
 * @returns {object|null} Attack object or null if not found
 */
export function apiGetAttackInfo(attackId) {
	return getAttackInfo(attackId);
}

/**
 * API: Get a random wave of 4 attacks.
 * @returns {Array<object>} Array of 4 attack objects
 */
export function apiGetRandomWave() {
	return getRandomWave();
}

/**
 * API: Get an easy wave: 3 attacks, dangerLevel 1-2.
 * @returns {Array<object>} Array of 3 attack objects
 */
export function apiGetEasyWave() {
	return getEasyWave();
}

/**
 * API: Get a medium wave: 4 attacks, dangerLevel 1-3
 * @returns {Array<object>} Array of 4 attack objects
 */
export function apiGetMediumWave() {
	return getMediumWave();
}

/**
 * API: Get a hard wave: 5 attacks, dangerLevel 2-4
 * @returns {Array<object>} array of 5 attack objects
 */
export function apiGetHardWave() {
	return getHardWave();
}

/**
 * API: Deduct money after attack wave
 * @param {string} userId - The user's ID
 * @param {Array<object>} wave - Array of attack objects 
 * @returns {object} Attack log containing old balance, attack details, defense effectiveness, and new balance
 */
export function apiAttackDeduction(userId, wave) {
	return attackDeduction(userId, wave);
}

/**
 * API: Execute mass attack against all users
 * @param {Array<object>} wave - Array of attack object
 * @returns {Array<object>} Array of attack logs for each user
 */
export function apiMassAttackDeduction(wave) {
	return massAttackDeduction(wave);
}

