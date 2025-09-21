import { Link } from 'react-router-dom';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function Deepfake() {
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

                <h1>Deepfake</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Deepfake fraud involves using AI-generated synthetic media (audio, video, or images) 
                        to impersonate individuals for fraudulent purposes. This technology relies on 
                        generative adversarial networks (GANs) to create realistic fake content. 
                        Attackers typically target high-value individuals like CEOs or trusted contacts 
                        to authorize fraudulent transactions or gain access to sensitive information.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Fake CEO voice calls requesting emergency wire transfers</li>
                        <li>Manipulated video calls during business negotiations</li>
                        <li>Synthetic identity creation for account opening fraud</li>
                        <li>Fake audio messages from family members requesting money</li>
                        <li>Manipulated evidence in legal proceedings</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        The term "deepfake" emerged around 2017, combining "deep learning" and "fake." 
                        Early deepfakes were mainly used for non-consensual explicit content, 
                        but fraud applications quickly followed. The first known deepfake fraud 
                        case occurred in 2019 when a CEO's voice was mimicked to authorize a wire transfer.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/VerificationProtocols">Verification Protocols</Link>
                        </li>
                        <li>
                            <Link to="/defenses/TamperProofSeals">Tamper Proof Seals</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Deepfake;