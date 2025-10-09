import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function SqlInjection() {
    return (
        <FraudDetailPage
            title="SQL Injection"
            infoContent={
                <>
                    <p>
                        SQL injection exploits application inputs to insert malicious SQL code, manipulating databases to access
                        unauthorised data, bypass authentication, or modify records. In severe cases, attackers can execute
                        commands on the database server itself.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Authentication bypass using crafted login queries</li>
                            <li>Data extraction with UNION-based injections</li>
                            <li>Blind SQL injection using boolean or time-based techniques</li>
                            <li>Second-order injections stored and executed later</li>
                            <li>NoSQL injection targeting document databases</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Documented in 1998, SQL injection gained notoriety after high-profile breaches in the early 2000s. It
                            remains a top web vulnerability due to poor validation and legacy code.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/PrincipleOfLeastPrivilege">Principle Of Least Privilege</Link>
                            </li>
                            <li>
                                <Link to="/defenses/InputValidation">Input Validation</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.fortinet.com/resources/cyberglossary/sql-injection"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                SQL Injection
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default SqlInjection;
