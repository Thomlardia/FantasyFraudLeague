import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireRole, requireAppCheck } from "../common/authzn.js";
import { getAllUsers } from "../../domains/defense/repo.js";
import { auth } from "../../infra/db/index.js";

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
