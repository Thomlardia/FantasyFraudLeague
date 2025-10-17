import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useAuth } from '../auth/AuthProvider';
import { measureAsync } from '../analytics/PerformanceMonitoring';

const LeaderboardContext = createContext(null);

/**
 * LeaderboardProvider - Manages leaderboard state globally
 * Provides leaderboard data and refresh method to all components
 * Auto-fetches when user auth state changes
 */
export function LeaderboardProvider({ children }) {
  const [topTen, setTopTen] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, initializing } = useAuth();

  /**
   * Fetches leaderboard data from the backend
   * Gets top 10 players + current user's rank (if not in top 10)
   * Uses memoized callback to prevent unnecessary re-renders
   * Waits for authentication to complete before fetching
   */
  const refreshLeaderboard = useCallback(async () => {
    // Wait for auth initialization to complete
    if (initializing || !user) {
      setTopTen([]);
      setCurrentUser(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await measureAsync("leaderboard_fetch", async () => {
        const getLeaderboardFunction = httpsCallable(functions, 'user_getLeaderboardWithUser');
        return await getLeaderboardFunction();
      }, {});

      // Backend returns { success: true, data: { topTen: [...], currentUser: {...} or null } }
      const data = result.data?.data || {};
      const topTenData = data.topTen || [];
      setTopTen(topTenData);
      setCurrentUser(data.currentUser);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message || 'Failed to load leaderboard');
      setTopTen([]);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, [user, initializing]);

  // Auto-fetch leaderboard when user auth state changes
  useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

  const value = {
    topTen,
    currentUser,
    loading,
    error,
    refreshLeaderboard,
  };

  return <LeaderboardContext.Provider value={value}>{children}</LeaderboardContext.Provider>;
}

/**
 * Hook to access leaderboard context
 * @returns {Object} { topTen, currentUser, loading, error, refreshLeaderboard }
 */
export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};
