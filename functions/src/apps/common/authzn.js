import { HttpsError } from "firebase-functions/v2/https";

export function requireAuth(ctx) {
  if (!ctx?.auth) throw new HttpsError("unauthenticated", "Sign in required.");
}

export function requireVerified(ctx) {
  requireAuth(ctx);
  const verified = Boolean(ctx.auth.token?.email_verified);
  if (!verified) throw new HttpsError("failed-precondition", "Email must be verified.");
}

export function requireRole(ctx, role) {
  requireAuth(ctx);
  const roles = Array.isArray(ctx.auth.token?.roles) ? ctx.auth.token.roles : [];
  if (!roles.includes(role)) throw new HttpsError("permission-denied", "Insufficient privileges.");
}

