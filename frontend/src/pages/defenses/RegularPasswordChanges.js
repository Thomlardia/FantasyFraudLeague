import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function RegularPasswordChanges() {
    return (
        <DefenseDetailPage
            defenseKey="passwordPolicies"
            title="Regular Password Changes"
            infoContent={
                <>
                    <p>
                        Regular password changes enforce policies that require users to refresh credentials on a predictable
                        schedule, limiting the window of opportunity for attackers to abuse stolen passwords.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Rotating database administrator credentials quarterly</li>
                            <li>Enforcing 90-day password resets across corporate accounts</li>
                            <li>Updating shared service account keys and secrets</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.kaspersky.com/resource-center/preemptive-safety/how-often-password-change"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Regular Password Changes
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/AccountTakeover">Account Takeover</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default RegularPasswordChanges;
