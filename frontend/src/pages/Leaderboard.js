import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import fflLogo from '../images/ffl_logo_ghost.png';

function Leaderboard() {
    // Dummy leaderboard data
    const leaderboardData = [
        { rank: 1, playerName: "MarioFan99", score: 1250 },
        { rank: 2, playerName: "PeachyKeen", score: 1180 },
        { rank: 3, playerName: "WaluigiMain", score: 1125 },
        { rank: 4, playerName: "BowserBoss", score: 1080 },
        { rank: 5, playerName: "ToadTactics", score: 1020 },
        { rank: 6, playerName: "YoshiYolo", score: 980 },
        { rank: 7, playerName: "PeachPower", score: 940 },
        { rank: 8, playerName: "KoopaKing", score: 900 },
        { rank: 9, playerName: "GoombaGamer", score: 880 },
        { rank: 10, playerName: "LuigiTime", score: 860 }
    ];

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
            
            <div className="leaderboard-content">
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <h2 className="leaderboard-subtitle">Top 10 Players</h2>
                    </div>
                    
                    <div className="leaderboard-list">
                        {leaderboardData.map((player) => (
                            <div key={player.rank} className="leaderboard-row">
                                <div className="rank-column">
                                    <span className="rank-number">{player.rank}</span>
                                </div>
                                <div className="player-column">
                                    <span className="player-name">{player.playerName}</span>
                                </div>
                                <div className="score-column">
                                    <span className="player-score">{player.score.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;