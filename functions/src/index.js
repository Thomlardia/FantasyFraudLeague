/**
 * Main entrypoint for Firebase Functions.
*/
// Callable function exports (user)
export {
  user_getBalance,
  user_getDefenses,
  user_buyDefense,
  user_upgradeDefense,
  user_getLeaderboardWithUser,
} from "./apps/user-api/app.js";

// Callable function exports (admin)
export {
  admin_listUsers,
  admin_grantAdmin,
} from "./apps/admin-api/app.js";

// Background triggers
export { userDocOnCreate } from "./apps/triggers/identity.onUserCreated.js";
