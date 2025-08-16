import { Link } from 'react-router-dom';

function DdosProtection() {
    return (
        <div>
            <h1>DdosProtection</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    DDoS protection services provide specialized infrastructure and techniques to absorb and mitigate large-scale traffic attacks.
                </p>
            </div>
        </div>
    );
}

export default DdosProtection;