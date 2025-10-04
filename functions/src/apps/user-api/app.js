import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuth, requireVerified, requireAppCheck } from "../common/authzn.js";
import { apiGetUserBalance } from "../../domains/wallet/api.js";
import { apiGetUserDefenses, apiBuyDefense, apiUpgradeDefense } from "../../domains/defense/api.js";

export const user_getBalance = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireAuth(request);
  return apiGetUserBalance(request.auth.uid);
});

export const user_getDefenses = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  return apiGetUserDefenses(request.auth.uid);
});

export const user_buyDefense = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { defenseId } = request.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiBuyDefense(request.auth.uid, defenseId);
});

export const user_upgradeDefense = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { defenseId } = request.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiUpgradeDefense(request.auth.uid, defenseId);
});
