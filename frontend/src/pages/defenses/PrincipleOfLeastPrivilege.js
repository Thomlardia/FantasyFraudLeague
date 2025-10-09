import { Link } from 'react-router-dom';
import DefenseDetailPage from '../../components/DefenseDetailPage';

function PrincipleOfLeastPrivilege() {
    return (
        <DefenseDetailPage
            defenseKey="principleOfLeastPrivilege"
            title="Principle Of Least Privilege"
            infoContent={
                <>
                    <p>
                        The principle of least privilege grants every user, application, and system only the access required for
                        their jobs. By narrowing permissions, exploited accounts can touch less data and cause far less damage.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Interns receive read-only database access</li>
                            <li>Finance staff cannot modify payroll application code</li>
                            <li>Administrative rights are limited to the IT operations team</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.cyberark.com/what-is/least-privilege/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Principle of Least Privilege
                            </a>
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Defends Against</h3>
                        <ul>
                            <li>
                                <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                            </li>
                            <li>
                                <Link to="/frauds/SqlInjection">SQL Injection</Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default PrincipleOfLeastPrivilege;
