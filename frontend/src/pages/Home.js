import { Link } from 'react-router-dom';
import { useAuth } from "../auth/useAuth";
import '../styles/ui.css';
import iconClose from '../images/icons/close.png';
import iconLeaderboard from '../images/icons/leaderboard.png';
import iconHelp from '../images/icons/help.png';
import iconSettings from '../images/icons/settings.png';
import MoneyBar from '../components/MoneyBar';
import PageHeader from '../components/PageHeader';

function Home() {
    const { hasRole, logout } = useAuth();
    return (
        <div className="page">
            <PageHeader
                leftContent={
                    <>
                        <button
                            type="button"
                            className="icon-button"
                            title="Log out"
                            onClick={logout}
                        >
                            <img src={iconClose} alt="Log out" className="icon-img" />
                        </button>
                        <Link to="/leaderboard" className="icon-button" title="Leaderboard">
                            <img src={iconLeaderboard} alt="Leaderboard" className="icon-img" />
                        </Link>
                    </>
                }
                centerContent={<MoneyBar />}
            >
                <Link to="/help" className="icon-button" title="Help">
                    <img src={iconHelp} alt="Help" className="icon-img" />
                </Link>
                <Link to="/settings" className="icon-button" title="Settings">
                    <img src={iconSettings} alt="Settings" className="icon-img" />
                </Link>
                {hasRole("admin") && (
                    <Link to="/admin" className="icon-button" title="Admin">
                        <span style={{ color: 'white', fontSize: 12 }}>Admin</span>
                    </Link>
                )}
            </PageHeader>

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
