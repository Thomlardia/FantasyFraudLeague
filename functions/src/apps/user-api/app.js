import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuth, requireVerified } from "../common/authzn.js";
import { apiGetUserBalance } from "../../domains/wallet/api.js";
import { apiGetUserDefenses, apiBuyDefense, apiUpgradeDefense } from "../../domains/defense/api.js";

export const user_getBalance = onCall({ region: "africa-south1" }, async (_req, ctx) => {
  requireAuth(ctx);
  return apiGetUserBalance(ctx.auth.uid);
});

export const user_getDefenses = onCall({ region: "africa-south1" }, async (_req, ctx) => {
  requireVerified(ctx);
  return apiGetUserDefenses(ctx.auth.uid);
});

export const user_buyDefense = onCall({ region: "africa-south1" }, async (req, ctx) => {
  requireVerified(ctx);
  const { defenseId } = req.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiBuyDefense(ctx.auth.uid, defenseId);
});

export const user_upgradeDefense = onCall({ region: "africa-south1" }, async (req, ctx) => {
  requireVerified(ctx);
  const { defenseId } = req.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiUpgradeDefense(ctx.auth.uid, defenseId);
});
