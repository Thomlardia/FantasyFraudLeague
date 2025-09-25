import { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { onAuthStateChanged } from 'firebase/auth';
import { functions, auth } from '../firebase';

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
      if (user && user.emailVerified) loadDefenseData();
      else if (user && !user.emailVerified) {
        setError('Please verify your email address to access defenses');
        setLoading(false);
      } else {
        setError('Please sign in to access defenses');
        setLoading(false);
      }
    }
  }, [defenseId, user, authLoading]);

  const loadDefenseData = async () => {
    if (!user || !user.emailVerified) {
      setError('Please sign in and verify your email to access defenses');
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

  const handleBuy = async () => {
    if (!user || !user.emailVerified) return setError('Please sign in and verify your email');

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

  const handleUpgrade = async () => {
    if (!user || !user.emailVerified) return setError('Please sign in and verify your email');

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
    isAuthenticated: user && user.emailVerified
  };
}
