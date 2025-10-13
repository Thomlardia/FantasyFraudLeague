import { Link } from 'react-router-dom';
import { useAuth } from "../auth/useAuth";
import { useAttack } from "../contexts/AttackContext";
import '../styles/ui.css';
import MoneyBar from '../components/MoneyBar';
import PageHeader from '../components/PageHeader';

function Home() {
    const { hasRole, logout } = useAuth();
    const {
        timeRemaining,
        isRunning,
        startTimer,
        skipTimer,
        formatTime,
        getTimerCardClass
    } = useAttack();

    return (
        <div className="page">
            <PageHeader
                leftContent={
                    <button
                        type="button"
                        className="icon-button"
                        title="Log out"
                        onClick={logout}
                    >
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                }
                centerContent={<MoneyBar />}
            >
                <Link to="/help" className="icon-button" title="Help">
                    <span className="material-symbols-outlined">help</span>
                </Link>
                <Link to="/leaderboard" className="icon-button" title="Leaderboard">
                    <span className="material-symbols-outlined">leaderboard</span>
                </Link>
                {hasRole("admin") && (
                    <Link to="/admin" className="icon-button" title="Admin Dashboard">
                        <span className="material-symbols-outlined">admin_panel_settings</span>
                    </Link>
                )}
            </PageHeader>

            <div className="home-content-wrapper">
                <div className="home-content-card">
                    <div className={getTimerCardClass()}>
                        <div className="headline">NEXT ATTACK IN...</div>
                        <div className="digital-timer" aria-live="polite">{formatTime(timeRemaining)}</div>

                        <div className="timer-controls">
                            <button
                                className="icon-button timer-button"
                                onClick={startTimer}
                                disabled={isRunning}
                                title="Start Timer"
                            >
                                <span className="material-symbols-outlined">play_arrow</span>
                            </button>
                            <button
                                className="icon-button timer-button"
                                onClick={skipTimer}
                                disabled={!isRunning || timeRemaining <= 2 * 60}
                                title="Skip Timer"
                            >
                                <span className="material-symbols-outlined">skip_next</span>
                            </button>
                        </div>
                    </div>

                    <div className="home-cta-row">
                        <Link className="home-nav-button" to="/defenseshop">
                            <span className="material-symbols-outlined">shield</span>
                            <span className="home-nav-label">Cyber Defense Shop</span>
                        </Link>
                        <Link className="home-nav-button" to="/fraudwiki">
                            <span className="material-symbols-outlined">menu_book</span>
                            <span className="home-nav-label">Fraud Wiki</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
