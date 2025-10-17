import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAttack } from '../contexts/AttackContext';
import {
  getScheduledDate,
  getScheduledAttackKey,
  formatCountdown,
  formatCurrencyDelta,
} from '../utils/scheduledAttack';

const POLL_INTERVAL_MS = 5000;
const POLL_MAX_ATTEMPTS = 6;

/**
 * Hook to expose the UI-ready state for the next scheduled attack countdown on the home page.
 * Centralises the timing, refresh, and outcome tracking logic so the component can stay declarative.
 */
export default function useNextAttackCountdown() {
  const {
    scheduledAttacks,
    scheduledLoading,
    attackLogs,
    logsLoading,
    refreshAttackLogs,
  } = useAttack();

  const nextAttack = scheduledAttacks?.[0] || null;
  const scheduledDate = useMemo(() => getScheduledDate(nextAttack), [nextAttack]);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!scheduledDate) {
      setNow(Date.now());
      return undefined;
    }
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [scheduledDate]);

  const remainingMs = useMemo(() => {
    if (!scheduledDate) {
      return null;
    }
    return scheduledDate.getTime() - now;
  }, [scheduledDate, now]);

  const countdownDisplay = useMemo(() => formatCountdown(remainingMs), [remainingMs]);
  const [outcome, setOutcome] = useState(null);
  const [awaitingOutcome, setAwaitingOutcome] = useState(false);
  const awaitingOutcomeRef = useRef(false);
  const [awaitingTimeout, setAwaitingTimeout] = useState(false);
  const awaitingTimeoutRef = useRef(false);

  useEffect(() => {
    awaitingOutcomeRef.current = awaitingOutcome;
  }, [awaitingOutcome]);

  useEffect(() => {
    awaitingTimeoutRef.current = awaitingTimeout;
  }, [awaitingTimeout]);

  const currentAttackKey = useMemo(() => getScheduledAttackKey(nextAttack), [nextAttack]);

  const activeAttackKeyRef = useRef(null);
  const pendingRefreshKeyRef = useRef(null);
  const lastLogIdRef = useRef(null);
  const pollAttemptsRef = useRef(0);
  const pollTimeoutRef = useRef(null);

  const clearPollTimer = useCallback(() => {
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  }, []);

  const schedulePollRefresh = useCallback(
    (attackKey) => {
      if (pollTimeoutRef.current) {
        return;
      }
      if (pollAttemptsRef.current >= POLL_MAX_ATTEMPTS) {
        pollAttemptsRef.current = 0;
        pendingRefreshKeyRef.current = attackKey;
        setAwaitingOutcome(false);
        awaitingOutcomeRef.current = false;
        setAwaitingTimeout(true);
        awaitingTimeoutRef.current = true;
        return;
      }

      pollAttemptsRef.current += 1;
      pollTimeoutRef.current = setTimeout(() => {
        pollTimeoutRef.current = null;
        pendingRefreshKeyRef.current = attackKey;
        refreshAttackLogs().catch(() => {
          pendingRefreshKeyRef.current = null;
        });
      }, POLL_INTERVAL_MS);
    },
    [clearPollTimer, refreshAttackLogs]
  );

  useEffect(() => {
    return () => {
      clearPollTimer();
    };
  }, [clearPollTimer]);

  useEffect(() => {
    if (activeAttackKeyRef.current !== currentAttackKey) {
      activeAttackKeyRef.current = currentAttackKey;
      pendingRefreshKeyRef.current = null;
      setAwaitingOutcome(false);
      awaitingOutcomeRef.current = false;
      setAwaitingTimeout(false);
      awaitingTimeoutRef.current = false;
      pollAttemptsRef.current = 0;
      clearPollTimer();
      if (currentAttackKey) {
        setOutcome(null);
      }
    }
  }, [currentAttackKey, clearPollTimer]);

  useEffect(() => {
    const activeKey = activeAttackKeyRef.current;
    if (!activeKey) {
      return;
    }
    if (remainingMs != null && remainingMs <= 0 && pendingRefreshKeyRef.current !== activeKey) {
      pendingRefreshKeyRef.current = activeKey;
      setAwaitingOutcome(true);
      awaitingOutcomeRef.current = true;
      setAwaitingTimeout(false);
      awaitingTimeoutRef.current = false;
      pollAttemptsRef.current = 1;
      clearPollTimer();
      refreshAttackLogs().catch(() => {
        pendingRefreshKeyRef.current = null;
        setAwaitingOutcome(false);
        awaitingOutcomeRef.current = false;
        pollAttemptsRef.current = 0;
      });
    }
  }, [remainingMs, refreshAttackLogs, clearPollTimer]);

  useEffect(() => {
    if (logsLoading) {
      return;
    }

    const latestLog = attackLogs?.[0] || null;
    const latestLogId = getAttackLogId(latestLog);

    if (latestLogId == null) {
      lastLogIdRef.current = null;
      return;
    }

    if (lastLogIdRef.current == null) {
      lastLogIdRef.current = latestLogId;
      return;
    }

    if (lastLogIdRef.current === latestLogId) {
      if (awaitingOutcomeRef.current) {
        const activeKey = activeAttackKeyRef.current;
        if (activeKey) {
          schedulePollRefresh(activeKey);
        }
      }
      return;
    }

    if (awaitingOutcomeRef.current || awaitingTimeoutRef.current) {
      const delta = computeBalanceDelta(latestLog);
      setOutcome({
        amount: delta,
        positive: delta >= 0,
        log: latestLog,
      });
      setAwaitingOutcome(false);
      awaitingOutcomeRef.current = false;
      setAwaitingTimeout(false);
      awaitingTimeoutRef.current = false;
      pollAttemptsRef.current = 0;
      clearPollTimer();
    }

    lastLogIdRef.current = latestLogId;
    pendingRefreshKeyRef.current = null;
  }, [attackLogs, logsLoading, schedulePollRefresh, clearPollTimer]);

  const hasUpcomingAttack = Boolean(currentAttackKey && scheduledDate);
  const isProcessing =
    awaitingOutcome ||
    (!awaitingTimeout && hasUpcomingAttack && remainingMs != null && remainingMs <= 0 && !outcome);

  const timerCardClass = useMemo(() => {
    const base = 'home-timer-card';
    if (outcome) {
      return outcome.positive ? `${base} outcome-positive` : `${base} outcome-negative`;
    }
    if (awaitingOutcome || awaitingTimeout) {
      return base;
    }
    if (!hasUpcomingAttack) {
      return base;
    }
    if (remainingMs != null && remainingMs <= 0) {
      return `${base} timer-critical`;
    }
    if (remainingMs != null) {
      const minutesLeft = remainingMs / 60000;
      if (minutesLeft <= 2) {
        return `${base} timer-critical`;
      }
      if (minutesLeft <= 5) {
        return `${base} timer-warning`;
      }
    }
    return base;
  }, [hasUpcomingAttack, remainingMs, outcome, awaitingOutcome, awaitingTimeout]);

  const digitalDisplay = useMemo(() => {
    if (outcome) {
      return formatCurrencyDelta(outcome.amount);
    }
    if (awaitingOutcome) {
      return '';
    }
    return countdownDisplay ?? '';
  }, [outcome, awaitingOutcome, countdownDisplay]);

  const subtextState = useMemo(() => {
    if (outcome) {
      return { type: 'outcome', outcome };
    }
    if (scheduledLoading) {
      return { type: 'loading' };
    }
    if (isProcessing) {
      return { type: 'processing' };
    }
    if (awaitingTimeout) {
      return { type: 'timeout' };
    }
    if (hasUpcomingAttack && scheduledDate) {
      return { type: 'scheduled', scheduledDate };
    }
    return { type: 'empty' };
  }, [outcome, scheduledLoading, isProcessing, awaitingTimeout, hasUpcomingAttack, scheduledDate]);

  return {
    nextAttack,
    scheduledDate,
    countdownDisplay,
    digitalDisplay,
    timerCardClass,
    outcome,
    isProcessing,
    awaitingOutcome,
    hasUpcomingAttack,
    scheduledLoading,
    subtextState,
  };
}

function getAttackLogId(log) {
  if (!log) {
    return null;
  }
  if (log.id) {
    return String(log.id);
  }
  const timestamp = log.timestamp;
  if (!timestamp) {
    return null;
  }
  if (typeof timestamp?.toMillis === 'function') {
    return String(timestamp.toMillis());
  }
  if (timestamp instanceof Date) {
    return String(timestamp.getTime());
  }
  if (typeof timestamp?._seconds === 'number') {
    const millis = timestamp._seconds * 1000 + Math.floor((timestamp._nanoseconds || 0) / 1e6);
    return String(millis);
  }
  if (typeof timestamp?.seconds === 'number') {
    const millis = timestamp.seconds * 1000 + Math.floor((timestamp.nanoseconds || 0) / 1e6);
    return String(millis);
  }
  if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    const parsed = new Date(timestamp);
    if (!Number.isNaN(parsed.getTime())) {
      return String(parsed.getTime());
    }
  }
  return null;
}

function computeBalanceDelta(log) {
  const newBalance = Number(log?.newBalance || 0);
  const oldBalance = Number(log?.oldBalance || 0);
  return newBalance - oldBalance;
}
