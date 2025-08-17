import { Link } from 'react-router-dom';

function Vishing() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Vishing (Voice Phishing)</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Vishing uses phone calls or voice communications to trick victims into 
                        revealing sensitive information or performing actions that compromise security. 
                        Attackers often exploit trust in voice conversations, using caller ID spoofing 
                        and social engineering tactics such as urgency, fear, or authority.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Fake bank calls requesting account verification</li>
                        <li>Tax authority scams threatening legal action</li>
                        <li>Tech support fraud claiming a system infection</li>
                        <li>Utility company impersonation threatening disconnection</li>
                        <li>Charity scams exploiting disasters or crises</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Vishing has existed since the telephone era but has grown significantly 
                        with VoIP technologies, which enable caller ID spoofing and large-scale 
                        robocalling. The COVID-19 pandemic saw a sharp increase as attackers 
                        targeted remote workers and vulnerable populations.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>User education on recognizing phone-based scams</li>
                        <li>Never providing sensitive information over unsolicited calls</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Vishing;