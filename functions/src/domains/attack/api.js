// This file exposes the attack operations to the api layer.
import { getAttackInfo, getEasyWave, getHardWave, getMediumWave, apiGetRandomWave, attackDeduction} from "./service.js";

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
 */
export function apiAttackDeduction() {
	return attackDeduction();
}
