import { Link } from 'react-router-dom';
import '../styles/ui.css';
import iconClose from '../images/icons/close.png';
import iconLeaderboard from '../images/icons/leaderboard.png';
import iconHelp from '../images/icons/help.png';
import iconSettings from '../images/icons/settings.png';
import MoneyBar from '../components/MoneyBar';

function Home() {
    return (
        <div className="page">
            <div className="topbar">
                <div className="topbar-group">
                    <Link to="/" className="icon-button" title="LogOut">
                        <img src={iconClose} alt="Log out" className="icon-img" />
                    </Link>
                    <Link to="/leaderboard" className="icon-button" title="Leaderboard">
                        <img src={iconLeaderboard} alt="Leaderboard" className="icon-img" />
                    </Link>
                </div>
                <MoneyBar />
                <div className="topbar-group">
                    <Link to="/help" className="icon-button" title="Help">
                        <img src={iconHelp} alt="Help" className="icon-img" />
                    </Link>
                    <Link to="/settings" className="icon-button" title="Settings">
                        <img src={iconSettings} alt="Settings" className="icon-img" />
                    </Link>
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