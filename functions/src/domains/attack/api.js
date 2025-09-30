// This file exposes the attack operations to the api layer.
import { getAttackInfo, getEasyWave, getHardWave, getMediumWave, getRandomWave, attackDeduction, massAttackDeduction} from "./service.js";

/**
 * API: Get attack info.
 * @param {string} attackId
 * returns attack obj
 */
export function apiGetAttackInfo(attackId) {
	return getAttackInfo(attackId);
}

/**
 * API: Get a random wave of 4 attacks.
 * returns list of 4 attack obj
 */
export function apiGetRandomWave() {
	return getRandomWave();
}

/**
 * API: * Get an easy wave: 3 attacks, dangerLevel 1-2
 * returns list of 3 attack obj
 */
export function apiGetEasyWave() {
	return getEasyWave();
}

/**
 * API: * Get a medium wave: 4 attacks, dangerLevel 1-3
 * returns list of 4 attack obj
 */
export function apiGetMediumWave() {
	return getMediumWave();
}

/**
 * API: * Get a hard wave: 5 attacks, dangerLevel 2-4
 * returns list of 5 attack obj
 */
export function apiGetHardWave() {
	return getHardWave();
}

/**
 * API: * Deduct money after attack wave
 * @param {string} userId - The user's ID
 * @param {Array<object>} wave - Array of attack objects 
 */
export function apiAttackDeduction(userId, wave) {
	return attackDeduction(userId, wave);
}

/**
 * API: Execute mass attack against all users
 * @param {Array<object>} wave - Array of attack objects 
 * returns array of attack logs for each user
 */
export function apiMassAttackDeduction(wave) {
	return massAttackDeduction(wave);
}

