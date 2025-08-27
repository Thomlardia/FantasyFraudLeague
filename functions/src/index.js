/**
 * Main entrypoint for Firebase Functions.
 *
 * - Wires up HTTP APIs, background triggers, and global options.
 * - Every exported function here becomes an externally accessible endpoint
 *   (Firebase automatically deploys them by name).
 * - Middleware should be applied inside the app layer to protect routes,
 *   since anything exported here is publicly reachable on the internet.
 */
import { initializeApp } from "firebase-admin/app";
import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

// init + defaults
initializeApp();
setGlobalOptions({
  region: "africa-south1",
  maxInstances: 10,
  concurrency: 80,
  timeoutSeconds: 60,
});

// wire edges
import userApp from "./apps/user-api/app.js";
import adminApp from "./apps/admin-api/app.js";

export const userApi  = onRequest(userApp);
export const adminApi = onRequest(adminApp);

// re-export triggers directly
export { onUserCreated } from "./apps/triggers/identity.onUserCreated.js";
export { onAttackDeduction } from "./apps/triggers/wallet.onWalletUpdate.js";

