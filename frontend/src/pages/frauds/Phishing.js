import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'

function Phishing() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Phishing</h1>
                <Link to="/fraudwiki" className='icon-button' title="Back">
                    <img src={iconBackArrow} alt="Back" className="icon-img" />
                </Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                <p>
                    Phishing is a cybercrime where attackers impersonate legitimate organizations through fraudulent emails, websites, or messages to steal sensitive information such as credentials, personal data or money.
                     Phishing attacks exploit human psychology by creating a sense of urgency or trust. Attackers often replicate the visual design and communication style of trusted brands to deceive victims. These attacks
                      evolved from simple email scams to sophisticated techniques like spear phishing, clone phishing, and whaling, targeting specific individuals or organizations.
                </p>
                <br />
                </div>
                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Fake banking emails requesting account verification</li>
                        <li>Fraudulent login pages that capture credentials</li>
                        <li>Urgent payment request messages claiming account suspension</li>
                        <li>Spear phishing targeting specific individuals or organizations</li>
                        <li>Clone phishing using legitimate emails with malicious links replaced</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3> Historical Context:</h3>
                    <p> The term "phishing" originated in the mid 1990s, derived from "fishing" - the idea of baiting victims. Early phishing attacks were email scams but they have since evolved into sophisticated operations often run by large crime syndicates</p>
                </div>
                

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                        </li>
                        <li>
                            <Link to="/defenses/UserEducation">User Education</Link>
                        </li>
                        <li>
                            <Link to="/defenses/EmailFiltering">Email Filtering</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Phishing;