import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'

function AccountTakeover() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Account Takeover</h1>
                <Link to="/fraudwiki" className='icon-button' title="Back">
                    <img src={iconBackArrow} alt="Back" className="icon-img" />
                </Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Account takeover involves unauthorized access to user accounts using stolen credentials, 
                        social engineering, or exploitation of weak security mechanisms. Once an attacker gains 
                        access, they can steal data, make fraudulent purchases, or leverage the account 
                        to launch further attacks.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Credential stuffing using leaked usernames and passwords</li>
                        <li>Session hijacking through malware or network interception</li>
                        <li>Social engineering to reset account passwords</li>
                        <li>SIM swapping to bypass SMS authentication</li>
                        <li>Brute-force attacks against weak passwords</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Account takeover has grown alongside online services, fueled by massive credential 
                        leaks and dark web marketplaces. As the value of online accounts increases, 
                        attackers refine their methods to evade detection and exploit security gaps.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                        </li>
                        <li>
                            <Link to="/defenses/RegularPasswordChanges">Regular Password Changes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccountTakeover;