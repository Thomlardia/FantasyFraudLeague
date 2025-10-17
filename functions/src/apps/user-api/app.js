import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuth, requireVerified, requireAppCheck } from "../common/authzn.js";
import { apiGetUserBalance } from "../../domains/wallet/api.js";
import { apiGetUserDefenses, apiBuyDefense, apiUpgradeDefense, apiSellDefense } from "../../domains/defense/api.js";
import { apiGetLeaderboardWithUser, apiGetUserRank } from "../../domains/leaderboard/api.js";
import { apiGetUserAttackLogs, apiGetUpcomingScheduledAttacks } from "../../domains/attack/api.js";
import { ensureUserProfile } from "../../domains/user/profile.js";
import { auth as adminAuth } from "../../infra/db/index.js";

export const user_ensureProfile = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);

  const uid = request.auth.uid;

  let email = request.auth.token?.email ?? null;
  let displayName = request.auth.token?.name ?? null;
  const providedDisplayName =
    typeof request.data?.displayName === "string" && request.data.displayName.trim().length > 0
      ? request.data.displayName.trim()
      : null;
  if (!displayName && providedDisplayName) {
    displayName = providedDisplayName;
  }

  if (!email || !displayName) {
    try {
      const userRecord = await adminAuth.getUser(uid);
      email = email ?? userRecord.email ?? null;
      displayName = displayName ?? userRecord.displayName ?? null;
    } catch (fetchError) {
      console.error("user_ensureProfile: failed to load user record", fetchError);
    }
  }

  const result = await ensureUserProfile({
    uid,
    email,
    displayName,
  });

  return {
    status: result.created ? "created" : "exists",
  };
});

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

export const user_buyDefense = onCall({
  region: "africa-south1",
  enforceAppCheck: true,
  consumeAppCheckToken: true  // Prevent replay attacks - single-use token
}, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { defenseId } = request.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiBuyDefense(request.auth.uid, defenseId);
});

export const user_upgradeDefense = onCall({
  region: "africa-south1",
  enforceAppCheck: true,
  consumeAppCheckToken: true  // Prevent replay attacks - single-use token
}, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { defenseId } = request.data || {};
  if (typeof defenseId !== "string" || !defenseId) {
    throw new HttpsError("invalid-argument", "defenseId must be a non-empty string");
  }
  return apiUpgradeDefense(request.auth.uid, defenseId);
});

export const user_sellDefense = onCall({
  region: "africa-south1",
  enforceAppCheck: true,
  consumeAppCheckToken: true  // Prevent replay attacks - single-use token
}, async (request) => {
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

export const user_getScheduledAttacks = onCall({ region: "africa-south1", enforceAppCheck: true }, async (request) => {
  requireAppCheck(request);
  requireVerified(request);
  const { limit } = request.data || {};

  if (limit !== undefined && limit !== null) {
    if (typeof limit !== "number" || limit < 1) {
      throw new HttpsError("invalid-argument", "limit must be a positive number");
    }
  }

  const resolvedLimit = Math.min(limit || 20, 50);
  return apiGetUpcomingScheduledAttacks({ limit: resolvedLimit });
});
