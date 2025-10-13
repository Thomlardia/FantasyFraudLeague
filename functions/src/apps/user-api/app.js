import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuth, requireVerified, requireAppCheck } from "../common/authzn.js";
import { apiGetUserBalance } from "../../domains/wallet/api.js";
import { apiGetUserDefenses, apiBuyDefense, apiUpgradeDefense, apiSellDefense } from "../../domains/defense/api.js";
import { apiGetLeaderboard, apiGetLeaderboardWithUser, apiGetUserRank } from "../../domains/leaderboard/api.js";
import { apiGetUserAttackLogs } from "../../domains/attack/api.js";

// Using your proper (request) signature with AppCheck enforcement
export const user_getBalance = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireAuth(request);
  console.log("user_getBalance called for uid:", request.auth.uid);
  const balance = await apiGetUserBalance(request.auth.uid);
  console.log("user_getBalance returning:", balance, "type:", typeof balance);
  return balance;
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

export const user_sellDefense = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { defenseId } = request.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiSellDefense(request.auth.uid, defenseId);
});

export const user_getLeaderboardWithUser = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  return apiGetLeaderboardWithUser(request.auth.uid);
});

export const user_getUserRank = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  return apiGetUserRank(request.auth.uid);
});

export const user_getAttackLogs = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { limit } = request.data || {};
  
  // Validate limit parameter if provided
  if (limit !== undefined && limit !== null && (typeof limit !== "number" || limit < 1)) {
    throw new HttpsError("invalid-argument", "limit must be a positive number");
  }
  
  return apiGetUserAttackLogs(request.auth.uid, limit);
});

