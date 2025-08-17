import { Link } from 'react-router-dom';

function AuthPushPayments() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Authorized Push Payment (APP) Fraud</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
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
                        <li>Awareness of common scam tactics</li>
                        <li>Implementing payment confirmation delays or cooling-off periods</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AuthPushPayments;