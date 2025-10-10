import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useAuth } from '../auth/AuthProvider';

const DefenseContext = createContext(null);

/**
 * DefenseProvider - Manages defense state globally
 * Provides defenses list and refresh methods to all components
 * Auto-fetches when user auth state changes
 */
export function DefenseProvider({ children }) {
  const [defenses, setDefenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  /**
   * Fetches all defenses for the current user from the backend
   * Uses memoized callback to prevent unnecessary re-renders
   */
  const fetchDefenses = useCallback(async () => {
    if (!user) {
      setDefenses([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const getUserDefensesFunction = httpsCallable(functions, 'user_getDefenses');
      const result = await getUserDefensesFunction();
      setDefenses(result.data || []);
    } catch (err) {
      console.error('Error fetching defenses:', err);
      setError(err.message || 'Failed to load defenses');
      setDefenses([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Finds a specific defense by ID from the loaded defenses
   * @param {string} defenseId - The ID of the defense to find
   * @returns {Object|undefined} The defense object or undefined if not found
   */
  const findDefense = useCallback((defenseId) => {
    return defenses.find(d => d.defenseId === defenseId);
  }, [defenses]);

  /**
   * Gets the effectiveness percentage for a specific defense against an attack at a given level
   * @param {string} defenseId - The ID of the defense
   * @param {string} attackId - The ID of the attack
   * @param {number} level - The level of the defense (1-3)
   * @returns {number} The effectiveness percentage (0-99), or 0 if not found
   */
  const getDefenseEffectiveness = useCallback((defenseId, attackId, level) => {
    const defense = defenses.find(d => d.defenseId === defenseId);
    if (!defense || !defense.defendsAgainst || !defense.defendsAgainst[attackId]) {
      return 0;
    }
    const percentages = defense.defendsAgainst[attackId];
    return percentages[level - 1] || 0;
  }, [defenses]);

  /**
   * Gets all attacks that a defense protects against with their effectiveness percentages
   * @param {string} defenseId - The ID of the defense
   * @returns {Object} Object mapping attack IDs to percentage arrays, or empty object if not found
   */
  const getDefenseProtections = useCallback((defenseId) => {
    const defense = defenses.find(d => d.defenseId === defenseId);
    return defense?.defendsAgainst || {};
  }, [defenses]);

  // Auto-fetch defenses when user auth state changes
  useEffect(() => {
    fetchDefenses();
  }, [fetchDefenses]);

  const value = {
    defenses,
    loading,
    error,
    fetchDefenses,
    findDefense,
    getDefenseEffectiveness,
    getDefenseProtections,
  };

  return <DefenseContext.Provider value={value}>{children}</DefenseContext.Provider>;
}

/**
 * Hook to access defense context
 * @returns {Object} { defenses, loading, error, fetchDefenses, findDefense, getDefenseEffectiveness, getDefenseProtections }
 */
export const useDefense = () => {
  const context = useContext(DefenseContext);
  if (!context) {
    throw new Error('useDefense must be used within a DefenseProvider');
  }
  return context;
};
