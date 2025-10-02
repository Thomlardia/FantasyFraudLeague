import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuth, requireVerified } from "../common/authzn.js";
import { apiGetUserBalance, apiUpdateUserBalance } from "../../domains/wallet/api.js";
import { apiGetUserDefenses, apiBuyDefense, apiUpgradeDefense } from "../../domains/defense/api.js";

export const user_getBalance = onCall({ region: "africa-south1" }, async (_req) => {
  
  return apiGetUserBalance(_req.auth.uid);
});

export const user_updateBalance = onCall({ region: "africa-south1" }, async (_req, ctx) => {
  requireAuth(ctx);
  return apiUpdateUserBalance(ctx.auth.uid);
});

export const user_getDefenses = onCall({ region: "africa-south1" }, async (req) => {
  if (!req.auth) {
    throw new HttpsError("unauthenticated", "User must be signed in");
  }
  return apiGetUserDefenses(req.auth.uid);
});

export const user_buyDefense = onCall({ region: "africa-south1" }, async (req) => {
  if (!req.auth) {
    throw new HttpsError("unauthenticated", "User must be signed in");
  }

  const { defenseId } = req.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiBuyDefense(req.auth.uid, defenseId);
});

export const user_upgradeDefense = onCall({ region: "africa-south1" }, async (req) => {
  if (!req.auth) {
    throw new HttpsError("unauthenticated", "User must be signed in");
  }

  const { defenseId } = req.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiUpgradeDefense(req.auth.uid, defenseId);
});

