import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function RegularPasswordChanges() {
    return (
        <DefenseDetailPage
            defenseKey="regularPasswordChanges"
            title="Regular Password Changes"
            infoContent={
                <>
                    <p className="info-paragraph">
                        Regular password changes enforce schedules that require users to refresh credentials on a predictable
                        schedule, limiting the window of opportunity for attackers to abuse stolen passwords. It can
                        include ensuring passwords are of a certain length, contain specific characters and even includes
                        the use of biometrics to gain access to accounts.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Rotating database administrator credentials quarterly</li>
                            <li>Enforcing 90-day password resets across corporate accounts</li>
                            <li>Updating shared service account keys and secrets</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">shield</span>
                            Defends Against
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/frauds/AccountTakeover" className="info-link">Account Takeover</Link>
                            </li>
                            <li>
                                <Link to="/frauds/BruteForce" className="info-link">Brute Force</Link>
                            </li>
                            <li>
                                <Link to="/frauds/SynIdentityTheft" className="info-link">Synthentic Identity Theft</Link>
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
                                    href="https://www.kaspersky.com/resource-center/preemptive-safety/how-often-password-change"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Regular Password Changes
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

export default RegularPasswordChanges;
