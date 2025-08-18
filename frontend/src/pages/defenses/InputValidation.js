import { Link } from 'react-router-dom';

function InputValidation() {
    return (
        <div className="shop-container">
            <h1>Input Validation</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="description-card">
                <p>
                    Input validation and sanitisation involves checking and cleaning all data entered into applications before processing. For databases, this prevents malicious SQL code from being executed, while for web applications, it stops harmful scripts from being embedded in pages.
                </p>
            </div>
        </div>
    );
}

export default InputValidation;