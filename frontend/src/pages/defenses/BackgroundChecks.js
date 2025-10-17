import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function BackgroundChecks() {
    return (
        <DefenseDetailPage
            defenseKey="backgroundChecks"
            title="Background Checks"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Background checks and ongoing screenings review criminal history, financial standing, references, and other
                        relevant factors before hiring and throughout employment. The goal is to spot individuals whose changing
                        circumstances might increase fraud risk.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Screening finance department hires for red flags</li>
                            <li>Vetting contractors with elevated system access</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/InsiderFraud" className="info-link">Insider Fraud</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">link</span>
                            Reference
                        </h3>
                        <ul className="info-list">
                            <li>
                                <a
                                    href="https://www.fticonsulting.com/insights/articles/safeguard-against-fraud-importance-background-checks"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Background Checks
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </>
            }
        />
    );
}

export default BackgroundChecks;
