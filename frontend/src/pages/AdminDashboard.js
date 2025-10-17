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
  adminMassAttackCustom,
  adminScheduleAttack
} from "../api/attack";
import { useAttack } from "../contexts/AttackContext";
import { useWallet } from "../contexts/WalletContext";
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
  const [attackMode, setAttackMode] = useState("now"); // 'now' or 'schedule'
  const [scheduledAt, setScheduledAt] = useState("");
  const [selectedWaveType, setSelectedWaveType] = useState("random");

  // Get context refresh functions
  const { refreshAttackLogs } = useAttack();
  const { refreshBalance } = useWallet();

  // Attack data matching backend model.js
  const fraudAttacks = [
    { id: 'accAndInvFraud', name: 'Accounting & Invoice Fraud', baseDamage:50000, dangerLevel: 4 },
    { id: 'accountTakeover', name: 'Account Takeover', baseDamage: 35000, dangerLevel: 4 },
    { id: 'skimming', name: 'ATM Skimming', baseDamage: 27500, dangerLevel: 2 },
    { id: 'authorizedPushPayments', name: 'Authorized Push Payment', baseDamage: 32500, dangerLevel: 3 },
    { id: 'bruteForce', name: 'Brute Force', baseDamage: 20000, dangerLevel: 1 },
    { id: 'bec', name: 'Business Email Compromise', baseDamage: 50000, dangerLevel: 4 },
    { id: 'cryptojacking', name: 'Crypto Jacking', baseDamage: 12500, dangerLevel: 1 },
    { id: 'ddos', name: 'DDoS', baseDamage: 35000, dangerLevel: 3 },
    { id: 'deepfakeFraud', name: 'Deepfake Fraud', baseDamage: 30000, dangerLevel: 2 },
    { id: 'insiderFraud', name: 'Insider Fraud', baseDamage: 45000, dangerLevel: 4 },
    { id: 'investmentScams', name: 'Investment Scam', baseDamage: 35000, dangerLevel: 3 },
    { id: 'mitm', name: 'Man in the Middle', baseDamage: 25000, dangerLevel: 2 },
    { id: 'phishing', name: 'Phishing', baseDamage: 27500, dangerLevel: 3 },
    { id: 'ransomware', name: 'Ransomware', baseDamage: 55000, dangerLevel: 4 },
    { id: 'simSwap', name: 'SIM Swap', baseDamage: 30000, dangerLevel: 2 },
    { id: 'sqlInjection', name: 'SQL Injection', baseDamage: 40000, dangerLevel: 3 },
    { id: 'syntheticIdentity', name: 'Synthetic Identity Theft', baseDamage: 30000, dangerLevel: 2 },
    { id: 'vishing', name: 'Vishing', baseDamage: 20000, dangerLevel: 1 },
    { id: 'xss', name: 'Cross-Site Scripting (XSS)', baseDamage: 15000, dangerLevel: 1 },
    { id: 'zeroDay', name: 'Zero Day Exploit', baseDamage: 60000, dangerLevel: 4 }
  ];

  const MIN_SCHEDULE_LEAD_MS = 3 * 60 * 1000;
  const DEFAULT_SCHEDULE_OFFSET_MS = 4 * 60 * 1000;

  const waveDescriptions = {
    random: 'Random Wave (4 attacks)',
    easy: 'Easy Wave (3 attacks, danger 1-2)',
    medium: 'Medium Wave (4 attacks, danger 1-3)',
    hard: 'Hard Wave (5 attacks, danger 2-4)',
  };

  const waveExecutors = {
    random: adminMassAttackRandom,
    easy: adminMassAttackEasy,
    medium: adminMassAttackMedium,
    hard: adminMassAttackHard,
  };

  const autoWaveOptions = [
    { id: 'random', label: 'Random Wave' },
    { id: 'easy', label: 'Easy Wave' },
    { id: 'medium', label: 'Medium Wave' },
    { id: 'hard', label: 'Hard Wave' },
  ];

  const formatDateTimeLocal = (date) => {
    const pad = (value) => String(value).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const computeMinScheduleDate = () => {
    const minDate = new Date(Date.now() + MIN_SCHEDULE_LEAD_MS);
    minDate.setSeconds(0, 0);
    return minDate;
  };

  const computeDefaultScheduleDate = () => {
    const defaultDate = new Date(Date.now() + DEFAULT_SCHEDULE_OFFSET_MS);
    defaultDate.setSeconds(0, 0);
    return defaultDate;
  };

  const ensureMinScheduledValue = (currentValue) => {
    const minDate = computeMinScheduleDate();
    const minValue = formatDateTimeLocal(minDate);
    if (!currentValue) {
      return formatDateTimeLocal(computeDefaultScheduleDate());
    }
    const currentDate = new Date(currentValue);
    if (Number.isNaN(currentDate.getTime()) || currentDate.getTime() < minDate.getTime()) {
      return formatDateTimeLocal(computeDefaultScheduleDate());
    }
    return currentValue;
  };

  useEffect(() => {
    if (attackMode === "schedule") {
      setScheduledAt((prev) => ensureMinScheduledValue(prev));
    }
  }, [attackMode]);

  const validateScheduledTime = () => {
    const minDate = computeMinScheduleDate();
    if (!scheduledAt) {
      return "Please choose a date and time that is at least more than 3 minutes from now.";
    }
    const selectedDate = new Date(scheduledAt);
    if (Number.isNaN(selectedDate.getTime())) {
      return "Please select a valid date and time.";
    }
    if (selectedDate.getTime() < minDate.getTime()) {
      return "Scheduled time must be at least more than 3 minutes in the future.";
    }
    return null;
  };

  const mapAttackForWave = (attack) => ({
    attackId: attack.id,
    name: attack.name,
    baseDamage: attack.baseDamage,
    dangerLevel: attack.dangerLevel,
  });

  const shuffleAttacks = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const pickAttacks = (pool, count) => shuffleAttacks(pool).slice(0, count).map(mapAttackForWave);

  const buildWaveForDifficulty = (difficulty) => {
    switch (difficulty) {
      case "random":
        return pickAttacks(fraudAttacks, 4);
      case "easy":
        return pickAttacks(fraudAttacks.filter(a => a.dangerLevel >= 1 && a.dangerLevel <= 2), 3);
      case "medium":
        return pickAttacks(fraudAttacks.filter(a => a.dangerLevel >= 1 && a.dangerLevel <= 3), 4);
      case "hard":
        return pickAttacks(fraudAttacks.filter(a => a.dangerLevel >= 2 && a.dangerLevel <= 4), 5);
      default:
        return [];
    }
  };

  const buildCustomWave = () => {
    return selectedAttacks.map(attackId => {
      const attackData = fraudAttacks.find(a => a.id === attackId);
      return {
        attackId: attackData.id,
        name: attackData.name,
        baseDamage: attackData.baseDamage,
        dangerLevel: attackData.dangerLevel
      };
    });
  };

  const isScheduling = attackMode === "schedule";
  const minScheduleValue = formatDateTimeLocal(computeMinScheduleDate());
  const confirmDisabled = attackLoading || (isScheduling && !scheduledAt);

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
   * Execute or schedule the currently selected automatic wave type.
   */
  const handleAutoWaveConfirm = async () => {
    const difficulty = selectedWaveType;
    const waveType = waveDescriptions[difficulty] || 'Wave';
    setAttackError("");
    setAttackSuccess("");

    const scheduling = attackMode === "schedule";
    const validationError = scheduling ? validateScheduledTime() : null;
    if (validationError) {
      setAttackError(validationError);
      return;
    }

    setAttackLoading(true);

    try {
      if (scheduling) {
        const wave = buildWaveForDifficulty(difficulty);
        const scheduledDate = new Date(scheduledAt);
        await adminScheduleAttack(wave, scheduledDate.toISOString());
        setAttackSuccess(`${waveType} scheduled for ${scheduledDate.toLocaleString()}.`);
        setScheduledAt(formatDateTimeLocal(computeMinScheduleDate()));
      } else {
        const executor = waveExecutors[difficulty];
        if (!executor) {
          throw new Error('Unknown wave difficulty');
        }
        await executor();
        setAttackSuccess(`${waveType} sent successfully to all users!`);
      }

      // Refresh attack logs and balance after successful attack
      await refreshAttackLogs();
      if (!scheduling) {
        await refreshBalance();
      }
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

    const scheduling = attackMode === "schedule";
    const validationError = scheduling ? validateScheduledTime() : null;
    if (validationError) {
      setAttackError(validationError);
      return;
    }

    setAttackLoading(true);

    try {
      // Build wave array with full attack objects
      const wave = buildCustomWave();

      if (scheduling) {
        const scheduledDate = new Date(scheduledAt);
        await adminScheduleAttack(wave, scheduledDate.toISOString());
        setAttackSuccess(`Custom attack with ${selectedAttacks.length} attack(s) scheduled for ${scheduledDate.toLocaleString()}.`);
        setScheduledAt(formatDateTimeLocal(computeMinScheduleDate()));
      } else {
        await adminMassAttackCustom(wave);
        setAttackSuccess(`Custom attack with ${selectedAttacks.length} attack(s) sent successfully to all users!`);
      }
      setSelectedAttacks([]); // Clear selection after success

      // Refresh attack logs and balance after successful attack
      await refreshAttackLogs();
      if (!scheduling) {
        await refreshBalance();
      }
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

          <div className="attack-mode-toggle">
            <div className="mode-options">
              <label className={`mode-option ${attackMode === 'now' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="attackMode"
                  value="now"
                  checked={attackMode === 'now'}
                  onChange={() => setAttackMode('now')}
                  disabled={attackLoading}
                />
                <span>Send Immediately</span>
              </label>
              <label className={`mode-option ${attackMode === 'schedule' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="attackMode"
                  value="schedule"
                  checked={attackMode === 'schedule'}
                  onChange={() => setAttackMode('schedule')}
                  disabled={attackLoading}
                />
                <span>Schedule for Later</span>
              </label>
            </div>

            {attackMode === 'schedule' && (
              <div className="schedule-fields">
                <label className="schedule-field">
                  <span>Execute At</span>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    min={minScheduleValue}
                    onChange={(event) => setScheduledAt(event.target.value)}
                    disabled={attackLoading}
                  />
                </label>
                <p className="schedule-hint">Scheduled attacks must be at least more than 3 minutes in the future.</p>
              </div>
            )}
          </div>

          {/* Attack Status Messages */}
          {attackLoading && (
            <div className="admin-status-message admin-status-loading">
              <span className="material-symbols-outlined">hourglass_empty</span>
              <p>{isScheduling ? 'Scheduling attack wave...' : 'Sending attack wave...'}</p>
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
              <div className="wave-options">
                {autoWaveOptions.map(option => {
                  const isSelected = selectedWaveType === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`wave-option wave-option-${option.id} ${isSelected ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="waveType"
                        value={option.id}
                        checked={isSelected}
                        onChange={() => setSelectedWaveType(option.id)}
                        disabled={attackLoading}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>

              <div className="auto-wave-footer">
                <p className="selected-wave-label">
                  Selected: {waveDescriptions[selectedWaveType] || 'Wave'}
                </p>
                <button
                  className={`send-button ${confirmDisabled ? '' : 'active'}`}
                  onClick={handleAutoWaveConfirm}
                  disabled={confirmDisabled}
                >
                  {isScheduling ? 'Schedule Selected Wave' : 'Send Selected Wave'}
                </button>
              </div>
            </div>

            {/* Custom Attack Section */}
            <div className="admin-attack-card">
              <h3 className="admin-card-title">Custom Attack Selection</h3>
              <div className="attack-grid">
                {fraudAttacks.map(attack => (
                  <label key={attack.id} className="attack-checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedAttacks.includes(attack.id)}
                      onChange={() => handleCheckboxChange(attack.id)}
                    />
                    <span>{attack.name}</span>
                  </label>
                ))}
              </div>

              <div className="custom-attack-footer">
                <p className="selected-count">Selected: {selectedAttacks.length} attack(s)</p>
                <button
                  className={`send-button ${(selectedAttacks.length === 0 || attackLoading || (isScheduling && !scheduledAt)) ? '' : 'active'}`}
                  disabled={selectedAttacks.length === 0 || attackLoading || (isScheduling && !scheduledAt)}
                  onClick={handleCustomAttack}
                >
                  {isScheduling ? 'Schedule Custom Attack' : 'Send Custom Attack'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
