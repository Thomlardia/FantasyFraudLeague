import { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null);

/**
 * FilterProvider - Manages filter and sort state globally across pages
 * Persists filter selections when navigating between pages
 */
export function FilterProvider({ children }) {
  // Defense Shop filters
  const [defenseShopFilters, setDefenseShopFilters] = useState({
    showFilter: 'all', // all, owned, notOwned
    sortBy: 'effectiveness', // effectiveness, level, name
    sortDirection: 'desc', // desc (high to low) is most useful for effectiveness
  });

  // Fraud Wiki filters
  const [fraudWikiFilters, setFraudWikiFilters] = useState({
    showFilter: 'all', // all, highProtection, lowProtection
    sortBy: 'name', // coverage, name
    sortDirection: 'asc', // asc (A-Z) for name
  });

  // Leaderboard tab
  const [leaderboardTab, setLeaderboardTab] = useState('alltime'); // alltime (currently only tab)

  // Attack Log tab
  const [attackLogTab, setAttackLogTab] = useState('past'); // past, upcoming

  /**
   * Update Defense Shop filters
   * @param {object} filters - Partial filter object to merge with current state
   */
  const updateDefenseShopFilters = (filters) => {
    setDefenseShopFilters(prev => ({ ...prev, ...filters }));
  };

  /**
   * Update Fraud Wiki filters
   * @param {object} filters - Partial filter object to merge with current state
   */
  const updateFraudWikiFilters = (filters) => {
    setFraudWikiFilters(prev => ({ ...prev, ...filters }));
  };

  /**
   * Reset all filters to defaults
   */
  const resetAllFilters = () => {
    setDefenseShopFilters({
      showFilter: 'all',
      sortBy: 'effectiveness',
      sortDirection: 'desc',
    });
    setFraudWikiFilters({
      showFilter: 'all',
      sortBy: 'name',
      sortDirection: 'asc',
    });
    setLeaderboardTab('alltime');
    setAttackLogTab('past');
  };

  const value = {
    // Defense Shop
    defenseShopFilters,
    updateDefenseShopFilters,
    // Fraud Wiki
    fraudWikiFilters,
    updateFraudWikiFilters,
    // Leaderboard
    leaderboardTab,
    setLeaderboardTab,
    // Attack Log
    attackLogTab,
    setAttackLogTab,
    // Utilities
    resetAllFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}


/**
 * Hook to access filter context
 * @returns {Object} { defenseShopFilters, updateDefenseShopFilters, fraudWikiFilters, updateFraudWikiFilters, leaderboardTab, setLeaderboardTab, attackLogTab, setAttackLogTab, resetAllFilters }
 *
 * Filter state and utility functions for Defense Shop, Fraud Wiki, Leaderboard, and Attack Log pages
 */
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
