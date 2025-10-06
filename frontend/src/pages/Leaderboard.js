import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import fflLogo from '../images/ffl_logo_ghost.png';
import { useLeaderboard } from '../contexts/LeaderboardContext';

function Leaderboard() {
    const { topTen, currentUser, loading, error, refreshLeaderboard } = useLeaderboard();

    // Fetch leaderboard data on first view
    useEffect(() => {
        refreshLeaderboard();
    }, [refreshLeaderboard]);

    if (loading) {
        return (
            <div className="shop-wiki-container">
                <div className="shop-wiki-header">
                    <Link to="/home" className="back-button" title="Back">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="shop-wiki-title">
                        <img src={fflLogo} alt="FFL Shield Logo" className="title-icon" />
                        Leaderboard
                    </h1>
                </div>
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading leaderboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shop-wiki-container">
                <div className="shop-wiki-header">
                    <Link to="/home" className="back-button" title="Back">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="shop-wiki-title">
                        <img src={fflLogo} alt="FFL Shield Logo" className="title-icon" />
                        Leaderboard
                    </h1>
                </div>
                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="shop-wiki-container">
            <div className="shop-wiki-header">
                <Link to="/home" className="back-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>

                <h1 className="shop-wiki-title">
                    <img src={fflLogo} alt="FFL Shield Logo" className="title-icon" />
                    Leaderboard
                </h1>

                <button
                    onClick={refreshLeaderboard}
                    className="refresh-button"
                    title="Refresh Leaderboard"
                    disabled={loading}
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </div>

            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <h2 className="leaderboard-subtitle">Top 10 Players</h2>
                    </div>

                    <div className="leaderboard-list">
                        {topTen.map((player) => (
                            <div key={player.rank} className="leaderboard-row">
                                <div className="rank-column">
                                    <span className="rank-number">{player.rank}</span>
                                </div>
                                <div className="player-column">
                                    <span className="player-name">{player.name}</span>
                                </div>
                                <div className="score-column">
                                    <span className="player-score">{player.netWorth.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
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
