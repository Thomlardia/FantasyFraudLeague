import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png';
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';

function TrafficFiltering() {
    return (
        <div className="shop-container">
           
           <div className="header">
                <Link to="/defenseshop" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1>Traffic Filtering</h1>
                <div></div>
            </div>
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Traffic filtering involves analyzing incoming network traffic and blocking or limiting requests that match attack patterns or exceed normal thresholds.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Blocking known malicious IP ranges</li>
                            <li>Geo-blocking suspicious countries</li>
                            <li>Filtering bot traffic from APIs</li>
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

export default TrafficFiltering;