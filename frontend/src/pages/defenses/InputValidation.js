import { Link } from 'react-router-dom';

function InputValidation() {
    return (
        <div className="shop-container">
            <h1>Input Validation</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Input validation and sanitisation involves checking and cleaning all data entered into applications before processing. For databases, this prevents malicious SQL code from being executed, while for web applications, it stops harmful scripts from being embedded in pages.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Preventing SQL injection on login forms</li>
                            <li>Sanitizing uploaded files</li>
                            <li>Blocking script injections in search fields</li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default InputValidation;