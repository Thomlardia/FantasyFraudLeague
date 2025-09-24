import React, { useEffect, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import iconMoneyDollar from '../images/icons/money_dollar.png';

/**
 * Formats a number as currency with commas
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatMoney(amount) {
  return `${amount.toLocaleString()}`;
}

/**
 * MoneyBar component that displays the player's current money
 * Refreshes on mount and after updates to show the latest value
 */
function MoneyBar() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const call = httpsCallable(functions, 'user_getBalance');
        const res = await call();
        if (!active) return;
        const value = typeof res?.data === 'number' ? res.data : 0;
        setBalance(value);
      } catch (_e) {
        if (active) setBalance(0);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="money-display" title="Bank">
      <span className="money-icon">
        <img src={iconMoneyDollar} alt="Bank" className="icon-img--small" />
      </span>
      <span>{balance == null || loading ? '—' : formatMoney(balance)}</span>
    </div>
  );
}

export default MoneyBar;
