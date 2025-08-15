import { Link } from 'react-router-dom';

function TrafficFiltering() {
    return (
        <div>
            <h1>TrafficFiltering</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Ddos">Ddos</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default TrafficFiltering;