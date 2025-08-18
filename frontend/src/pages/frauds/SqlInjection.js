import { Link } from 'react-router-dom';

function SqlInjection() {
    return (
        <div>
            <h1>SqlInjection</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/PrincipleOfLeastPrivilege">Principle Of Least Privilege</Link>
                    </li>
                    <li>
                        <Link to="/defenses/InputValidation">Input Validation</Link>
                    </li>
                    
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Inserting malicious SQL code into application inputs to manipulate databases. Examples: extracting sensitive data, bypassing authentication, modifying or deleting records.
                </p>
            </div>
        </div>
    );
}

export default SqlInjection;