import { Link } from 'react-router-dom';

function TrafficFiltering() {
    return (
        <div>
            <h1>TrafficFiltering</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Traffic filtering involves analyzing incoming network traffic and blocking or limiting requests that match attack patterns or exceed normal thresholds.
                </p>
            </div>
        </div>
    );
}

export default TrafficFiltering;