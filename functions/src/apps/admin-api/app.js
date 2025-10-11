import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireRole, requireAppCheck } from "../common/authzn.js";
import { getAllUsers } from "../../domains/defense/repo.js";
import { auth } from "../../infra/db/index.js";
import { apiMassAttackDeduction, apiGetEasyWave, apiGetMediumWave, apiGetHardWave, apiGetRandomWave } from "../../domains/attack/api.js";

export const admin_listUsers = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
	requireAppCheck(request);
	requireRole(request, "admin");
	return getAllUsers();
});

export const admin_grantAdmin = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
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
export const admin_massAttackCostum = onCall({ region: "africa-south1" }, async (req, ctx) => {
	requireRole(ctx, "admin");
	const { wave } = req.data || {};
	
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

export const admin_massAttackEasy = onCall({ region: "africa-south1" }, async (_req, ctx) => {
	requireRole(ctx, "admin");
	const wave = apiGetEasyWave();
	return apiMassAttackDeduction(wave);
});

export const admin_massAttackMedium = onCall({ region: "africa-south1" }, async (_req, ctx) => {
	requireRole(ctx, "admin");
	const wave = apiGetMediumWave();
	return apiMassAttackDeduction(wave);
});

export const admin_massAttackHard = onCall({ region: "africa-south1" }, async (_req, ctx) => {
	requireRole(ctx, "admin");
	const wave = apiGetHardWave();
	return apiMassAttackDeduction(wave);
});

export const admin_massAttackRandom = onCall({ region: "africa-south1" }, async (_req, ctx) => {
	requireRole(ctx, "admin");
	const wave = apiGetRandomWave();
	return apiMassAttackDeduction(wave);
});
