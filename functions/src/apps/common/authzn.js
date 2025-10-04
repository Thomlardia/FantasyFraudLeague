import { HttpsError } from "firebase-functions/v2/https";

export function requireAuth(request) {
  if (!request?.auth) throw new HttpsError("unauthenticated", "Sign in required.");
}

export function requireVerified(request) {
  requireAuth(request);
  const verified = Boolean(request.auth.token?.email_verified);
  if (!verified) throw new HttpsError("failed-precondition", "Email must be verified.");
}

export function requireRole(request, role) {
  requireAuth(request);
  const roles = Array.isArray(request.auth.token?.roles) ? request.auth.token.roles : [];
  if (!roles.includes(role)) throw new HttpsError("permission-denied", "Insufficient privileges.");
}

// Enforce App Check presence in callable contexts
// Skips enforcement when running in emulators to keep local DX smooth
export function requireAppCheck(request) {
  const isEmulator = Boolean(
    process.env.FUNCTIONS_EMULATOR ||
    process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    process.env.FIRESTORE_EMULATOR_HOST ||
    process.env.PUBSUB_EMULATOR_HOST
  );
  if (isEmulator) return;

  const hasV1 = Boolean(request?.app); // v1-style presence
  const hasV2 = Boolean(
    request?.appCheck?.valid === true ||
    request?.appCheck?.token ||
    request?.appCheck?.appId
  );

  if (!hasV1 && !hasV2) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be called from an App Check verified app."
    );
  }
}
