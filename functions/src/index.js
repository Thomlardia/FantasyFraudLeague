/**
 * Main entrypoint for Firebase Functions.
*/
// Callable function exports (user)
export {
  user_ensureProfile,
  user_getBalance,
  user_getDefenses,
  user_buyDefense,
  user_upgradeDefense,
  user_sellDefense,
  user_getLeaderboardWithUser,
  user_getUserRank,
  user_getAttackLogs,
  user_getScheduledAttacks,
} from "./apps/user-api/app.js";

// Callable function exports (auth)
export { auth_registerWithEmail } from "./apps/auth-api/app.js";

// Callable function exports (admin)
export {
  admin_listUsers,
  admin_massAttackCustom,
  admin_massAttackEasy,
  admin_massAttackMedium,
  admin_massAttackHard,
  admin_massAttackRandom,
  admin_scheduleAttack,
} from "./apps/admin-api/app.js";

export { beforeUserCreated } from "./apps/triggers/auth.beforeCreate.js";

// Scheduled jobs
export { scheduled_executePendingAttacks } from "./apps/scheduler/execution.js";
