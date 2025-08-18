import { Link } from 'react-router-dom';

function AtmInspections() {
    return (
        <div className="shop-container">
            <h1>ATM Inspections</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Application sandboxing isolates applications within restricted environments that limit their access to system resources, files, and network connections. This containment approach prevents malicious code from escaping the sandbox and affecting the broader system, even if the application is compromised through a zero-day exploit.
                </p>
            </div>
        </div>
    );
}

export default AtmInspections;