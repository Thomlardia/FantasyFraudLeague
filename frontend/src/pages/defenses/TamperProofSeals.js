import { Link } from 'react-router-dom';

function TamperProofSeals() {
    return (
        <div>
            <h1>TamperProofSeals</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/AtmSkimming">AtmSkimming</Link>
                    </li>

                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default TamperProofSeals;