import { Link } from 'react-router-dom';
import { useAuth } from "../auth/useAuth";
import '../styles/ui.css';
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
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                        <Link to="/leaderboard" className="icon-button" title="Leaderboard">
                            <span className="material-symbols-outlined">leaderboard</span>
                        </Link>
                    </>
                }
                centerContent={<MoneyBar />}
            >
                <Link to="/help" className="icon-button" title="Help">
                    <span className="material-symbols-outlined">help</span>
                </Link>
                <Link to="/settings" className="icon-button" title="Settings">
                    <span className="material-symbols-outlined">settings</span>
                </Link>
                {hasRole("admin") && (
                    <Link to="/admin" className="icon-button" title="Admin">
                        <span className="icon-button-label">Admin</span>
                    </Link>
                )}
            </PageHeader>

            <main className="home-main">
                <div className="headline">NEXT ATTACK IN...</div>
                <div className="digital-timer" aria-live="polite">42 SECS</div>

                <div className="cta-row">
                    <Link className="cta-button" to="/defenseshop">
                        Cyber Defense Shop
                        <span className="material-symbols-outlined">chevron_right</span>
                    </Link>
                    <Link className="cta-button" to="/fraudwiki">
                        Fraud Wiki
                        <span className="material-symbols-outlined">chevron_right</span>
                    </Link>
                </div>
            </main>
        </div>

        
    );
}

export default Home;
