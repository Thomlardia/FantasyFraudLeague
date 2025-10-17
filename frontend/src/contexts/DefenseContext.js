import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useAuth } from '../auth/AuthProvider';
import { startCustomTrace } from '../analytics/PerformanceMonitoring';

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
  const { user, initializing } = useAuth();

  /**
   * Fetches all defenses for the current user from the backend
   * Uses memoized callback to prevent unnecessary re-renders
   * Waits for authentication to complete before fetching
   */
  const fetchDefenses = useCallback(async () => {
    // Wait for auth initialization to complete
    if (initializing || !user) {
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
  }, [user, initializing]);

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

  /**
   * Calculates the total protection percentage against a specific attack
   * based on all owned defenses and their current levels.
   * Protection stacks multiplicatively: finalDamage = baseDamage * (1 - p1/100) * (1 - p2/100) ...
   * Total protection = (1 - finalDamage/baseDamage) * 100
   *
   * @param {string} attackId - The ID of the attack
   * @returns {number} Total protection percentage (0-100)
   */
  const getTotalProtectionAgainstAttack = useCallback((attackId) => {
    const trace = startCustomTrace("calc_total_protection", {
      attack_id: attackId
    });

    const ownedDefenses = defenses.filter(d => d.isOwned && d.level > 0);
    trace.putMetric("num_owned_defenses", ownedDefenses.length);

    if (ownedDefenses.length === 0) {
      trace.putMetric("total_protection_pct", 0);
      trace.stop();
      return 0;
    }

    // Start with 100% damage (no reduction)
    let damageMultiplier = 1.0;

    // Apply each defense's reduction multiplicatively
    ownedDefenses.forEach(defense => {
      if (defense.defendsAgainst && defense.defendsAgainst[attackId]) {
        const percentages = defense.defendsAgainst[attackId];
        const effectiveness = percentages[defense.level - 1] || 0;
        // Reduce damage by this defense's effectiveness
        damageMultiplier *= (1 - effectiveness / 100);
      }
    });

    // Convert back to protection percentage
    const totalProtection = (1 - damageMultiplier) * 100;
    const roundedProtection = Math.round(totalProtection * 100) / 100;

    trace.putMetric("total_protection_pct", Math.round(roundedProtection));
    trace.stop();

    return roundedProtection; // Round to 2 decimal places
  }, [defenses]);

  /**
   * Gets Recharts-ready data for protection against all attack types
   * Returns array of objects suitable for bar charts showing current protection levels
   *
   * @returns {Array<Object>} Array of { attackId, attackName, protection } objects
   *
   * Example output:
   * [
   *   { attackId: 'phishing', attackName: 'Phishing', protection: 95.5 },
   *   { attackId: 'ransomware', attackName: 'Ransomware', protection: 60.0 },
   *   ...
   * ]
   */
  const getProtectionChartData = useCallback(() => {
    const trace = startCustomTrace("calc_protection_chart_data", {
      num_defenses: defenses.length.toString()
    });

    // Map of all possible attacks with user-friendly names
    const attackNames = {
      phishing: 'Phishing',
      ransomware: 'Ransomware',
      accountTakeover: 'Account Takeover',
      bruteForce: 'Brute Force',
      ddos: 'DDoS',
      mitm: 'Man-in-the-Middle',
      sqlInjection: 'SQL Injection',
      xss: 'Cross-Site Scripting',
      bec: 'Business Email Compromise',
      insiderFraud: 'Insider Fraud',
      deepfakeFraud: 'Deepfake Fraud',
      vishing: 'Vishing',
      simSwap: 'SIM Swap',
      cryptojacking: 'Cryptojacking',
      authorizedPushPayments: 'Authorized Push Payments',
      investmentScams: 'Investment Scams',
      skimming: 'ATM Skimming',
      syntheticIdentity: 'Synthetic Identity Theft',
      zeroDay: 'Zero-Day Exploit',
      accAndInvFraud: 'Account & Investment Fraud'
    };

    // Collect all unique attack IDs from all defenses
    const allAttackIds = new Set();
    defenses.forEach(defense => {
      if (defense.defendsAgainst) {
        Object.keys(defense.defendsAgainst).forEach(attackId => {
          allAttackIds.add(attackId);
        });
      }
    });

    // Calculate protection for each attack
    const chartData = Array.from(allAttackIds).map(attackId => ({
      attackId,
      attackName: attackNames[attackId] || attackId,
      protection: getTotalProtectionAgainstAttack(attackId)
    }));

    // Sort by protection level (highest first)
    chartData.sort((a, b) => b.protection - a.protection);

    trace.putMetric("num_attack_types", allAttackIds.size);
    trace.putMetric("chart_data_points", chartData.length);
    trace.stop();

    return chartData;
  }, [defenses, getTotalProtectionAgainstAttack]);

  /**
   * Gets Recharts-ready data for a specific attack showing which defenses protect against it
   * Returns array showing each defense's contribution to protection
   *
   * @param {string} attackId - The ID of the attack
   * @returns {Array<Object>} Array of { defenseName, level, effectiveness } objects
   *
   * Example output for 'phishing':
   * [
   *   { defenseName: 'Multi-Factor Auth', level: 2, effectiveness: 95, isOwned: true },
   *   { defenseName: 'Email Filtering', level: 1, effectiveness: 80, isOwned: true },
   *   { defenseName: 'User Education', level: 0, effectiveness: 50, isOwned: false }
   * ]
   */
  const getDefensesByAttackChartData = useCallback((attackId) => {
    const trace = startCustomTrace("calc_defenses_by_attack_chart", {
      attack_id: attackId,
      num_defenses: defenses.length.toString()
    });

    const defenseNames = {
      mfa: 'MFA',
      userEducation: 'User\nTraining',
      emailFiltering: 'Email\nFilter',
      networkMonitoring: 'Net\nMonitor',
      inputValidation: 'Input\nValid.',
      httpsEncryption: 'HTTPS',
      vpnUsage: 'VPN',
      ddosProtection: 'DDoS\nShield',
      trafficFiltering: 'Traffic\nFilter',
      keepSoftwareUpdated: 'Updates',
      automatedBackups: 'Auto\nBackup',
      applicationSandboxing: 'Sand-\nboxing',
      regularAudits: 'Audits',
      segregationOfDuties: 'Seg.\nDuties',
      principleOfLeastPrivilege: 'Least\nPrivilege',
      regularPasswordChanges: 'Pwd\nChanges',
      backgroundChecks: 'Bg\nChecks',
      atmInspection: 'ATM\nInspect.',
      deepfakeDetection: 'Deep-\nfake Det.',
      verificationProtocols: 'Verifi-\ncation'
    };

    // Find all defenses that protect against this attack
    const relevantDefenses = defenses
      .filter(d => d.defendsAgainst && d.defendsAgainst[attackId])
      .map(defense => {
        const percentages = defense.defendsAgainst[attackId];
        const currentLevel = defense.level || 0;
        const effectiveness = currentLevel > 0 ? percentages[currentLevel - 1] : percentages[0];

        // Calculate next buy effectiveness (next level if owned, first level if not owned)
        const nextLevel = currentLevel > 0 ? currentLevel : 0; // If owned, next level index, if not owned, level 0
        const nextBuyEffectiveness = currentLevel < percentages.length ? percentages[nextLevel] : percentages[percentages.length - 1];

        return {
          defenseId: defense.defenseId,
          defenseName: defenseNames[defense.defenseId] || defense.defenseId,
          level: currentLevel,
          effectiveness: effectiveness || 0,
          nextBuyEffectiveness: nextBuyEffectiveness || 0,
          isOwned: defense.isOwned || false,
          maxEffectiveness: Math.max(...percentages),
          canUpgrade: currentLevel < percentages.length
        };
      });

    // Sort by effectiveness (owned defenses first, then by effectiveness)
    relevantDefenses.sort((a, b) => {
      if (a.isOwned !== b.isOwned) {
        return b.isOwned ? 1 : -1;
      }
      return b.effectiveness - a.effectiveness;
    });

    trace.putMetric("num_relevant_defenses", relevantDefenses.length);
    trace.putMetric("num_owned", relevantDefenses.filter(d => d.isOwned).length);
    trace.stop();

    return relevantDefenses;
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
    getTotalProtectionAgainstAttack,
    getProtectionChartData,
    getDefensesByAttackChartData,
  };

  return <DefenseContext.Provider value={value}>{children}</DefenseContext.Provider>;
}

/**
 * Hook to access defense context
 * @returns {Object} Context object with defense data and utility functions
 * @property {Array} defenses - Array of all defenses with user's ownership status
 * @property {boolean} loading - Whether defenses are being loaded
 * @property {string|null} error - Error message if any
 * @property {Function} fetchDefenses - Fetch/refresh defenses from backend
 * @property {Function} findDefense - Find a defense by ID
 * @property {Function} getDefenseEffectiveness - Get effectiveness of a defense against an attack at a level
 * @property {Function} getDefenseProtections - Get all protections for a defense
 * @property {Function} getTotalProtectionAgainstAttack - Calculate total protection against an attack
 * @property {Function} getProtectionChartData - Get Recharts data for all attacks
 * @property {Function} getDefensesByAttackChartData - Get Recharts data for defenses against a specific attack
 */
export const useDefense = () => {
  const context = useContext(DefenseContext);
  if (!context) {
    throw new Error('useDefense must be used within a DefenseProvider');
  }
  return context;
};
