import { Link } from 'react-router-dom';

function SqlInjection() {
    return (
        <div>
            <h1>SqlInjection</h1>
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