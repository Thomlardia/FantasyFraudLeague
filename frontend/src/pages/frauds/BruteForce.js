import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function BruteForce() {
    return (
        <div className="fraud-container">
            <div className="header">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Brute Force</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Brute force attacls use automated tools to attempt logins with 
                        stolen username-password pairs from previous data breaches. 
                        It exploits the fact that many users reuse the same credentials 
                        across multiple services, making even small success rates 
                        profitable for attackers.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Testing leaked credentials on banking or retail sites</li>
                        <li>Botnets running large-scale login attempts</li>
                        <li>Verifying which accounts are valid</li>
                        <li>Targeting high-value services like finance or e-commerce</li>
                        <li>Using residential IP proxies to bypass detection</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Brute force attacks became prominent in the 2010s 
                        after major breaches released billions of username-password pairs. 
                        Incidents like the Yahoo breaches provided attackers 
                        with massive databases to exploit.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/MultiFactorAuth">Multi Factor Authentication</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BruteForce;