// Main database seeding module - exports all seeding operations

import { getCollection } from '../index.js';
import { defenses as defensesObject} from './defenses.js';
// Convert defenses object to array for easier iteration
export const defenses = Object.values(defensesObject);

/**
 * Retrieves all users from Firestore database
 * @returns {Promise<Array>} Array of user objects
 */
export const getAllUsers = async () => {
  const usersCollection = getCollection('users');
  const snapshot = await usersCollection.get();

  const users = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    users.push({ id: doc.id, ...data});
  });

  return users;
}