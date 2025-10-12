import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../auth/useAuth";
import '../styles/ui.css';
import MoneyBar from '../components/MoneyBar';
import PageHeader from '../components/PageHeader';

function Home() {
    const { hasRole, logout } = useAuth();
    const [timeRemaining, setTimeRemaining] = useState(5 * 3600 + 45 * 60 + 38); // 05:45:38 in seconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeRemaining]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleStartTimer = () => {
        if (timeRemaining === 0) {
            setTimeRemaining(5 * 3600 + 45 * 60 + 38); // Reset to 05:45:38
        }
        setIsRunning(true);
    };

    const handleSkipTimer = () => {
        if (timeRemaining > 5 * 60) {
            // Skip to 5 minutes
            setTimeRemaining(5 * 60);
        } else if (timeRemaining > 2 * 60) {
            // Skip to 2 minutes
            setTimeRemaining(2 * 60);
        }
    };

    // Determine timer card color based on time remaining
    const getTimerCardClass = () => {
        if (timeRemaining <= 2 * 60) {
            return 'home-timer-card timer-critical';
        } else if (timeRemaining <= 5 * 60) {
            return 'home-timer-card timer-warning';
        }
        return 'home-timer-card';
    };

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

            <div className="home-content-wrapper">
                <div className="home-content-card">
                    <div className={getTimerCardClass()}>
                        <div className="headline">NEXT ATTACK IN...</div>
                        <div className="digital-timer" aria-live="polite">{formatTime(timeRemaining)}</div>

                        <div className="timer-controls">
                            <button
                                className="icon-button timer-button"
                                onClick={handleStartTimer}
                                disabled={isRunning}
                                title="Start Timer"
                            >
                                <span className="material-symbols-outlined">play_arrow</span>
                            </button>
                            <button
                                className="icon-button timer-button"
                                onClick={handleSkipTimer}
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
