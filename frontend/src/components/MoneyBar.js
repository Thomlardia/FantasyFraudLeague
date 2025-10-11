import React from 'react';
import { useWallet } from '../contexts/WalletContext';

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
 * Uses WalletContext for global balance state
 * Automatically refreshes when balance changes via refreshBalance()
 */
function MoneyBar() {
  const { balance, loading } = useWallet();

  return (
    <div className="money-display" title="Bank">
      <span className="money-icon">
        <span className="material-symbols-outlined">attach_money</span>
      </span>
      <span>{balance == null || loading ? '—' : formatMoney(balance)}</span>
    </div>
  );
}

export default MoneyBar;
