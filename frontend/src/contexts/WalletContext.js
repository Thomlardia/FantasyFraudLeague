import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useAuth } from '../auth/AuthProvider';

const WalletContext = createContext(null);

/**
 * WalletProvider - Manages user balance state globally
 * Provides balance and refreshBalance() to all components
 * Auto-refreshes when user auth state changes
 */
export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, initializing } = useAuth();

  /**
   * Fetches the current user's balance from the backend
   * Uses memoized callback to prevent unnecessary re-renders
   * Waits for authentication to complete before fetching
   */
  const refreshBalance = useCallback(async () => {
    // Wait for auth initialization to complete
    if (initializing || !user) {
      setBalance(null);
      return;
    }

    try {
      setLoading(true);
      const call = httpsCallable(functions, 'user_getBalance');
      const res = await call();
      const value = typeof res?.data === 'number' ? res.data : 0;
      setBalance(value);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  }, [user, initializing]);

  // Auto-refresh balance when user auth state changes
  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  const value = {
    balance,
    loading,
    refreshBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

/**
 * Hook to access wallet context
 * @returns {Object} { balance, loading, refreshBalance }
 */
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
