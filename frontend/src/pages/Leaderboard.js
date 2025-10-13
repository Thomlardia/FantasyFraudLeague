import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import PageHeader from '../components/PageHeader';
import { useLeaderboard } from '../contexts/LeaderboardContext';
import { useAuth } from '../auth/useAuth';
import { useFilters } from '../contexts/FilterContext';

function Leaderboard() {
    const { topTen, currentUser, loading, error, refreshLeaderboard } = useLeaderboard();
    const { user } = useAuth();
    const { leaderboardTab, setLeaderboardTab } = useFilters();

    // Fetch leaderboard data on first view
    useEffect(() => {
        refreshLeaderboard();
    }, [refreshLeaderboard]);

    if (loading) {
        return (
            <div className="shop-wiki-container">
                <PageHeader
                    leftContent={
                        <>
                            <Link to="/home" className="back-button" title="Back">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <h1 className="page-header-title-inline">Leaderboard</h1>
                        </>
                    }
                />
                <p className="leaderboard-status">Loading leaderboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shop-wiki-container">
                <PageHeader
                    leftContent={
                        <>
                            <Link to="/home" className="back-button" title="Back">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <h1 className="page-header-title-inline">Leaderboard</h1>
                        </>
                    }
                />
                <p className="leaderboard-status leaderboard-status--error">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="shop-wiki-container">
            <PageHeader
                leftContent={
                    <>
                        <Link to="/home" className="back-button" title="Back">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="page-header-title-inline">Leaderboard</h1>
                    </>
                }
                centerContent={
                    <div className="tab-selector-bar">
                        <button
                            className={`tab-bar-button ${leaderboardTab === 'alltime' ? 'active' : ''}`}
                            onClick={() => setLeaderboardTab('alltime')}
                        >
                            All Time
                        </button>
                        <button
                            className={`tab-bar-button ${leaderboardTab === 'lastattack' ? 'active' : ''}`}
                            onClick={() => setLeaderboardTab('lastattack')}
                        >
                            Last Attack
                        </button>
                    </div>
                }
            >
                <button
                    onClick={refreshLeaderboard}
                    className="icon-button"
                    title="Refresh Leaderboard"
                    disabled={loading}
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </PageHeader>

            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <h2 className="leaderboard-subtitle">Top 10 Players</h2>
                    </div>

                    <div className="leaderboard-list">
                        {topTen.map((player) => {
                            const isCurrentUser = user && player.id === user.uid;
                            return (
                                <div
                                    key={player.rank}
                                    className={`leaderboard-row ${isCurrentUser ? 'current-user-row' : ''}`}
                                >
                                    <div className="rank-column">
                                        <span className="rank-number">{player.rank}</span>
                                    </div>
                                    <div className="player-column">
                                        <span className="player-name">
                                            {player.name}{isCurrentUser ? ' (You)' : ''}
                                        </span>
                                    </div>
                                    <div className="score-column">
                                        <span className="player-score">{player.netWorth.toLocaleString()}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Show current user's rank if they're not in top 10 */}
                    {currentUser && (
                        <>
                            <div className="leaderboard-divider">
                                <span>...</span>
                            </div>
                            <div className="leaderboard-list">
                                <div className="leaderboard-row current-user-row">
                                    <div className="rank-column">
                                        <span className="rank-number">{currentUser.rank}</span>
                                    </div>
                                    <div className="player-column">
                                        <span className="player-name">{currentUser.name} (You)</span>
                                    </div>
                                    <div className="score-column">
                                        <span className="player-score">{currentUser.netWorth.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
