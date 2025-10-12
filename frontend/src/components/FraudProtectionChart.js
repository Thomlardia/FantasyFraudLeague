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
        <div className="chart-header">
          <h2 className="management-title">Defense Coverage</h2>
        </div>
        <p className="chart-loading">Loading protection data...</p>
      </div>
    );
  }

  const defenseData = getDefensesByAttackChartData(attackId);
  const totalProtection = getTotalProtectionAgainstAttack(attackId);

  if (!defenseData || defenseData.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="management-title">Defense Coverage</h2>
        </div>
        <p className="chart-empty">No defenses available for this attack type.</p>
      </div>
    );
  }

  // Color coding based on protection level - returns CSS variable object
  const getProtectionColors = (protection) => {
    if (protection >= 70) {
      // Green - Good to Excellent
      return {
        text: 'var(--color-green-dark)',
        bg: 'var(--color-green-light)',
        border: 'var(--color-green-dark)'
      };
    }
    if (protection >= 40) {
      // Orange - Moderate
      return {
        text: 'var(--color-chart-orange-dark)',
        bg: 'var(--color-chart-orange-light)',
        border: 'var(--color-chart-orange-dark)'
      };
    }
    // Red - Poor to Low
    return {
      text: 'var(--color-red-dark)',
      bg: 'var(--color-red-light)',
      border: 'var(--color-red-dark)'
    };
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
    const protectionColors = getProtectionColors(totalProtection);
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="management-title">Defense Coverage</h2>
          <span
            className="chart-protection-badge"
            style={{
              '--protection-text-color': protectionColors.text,
              '--protection-bg-color': protectionColors.bg,
              '--protection-border-color': protectionColors.border
            }}
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
              <Bar dataKey="maxEffectiveness" name="Max Potential" fill="var(--color-chart-purple-light)" opacity={0.5} radius={[0, 4, 4, 0]} />
              <Bar dataKey="nextBuyEffectiveness" name="Next Buy" fill="var(--color-chart-blue-light)" opacity={0.5} radius={[0, 4, 4, 0]} />
              <Bar dataKey="effectiveness" name="Current" opacity={0.5} radius={[0, 4, 4, 0]}>
                {defenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isOwned ? 'var(--color-chart-blue-dark)' : 'transparent'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="chart-legend-custom">
            <div className="legend-item">
              <span className="legend-box legend-box--blue"></span>
              <span>Current</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-box--slate-strong"></span>
              <span>Next Buy</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-box--violet-soft"></span>
              <span>Max Potential</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant: Simple list view with visual bars
  if (variant === 'simple') {
    const protectionColors = getProtectionColors(totalProtection);
    return (
      <div className="chart-container">
        <h2 className="management-title">Defense Coverage</h2>
        <div className="protection-summary">
          <div
            className="protection-badge"
            style={{
              '--protection-text-color': protectionColors.text,
              '--protection-bg-color': protectionColors.bg,
              '--protection-border-color': protectionColors.border
            }}
          >
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
                    '--defense-bar-current-color': defense.isOwned ? 'var(--color-chart-blue-dark)' : 'var(--color-chart-blue-light)'
                  }}
                ></div>
                <div
                  className="defense-bar-max"
                  style={{
                    width: `${defense.maxEffectiveness}%`
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
  const protectionColors = getProtectionColors(totalProtection);
  return (
    <div className="chart-container">
      <h2 className="management-title">Defense Coverage</h2>
      <div className="protection-summary">
        <div
          className="protection-badge"
          style={{
            '--protection-text-color': protectionColors.text,
            '--protection-bg-color': protectionColors.bg,
            '--protection-border-color': protectionColors.border
          }}
        >
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
          <ReferenceLine y={70} stroke="var(--color-green-dark)" strokeDasharray="3 3" label="Good" />
          <ReferenceLine y={40} stroke="var(--color-chart-orange-dark)" strokeDasharray="3 3" label="Moderate" />
          <Bar dataKey="effectiveness" name="Current Protection %">
            {defenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isOwned ? 'var(--color-chart-blue-dark)' : 'var(--color-chart-blue-light)'}
                opacity={entry.isOwned ? 1 : 0.7}
              />
            ))}
          </Bar>
          <Bar dataKey="maxEffectiveness" name="Max Potential %" fill="var(--color-chart-purple-light)" />
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-legend-custom">
        <div className="legend-item">
          <span className="legend-box legend-box--blue"></span>
          <span>Owned Defense</span>
        </div>
        <div className="legend-item">
          <span className="legend-box legend-box--slate-soft"></span>
          <span>Not Owned</span>
        </div>
        <div className="legend-item">
          <span className="legend-box legend-box--violet-medium"></span>
          <span>Max Potential</span>
        </div>
      </div>
    </div>
  );
}

export default FraudProtectionChart;
