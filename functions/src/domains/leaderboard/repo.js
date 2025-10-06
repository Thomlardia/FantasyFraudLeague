/**
 * This file contains the leaderboard repository for accessing the data from firestore
 */

import { db } from "../../infra/db/index.js";

/**
 * Retrieves the top 10 users ranked by net worth
 * @returns {Promise Array<Object>} containing the user ID, rank and net worth.
 */
export const getTopTen = async() => {
    const snapshot = await db.collection('users')
                        .orderBy("netWorth", "desc")
                        .limit(10)
                        .get();
    return snapshot.docs.map((doc, index) => {
        const user = doc.data();
        // returns inside the map callback
        return {
            id: doc.id,
            name: user.name,
            rank: index + 1,
            netWorth: user.netWorth 
        }
    });
}

/**
 * This function retrieves the rank of the current user by counting how many users are above them
 * @param {string} userId - User ID of user to get rank for
 * @returns {Promise<Object>} user data with rank
 */
export const getUserRankByNetWorth = async(userId) => {
    const userDoc = await db.collection('users').doc(userId).get();

    const userData = userDoc.data() || {};
    const userNetWorth = typeof userData.netWorth === 'number' ? userData.netWorth : 0;
    const displayName = userData.name || userData.email || userId;

    // Count how many users are above this user
    const snapshot = await db.collection('users')
                        .where('netWorth', '>', userNetWorth)
                        .get();
    
    const rank = snapshot.size + 1;

    return {
        name: displayName,
        rank: rank,
        netWorth: userNetWorth
    };
}

//const rankOfUser = await getUserRankByNetWorth('tester3');
//console.log(rankOfUser);
