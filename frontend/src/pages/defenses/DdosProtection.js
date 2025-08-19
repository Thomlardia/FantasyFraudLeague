import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';

function DdosProtection() {
    return (
        <div className="shop-container">
            <h1>DDos Protection</h1>
            <Link to="/defenseshop" className="icon-button" title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        DDoS protection services provide specialized infrastructure and techniques to absorb and mitigate large-scale traffic attacks.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Protecting online banking portals</li>
                            <li>Shielding e-commerce sites during holiday sales</li>
                            <li>Safeguarding government services portals</li>
                        </ul>
                </div>
                
                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/Ddos">Ddos</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default DdosProtection;