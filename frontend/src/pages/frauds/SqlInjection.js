import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function SqlInjection() {
    return (
        <FraudDetailPage
            title="SQL Injection"
            infoContent={
                <>
                    <p className="info-paragraph">
                        SQL injection exploits application inputs to insert malicious SQL code, manipulating databases to access
                        unauthorised data, bypass authentication, or modify records. In severe cases, attackers can execute
                        commands on the database server itself.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Authentication bypass using crafted login queries</li>
                            <li>Data extraction with UNION-based injections</li>
                            <li>Blind SQL injection using boolean or time-based techniques</li>
                            <li>Second-order injections stored and executed later</li>
                            <li>NoSQL injection targeting document databases</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Documented in 1998, SQL injection gained notoriety after high-profile breaches in the early 2000s. It
                            remains a top web vulnerability due to poor validation and legacy code.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/PrincipleOfLeastPrivilege" className="info-link">Principle Of Least Privilege</Link>
                            </li>
                            <li>
                                <Link to="/defenses/InputValidation" className="info-link">Input Validation</Link>
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
                                    href="https://www.fortinet.com/resources/cyberglossary/sql-injection"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    SQL Injection
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

export default SqlInjection;
