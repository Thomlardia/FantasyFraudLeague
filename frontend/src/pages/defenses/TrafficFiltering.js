import { Link } from 'react-router-dom';

function TrafficFiltering() {
    return (
        <div className="shop-container">
            <h1>Traffic Filtering</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Traffic filtering involves analyzing incoming network traffic and blocking or limiting requests that match attack patterns or exceed normal thresholds.
                </p>
            </div>
        </div>
    );
}

export default TrafficFiltering;