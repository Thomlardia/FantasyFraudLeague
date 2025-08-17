import { Link } from 'react-router-dom';

function BusinessEmailCompromise() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Business Email Compromise (BEC)</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Business Email Compromise (BEC) is a sophisticated scheme where attackers 
                        use compromised or spoofed email accounts to trick businesses into making 
                        fraudulent financial transfers or sharing sensitive data. Attackers often 
                        study organizational structures and communication styles before executing 
                        convincing requests.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>CEO fraud requesting urgent wire transfers</li>
                        <li>Vendor email compromise leading to payment redirection</li>
                        <li>Invoice fraud with altered banking details</li>
                        <li>Attorney impersonation for time-sensitive requests</li>
                        <li>Real estate wire fraud during property transactions</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        BEC emerged in the early 2010s and has since become one of the most 
                        financially damaging cybercrimes. Between 2016 and 2021, the FBI 
                        reported over $43 billion in global losses, with attacks growing in 
                        sophistication year after year.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>Multi-step verification for financial transactions</li>
                        <li>Email authentication and sender verification</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BusinessEmailCompromise;