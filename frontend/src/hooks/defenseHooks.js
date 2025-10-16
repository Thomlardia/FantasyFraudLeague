import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useWallet } from '../contexts/WalletContext';
import { useDefense } from '../contexts/DefenseContext';
import { useAuth } from '../auth/AuthProvider';
import { measureAsync } from '../analytics/PerformanceMonitoring';

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

  // Firebase callable functions with limited-use App Check tokens (prevents replay attacks)
  const buyDefenseFunction = httpsCallable(functions, 'user_buyDefense', {
    limitedUseAppCheckTokens: true
  });
  const upgradeDefenseFunction = httpsCallable(functions, 'user_upgradeDefense', {
    limitedUseAppCheckTokens: true
  });
  const sellDefenseFunction = httpsCallable(functions, 'user_sellDefense', {
    limitedUseAppCheckTokens: true
  });

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

      await measureAsync("defense_buy", async () => {
        await user.getIdToken(true); // refresh token
        const result = await buyDefenseFunction({ defenseId });
        console.log('Buy result:', result);

        setSuccessMessage('Successfully purchased defense!');
        await fetchDefenses(); // Refresh defenses from context
        await refreshBalance(); // Refresh balance after purchase
      }, { defense_id: defenseId });
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

      await measureAsync("defense_upgrade", async () => {
        await user.getIdToken(true); // refresh token
        const result = await upgradeDefenseFunction({ defenseId });
        console.log('Upgrade result:', result);

        setSuccessMessage('Successfully upgraded defense!');
        await fetchDefenses(); // Refresh defenses from context
        await refreshBalance(); // Refresh balance after upgrade
      }, { defense_id: defenseId, current_level: defense?.level?.toString() || '0' });
    } catch (err) {
      console.error('Error upgrading defense:', err);
      setError(err.message || 'Failed to upgrade defense');
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Handles the sell action for the defense with the given ID.
   * If the user is not signed in, sets an error message.
   * If the sell action is successful, sets a success message and refreshes defense data from context.
   * If the sell action fails, sets an error message.
   */
  const handleSell = async () => {
    if (!user) return setError('Please sign in to sell defenses');

    try {
      setActionLoading(true);
      setError(null);
      setSuccessMessage(null);

      await measureAsync("defense_sell", async () => {
        await user.getIdToken(true); // refresh token
        const result = await sellDefenseFunction({ defenseId });
        console.log('Sell result:', result);

        const sellInfo = result.data;
        setSuccessMessage(
          `Successfully sold defense for $${sellInfo.sellPrice.toLocaleString()}! (Loss: $${sellInfo.loss.toLocaleString()})`
        );
        await fetchDefenses(); // Refresh defenses from context
        await refreshBalance(); // Refresh balance after sell
      }, { defense_id: defenseId, current_level: defense?.level?.toString() || '0' });
    } catch (err) {
      console.error('Error selling defense:', err);
      setError(err.message || 'Failed to sell defense');
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
    handleSell,
    refetch: fetchDefenses,
    isAuthenticated: !!user
  };
}
