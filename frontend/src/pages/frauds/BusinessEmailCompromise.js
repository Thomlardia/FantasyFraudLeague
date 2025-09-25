import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function BusinessEmailCompromise() {
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

                <h1>Business Email Compromise</h1>
                <div></div>
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
                    <p>
                        <a href="https://www.microsoft.com/en-za/security/business/security-101/what-is-business-email-compromise-bec" target="_blank" rel="noopener noreferrer">
                            Reference: Business Email Compromise
                        </a>.
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
                        <li>
                            <Link to="/defenses/RegularAudits">Regular Audits</Link>
                        </li>
                        <li>
                            <Link to="/defenses/SegregationOfDuties">Segregation Of Duties</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BusinessEmailCompromise;