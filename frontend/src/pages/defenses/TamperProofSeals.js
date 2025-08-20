import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function TamperProofSeals() {
    return (
        <div className="shop-container">
            
            <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Tamper Proof Seals</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Tamper proof seals are specialized security devices that provide visual evidence if ATM components have been accessed or modified. These seals use unique patterns, materials, or technologies that make them extremely difficult to remove and replace without leaving obvious signs of tampering.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Securing medication shipments</li>
                            <li>Protecting voting machines</li>
                            <li>Packaging of high-value electronics</li>
                        </ul>
                </div>

                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/AtmSkimming">AtmSkimming</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TamperProofSeals;