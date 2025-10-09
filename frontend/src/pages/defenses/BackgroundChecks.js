import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function BackgroundChecks() {
    return (
        <DefenseDetailPage
            defenseKey="backgroundChecks"
            title="Background Checks"
            infoContent={
                <>
                    <p>
                        Background checks and ongoing screenings review criminal history, financial standing, references, and other
                        relevant factors before hiring and throughout employment. The goal is to spot individuals whose changing
                        circumstances might increase fraud risk.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Screening finance department hires for red flags</li>
                            <li>Vetting contractors with elevated system access</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fticonsulting.com/insights/articles/safeguard-against-fraud-importance-background-checks"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Background Checks
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default BackgroundChecks;
