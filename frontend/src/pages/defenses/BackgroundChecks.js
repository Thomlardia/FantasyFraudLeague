import { Link } from 'react-router-dom';

function BackgroundChecks() {
    return (
        <div className="shop-container">
            <h1>Background Checks</h1>
            <Link to="/defenseshop" className="icon-button">く</Link>
            
            <div className="content-container">
                <div className="description-card">
                    <p>
                        Background checks and regular screenings involve verification of employees' criminal history, financial status, references, and other relevant factors before hiring AND periodically throughout employment. This process helps identify individuals who may pose higher risks for fraudulent behavior due to financial pressures, criminal history, or other concerning factors. Ongoing screenings can detect changes in an employee's circumstances that might increase fraud risk.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                        <ul>
                            <li>Screening finance department hires</li>
                            <li>Vetting contractors with system access</li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default BackgroundChecks;