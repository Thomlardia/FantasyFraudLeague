import { Link } from 'react-router-dom';

function Xss() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Cross-Site Scripting (XSS)</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
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
                        <li>Output encoding to neutralize malicious input</li>
                        <li>Content Security Policy (CSP) to restrict script execution</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Xss;