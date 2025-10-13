import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';

function AttackLog() {
    const [activeTab, setActiveTab] = useState('alltime');

    const handleRefresh = () => {
        // TODO: Implement refresh logic when backend is ready
        console.log('Refreshing attack log...');
    };

    return (
        <div className="shop-wiki-container">
            <PageHeader
                leftContent={
                    <>
                        <Link to="/home" className="back-button" title="Back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="page-header-title-inline">Attack Log</h1>
                    </>
                }
                centerContent={
                    <div className="tab-selector-bar">
                        <button
                            className={`tab-bar-button ${activeTab === 'alltime' ? 'active' : ''}`}
                            onClick={() => setActiveTab('alltime')}
                        >
                            All Time
                        </button>
                        <button
                            className={`tab-bar-button ${activeTab === 'lastattack' ? 'active' : ''}`}
                            onClick={() => setActiveTab('lastattack')}
                        >
                            Last Attack
                        </button>
                    </div>
                }
            >
                <button
                    onClick={handleRefresh}
                    className="icon-button"
                    title="Refresh Attack Log"
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </PageHeader>

            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <h2 className="leaderboard-subtitle">Attack History</h2>
                    </div>

                    <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '64px', marginBottom: '16px' }}>
                            list_alt
                        </span>
                        <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                            Attack Log Coming Soon
                        </p>
                        <p style={{ fontSize: '14px', opacity: '0.8' }}>
                            View detailed logs of all attacks you've received and how your defenses performed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttackLog;
