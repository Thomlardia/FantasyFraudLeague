import { Link } from 'react-router-dom';

function VpnUsage() {
    return (
        <div>
            <h1>VpnUsage</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/ManInTheMiddle">Man-in-the-middle</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default VpnUsage;