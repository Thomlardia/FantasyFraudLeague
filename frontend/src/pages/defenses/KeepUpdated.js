import { Link } from 'react-router-dom';

function KeepUpdated() {
    return (
        <div>
            <h1>KeepUpdated</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Ransomware">Ransomware</Link>
                    </li>
                    
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default KeepUpdated;