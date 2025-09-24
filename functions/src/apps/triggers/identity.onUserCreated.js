// Cloud Function trigger to automatically create user documents when users register
import { user } from "firebase-functions/v1/auth";

// Use your existing Firebase Admin setup instead of initializing new ones
import { db } from "../../infra/db/index.js";

/**
 * Cloud Function trigger that runs when a new user is created in Firebase Auth
 * Automatically creates a corresponding user document in Firestore
 */
export const onUserCreated = user().onCreate(async (user) => {
  const { uid, email, displayName } = user;
  
  console.log(`Creating user document for: ${email} (${uid})`);
  
  try {
    // Create user document in Firestore
    const userData = {
        id: uid,
        email: email,
        name: displayName || email?.split('@')[0] || 'Unknown User',
        currentBalance: 1_000_000, // Starting balance
        userType: 'player',
        ownedDefenses: {},
        totalDefensesOwned: 0
    };

    await db.collection('users').doc(uid).set(userData);
    
    console.log(`Successfully created user document for ${email}`);
    
    return {
      success: true,
      userId: uid,
      message: `User document created for ${email}`
    };
    
  } catch (error) {
    console.error(`Error creating user document for ${email}:`, error);

    return {
      success: false,
      userId: uid,
      error: error.message
    };
  }
});
