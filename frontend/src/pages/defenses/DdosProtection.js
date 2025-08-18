import { Link } from 'react-router-dom';

function DdosProtection() {
    return (
        <div className="shop-container">
            <h1>DDos Protection</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

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
            </div>
        </div>
    );
}

export default DdosProtection;