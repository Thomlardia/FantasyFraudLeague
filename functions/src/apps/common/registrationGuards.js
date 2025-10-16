import { HttpsError } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../infra/db/index.js";

// Disposable and temporary email domains that should never pass registration
const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "mailinator.com",
  "throwaway.email",
  "temp-mail.org",
  "trashmail.com",
  "yopmail.com",
  "maildrop.cc",
  "getnada.com"
]);

const REGISTRATION_STATS_DOC = db.collection("admin").doc("registration_stats");
// Allow a much higher burst during testing; tighten in production via env config
const MAX_REGISTRATIONS_PER_MINUTE = 200;

/**
 * Runs shared registration guardrails. These mirror the checks that existed in the
 * blocking beforeCreate trigger so that Admin created users are subject to the same policy.
 *
 * @param {Object} params
 * @param {string} params.email - Email address being registered.
 * @param {string} params.providerId - Auth provider identifier (password, google.com, etc.).
 * @returns {Promise<void>}
 */
export async function enforceRegistrationGuards({ email, providerId }) {
  if (typeof email !== "string" || !email.trim()) {
    throw new HttpsError("invalid-argument", "Email address is required.");
  }

  // Allow OAuth providers to bypass the stricter email/password checks
  if (providerId && providerId !== "password") {
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const domain = normalizedEmail.split("@")[1] || "";

  if (DISPOSABLE_DOMAINS.has(domain)) {
    console.warn(`Blocked disposable email: ${normalizedEmail}`);
    throw new HttpsError(
      "invalid-argument",
      "Disposable email addresses are not allowed. Please use a permanent email address."
    );
  }

  await enforceRegistrationRateLimit();
}

async function enforceRegistrationRateLimit() {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  const statsSnap = await REGISTRATION_STATS_DOC.get();
  const stats = statsSnap.exists ? statsSnap.data() : {};

  const recentCount = stats?.recentRegistrations || 0;
  const lastRegistrationValue = stats?.lastRegistration;
  const lastRegistration =
    lastRegistrationValue instanceof Date
      ? lastRegistrationValue
      : typeof lastRegistrationValue?.toDate === "function"
        ? lastRegistrationValue.toDate()
        : new Date(0);

  if (lastRegistration > oneMinuteAgo && recentCount > MAX_REGISTRATIONS_PER_MINUTE) {
    console.error(
      `Registration rate limit exceeded: ${recentCount} registrations in the last minute`
    );
    throw new HttpsError(
      "resource-exhausted",
      "Too many registration attempts. Please try again in a few minutes."
    );
  }

  const updates = {
    recentRegistrations: lastRegistration > fiveMinutesAgo ? recentCount + 1 : 1,
    lastRegistration: now,
    totalRegistrations: FieldValue.increment(1),
    [`registrations_${now.toISOString().split("T")[0]}`]: FieldValue.increment(1)
  };

  await REGISTRATION_STATS_DOC.set(updates, { merge: true });
}
