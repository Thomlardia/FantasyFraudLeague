import { Link } from 'react-router-dom';

function DdosProtection() {
    return (
        <div className="shop-container">
            <h1>DDos Protection</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    DDoS protection services provide specialized infrastructure and techniques to absorb and mitigate large-scale traffic attacks.
                </p>
            </div>
        </div>
    );
}

export default DdosProtection;