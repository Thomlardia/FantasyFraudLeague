import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function SimSwap() {
    return (
        <FraudDetailPage
            title="SIM Swap"
            infoContent={
                <>
                    <p className="info-paragraph">
                        SIM swap fraud transfers a victim&apos;s phone number to an attacker-controlled SIM card. Once the number
                        is hijacked, the attacker intercepts calls and SMS one-time passcodes to seize accounts.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Social engineering mobile carrier employees</li>
                            <li>Using stolen personal information to pass identity checks</li>
                            <li>Targeting cryptocurrency wallets via SMS codes</li>
                            <li>Taking over online banking accounts</li>
                            <li>Compromising social media profiles</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            SIM swapping rose in the 2010s as SMS-based authentication proliferated. High-profile cryptocurrency
                            thefts around 2018–2019 pushed the threat into the spotlight.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/MultiFactorAuth" className="info-link">Multi Factor Authentication</Link>
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
                                    href="https://www.capitecbank.co.za/fraud-centre/sim-swap-fraud/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    SIM Swap
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

export default SimSwap;
