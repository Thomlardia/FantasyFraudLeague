// This file exposes the attack operations to the api layer.
import { getAttackInfo, getEasyWave, getHardWave, getMediumWave, getRandomWave, attackDeduction, massAttackDeduction } from "./service.js";
import { getUserAttackLogs } from "./repo.js";
import {
	scheduleAttack,
	listUpcomingScheduledAttacks,
	fetchDueScheduledAttacks,
	claimPendingScheduledAttack,
	completeScheduledAttack,
	failScheduledAttack,
	cancelPendingScheduledAttack,
} from "./scheduledService.js";

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

/**
 * API: Get user attack logs from database
 * @param {string} userId - The user's ID
 * @param {number} limit - Optional limit for number of logs to retrieve (default: all)
 * @returns {Promise<Array<object>>} Array of attack log objects, sorted by timestamp (newest first)
 */
export function apiGetUserAttackLogs(userId, limit = null) {
	return getUserAttackLogs(userId, limit);
}

/**
 * API: Schedule a mass attack for future execution
 * @param {object} params
 * @returns {Promise<object>}
 */
export function apiScheduleAttack(params) {
	return scheduleAttack(params);
}

/**
 * API: List upcoming scheduled attacks
 * @param {object} options
 * @returns {Promise<Array<object>>}
 */
export function apiGetUpcomingScheduledAttacks(options = {}) {
	return listUpcomingScheduledAttacks(options);
}

/**
 * API: Fetch due scheduled attacks (pending & scheduled in the past)
 * @param {object} options
 * @returns {Promise<Array<object>>}
 */
export function apiFetchDueScheduledAttacks(options = {}) {
	return fetchDueScheduledAttacks(options);
}

/**
 * API: Attempt to claim a pending scheduled attack for execution
 * @param {string} attackId
 * @returns {Promise<object|null>}
 */
export function apiClaimScheduledAttack(attackId) {
	return claimPendingScheduledAttack(attackId);
}

/**
 * API: Mark a scheduled attack as completed
 * @param {string} attackId
 * @param {object} result
 * @returns {Promise<void>}
 */
export function apiCompleteScheduledAttack(attackId, result = {}) {
	return completeScheduledAttack(attackId, result);
}

/**
 * API: Mark a scheduled attack as failed
 * @param {string} attackId
 * @param {Error|string} error
 * @returns {Promise<void>}
 */
export function apiFailScheduledAttack(attackId, error) {
	return failScheduledAttack(attackId, error);
}

/**
 * API: Cancel a pending scheduled attack
 * @param {string} attackId
 * @returns {Promise<boolean>}
 */
export function apiCancelScheduledAttack(attackId) {
	return cancelPendingScheduledAttack(attackId);
}
