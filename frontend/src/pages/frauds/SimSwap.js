import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'

function SimSwap() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>SIM Swap Fraud</h1>
                <Link to="/fraudwiki" className='icon-button' title="Back">
                    <img src={iconBackArrow} alt="Back" className="icon-img" />
                </Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        SIM swap fraud occurs when attackers transfer a victim's phone number 
                        to their own SIM card. This allows them to intercept calls and text messages, 
                        including one-time passcodes for account authentication, 
                        enabling financial theft or account takeovers.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Social engineering mobile carrier employees</li>
                        <li>Using stolen personal information to pass identity checks</li>
                        <li>Targeting cryptocurrency wallets via SMS codes</li>
                        <li>Taking over online banking accounts</li>
                        <li>Compromising social media accounts</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        SIM swapping emerged in the 2010s as SMS-based authentication grew popular. 
                        High-profile cryptocurrency thefts around 2018-2019 drew global attention 
                        to this method of fraud.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SimSwap;