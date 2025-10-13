// This file contains the attack repository for accessing attack info directly from the model.
// the attack info is not stored in the database. 
import { attacks } from "./model.js";
import { db } from "../../infra/db/index.js";
import admin from "firebase-admin";

/**
 * Gets all attack objects.
 * @returns {Array<object>} Array of all attack objects
 */
export function getAllAttacks() {
  return attacks;
}

/**
 * Saves an attack log to the user's attackLogs array in the database
 * @param {string} userId - The user's ID
 * @param {object} attackLog - The attack log object to save
 */
export async function saveAttackLogToDatabase(userId, attackLog) {
  try {
    const userDocRef = db.collection("users").doc(userId);
    
    // Add timestamp to the attack log
    const logWithTimestamp = {
      ...attackLog,
      timestamp: new Date(),
      id: Date.now() + Math.random() // Simple unique ID for the log entry
    };
    
    // Use arrayUnion to add the attack log to the attackLogs array
    await userDocRef.update({
      attackLogs: admin.firestore.FieldValue.arrayUnion(logWithTimestamp)
    });
    
  } catch (error) {
    console.error(`Failed to save attack log for user ${userId}:`, error);
    // Don't throw error - we don't want to fail the attack process just because logging failed
  }
}

/**
 * Retrieves all attack logs for a user from the database
 * @param {string} userId - The user's ID
 * @param {number} limit - Optional limit for number of logs to retrieve (default: all)
 * @returns {Promise<Array<object>>} Array of attack log objects, sorted by timestamp (newest first)
 */
export async function getUserAttackLogs(userId, limit = null) {
  try {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    
    const userData = userDoc.data();
    let attackLogs = userData.attackLogs || [];
    
    // Sort by timestamp (newest first)
    attackLogs.sort((a, b) => {
      const timeA = a.timestamp?.toDate?.() || a.timestamp || new Date(0);
      const timeB = b.timestamp?.toDate?.() || b.timestamp || new Date(0);
      return timeB - timeA;
    });
    
    // Apply limit if specified
    if (limit && limit > 0) {
      attackLogs = attackLogs.slice(0, limit);
    }
    
    return attackLogs;
    
  } catch (error) {
    console.error(`Failed to retrieve attack logs for user ${userId}:`, error);
    throw error;
  }
}