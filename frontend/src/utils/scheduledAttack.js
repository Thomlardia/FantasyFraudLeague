/**
 * Utilities for working with scheduled attack objects coming from Firestore/Functions.
 */

/**
 * Extract the scheduled timestamp for an attack in milliseconds.
 * Accepts a variety of shapes (plain number, Firestore timestamp, ISO string).
 * @param {object} attack
 * @returns {number} millis timestamp or Number.MAX_SAFE_INTEGER when unknown
 */
export function extractScheduledMillis(attack = {}) {
  if (typeof attack?.scheduledAtMs === "number") {
    return attack.scheduledAtMs;
  }

  const raw = attack?.scheduledAt || attack?.scheduledFor || attack?.scheduledTime;
  if (!raw) {
    return Number.MAX_SAFE_INTEGER;
  }

  if (typeof raw?.toMillis === "function") {
    return raw.toMillis();
  }

  if (typeof raw?._seconds === "number") {
    return raw._seconds * 1000 + Math.floor((raw._nanoseconds || 0) / 1e6);
  }

  if (typeof raw?.seconds === "number") {
    return raw.seconds * 1000 + Math.floor((raw.nanoseconds || 0) / 1e6);
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.getTime();
  }

  return Number.MAX_SAFE_INTEGER;
}

/**
 * Get a Date object for the scheduled attack, or null if it cannot be determined.
 * @param {object} attack
 * @returns {Date|null}
 */
export function getScheduledDate(attack) {
  const millis = extractScheduledMillis(attack);
  if (Number.isFinite(millis) && millis !== Number.MAX_SAFE_INTEGER) {
    return new Date(millis);
  }
  return null;
}

/**
 * Produce a stable key for a scheduled attack that can be used for tracking state.
 * @param {object} attack
 * @returns {string|null}
 */
export function getScheduledAttackKey(attack) {
  if (!attack) {
    return null;
  }
  if (attack.id) {
    return String(attack.id);
  }
  const millis = extractScheduledMillis(attack);
  if (!Number.isFinite(millis) || millis === Number.MAX_SAFE_INTEGER) {
    return null;
  }
  return String(millis);
}

/**
 * Turn a remaining millisecond value into an HH:MM:SS countdown string.
 * @param {number|null} remainingMs
 * @returns {string|null}
 */
export function formatCountdown(remainingMs) {
  if (remainingMs == null || remainingMs <= 0) {
    return null;
  }
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Format a balance delta for display on the digital timer.
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrencyDelta(amount) {
  const sign = amount >= 0 ? "+" : "-";
  const formatted = Math.abs(Math.round(amount)).toLocaleString();
  return `${sign}$${formatted}`;
}
