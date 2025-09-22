import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function Xss() {
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

                <h1>XXS</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Cross-Site Scripting (XSS) is a web vulnerability where attackers inject malicious 
                        scripts into web pages that are then executed in other users' browsers. 
                        This allows attackers to steal session cookies, hijack accounts, 
                        redirect users, or modify website content.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Stored XSS in comment sections or forums</li>
                        <li>Reflected XSS via malicious links</li>
                        <li>DOM-based XSS through client-side script manipulation</li>
                        <li>Session hijacking via stolen cookies</li>
                        <li>Keylogging with injected JavaScript</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        XSS was first documented in the late 1990s and became more widespread 
                        as interactive web applications grew. Despite being widely known, 
                        XSS remains prevalent due to developer oversight and the complexity 
                        of modern applications.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/InputValidation">Input Validation and Sanitation</Link>
                        </li>
                        <li>
                            <Link to="/defenses/KeepUpdated">Keep Software Updated</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Xss;