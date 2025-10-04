import { getLeaderboardWithUser, getUserRank, getLeaderboard } from "./service.js";

/**
 * API function to get top 10 in leaderboard
 * @returns {Promise<Object>} Formatted response with success flag and data
 */
export async function apiGetLeaderboard() {
    const result = await getLeaderboard();
    return {
        success: true,
        data: result
    }
}

/**
 * API function to get the top 10 and show the user at their rank
 * @param {string} userId - User ID to look up
 * @returns {Promise<Object>} Formatted response with success flag and data containing users rank
 */
export async function apiGetLeaderboardWithUser(userId) {
    const result  = await getLeaderboardWithUser(userId);
    return {
        success: true,
        data: result
    };
}

/**
 * API function to get a specific user's rank only
 * @param {string} userId - User ID to look up
 * @returns {Promise<Object>} Formatted response with user's rank
 */
export async function apiGetUserRank(userId) {
    const userRank = await getUserRank(userId);
    return {
        success: true,
        data: userRank,
    };
}