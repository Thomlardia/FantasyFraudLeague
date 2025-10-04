import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuth, requireVerified, requireAppCheck } from "../common/authzn.js";
import { apiGetUserBalance, apiUpdateUserBalance } from "../../domains/wallet/api.js";
import { apiGetUserDefenses, apiBuyDefense, apiUpgradeDefense } from "../../domains/defense/api.js";

// Using your proper (request) signature with AppCheck enforcement
export const user_getBalance = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireAuth(request);
  console.log("user_getBalance called for uid:", request.auth.uid);
  const balance = await apiGetUserBalance(request.auth.uid);
  console.log("user_getBalance returning:", balance, "type:", typeof balance);
  return balance;
});

// Adding the user_updateBalance function from develop, but with proper signature
export const user_updateBalance = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireAuth(request);
  const { newBalance } = request.data || {};
  if (typeof newBalance !== "number" || isNaN(newBalance)) {
    throw new HttpsError("invalid-argument", "newBalance must be a valid number");
  }
  return apiUpdateUserBalance(request.auth.uid, newBalance);
});

// All defense functions use proper (request) signature with AppCheck
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
