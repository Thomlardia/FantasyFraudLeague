import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useWallet } from '../contexts/WalletContext';
import { useDefense } from '../contexts/DefenseContext';
import { useAuth } from '../auth/AuthProvider';

/**
 * Hook to manage defense operations (Buy and Upgrade).
 * Uses DefenseContext for state and provides action handlers.
 *
 * @param {string} defenseId - The ID of the defense to operate on
 * @returns {Object} An object containing the defense data, loading states, error, success message, and action handlers
 * @property {Object} defense - The defense data from DefenseContext
 * @property {boolean} loading - Whether the defense data is being loaded (from context)
 * @property {boolean} actionLoading - Whether the buy or upgrade action is being performed
 * @property {string|null} error - The error message if an error occurred
 * @property {string|null} successMessage - The success message if the buy or upgrade action was successful
 * @property {function} handleBuy - Function to handle the buy action
 * @property {function} handleUpgrade - Function to handle the upgrade action
 * @property {function} refetch - Function to refetch the defense data
 * @property {boolean} isAuthenticated - Whether the user is signed in or not
 */
export function useDefenseOperations(defenseId) {
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { refreshBalance } = useWallet();
  const { defenses, loading, fetchDefenses, findDefense } = useDefense();
  const { user } = useAuth();

  // Get the specific defense from context
  const defense = findDefense(defenseId);

  // Firebase callable functions
  const buyDefenseFunction = httpsCallable(functions, 'user_buyDefense');
  const upgradeDefenseFunction = httpsCallable(functions, 'user_upgradeDefense');

  /**
   * Handles the buy action for the defense with the given ID.
   * If the user is not signed in, sets an error message.
   * If the buy action is successful, sets a success message and refreshes defense data from context.
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
      await fetchDefenses(); // Refresh defenses from context
      await refreshBalance(); // Refresh balance after purchase
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
   * If the upgrade action is successful, sets a success message and refreshes defense data from context.
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
      await fetchDefenses(); // Refresh defenses from context
      await refreshBalance(); // Refresh balance after upgrade
    } catch (err) {
      console.error('Error upgrading defense:', err);
      setError(err.message || 'Failed to upgrade defense');
    } finally {
      setActionLoading(false);
    }
  };

  return {
    defense,
    loading,
    actionLoading,
    error,
    successMessage,
    handleBuy,
    handleUpgrade,
    refetch: fetchDefenses,
    isAuthenticated: !!user
  };
}
