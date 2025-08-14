import { Link } from 'react-router-dom';

function DdosProtection() {
    return (
        <div>
            <h1>DdosProtection</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Ddos">AtmSkimming</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default DdosProtection;