import React from 'react';
import iconMoneyDollar from '../images/icons/money_dollar.png';

/**
 * Placeholder function to get current money amount
 * This will be replaced by a teammate with actual implementation
 * @returns {number} Current money amount
 */
function getCurrentMoney() {
    // Placeholder implementation - returns a fake number for now
    return 1250000;
}

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
 * Refreshes whenever the component renders to show the latest value
 */
function MoneyBar() {
    const currentMoney = getCurrentMoney();
    
    return (
        <div className="money-display" title="Bank">
            <span className="money-icon">
                <img src={iconMoneyDollar} alt="Bank" className="icon-img--small" />
            </span>
            <span>{formatMoney(currentMoney)}</span>
        </div>
    );
}

export default MoneyBar;
