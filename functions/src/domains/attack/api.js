// This file exposes the attack operations to the api layer.
import { getAttackInfo as serviceGetAttackInfo } from "./service.js";

/**
 * API: Get attack info.
 * @param {string} attackId
 * returns attack obj
 */
export function apiGetAttackInfo(attackId) {
	return serviceGetAttackInfo(attackId);
}

/**
 * API: Get a random wave of 5 attacks.
 * returns list of 5 attack obj
 */
export function apiGetRandomWave() {
	return getRandomWave();
}
