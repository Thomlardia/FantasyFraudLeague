import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function BusinessEmailCompromise() {
    return (
        <FraudDetailPage
            title="Business Email Compromise"
            secondaryCardContent={<FraudProtectionChart attackId="bec" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        Business Email Compromise (BEC) uses compromised or spoofed email accounts to trick staff into sending
                        fraudulent payments or sensitive data. Attackers often study org charts and communication styles before
                        sending convincing requests.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>CEO fraud requesting urgent wire transfers</li>
                            <li>Vendor email compromise leading to payment redirection</li>
                            <li>Invoice fraud with altered banking details</li>
                            <li>Attorney impersonation for time-sensitive demands</li>
                            <li>Real estate wire fraud during property transactions</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Emerging in the early 2010s, BEC became one of the costliest cybercrimes. The FBI recorded over $43
                            billion in global losses between 2016 and 2021 as criminal groups refined their tactics.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/RegularAudits" className="info-link">Regular Audits</Link>
                            </li>
                            <li>
                                <Link to="/defenses/SegregationOfDuties" className="info-link">Segregation Of Duties</Link>
                            </li>
                            <li>
                                <Link to="/defenses/EmailFiltering" className="info-link">Email Filtering</Link>
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
                                    href="https://www.microsoft.com/en-za/security/business/security-101/what-is-business-email-compromise-bec"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    Business Email Compromise
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

export default BusinessEmailCompromise;
