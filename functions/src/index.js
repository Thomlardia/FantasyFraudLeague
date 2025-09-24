/**
 * Main entrypoint for Firebase Functions.
*/
import { setGlobalOptions } from "firebase-functions/v2";

setGlobalOptions({
  region: "africa-south1",
  maxInstances: 10,
  concurrency: 80,
  timeoutSeconds: 60,
});

// Callable function exports (user)
export {
  user_getBalance,
  user_getDefenses,
  user_buyDefense,
  user_upgradeDefense,
} from "./apps/user-api/app.js";

// Callable function exports (admin)
export {
  admin_listUsers,
  admin_grantAdmin,
} from "./apps/admin-api/app.js";

// Background triggers
export { userDocOnCreate } from "./apps/triggers/identity.onUserCreated.js";
