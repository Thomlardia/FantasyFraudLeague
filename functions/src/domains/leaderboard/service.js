// This file is for the operations that will be performed on the database - querying the data and sorting by networth.
import { getTopTen, getUserRankByNetWorth } from "./repo.js";

/**
 * Calls the function getTopTen, which retrieves the top 10 users based on their net worth
 * @returns {Promise<Array<Object>>} formatted leaderboard with name, rank and net worth
 */
export async function getLeaderboardWithUser(userId) {
    const topTen = await getTopTen();

    const userInTopTen = topTen.find(u => u.id == userId);

    if (userInTopTen) {
        return {
            topTen,
            currentUser: null
        };
    }

    // User is not in the top 10
    const userRank = await getUserRankByNetWorth(userId);

    return {
        topTen,
        currentUser: userRank
    };
}

/**
 * Get just the top 10 leaderboard, not user specific
 * @returns {Promise<Array<Object>>} Top 10 users
 */
export async function getLeaderboard() {
    return await getTopTen();
}

/**
 * Get a specific user's rank
 * @param {string} userId - User ID to look up
 * @returns {Promise <Object>} User's rank data
 */
export async function getUserRank(userId) {
    return await getUserRankByNetWorth(userId);
}

//const rank = await getLeaderboardWithUser('tester2');
//console.log(rank);
