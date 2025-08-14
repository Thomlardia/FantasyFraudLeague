import { Link } from 'react-router-dom';

function InputValidation() {
    return (
        <div>
            <h1>InputValidation</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/SqlInjection">AtmSkimming</Link>
                    </li>
                    <li>
                        <Link to="/frauds/Xss">AtmSkimming</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default InputValidation;