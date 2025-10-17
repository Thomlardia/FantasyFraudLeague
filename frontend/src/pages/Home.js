import { Link } from 'react-router-dom';
import { useAuth } from "../auth/useAuth";
import useNextAttackCountdown from '../hooks/useNextAttackCountdown';
import '../styles/ui.css';
import MoneyBar from '../components/MoneyBar';
import PageHeader from '../components/PageHeader';

function Home() {
    const { hasRole, logout } = useAuth();
    const {
        timerCardClass,
        digitalDisplay,
        subtextState,
    } = useNextAttackCountdown();

    const renderSubtext = () => {
        switch (subtextState.type) {
            case 'outcome':
                return (
                    <>
                        <p className="timer-subtext">
                            {subtextState.outcome.positive ? 'Defense bonus applied!' : 'Bank balance impacted.'}
                        </p>
                        <Link to="/attacklog" className="timer-link">
                            Review latest report
                        </Link>
                    </>
                );
            case 'loading':
                return (
                    <div className="timer-subtext">
                        <span className="material-symbols-outlined spin">hourglass_empty</span>
                        Checking for upcoming attacks...
                    </div>
                );
            case 'processing':
                return (
                    <div className="timer-subtext">
                        <span className="material-symbols-outlined spin">hourglass_top</span>
                        Processing attack results...
                    </div>
                );
            case 'scheduled':
                return (
                    <>
                        <p className="timer-subtext">
                            Scheduled for {subtextState.scheduledDate.toLocaleString()}
                        </p>
                        <Link to="/attacklog" className="timer-link">
                            View upcoming attacks
                        </Link>
                    </>
                );
            case 'timeout':
                return (
                    <div className="timer-subtext">
                        <span className="material-symbols-outlined">info</span>
                        Results delayed—check the Attack Log.
                    </div>
                );
            default:
                return (
                    <div className="timer-empty">
                        <span className="material-symbols-outlined">event_available</span>
                        <p>No upcoming attacks scheduled.</p>
                        <Link to="/attacklog" className="timer-link">
                            Open Attack Log
                        </Link>
                    </div>
                );
        }
    };

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
                    <div className={timerCardClass}>
                        <div className="headline">NEXT SCHEDULED ATTACK</div>
                        <div className="digital-timer" aria-live="polite">{digitalDisplay}</div>
                        {renderSubtext()}
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
                        <Link className="home-nav-button" to="/analysis">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="home-nav-label">Analysis</span>
                        </Link>
                        <Link className="home-nav-button" to="/attacklog">
                            <span className="material-symbols-outlined">list_alt</span>
                            <span className="home-nav-label">Attack Log</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
