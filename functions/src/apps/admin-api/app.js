import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireRole, requireAppCheck } from "../common/authzn.js";
import { getAllUsers } from "../../domains/defense/repo.js";
import { auth } from "../../infra/db/index.js";
import {
  apiMassAttackDeduction,
  apiGetEasyWave,
  apiGetMediumWave,
  apiGetHardWave,
  apiGetRandomWave,
  apiScheduleAttack,
} from "../../domains/attack/api.js";

export const admin_listUsers = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	return getAllUsers();
});

export const admin_grantAdmin = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true  // CRITICAL: Prevent replay attacks on privilege escalation
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const { uid } = request.data || {};
	if (typeof uid !== "string" || !uid) {
		throw new HttpsError("invalid-argument", "uid must be a non-empty string");
	}

	const user = await auth.getUser(uid);
	const prevClaims = user.customClaims || {};
	const prevRoles = Array.isArray(prevClaims.roles) ? prevClaims.roles : [];
	const roles = Array.from(new Set([...prevRoles, "admin"]));
	await auth.setCustomUserClaims(uid, { ...prevClaims, roles });

	return { ok: true, uid, roles };
});

// Mass attack functions
export const admin_massAttackCustom = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true  // Prevent replay attacks on mass operations
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const { wave } = request.data || {};

	if (!Array.isArray(wave) || wave.length === 0) {
		throw new HttpsError("invalid-argument", "wave must be a non-empty array of attack objects");
	}

	// Validate wave structure
	for (const attack of wave) {
		if (!attack.attackId && !attack.type) {
			throw new HttpsError("invalid-argument", "Each attack must have an attackId or type");
		}
		if (typeof attack.baseDamage !== "number" || attack.baseDamage < 0) {
			throw new HttpsError("invalid-argument", "Each attack must have a valid baseDamage");
		}
	}

	return apiMassAttackDeduction(wave);
});

export const admin_massAttackEasy = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true  // Prevent replay attacks on mass operations
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const wave = apiGetEasyWave();
	return apiMassAttackDeduction(wave);
});

export const admin_massAttackMedium = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true  // Prevent replay attacks on mass operations
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const wave = apiGetMediumWave();
	return apiMassAttackDeduction(wave);
});

export const admin_massAttackHard = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true  // Prevent replay attacks on mass operations
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const wave = apiGetHardWave();
	return apiMassAttackDeduction(wave);
});

export const admin_massAttackRandom = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true  // Prevent replay attacks on mass operations
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const wave = apiGetRandomWave();
	return apiMassAttackDeduction(wave);
});

export const admin_scheduleAttack = onCall({
	region: "africa-south1",
	enforceAppCheck: true,
	consumeAppCheckToken: true
}, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	const { wave, scheduledAt, notes = "" } = request.data || {};

	if (!Array.isArray(wave) || wave.length === 0) {
		throw new HttpsError("invalid-argument", "wave must be a non-empty array of attack objects");
	}

	for (const attack of wave) {
		if (!attack.attackId && !attack.type) {
			throw new HttpsError("invalid-argument", "Each attack must have an attackId or type");
		}
		if (typeof attack.baseDamage !== "number" || attack.baseDamage < 0) {
			throw new HttpsError("invalid-argument", "Each attack must have a valid baseDamage");
		}
	}

	if (!scheduledAt) {
		throw new HttpsError("invalid-argument", "scheduledAt is required");
	}

	const scheduledDate = new Date(scheduledAt);
	if (Number.isNaN(scheduledDate.getTime())) {
		throw new HttpsError("invalid-argument", "scheduledAt must be a valid date/time value");
	}

	const minLeadMs = 3 * 60 * 1000; // 3 minutes
	const nowMs = Date.now();
	if (scheduledDate.getTime() < nowMs + minLeadMs) {
		throw new HttpsError("failed-precondition", "scheduledAt must be at least more than 3 minutes in the future");
	}

	const result = await apiScheduleAttack({
		wave,
		scheduledAt: scheduledDate,
		createdBy: request.auth.uid,
		notes,
	});

	return { ok: true, data: result };
});
