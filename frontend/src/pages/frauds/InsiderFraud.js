import { Link } from 'react-router-dom';

function InsiderFraud() {
    return (
        <div>
            <h1>InsiderFraud</h1>
            <Link to="/fraudwiki">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Fraudulent activities committed by employees, contractors, or trusted individuals with authorized access. Examples: data theft, embezzlement, sabotage, selling confidential information.
                </p>
            </div>
        </div>
    );
}

export default InsiderFraud;