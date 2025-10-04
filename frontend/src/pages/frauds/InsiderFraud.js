import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function InsiderFraud() {
    return (
        <div className="fraud-container">
            <div className="topbar">
            <div className="topbar-group">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
            <MoneyBar />
            <div className="topbar-group"></div>
            </div>
            <div className="header">

                <h1>Insider Fraud</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Insider fraud involves fraudulent activities committed by employees, contractors, 
                        or other trusted individuals with authorized access to an organization's systems 
                        or data. Insiders may act maliciously for personal gain or unintentionally 
                        cause harm through negligence. Their knowledge of security controls 
                        makes their actions particularly difficult to detect.
                    </p>
                    <br />
                    <p>
                        <a href="https://www.fraud.net/glossary/internal-fraud-insider-fraud#what-is-insider-fraud" target="_blank" rel="noopener noreferrer">
                            Reference: Insider Fraud
                        </a>.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Data theft and sale to competitors or criminals</li>
                        <li>Embezzlement via financial system manipulation</li>
                        <li>Sabotage of systems or processes</li>
                        <li>Unauthorized access to confidential client information</li>
                        <li>Privilege abuse for personal gain</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Insider fraud has existed for as long as organizations have had employees. 
                        Digital systems have amplified its impact. 
                        High-profile cases, such as Edward Snowden, highlight the dangers 
                        of insider threats on both organizational and national security levels.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/BackgroundChecks">Background Checks</Link>
                        </li>
                        <li>
                            <Link to="/defenses/PrincipleOfLeastPrivilege">Principle Of Least Privilege</Link>
                        </li>
                        <li>
                            <Link to="/defenses/SegregationOfDuties">Segregation Of Duties</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InsiderFraud;