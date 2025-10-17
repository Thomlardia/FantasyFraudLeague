import admin from "firebase-admin";
import {
  createScheduledAttackDoc,
  getPendingScheduledAttacks,
  getUpcomingScheduledAttacks,
  claimScheduledAttack,
  markScheduledAttackCompleted,
  markScheduledAttackFailed,
  cancelScheduledAttack,
  serializeScheduledAttack,
} from "./scheduledRepo.js";

/**
 * Schedule a new attack wave for future execution.
 * @param {object} params
 * @param {Array<object>} params.wave - Attack wave definition.
 * @param {Date|number|string|admin.firestore.Timestamp} params.scheduledAt - Time to execute.
 * @param {string} params.createdBy - UID of scheduling admin.
 * @param {string} [params.notes] - Optional notes.
 * @returns {Promise<object>}
 */
export async function scheduleAttack({ wave, scheduledAt, createdBy, notes = "" }) {
  const timestamp = coerceToTimestamp(scheduledAt);
  if (!timestamp) {
    throw new Error("Invalid scheduledAt value");
  }

  const doc = await createScheduledAttackDoc({
    wave,
    scheduledAt: timestamp,
    createdBy,
    notes,
  });

  return serializeScheduledAttack(doc);
}

/**
 * List upcoming scheduled attacks for display.
 * @param {object} params
 * @param {number} [params.limit=20]
 * @returns {Promise<Array<object>>}
 */
export async function listUpcomingScheduledAttacks({ limit = 20 } = {}) {
  const docs = await getUpcomingScheduledAttacks({ limit });
  return docs.map(serializeScheduledAttack);
}

/**
 * Fetch due attacks (pending and scheduled at or before now).
 * @param {object} params
 * @param {number} [params.limit=5]
 * @returns {Promise<Array<object>>}
 */
export async function fetchDueScheduledAttacks({ limit = 5 } = {}) {
  const now = admin.firestore.Timestamp.now();
  const docs = await getPendingScheduledAttacks({ limit, before: now });
  return docs.map(serializeScheduledAttack);
}

/**
 * Attempt to claim a pending scheduled attack for execution.
 * @param {string} attackId
 * @returns {Promise<object|null>}
 */
export async function claimPendingScheduledAttack(attackId) {
  const doc = await claimScheduledAttack(attackId);
  return doc ? serializeScheduledAttack(doc) : null;
}

/**
 * Mark a scheduled attack as completed.
 * @param {string} attackId
 * @param {object} [result={}]
 */
export async function completeScheduledAttack(attackId, result = {}) {
  await markScheduledAttackCompleted(attackId, {
    result,
  });
}

/**
 * Mark a scheduled attack as failed.
 * @param {string} attackId
 * @param {Error|string} error
 */
export async function failScheduledAttack(attackId, error) {
  await markScheduledAttackFailed(attackId, error);
}

/**
 * Cancel a pending scheduled attack.
 * @param {string} attackId
 * @returns {Promise<boolean>}
 */
export async function cancelPendingScheduledAttack(attackId) {
  return cancelScheduledAttack(attackId);
}

/**
 * Convert arbitrary input into Firestore Timestamp.
 * @param {Date|number|string|admin.firestore.Timestamp} value
 * @returns {admin.firestore.Timestamp|null}
 */
function coerceToTimestamp(value) {
  if (!value) {
    return null;
  }
  if (value instanceof admin.firestore.Timestamp) {
    return value;
  }
  if (value instanceof Date) {
    return admin.firestore.Timestamp.fromDate(value);
  }
  if (typeof value === "number") {
    return admin.firestore.Timestamp.fromMillis(value);
  }
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return admin.firestore.Timestamp.fromDate(parsed);
    }
    return null;
  }
  if (value?._seconds) {
    const millis = value._seconds * 1000 + Math.floor((value._nanoseconds || 0) / 1e6);
    return admin.firestore.Timestamp.fromMillis(millis);
  }
  if (value?.seconds) {
    const millis = value.seconds * 1000 + Math.floor((value.nanoseconds || 0) / 1e6);
    return admin.firestore.Timestamp.fromMillis(millis);
  }
  return null;
}
