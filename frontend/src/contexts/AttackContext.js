import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { getUserAttackLogs } from '../api/attack';

const AttackContext = createContext(null);

/**
 * AttackProvider - Manages attack-related state globally
 * Manages countdown timer for next attack and attack log history
 * Auto-fetches attack logs when provider mounts
 */
export function AttackProvider({ children }) {
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(5 * 3600 + 45 * 60 + 38); // 05:45:38 in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [onTimerComplete, setOnTimerComplete] = useState(null); // Callback when timer reaches 0
  const intervalRef = useRef(null);

  // Attack logs state
  const [attackLogs, setAttackLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState(null);

  // Attack statistics (average protection by attack type)
  const [attackStats, setAttackStats] = useState({});

  /**
   * Start the countdown timer
   * If timer is at 0, resets to initial value first
   */
  const startTimer = useCallback(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(5 * 3600 + 45 * 60 + 38); // Reset to 05:45:38
    }
    setIsRunning(true);
  }, [timeRemaining]);

  /**
   * Pause the countdown timer
   */
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  /**
   * Skip timer to specific checkpoints
   * - If > 5min: skip to 5 minutes
   * - If > 2min: skip to 2 minutes
   */
  const skipTimer = useCallback(() => {
    if (timeRemaining > 5 * 60) {
      setTimeRemaining(5 * 60); // Skip to 5 minutes
    } else if (timeRemaining > 2 * 60) {
      setTimeRemaining(2 * 60); // Skip to 2 minutes
    }
  }, [timeRemaining]);

  /**
   * Reset timer to initial value and stop
   */
  const resetTimer = useCallback(() => {
    setTimeRemaining(5 * 3600 + 45 * 60 + 38);
    setIsRunning(false);
  }, []);

  /**
   * Format seconds as HH:MM:SS
   * @param {number} seconds - Total seconds
   * @returns {string} Formatted time string
   */
  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  /**
   * Get timer card class based on time remaining
   * @returns {string} CSS class name
   */
  const getTimerCardClass = useCallback(() => {
    if (timeRemaining <= 2 * 60) {
      return 'home-timer-card timer-critical';
    } else if (timeRemaining <= 5 * 60) {
      return 'home-timer-card timer-warning';
    }
    return 'home-timer-card';
  }, [timeRemaining]);

  // Manage timer interval
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            // Execute callback when timer reaches zero
            if (onTimerComplete && typeof onTimerComplete === 'function') {
              onTimerComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onTimerComplete]);

  /**
   * Set a callback function to execute when timer reaches zero
   * @param {Function} callback - Function to call when timer completes
   */
  const setTimerCompleteCallback = useCallback((callback) => {
    setOnTimerComplete(() => callback);
  }, []);

  /**
   * Calculate attack statistics from logs
   * Returns average protection percentage by attack type
   * ONLY includes attacks that have actually occurred (not assumptions)
   * @param {Array} logs - Array of attack log objects
   * @returns {Object} Map of attackId -> average protection % (only for attacks that happened)
   */
  const calculateAttackStats = useCallback((logs) => {
    const stats = {};

    // Aggregate data ONLY for attacks that actually occurred
    logs.forEach(log => {
      if (!log.attacks || !Array.isArray(log.attacks)) return;

      log.attacks.forEach(attack => {
        const attackId = attack.attackName; // This is actually the attackId from backend
        if (!attackId) return;

        // Initialize if first time seeing this attack TYPE
        if (!stats[attackId]) {
          stats[attackId] = {
            totalReductionPercent: 0,
            count: 0,
          };
        }

        // Add to running totals (including if reductionPercent is 0!)
        const reductionPercent = attack.reductionPercent || 0;
        stats[attackId].totalReductionPercent += reductionPercent;
        stats[attackId].count += 1;
      });
    });

    // Calculate averages ONLY for attacks that happened
    // Do NOT add entries for attacks that never occurred
    const averages = {};
    Object.keys(stats).forEach(attackId => {
      const data = stats[attackId];
      if (data.count > 0) {
        // Calculate average, which could be 0% if all attacks had 0% reduction
        averages[attackId] = Math.round(data.totalReductionPercent / data.count);
      }
      // If count is 0 (shouldn't happen), don't add to averages at all
    });

    return averages;
  }, []);

  /**
   * Fetch attack logs from backend
   * @param {number|null} limit - Optional limit for number of logs
   */
  const fetchAttackLogs = useCallback(async (limit = null) => {
    try {
      setLogsLoading(true);
      setLogsError(null);
      const logs = await getUserAttackLogs(limit);
      setAttackLogs(logs || []);

      // Calculate and store statistics from logs
      const stats = calculateAttackStats(logs || []);
      setAttackStats(stats);
    } catch (err) {
      console.error('Error fetching attack logs:', err);
      setLogsError(err.message || 'Failed to load attack logs');
      setAttackLogs([]);
      setAttackStats({});
    } finally {
      setLogsLoading(false);
    }
  }, [calculateAttackStats]);

  /**
   * Refresh attack logs (convenience wrapper)
   */
  const refreshAttackLogs = useCallback(() => {
    return fetchAttackLogs();
  }, [fetchAttackLogs]);

  /**
   * Get the most recent attack log
   * @returns {object|null} Most recent attack log or null
   */
  const getLatestAttackLog = useCallback(() => {
    return attackLogs.length > 0 ? attackLogs[0] : null;
  }, [attackLogs]);

  /**
   * Get average protection percentage from historical attack logs for a specific attack type
   * @param {string} attackId - The attackId (e.g., "phishing", "ransomware")
   * @returns {number|null} Average protection percentage (0-100), or null if never attacked
   */
  const getAverageProtectionFromLogs = useCallback((attackId) => {
    if (!attackId) {
      return null;
    }

    // Check if this attack type exists in our stats (meaning it has been experienced)
    if (attackStats.hasOwnProperty(attackId)) {
      // Return the percentage, even if it's 0%
      return attackStats[attackId];
    }

    // Attack type not found = never been attacked with this type
    return null;
  }, [attackStats]);

  // Auto-fetch attack logs on mount (when user context is available)
  useEffect(() => {
    fetchAttackLogs();
  }, [fetchAttackLogs]);

  const value = {
    // Timer
    timeRemaining,
    isRunning,
    startTimer,
    pauseTimer,
    skipTimer,
    resetTimer,
    formatTime,
    getTimerCardClass,
    setTimerCompleteCallback,
    // Attack logs
    attackLogs,
    logsLoading,
    logsError,
    fetchAttackLogs,
    refreshAttackLogs,
    getLatestAttackLog,
    // Attack statistics
    attackStats,
    getAverageProtectionFromLogs,
  };

  return <AttackContext.Provider value={value}>{children}</AttackContext.Provider>;
}

/**
 * Hook to access attack context
 * @returns {Object} Context object with timer state, attack logs, and control functions
 *
 * Timer properties:
 * @property {number} timeRemaining - Seconds until next attack
 * @property {boolean} isRunning - Whether timer is running
 * @property {Function} startTimer - Start the countdown
 * @property {Function} pauseTimer - Pause the countdown
 * @property {Function} skipTimer - Skip to checkpoint (5min or 2min)
 * @property {Function} resetTimer - Reset to initial time and stop
 * @property {Function} formatTime - Format seconds as HH:MM:SS
 * @property {Function} getTimerCardClass - Get CSS class based on time
 * @property {Function} setTimerCompleteCallback - Set callback to execute when timer reaches 0
 *
 * Attack log properties:
 * @property {Array} attackLogs - Array of attack log objects (sorted newest first)
 * @property {boolean} logsLoading - Whether logs are currently being fetched
 * @property {string|null} logsError - Error message if log fetching failed
 * @property {Function} fetchAttackLogs - Fetch attack logs with optional limit
 * @property {Function} refreshAttackLogs - Refresh all attack logs
 * @property {Function} getLatestAttackLog - Get most recent attack log
 *
 * Attack statistics properties:
 * @property {Object} attackStats - Map of attack names to average protection percentages
 * @property {Function} getAverageProtectionFromLogs - Get average protection % for an attack type
 */
export const useAttack = () => {
  const context = useContext(AttackContext);
  if (!context) {
    throw new Error('useAttack must be used within an AttackProvider');
  }
  return context;
};
