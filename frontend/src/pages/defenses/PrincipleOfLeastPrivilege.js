import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function PrincipleOfLeastPrivilege() {
    return (
        <DefenseDetailPage
            defenseKey="principleOfLeastPrivilege"
            title="Principle Of Least Privilege"
            infoContent={
                <>
                    <p className="info-paragraph">
                        The principle of least privilege grants every user, application, and system only the access required for
                        their jobs. By narrowing permissions, exploited accounts can touch less data and cause far less damage.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Interns receive read-only database access</li>
                            <li>Finance staff cannot modify payroll application code</li>
                            <li>Administrative rights are limited to the IT operations team</li>
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
                            <li>
                                <Link to="/frauds/SqlInjection" className="info-link">SQL Injection</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AccountTakeover" className="info-link">Account Takeover</Link>
                            </li>
                            <li>
                                <Link to="/frauds/AccAndInvFraud" className="info-link">Account and Invoice Fraud</Link>
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
                                    href="https://www.cyberark.com/what-is/least-privilege/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Principle of Least Privilege
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

export default PrincipleOfLeastPrivilege;
