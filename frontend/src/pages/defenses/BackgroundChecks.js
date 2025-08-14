import { Link } from 'react-router-dom';

function BackgroundChecks() {
    return (
        <div>
            <h1>BackgroundChecks</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/InsiderFraud">AtmSkimming</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default BackgroundChecks;