import React, { useState, useEffect } from 'react';
import { getUserAttackLogs } from '../api/attack';

function AttackLogs() {
  const [attackLogs, setAttackLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    const fetchAttackLogs = async () => {
      try {
        setLoading(true);
        const logs = await getUserAttackLogs();
        console.log('Received attack logs:', logs);
        if (logs.length > 0) {
          console.log('First log timestamp:', logs[0].timestamp, typeof logs[0].timestamp);
        }
        setAttackLogs(logs);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching attack logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttackLogs();
  }, []);

  const toggleLogExpansion = (logIndex) => {
    setExpandedLog(expandedLog === logIndex ? null : logIndex);
  };

  if (loading) {
    return <div>Loading attack logs...</div>;
  }

  if (error) {
    return <div>Error loading attack logs: {error}</div>;
  }

  if (attackLogs.length === 0) {
    return <div>No attack logs found.</div>;
  }

  return (
    <div className="attack-logs">
      <div className="headline">ATTACK HISTORY</div>
      
      <div className="attack-logs-summary">
        {attackLogs.map((log, logIndex) => {
          // Handle Firestore timestamp conversion - more robust handling
          let logDate;
          
          if (log.timestamp?.toDate && typeof log.timestamp.toDate === 'function') {
            // Firestore Timestamp object
            logDate = log.timestamp.toDate();
          } else if (log.timestamp?.seconds) {
            // Firestore timestamp with seconds property
            logDate = new Date(log.timestamp.seconds * 1000);
          } else if (log.timestamp?._seconds) {
            // Alternative Firestore timestamp format
            logDate = new Date(log.timestamp._seconds * 1000);
          } else if (log.timestamp instanceof Date) {
            // Already a Date object
            logDate = log.timestamp;
          } else if (typeof log.timestamp === 'string') {
            // String date
            logDate = new Date(log.timestamp);
          } else if (typeof log.timestamp === 'number') {
            // Unix timestamp
            logDate = new Date(log.timestamp);
          } else {
            // Fallback to current date
            logDate = new Date();
          }
          
          const totalDamage = log.totalDamage || 0;
          const attackCount = log.attacks?.length || 0;
          const isExpanded = expandedLog === logIndex;

          return (
            <div key={log.id || logIndex} className="attack-log-item">
              <div 
                className="attack-log-summary" 
                onClick={() => toggleLogExpansion(logIndex)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  Log {logIndex + 1}: {logDate.toLocaleString()} - ${totalDamage.toLocaleString()} damage from {attackCount} attacks
                  <span style={{ marginLeft: '10px' }}>
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="attack-log-details">
                  <div className="attack-log-header">
                    {/*<div>Timestamp: {logDate.toLocaleString()}</div>
                    <div>Log ID: {log.id || 'Unknown'}</div>*/}
                  </div>

                  <div className="attack-log-summary-section">
                    <br></br>
                    <div>Old Balance: ${(log.oldBalance || 0).toLocaleString()}</div>
                    <div>New Balance: ${(log.newBalance || 0).toLocaleString()}</div>
                    <div>Total Damage Taken: ${(log.totalDamage || 0).toLocaleString()}</div>
                    
                    {log.attacks && log.attacks.length > 0 && (
                      <div>
                        Total Damage Prevented: ${log.attacks.reduce((sum, attack) => sum + (attack.damageReduced || 0), 0).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {log.attacks && log.attacks.length > 0 && (
                    <div className="attack-details-section">
                      <br></br>
                      <h4>Attack Details:</h4>
                      {log.attacks.map((attack, attackIndex) => (
                        <div key={attackIndex} className="attack-detail">
                          <br></br>
                          <div className="attack-name">
                            Attack {attackIndex + 1}: {attack.attackName || attack.attackId || 'Unknown'}
                          </div>
                          <div className="attack-damage">
                            <div>Original Damage: ${(attack.originalDamage || 0).toLocaleString()}</div>
                            <div>Final Damage: ${(attack.finalDamage || 0).toLocaleString()}</div>
                            <div>
                              Damage Reduced: ${(attack.damageReduced || 0).toLocaleString()} ({attack.reductionPercent || 0}%)
                            </div>
                          </div>

                          {attack.defensesApplied && attack.defensesApplied.length > 0 ? (
                            <div className="defenses-applied">
                              <div>Defenses Applied:</div>
                              {attack.defensesApplied.map((defense, defenseIndex) => (
                                <div key={defenseIndex} className="defense-item">
                                  <div>
                                    - {defense.defenseName || 'Unknown'} (Level {defense.level || 1}): {defense.reductionPercent || 0}% reduction
                                  </div>
                                  <div style={{ marginLeft: '20px' }}>
                                    Damage: ${Math.round(defense.damageBeforeDefense || 0)} → ${Math.round(defense.damageAfterDefense || 0)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>No defenses applied</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {(!log.attacks || log.attacks.length === 0) && (
                    <div>No attack details available</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="attack-logs-total">
        Total attack logs: {attackLogs.length}
      </div>
    </div>
  );
}

export default AttackLogs;