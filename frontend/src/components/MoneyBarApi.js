import React, { useEffect, useState } from 'react';
import iconMoneyDollar from '../images/icons/money_dollar.png';
import { getUserBalance } from '../hooks/walletHooks';

function formatMoney(amount) {
  return `${amount.toLocaleString()}`;
}

function MoneyBarApi() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const value = await getUserBalance();
        console.log("getUserBalance result:", value); // Debug: log the result
        if (!active) return;
        setBalance(typeof value === 'number' ? value : 0);
      } catch (e) {
        console.error("getUserBalance error:", e); // Debug: log the error
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

export default MoneyBarApi;
