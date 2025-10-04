import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function AuthPushPayments() {
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

                <h1>Auth Push Payments</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Authorized Push Payment (APP) fraud manipulates victims into authorizing 
                        payments themselves, usually under false pretenses. Since the payment is 
                        technically approved by the victim, banks often cannot reverse it. 
                        Criminals exploit urgency and trust to pressure victims into making 
                        instant transfers.
                    </p>
                    <br />
                    <p>
                        <a href="https://www.fico.com/blogs/what-authorised-push-payment-fraud" target="_blank" rel="noopener noreferrer">
                            Reference: Auth Push Payments
                        </a>.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Romance scams building long-term trust</li>
                        <li>Fake emergency calls from family members</li>
                        <li>Investment scams promising quick returns</li>
                        <li>Purchase scams for non-existent goods or services</li>
                        <li>Safe account scams claiming the victim's bank account is compromised</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        APP fraud rose sharply with the adoption of faster payment systems, 
                        such as the UK's Faster Payments Service in 2008. 
                        The instant and irreversible nature of these transfers 
                        made them a prime target for fraudsters.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/UserEducation">User Education</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AuthPushPayments;