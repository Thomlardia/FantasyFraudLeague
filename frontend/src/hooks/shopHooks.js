import { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Hook to retrieve the list of defenses owned by the user. Used to get the level they own the defense at and display this on the Defense Shop.
 * Also monitors the authentication state and loads the defenses when the user is signed in.
 * @returns {Object} An object containing the list of owned defenses, loading state, error message, and a function to refetch the defenses.
 * @property {Array} defenses - The list of owned defenses.
 * @property {boolean} loading - Whether the defenses are being loaded.
 * @property {string} error - The error message if the defenses failed to load.
 * @property {function} refetch - A function to refetch the list of owned defenses.
 */
export function useUserDefenses() {
  const [defenses, setDefenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const getUserDefensesFunction = httpsCallable(functions, 'user_getDefenses');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

/**
 * Loads the list of defenses owned by the user.
 * Called when the user signs in and on demand when the user wants to refetch the list of defenses.
 * @returns {Promise<void>} A promise that resolves when the list of defenses is successfully loaded.
 */
  const loadDefenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const result = await getUserDefensesFunction();
      setDefenses(result.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load defenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) loadDefenses();
  }, [user, authLoading]);

  return { defenses, loading: loading || authLoading, error, refetch: loadDefenses };
}
