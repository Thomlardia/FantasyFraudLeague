import { useDefense } from '../contexts/DefenseContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import '../styles/ui.css';

/**
 * FraudProtectionChart - Displays protection levels against a specific fraud type
 * Shows which defenses protect against the attack and their effectiveness
 *
 * @param {string} attackId - The attack ID (e.g., 'phishing', 'ransomware')
 * @param {string} variant - Chart variant: 'bar' (default), 'horizontal', or 'simple'
 */
function FraudProtectionChart({ attackId, variant = 'bar' }) {
  const { getDefensesByAttackChartData, getTotalProtectionAgainstAttack, loading } = useDefense();

  if (loading) {
    return (
      <div className="chart-container">
        <h1 className="management-title">Defense Coverage</h1>
        <p className="chart-loading">Loading protection data...</p>
      </div>
    );
  }

  const defenseData = getDefensesByAttackChartData(attackId);
  const totalProtection = getTotalProtectionAgainstAttack(attackId);

  if (!defenseData || defenseData.length === 0) {
    return (
      <div className="chart-container">
        <h1 className="management-title">Defense Coverage</h1>
        <p className="chart-empty">No defenses available for this attack type.</p>
      </div>
    );
  }

  // Color coding based on protection level
  const getProtectionColor = (protection) => {
    if (protection >= 90) return '#22c55e'; // Green - Excellent
    if (protection >= 70) return '#84cc16'; // Lime - Good
    if (protection >= 50) return '#eab308'; // Yellow - Moderate
    if (protection >= 30) return '#f97316'; // Orange - Low
    return '#ef4444'; // Red - Poor
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="recharts-custom-tooltip">
          <p className="tooltip-label"><strong>{data.defenseName}</strong></p>
          <p className="tooltip-item">Level: {data.level}{!data.isOwned && ' (Not Owned)'}</p>
          <p className="tooltip-item">Current: {data.effectiveness}%</p>
          <p className="tooltip-item">Max Potential: {data.maxEffectiveness}%</p>
        </div>
      );
    }
    return null;
  };

  // Variant: Horizontal bar chart (recommended for fraud pages)
  if (variant === 'horizontal') {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">
            <span className="chart-title-defense">Defense </span>
            <span className="chart-title-coverage">Coverage</span>
          </h2>
          <span
            className="chart-protection-badge"
            style={{ backgroundColor: getProtectionColor(totalProtection) }}
          >
            {totalProtection.toFixed(1)}%
          </span>
        </div>
           <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={defenseData.length * 80 + 200}>
            <BarChart
              data={defenseData}
              layout="vertical"
              margin={{ top: 20, right: 10, left: 5, bottom: 20 }}
              barSize={30}
              maxBarSize={160}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis
                dataKey="defenseName"
                type="category"
                width={70}
                tick={{ fontSize: 10.5, width: 60 }}
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="maxEffectiveness" name="Max Potential" fill="#8b5cf6" opacity={0.25} radius={[0, 4, 4, 0]} />
              <Bar dataKey="nextBuyEffectiveness" name="Next Buy" fill="#94a3b8" opacity={0.6} radius={[0, 4, 4, 0]} />
              <Bar dataKey="effectiveness" name="Current" radius={[0, 4, 4, 0]}>
                {defenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isOwned ? '#3b82f6' : 'transparent'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="chart-legend-custom">
            <div className="legend-item">
              <span className="legend-box" style={{ backgroundColor: '#3b82f6' }}></span>
              <span>Current</span>
            </div>
            <div className="legend-item">
              <span className="legend-box" style={{ backgroundColor: '#94a3b8', opacity: 0.6 }}></span>
              <span>Next Buy</span>
            </div>
            <div className="legend-item">
              <span className="legend-box" style={{ backgroundColor: '#8b5cf6', opacity: 0.25 }}></span>
              <span>Max Potential</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant: Simple list view with visual bars
  if (variant === 'simple') {
    return (
      <div className="chart-container">
        <h2 className="management-title">Defense Coverage</h2>
        <div className="protection-summary">
          <div className="protection-badge" style={{ backgroundColor: getProtectionColor(totalProtection) }}>
            <span className="protection-value">{totalProtection.toFixed(1)}%</span>
            <span className="protection-label">Total Protection</span>
          </div>
        </div>

        <div className="defense-list">
          {defenseData.map((defense, index) => (
            <div key={index} className={`defense-item ${!defense.isOwned ? 'not-owned' : ''}`}>
              <div className="defense-header">
                <span className="defense-name">{defense.defenseName}</span>
                <span className="defense-level">Level {defense.level}</span>
              </div>
              <div className="defense-bar-container">
                <div
                  className="defense-bar-current"
                  style={{
                    width: `${defense.effectiveness}%`,
                    backgroundColor: defense.isOwned ? '#3b82f6' : '#94a3b8'
                  }}
                ></div>
                <div
                  className="defense-bar-max"
                  style={{
                    width: `${defense.maxEffectiveness}%`,
                    backgroundColor: '#8b5cf6',
                    opacity: 0.2
                  }}
                ></div>
              </div>
              <div className="defense-stats">
                <span className="stat-current">{defense.effectiveness}% current</span>
                <span className="stat-max">{defense.maxEffectiveness}% max</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Variant: Standard vertical bar chart (default)
  return (
    <div className="chart-container">
      <h2 className="management-title">Defense Coverage</h2>
      <div className="protection-summary">
        <div className="protection-badge" style={{ backgroundColor: getProtectionColor(totalProtection) }}>
          <span className="protection-value">{totalProtection.toFixed(1)}%</span>
          <span className="protection-label">Total Protection</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={defenseData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="defenseName"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis domain={[0, 100]} label={{ value: 'Protection %', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={90} stroke="#22c55e" strokeDasharray="3 3" label="Excellent" />
          <ReferenceLine y={50} stroke="#eab308" strokeDasharray="3 3" label="Moderate" />
          <Bar dataKey="effectiveness" name="Current Protection %">
            {defenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isOwned ? '#3b82f6' : '#94a3b8'}
                opacity={entry.isOwned ? 1 : 0.4}
              />
            ))}
          </Bar>
          <Bar dataKey="maxEffectiveness" name="Max Potential %" fill="#8b5cf6" opacity={0.3} />
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-legend-custom">
        <div className="legend-item">
          <span className="legend-box" style={{ backgroundColor: '#3b82f6' }}></span>
          <span>Owned Defense</span>
        </div>
        <div className="legend-item">
          <span className="legend-box" style={{ backgroundColor: '#94a3b8', opacity: 0.4 }}></span>
          <span>Not Owned</span>
        </div>
        <div className="legend-item">
          <span className="legend-box" style={{ backgroundColor: '#8b5cf6', opacity: 0.3 }}></span>
          <span>Max Potential</span>
        </div>
      </div>
    </div>
  );
}

export default FraudProtectionChart;
