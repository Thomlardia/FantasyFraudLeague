import { 
  getUserDefenses, 
  buyDefense, 
  upgradeDefense,
  clearDefenseCache
} from "./service.js";


/*TODO: Change, this export for compatibility fix only change to handle with errors */
export { getUserDefenses, buyDefense, upgradeDefense } from "./service.js";

/**
 * API handler for getting all defenses with user's ownership status
 * This is a thin facade that handles HTTP concerns and delegates to service layer
 * @param {string} userId - The user ID from the authenticated request
 * @returns {Promise<Object>} Standardized API response with defense data
 */
export async function handleGetUserDefenses(userId) {
  if (!userId) {
    return {
      success: false,
      error: "User ID is required",
      code: "MISSING_USER_ID"
    };
  }

  try {
    const defenses = await getUserDefenses(userId);
    return {
      success: true,
      data: defenses,
      message: `Retrieved ${defenses.length} defense templates`
    };
  } catch (error) {
    console.error("Error in handleGetUserDefenses:", error);
    return {
      success: false,
      error: error.message || "Failed to retrieve defenses",
      code: "DEFENSES_FETCH_ERROR"
    };
  }
}

/**
 * API handler for buying a defense
 * Handles input validation and error formatting for the buy defense workflow
 * @param {string} userId - The user ID from the authenticated request
 * @param {string} defenseId - The defense ID to purchase
 * @returns {Promise<Object>} Standardized API response with purchase result
 */
export async function handleBuyDefense(userId, defenseId) {
  // input validation
  if (!userId) {
    return {
      success: false,
      error: "User ID is required",
      code: "MISSING_USER_ID"
    };
  }

  if (!defenseId) {
    return {
      success: false,
      error: "Defense ID is required",
      code: "MISSING_DEFENSE_ID"
    };
  }

  try {
    const purchasedDefense = await buyDefense(userId, defenseId);
    return {
      success: true,
      data: purchasedDefense,
      message: `Successfully purchased ${defenseId} at level ${purchasedDefense.level}`,
      code: "PURCHASE_SUCCESS"
    };
  } catch (error) {
    console.error("Error in handleBuyDefense:", error);
    
    // map service errors to appropriate HTTP-friendly responses
    const errorCode = getErrorCode(error.message);
    return {
      success: false,
      error: error.message,
      code: errorCode,
      defenseId // include for client-side error handling
    };
  }
}

/**
 * API handler for upgrading a defense
 * Handles input validation and error formatting for the upgrade defense workflow
 * @param {string} userId - The user ID from the authenticated request  
 * @param {string} defenseId - The defense ID to upgrade
 * @returns {Promise<Object>} Standardized API response with upgrade result
 */
export async function handleUpgradeDefense(userId, defenseId) {
  // input validation
  if (!userId) {
    return {
      success: false,
      error: "User ID is required",
      code: "MISSING_USER_ID"
    };
  }

  if (!defenseId) {
    return {
      success: false,
      error: "Defense ID is required", 
      code: "MISSING_DEFENSE_ID"
    };
  }

  try {
    const upgradedDefense = await upgradeDefense(userId, defenseId);
    return {
      success: true,
      data: upgradedDefense,
      message: `Successfully upgraded ${defenseId} to level ${upgradedDefense.level}`,
      code: "UPGRADE_SUCCESS"
    };
  } catch (error) {
    console.error("Error in handleUpgradeDefense:", error);
    
    // map service errors to appropriate HTTP-friendly responses
    const errorCode = getErrorCode(error.message);
    return {
      success: false,
      error: error.message,
      code: errorCode,
      defenseId // include for client-side error handling
    };
  }
}

/**
 * Admin API handler for clearing the defense cache
 * This should only be called by admin users when defense templates are updated
 * @param {string} adminUserId - The admin user ID (for authorization)
 * @returns {Promise<Object>} Standardized API response
 */
export async function handleClearDefenseCache(adminUserId) {
  if (!adminUserId) {
    return {
      success: false,
      error: "Admin authentication required",
      code: "UNAUTHORIZED"
    };
  }

  try {
    clearDefenseCache();
    return {
      success: true,
      message: "Defense cache cleared successfully",
      code: "CACHE_CLEARED"
    };
  } catch (error) {
    console.error("Error in handleClearDefenseCache:", error);
    return {
      success: false,
      error: "Failed to clear cache",
      code: "CACHE_CLEAR_ERROR"
    };
  }
}

/**
 * Maps service layer error messages to standardized error codes
 * This helps the frontend handle different error types appropriately
 * @param {string} errorMessage - The error message from the service layer
 * @returns {string} Standardized error code
 */
function getErrorCode(errorMessage) {
  const message = errorMessage.toLowerCase();
  
  if (message.includes("defense not found")) {
    return "DEFENSE_NOT_FOUND";
  }
  if (message.includes("already own")) {
    return "ALREADY_OWNED";
  }
  if (message.includes("insufficient funds")) {
    return "INSUFFICIENT_FUNDS";
  }
  if (message.includes("don't own")) {
    return "NOT_OWNED";
  }
  if (message.includes("cannot be purchased")) {
    return "NOT_PURCHASABLE";
  }
  if (message.includes("cannot be upgraded") || message.includes("maximum level")) {
    return "MAX_LEVEL_REACHED";
  }
  if (message.includes("user not found")) {
    return "USER_NOT_FOUND";
  }
  
  return "UNKNOWN_ERROR";
}
