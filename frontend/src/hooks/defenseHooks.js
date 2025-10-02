import { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { onAuthStateChanged } from 'firebase/auth';
import { functions, auth } from '../firebase';

/**
 * Hook to manage defense operations (Buy and Upgrade).
 *
 * @param {string} defenseId - The ID of the defense to load
 * @returns {Object} An object containing the defense data, loading state, action loading state, error message, success message, handleBuy, handleUpgrade, and refetch functions.
 * @property {Object} defense - The defense data
 * @property {boolean} loading - Whether the defense data is being loaded
 * @property {boolean} actionLoading - Whether the buy or upgrade action is being performed.
 * @property {string|null} error - The error message if an error occurred while loading the defense data.
 * @property {string|null} successMessage - The success message if the buy or upgrade action was successful.
 * @property {function} handleBuy - Function to handle the buy action.
 * @property {function} handleUpgrade - Function to handle the upgrade action.
 * @property {function} refetch - Function to refetch the defense data.
 * @property {Object|null} user - The user object or null if the user is not signed in.
 * @property {boolean} authenticated - Whether the user is signed in or not.
 */
export function useDefenseOperations(defenseId) {
  const [defense, setDefense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Firebase callable functions
  const getUserDefensesFunction = httpsCallable(functions, 'user_getDefenses');
  const buyDefenseFunction = httpsCallable(functions, 'user_buyDefense');
  const upgradeDefenseFunction = httpsCallable(functions, 'user_upgradeDefense');

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser ? 'User signed in' : 'User signed out');
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load defense data when auth or defenseId changes
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        loadDefenseData();
      } else {
        setError('Please sign in to access defenses');
        setLoading(false);
      }
    }
  }, [defenseId, user, authLoading]);

  const loadDefenseData = async () => {
    if (!user) {
      setError('Please sign in to access defenses');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 🔹 Refresh ID token to avoid unauthenticated errors
      await user.getIdToken(true);

      console.log('Loading defense data for:', defenseId);

      const result = await getUserDefensesFunction();
      const allDefenses = result.data;

      if (!Array.isArray(allDefenses)) throw new Error('Invalid response format');

      const myDefense = allDefenses.find(d => d.defenseId === defenseId);

      if (myDefense) setDefense(myDefense);
      else setError(`Defense '${defenseId}' not found`);
    } catch (err) {
      console.error('Error loading defense:', err);
      if (err.code === 'functions/unauthenticated') setError('Please sign in to view defenses');
      else setError(err.message || 'Failed to load defense data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the buy action for the defense with the given ID.
   * If the user is not signed in, sets an error message.
   * If the buy action is successful, sets a success message and reloads the defense data.
   * If the buy action fails, sets an error message.
   */
  const handleBuy = async () => {
    if (!user) return setError('Please sign in to purchase defenses');

    try {
      setActionLoading(true);
      setError(null);
      setSuccessMessage(null);

      await user.getIdToken(true); // refresh token
      const result = await buyDefenseFunction({ defenseId });
      console.log('Buy result:', result);

      setSuccessMessage('Successfully purchased defense!');
      await loadDefenseData();
    } catch (err) {
      console.error('Error buying defense:', err);
      setError(err.message || 'Failed to purchase defense');
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Handles the upgrade action for the defense with the given ID.
   * If the user is not signed in, sets an error message.
   * If the upgrade action is successful, sets a success message and reloads the defense data.
   * If the upgrade action fails, sets an error message.
   */
  const handleUpgrade = async () => {
    if (!user) return setError('Please sign in to upgrade defenses');

    try {
      setActionLoading(true);
      setError(null);
      setSuccessMessage(null);

      await user.getIdToken(true); // refresh token
      const result = await upgradeDefenseFunction({ defenseId });
      console.log('Upgrade result:', result);

      setSuccessMessage('Successfully upgraded defense!');
      await loadDefenseData();
    } catch (err) {
      console.error('Error upgrading defense:', err);
      setError(err.message || 'Failed to upgrade defense');
    } finally {
      setActionLoading(false);
    }
  };

  return {
    defense,
    loading: loading || authLoading,
    actionLoading,
    error,
    successMessage,
    handleBuy,
    handleUpgrade,
    refetch: loadDefenseData,
    user,
    isAuthenticated: !!user
  };
}
