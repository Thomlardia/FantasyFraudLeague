import { Link } from 'react-router-dom';

function AtmInspections() {
    return (
        <div>
            <h1>AtmInspections</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/AtmSkimming">AtmSkimming</Link>
                    </li>
                </ul>
            </section>s
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default AtmInspections;