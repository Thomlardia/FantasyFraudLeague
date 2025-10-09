import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function SimSwap() {
    return (
        <FraudDetailPage
            title="SIM Swap"
            infoContent={
                <>
                    <p>
                        SIM swap fraud transfers a victim&apos;s phone number to an attacker-controlled SIM card. Once the number
                        is hijacked, the attacker intercepts calls and SMS one-time passcodes to seize accounts.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Social engineering mobile carrier employees</li>
                            <li>Using stolen personal information to pass identity checks</li>
                            <li>Targeting cryptocurrency wallets via SMS codes</li>
                            <li>Taking over online banking accounts</li>
                            <li>Compromising social media profiles</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            SIM swapping rose in the 2010s as SMS-based authentication proliferated. High-profile cryptocurrency
                            thefts around 2018–2019 pushed the threat into the spotlight.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.capitecbank.co.za/fraud-centre/sim-swap-fraud/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                SIM Swap
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default SimSwap;
