import { Link } from 'react-router-dom';
import '../styles/ui.css';

function Home() {
    return (
        <div className="page">
            <div className="topbar">
                <div className="topbar-group">
                    <Link to="/" className="icon-button" title="LogOut">❌</Link>
                    <Link to="/leaderboard" className="icon-button" title="Leaderboard">📊</Link>
                </div>
                <div className="money-display" title="Bank">
                    <span className="money-icon">💳</span>
                    <span>$1,000,000</span>
                </div>
                <div className="topbar-group">
                    <Link to="/help" className="icon-button" title="Help">❔</Link>
                    <Link to="/settings" className="icon-button" title="Settings">⚙️</Link>
                </div>
            </div>

            <main className="home-main">
                <div className="headline">NEXT ATTACK IN...</div>
                <div className="digital-timer" aria-live="polite">42 SECS</div>

                <div className="cta-row">
                    <Link className="cta-button" to="/defenseshop">Cyber Defense Shop</Link>
                    <Link className="cta-button" to="/fraudwiki">Fraud Wiki</Link>
                </div>
            </main>
        </div>

        
    );
}

export default Home;