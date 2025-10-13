/**
 * Main entrypoint for Firebase Functions.
*/
// Callable function exports (user)
export {
  user_getBalance,
  user_getDefenses,
  user_buyDefense,
  user_upgradeDefense,
  user_sellDefense,
  user_getLeaderboardWithUser,
  user_getUserRank,
  user_getAttackLogs,
} from "./apps/user-api/app.js";

// Callable function exports (admin)
export {
  admin_listUsers,
  admin_grantAdmin,
  admin_massAttackCustom,
  admin_massAttackEasy,
  admin_massAttackMedium,
  admin_massAttackHard,
  admin_massAttackRandom,
} from "./apps/admin-api/app.js";

// Background triggers
export { userDocOnCreate } from "./apps/triggers/identity.onUserCreated.js";
