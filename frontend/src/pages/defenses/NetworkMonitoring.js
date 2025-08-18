import { Link } from 'react-router-dom';

function NetworkMonitoring() {
    return (
        <div>
            <h1>NetworkMonitoring</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Ddos">Ddos</Link>
                    </li>
                    <li>
                        <Link to="/frauds/CryptoJacking">Crypto Jacking</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default NetworkMonitoring;