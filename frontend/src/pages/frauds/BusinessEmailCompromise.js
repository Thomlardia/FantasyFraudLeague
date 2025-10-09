import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function BusinessEmailCompromise() {
    return (
        <FraudDetailPage
            title="Business Email Compromise"
            infoContent={
                <>
                    <p>
                        Business Email Compromise (BEC) uses compromised or spoofed email accounts to trick staff into sending
                        fraudulent payments or sensitive data. Attackers often study org charts and communication styles before
                        sending convincing requests.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>CEO fraud requesting urgent wire transfers</li>
                            <li>Vendor email compromise leading to payment redirection</li>
                            <li>Invoice fraud with altered banking details</li>
                            <li>Attorney impersonation for time-sensitive demands</li>
                            <li>Real estate wire fraud during property transactions</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Emerging in the early 2010s, BEC became one of the costliest cybercrimes. The FBI recorded over $43
                            billion in global losses between 2016 and 2021 as criminal groups refined their tactics.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/RegularAudits">Regular Audits</Link>
                            </li>
                            <li>
                                <Link to="/defenses/SegregationOfDuties">Segregation Of Duties</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.microsoft.com/en-za/security/business/security-101/what-is-business-email-compromise-bec"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Business Email Compromise
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default BusinessEmailCompromise;
