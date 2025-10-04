import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function Vishing() {
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

                <h1>Vishing</h1>
                <div></div>
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
                    <p>
                        <a href="https://www.terranovasecurity.com/solutions/security-awareness-training/what-is-vishing" target="_blank" rel="noopener noreferrer">
                            Reference: Vishing
                        </a>.
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
                        <li>
                            <Link to="/defenses/UserEducation">UserEducation</Link>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Vishing;