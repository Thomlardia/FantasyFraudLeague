import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function SyntIdentityTheft() {
    return (
        <div className="fraud-container">
            <div className="header">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Synthetic Identity Theft</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Synthetic identity theft involves creating fake identities using a mix of real and 
                        fabricated personal information. Criminals build credit histories with these identities 
                        and use them to commit fraud. Because no single victim experiences the full impact, 
                        this type of fraud can go undetected for years.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Combining real Social Security numbers with fake names and addresses</li>
                        <li>Creating credit profiles for long-term fraud</li>
                        <li>Opening bank accounts with synthetic identities</li>
                        <li>Obtaining government benefits using fabricated identities</li>
                        <li>Money laundering through synthetic accounts</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Synthetic identity fraud grew with automated credit systems and fewer in-person checks. 
                        It has become one of the fastest-growing fraud types, fueled by personal data leaks 
                        from major breaches.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>Biometric verification and document authentication</li>
                        <li>Enhanced credit monitoring systems</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SyntIdentityTheft;