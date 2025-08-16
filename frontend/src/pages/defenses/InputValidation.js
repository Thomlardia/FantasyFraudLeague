import { Link } from 'react-router-dom';

function InputValidation() {
    return (
        <div>
            <h1>InputValidation</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                    Input validation and sanitisation involves checking and cleaning all data entered into applications before processing. For databases, this prevents malicious SQL code from being executed, while for web applications, it stops harmful scripts from being embedded in pages.
                </p>
            </div>
        </div>
    );
}

export default InputValidation;