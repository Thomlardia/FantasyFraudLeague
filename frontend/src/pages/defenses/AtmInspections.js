import { Link } from 'react-router-dom';

function AtmInspections() {
    return (
        <div className="shop-container">
            <h1>ATM Inspections</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        ATM inspection is the process of regularly checking ATMs to ensure they haven’t been tampered with or compromised. This involves looking for signs of skimming devices, hidden cameras, fake keypads, or any unusual attachments, as well as verifying the machine’s software and cash units. The goal is to detect and prevent fraud attempts before customers use the ATM.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Checking ATMs for skimmers or hidden cameras</li>
                            <li>Ensuring software updates on ATMs</li>
                            <li>Verifying cash slot tamper seals</li>
                        </ul>
                </div>
                
                <div className="description-card">
                    <h3>Defends against:</h3>
                    <ul>
                        <li>
                            <Link to="/frauds/AtmSkimming">ATM Skimming</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AtmInspections;