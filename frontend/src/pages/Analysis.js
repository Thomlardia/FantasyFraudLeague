import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';

function Analysis() {
    return (
        <div className="shop-wiki-container">
            <PageHeader title="Analysis" backPath="/home" />

            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <h2 className="leaderboard-subtitle">Defense Analysis</h2>
                    </div>

                    <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '64px', marginBottom: '16px' }}>
                            analytics
                        </span>
                        <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                            Analysis Dashboard Coming Soon
                        </p>
                        <p style={{ fontSize: '14px', opacity: '0.8' }}>
                            Track your defense effectiveness, attack patterns, and performance metrics.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analysis;
