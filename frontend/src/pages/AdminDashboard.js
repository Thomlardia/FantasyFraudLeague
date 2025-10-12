import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useAuth } from "../auth/useAuth";
import '../styles/ui.css';
import '../styles/admin.css';
import PageHeader from '../components/PageHeader';

export default function AdminDashboard() {
  const { user, roles, refreshClaims } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [users, setUsers] = useState(null);

  const [selectedAttacks, setSelectedAttacks] = useState([]);

  const fraudAttacks = [
    { id: 'accAndInvFraud', name: 'Accounting & Invoice Fraud' },
    { id: 'accountTakeover', name: 'Account Takeover' },
    { id: 'atmSkimming', name: 'ATM Skimming' },
    { id: 'authPushPayments', name: 'Authorized Push Payment' },
    { id: 'bruteForce', name: 'Brute Force' },
    { id: 'businessEmailCompromise', name: 'Business Email Compromise' },
    { id: 'cryptoJacking', name: 'Crypto Jacking' },
    { id: 'ddos', name: 'DDoS' },
    { id: 'deepfake', name: 'Deepfake Fraud' },
    { id: 'insiderFraud', name: 'Insider Fraud' },
    { id: 'investmentScam', name: 'Investment Scam' },
    { id: 'manInTheMiddle', name: 'Man in the Middle' },
    { id: 'phishing', name: 'Phishing' },
    { id: 'ransomware', name: 'Ransomware' },
    { id: 'simSwap', name: 'SIM Swap' },
    { id: 'sqlInjection', name: 'SQL Injection' },
    { id: 'syntIdentityTheft', name: 'Synthetic Identity Theft' },
    { id: 'vishing', name: 'Vishing' },
    { id: 'xss', name: 'Cross-Site Scripting (XSS)' },
    { id: 'zeroDayExploit', name: 'Zero Day Exploit' }
  ];

  const listUsers = async () => {
    setErr("");
    setLoading(true);
    try {
      const call = httpsCallable(functions, "admin_listUsers");
      const res = await call();
      setUsers(res.data || []);
    } catch (e) {
      setErr(e?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // on first visit, ensure claims are fresh if the user just got promoted
    refreshClaims?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle checkbox toggle
  const handleCheckboxChange = (attackId) => {
    setSelectedAttacks(prev => {
    if (prev.includes(attackId)) {
        return prev.filter(id => id !== attackId);
    } else {
        return [...prev, attackId];
    }
    });
  };

  /**
   * Sends a wave of attacks to the user based on the difficulty.
   * @param {string} difficulty - The difficulty of the wave. Can be 'random', 'easy', 'medium', or 'hard'.
   * @throws {Error} If the difficulty is unknown.
   */
  const handleRandomWave = async (difficulty) => {
    try {
      let result;
      let waveType;
    
      switch(difficulty) {
        case 'random':
            // TODO: Call apiGetRandomWave()
            console.log('Sending random wave (4 attacks)');
            break;
        case 'easy':
            // TODO: Call apiGetEasyWave()
            console.log('Sending easy wave (3 attacks, danger 1-2)');
            break;
        case 'medium':
            // TODO: Call apiGetMediumWave()
            console.log('Sending medium wave (4 attacks, danger 1-3)');
            break;
        case 'hard':
            // TODO: Call apiGetHardWave()
            console.log('Sending hard wave (5 attacks, danger 2-4)');
            break;
        default:
            console.error('Unknown difficulty');
      }
    } catch (error) {
        console.error('Error sending wave:', error);
    }
  };

    
    /**
     * Sends a custom wave of attacks to the user based on the selectedAttacks array.
     * This function is called when the user clicks the "Send Custom Attack" button.
     * The selectedAttacks array contains attackIds like ['phishing', 'ransomware', 'atmSkimming'].
     * The function logs an error if there is an issue with calling the backend function.
     */
    const handleCustomAttack = async () => {
      try {
          // TODO: Call backend function with selectedAttacks array
          console.log('Sending custom attacks:', selectedAttacks);
          // The selectedAttacks array contains attackIds like:
          // ['phishing', 'ransomware', 'atmSkimming']
      } catch (error) {
          console.error('Error sending custom attack:', error);
      }
    };

  return (
    <div className="simple-page admin-dashboard">
      <PageHeader title="Admin" backPath="/home" />
      <p>
        Signed in as <strong>{user?.email || user?.uid}</strong>
      </p>
      <p>Roles: {roles.length ? roles.join(", ") : "(none)"}</p>

      <div className="simple-action-row simple-page__actions">
        <button onClick={refreshClaims} disabled={loading}>
          Refresh Roles
        </button>
        <button onClick={listUsers} disabled={loading}>
          {loading ? "Loading…" : "List Users"}
        </button>
        <button
          onClick={() => navigate(location.state?.from?.pathname || "/home", { replace: true })}
        >
          Continue to App
        </button>
      </div>

      {err && <p className="simple-error">{err}</p>}

      {Array.isArray(users) && (
        <div className="admin-users">
          <h3>Users</h3>
          <pre className="admin-users__code">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      )}
  
      <div className="admin-option">
          <h2>Option 1: Random Attack Waves</h2>
          <div className="wave-buttons">
              <button onClick={() => handleRandomWave('random')} id="random">Random Wave</button>
              <button onClick={() => handleRandomWave('easy')} id="easy">Easy Wave</button>
              <button onClick={() => handleRandomWave('medium')} id="medium">Medium Wave</button>
              <button onClick={() => handleRandomWave('hard')} id="hard">Hard Wave</button>
          </div>
      </div>

      <div className="admin-option">
        <h2>Option 2: Custom Attack Selection</h2>
        <div className="attack-grid">

          {fraudAttacks.map(attack => (
            <div key={attack.id} className="attack-card">
                <label>
                <input
                    type="checkbox"
                    checked={selectedAttacks.includes(attack.id)}
                    onChange={() => handleCheckboxChange(attack.id)}
                />
                    {attack.name}
                </label>
            </div>
          ))}

        </div>

        <div style={{ marginTop: '1rem' }}>
          <p>Selected: {selectedAttacks.length} attack(s)</p>
          <button
          className={`send-button ${selectedAttacks.length > 0 ? 'active' : ''}`}
          disabled={selectedAttacks.length === 0}
          >
              Send Custom Attack
          </button>

        </div>
      </div>
  
    </div>
  );
}
