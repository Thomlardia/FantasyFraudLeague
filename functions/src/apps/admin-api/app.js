import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireRole } from "../common/authzn.js";
import { getAllUsers } from "../../domains/defense/repo.js";
import { auth } from "../../infra/db/index.js";

export const admin_listUsers = onCall({ region: "africa-south1" }, async (_req, ctx) => {
	requireRole(ctx, "admin");
	return getAllUsers();
});

export const admin_grantAdmin = onCall({ region: "africa-south1" }, async (req, ctx) => {
	requireRole(ctx, "admin");
	const { uid } = req.data || {};
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
