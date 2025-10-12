import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

const AttackContext = createContext(null);

/**
 * AttackProvider - Manages attack-related state globally
 * Currently manages the countdown timer for next attack
 * Future: Will manage attack logs, attack history, etc.
 */
export function AttackProvider({ children }) {
  const [timeRemaining, setTimeRemaining] = useState(5 * 3600 + 45 * 60 + 38); // 05:45:38 in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [onTimerComplete, setOnTimerComplete] = useState(null); // Callback when timer reaches 0
  const intervalRef = useRef(null);

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

  const value = {
    timeRemaining,
    isRunning,
    startTimer,
    pauseTimer,
    skipTimer,
    resetTimer,
    formatTime,
    getTimerCardClass,
    setTimerCompleteCallback,
  };

  return <AttackContext.Provider value={value}>{children}</AttackContext.Provider>;
}

/**
 * Hook to access attack context
 * @returns {Object} Context object with timer state and control functions
 * @property {number} timeRemaining - Seconds until next attack
 * @property {boolean} isRunning - Whether timer is running
 * @property {Function} startTimer - Start the countdown
 * @property {Function} pauseTimer - Pause the countdown
 * @property {Function} skipTimer - Skip to checkpoint (5min or 2min)
 * @property {Function} resetTimer - Reset to initial time and stop
 * @property {Function} formatTime - Format seconds as HH:MM:SS
 * @property {Function} getTimerCardClass - Get CSS class based on time
 * @property {Function} setTimerCompleteCallback - Set callback to execute when timer reaches 0
 */
export const useAttack = () => {
  const context = useContext(AttackContext);
  if (!context) {
    throw new Error('useAttack must be used within an AttackProvider');
  }
  return context;
};
