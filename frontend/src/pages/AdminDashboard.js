import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { useAuth } from "../auth/useAuth";
import {
  adminMassAttackRandom,
  adminMassAttackEasy,
  adminMassAttackMedium,
  adminMassAttackHard,
  adminMassAttackCustom
} from "../api/attack";
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
  const [attackLoading, setAttackLoading] = useState(false);
  const [attackSuccess, setAttackSuccess] = useState("");
  const [attackError, setAttackError] = useState("");

  // Attack data matching backend model.js
  const fraudAttacks = [
    { id: 'accAndInvFraud', name: 'Accounting & Invoice Fraud', baseDamage: 95000, dangerLevel: 4 },
    { id: 'accountTakeover', name: 'Account Takeover', baseDamage: 90000, dangerLevel: 4 },
    { id: 'atmSkimming', name: 'ATM Skimming', baseDamage: 55000, dangerLevel: 2 },
    { id: 'authPushPayments', name: 'Authorized Push Payment', baseDamage: 65000, dangerLevel: 3 },
    { id: 'bruteForce', name: 'Brute Force', baseDamage: 40000, dangerLevel: 1 },
    { id: 'businessEmailCompromise', name: 'Business Email Compromise', baseDamage: 100000, dangerLevel: 4 },
    { id: 'cryptoJacking', name: 'Crypto Jacking', baseDamage: 25000, dangerLevel: 1 },
    { id: 'ddos', name: 'DDoS', baseDamage: 70000, dangerLevel: 3 },
    { id: 'deepfake', name: 'Deepfake Fraud', baseDamage: 60000, dangerLevel: 2 },
    { id: 'insiderFraud', name: 'Insider Fraud', baseDamage: 90000, dangerLevel: 4 },
    { id: 'investmentScam', name: 'Investment Scam', baseDamage: 70000, dangerLevel: 3 },
    { id: 'manInTheMiddle', name: 'Man in the Middle', baseDamage: 55000, dangerLevel: 2 },
    { id: 'phishing', name: 'Phishing', baseDamage: 55000, dangerLevel: 3 },
    { id: 'ransomware', name: 'Ransomware', baseDamage: 110000, dangerLevel: 4 },
    { id: 'simSwap', name: 'SIM Swap', baseDamage: 60000, dangerLevel: 2 },
    { id: 'sqlInjection', name: 'SQL Injection', baseDamage: 80000, dangerLevel: 3 },
    { id: 'syntIdentityTheft', name: 'Synthetic Identity Theft', baseDamage: 60000, dangerLevel: 2 },
    { id: 'vishing', name: 'Vishing', baseDamage: 40000, dangerLevel: 1 },
    { id: 'xss', name: 'Cross-Site Scripting (XSS)', baseDamage: 30000, dangerLevel: 1 },
    { id: 'zeroDayExploit', name: 'Zero Day Exploit', baseDamage: 120000, dangerLevel: 4 }
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
   * Sends a wave of attacks to all users based on the difficulty.
   * @param {string} difficulty - The difficulty of the wave. Can be 'random', 'easy', 'medium', or 'hard'.
   */
  const handleRandomWave = async (difficulty) => {
    setAttackError("");
    setAttackSuccess("");
    setAttackLoading(true);

    try {
      let waveType;

      switch(difficulty) {
        case 'random':
          await adminMassAttackRandom();
          waveType = 'Random Wave (4 attacks)';
          break;
        case 'easy':
          await adminMassAttackEasy();
          waveType = 'Easy Wave (3 attacks, danger 1-2)';
          break;
        case 'medium':
          await adminMassAttackMedium();
          waveType = 'Medium Wave (4 attacks, danger 1-3)';
          break;
        case 'hard':
          await adminMassAttackHard();
          waveType = 'Hard Wave (5 attacks, danger 2-4)';
          break;
        default:
          throw new Error('Unknown difficulty');
      }

      setAttackSuccess(`${waveType} sent successfully to all users!`);
    } catch (error) {
      console.error('Error sending wave:', error);
      setAttackError(error?.message || 'Failed to send attack wave');
    } finally {
      setAttackLoading(false);
    }
  };


  /**
   * Sends a custom wave of attacks to all users based on the selectedAttacks array.
   * This function is called when the user clicks the "Send Custom Attack" button.
   */
  const handleCustomAttack = async () => {
    if (selectedAttacks.length === 0) {
      setAttackError('Please select at least one attack');
      return;
    }

    setAttackError("");
    setAttackSuccess("");
    setAttackLoading(true);

    try {
      // Build wave array with full attack objects
      const wave = selectedAttacks.map(attackId => {
        const attackData = fraudAttacks.find(a => a.id === attackId);
        return {
          attackId: attackData.id,
          name: attackData.name,
          baseDamage: attackData.baseDamage,
          dangerLevel: attackData.dangerLevel
        };
      });

      await adminMassAttackCustom(wave);

      setAttackSuccess(`Custom attack with ${selectedAttacks.length} attack(s) sent successfully to all users!`);
      setSelectedAttacks([]); // Clear selection after success
    } catch (error) {
      console.error('Error sending custom attack:', error);
      setAttackError(error?.message || 'Failed to send custom attack');
    } finally {
      setAttackLoading(false);
    }
  };

  return (
    <div className="page admin-page">
      <PageHeader title="Admin Dashboard" backPath="/home">
        <Link to="/admin/users" className="icon-button" title="User Management">
          <span className="material-symbols-outlined">manage_accounts</span>
        </Link>
        <Link to="/home" className="icon-button" title="My Account">
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </PageHeader>

      <div className="admin-content">
        <div className="admin-attacks-container">
          <h2 className="admin-section-title">Attack Management</h2>

          {/* Attack Status Messages */}
          {attackLoading && (
            <div className="admin-status-message admin-status-loading">
              <span className="material-symbols-outlined">hourglass_empty</span>
              <p>Sending attack wave...</p>
            </div>
          )}
          {attackSuccess && (
            <div className="admin-status-message admin-status-success">
              <span className="material-symbols-outlined">check_circle</span>
              <p>{attackSuccess}</p>
            </div>
          )}
          {attackError && (
            <div className="admin-status-message admin-status-error">
              <span className="material-symbols-outlined">error</span>
              <p>{attackError}</p>
            </div>
          )}

          <div className="admin-attacks-grid">
            {/* Random Wave Section */}
            <div className="admin-attack-card">
              <h3 className="admin-card-title">Random Attack Waves</h3>
              <div className="wave-buttons">
                <button
                  onClick={() => handleRandomWave('random')}
                  id="random"
                  disabled={attackLoading}
                >
                  Random Wave
                </button>
                <button
                  onClick={() => handleRandomWave('easy')}
                  id="easy"
                  disabled={attackLoading}
                >
                  Easy Wave
                </button>
                <button
                  onClick={() => handleRandomWave('medium')}
                  id="medium"
                  disabled={attackLoading}
                >
                  Medium Wave
                </button>
                <button
                  onClick={() => handleRandomWave('hard')}
                  id="hard"
                  disabled={attackLoading}
                >
                  Hard Wave
                </button>
              </div>
            </div>

            {/* Custom Attack Section */}
            <div className="admin-attack-card">
              <h3 className="admin-card-title">Custom Attack Selection</h3>
              <div className="attack-grid">
                {fraudAttacks.map(attack => (
                  <div key={attack.id} className="attack-checkbox-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAttacks.includes(attack.id)}
                        onChange={() => handleCheckboxChange(attack.id)}
                      />
                      <span>{attack.name}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="custom-attack-footer">
                <p className="selected-count">Selected: {selectedAttacks.length} attack(s)</p>
                <button
                  className={`send-button ${selectedAttacks.length > 0 ? 'active' : ''}`}
                  disabled={selectedAttacks.length === 0 || attackLoading}
                  onClick={handleCustomAttack}
                >
                  Send Custom Attack
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
