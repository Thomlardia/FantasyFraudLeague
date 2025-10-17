import admin from "firebase-admin";
import { db } from "../../infra/db/index.js";

const COLLECTION = "scheduledAttacks";

const scheduledCollection = () => db.collection(COLLECTION);

const mapDoc = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

/**
 * Persist a scheduled attack entry to Firestore.
 * @param {object} payload - Data to store for the scheduled attack.
 * @returns {Promise<object>} Stored document (including generated id).
 */
export async function createScheduledAttackDoc(payload) {
  const now = admin.firestore.Timestamp.now();
  const data = {
    status: "pending",
    createdAt: now,
    updatedAt: now,
    ...payload,
  };

  const ref = scheduledCollection().doc();
  await ref.set(data);
  return { id: ref.id, ...data };
}

/**
 * Retrieve scheduled attacks that are still pending execution.
 * Optionally provide an upper bound on scheduledAt.
 * @param {object} options
 * @param {number} options.limit - Maximum number of documents to return.
 * @param {admin.firestore.Timestamp} [options.before] - Return attacks scheduled at or before this timestamp.
 * @returns {Promise<Array<object>>}
 */
export async function getPendingScheduledAttacks({ limit = 10, before = null } = {}) {
  let query = scheduledCollection()
    .where("status", "==", "pending")
    .orderBy("scheduledAt", "asc")
    .limit(limit);

  if (before) {
    query = query.where("scheduledAt", "<=", before);
  }

  const snapshot = await query.get();
  return snapshot.docs.map(mapDoc);
}

/**
 * Fetch upcoming scheduled attacks (pending and ordered ascending by schedule time).
 * @param {object} options
 * @param {number} options.limit - Maximum number of docs to return.
 * @returns {Promise<Array<object>>}
 */
export async function getUpcomingScheduledAttacks({ limit = 20 } = {}) {
  const snapshot = await scheduledCollection()
    .where("status", "==", "pending")
    .orderBy("scheduledAt", "asc")
    .limit(limit)
    .get();

  return snapshot.docs.map(mapDoc);
}

/**
 * Attempt to transition a scheduled attack from pending to running.
 * Uses a transaction to avoid duplicate execution.
 * @param {string} attackId
 * @returns {Promise<object|null>} Original document data if claimed, otherwise null.
 */
export async function claimScheduledAttack(attackId) {
  const ref = scheduledCollection().doc(attackId);
  const now = admin.firestore.Timestamp.now();

  return db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    if (data.status !== "pending") {
      return null;
    }

    tx.update(ref, {
      status: "running",
      startedAt: now,
      updatedAt: now,
    });

    return { id: doc.id, ...data };
  });
}

/**
 * Update a scheduled attack document with completion details.
 * @param {string} attackId
 * @param {object} updates
 */
export async function markScheduledAttackCompleted(attackId, updates = {}) {
  const ref = scheduledCollection().doc(attackId);
  const now = admin.firestore.Timestamp.now();

  await ref.update({
    status: "completed",
    executedAt: now,
    updatedAt: now,
    ...updates,
  });
}

/**
 * Update a scheduled attack document to failed.
 * @param {string} attackId
 * @param {Error|string} error
 */
export async function markScheduledAttackFailed(attackId, error) {
  const ref = scheduledCollection().doc(attackId);
  const now = admin.firestore.Timestamp.now();
  const details = typeof error === "string" ? error : error?.message || "Unknown error";

  await ref.update({
    status: "failed",
    failedAt: now,
    updatedAt: now,
    error: details,
  });
}

/**
 * Cancel a scheduled attack (if still pending).
 * @param {string} attackId
 * @returns {Promise<boolean>} true if cancelled, false otherwise.
 */
export async function cancelScheduledAttack(attackId) {
  const ref = scheduledCollection().doc(attackId);
  const now = admin.firestore.Timestamp.now();

  return db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (!doc.exists) {
      return false;
    }
    const data = doc.data();
    if (data.status !== "pending") {
      return false;
    }
    tx.update(ref, {
      status: "cancelled",
      cancelledAt: now,
      updatedAt: now,
    });
    return true;
  });
}

/**
 * Convenience helper to map raw scheduled attack documents to plain objects with millis values.
 * @param {object} doc
 * @returns {object}
 */
export function serializeScheduledAttack(doc) {
  const toMillis = (ts) => {
    if (!ts) return null;
    if (typeof ts.toMillis === "function") {
      return ts.toMillis();
    }
    if (typeof ts._seconds === "number") {
      return ts._seconds * 1000 + Math.floor((ts._nanoseconds || 0) / 1e6);
    }
    if (typeof ts.seconds === "number") {
      return ts.seconds * 1000 + Math.floor((ts.nanoseconds || 0) / 1e6);
    }
    return null;
  };

  return {
    ...doc,
    scheduledAtMs: toMillis(doc.scheduledAt),
    createdAtMs: toMillis(doc.createdAt),
    executedAtMs: toMillis(doc.executedAt),
  };
}
