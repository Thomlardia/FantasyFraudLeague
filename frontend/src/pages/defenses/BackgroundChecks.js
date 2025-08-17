import { Link } from 'react-router-dom';

function BackgroundChecks() {
    return (
        <div>
            <h1>BackgroundChecks</h1>
            <Link to="/defenseshop">BACK</Link>
            
            <div className="descriptionCard">
                <p>
                    Background checks and regular screenings involve verification of employees' criminal history, financial status, references, and other relevant factors before hiring AND periodically throughout employment. This process helps identify individuals who may pose higher risks for fraudulent behavior due to financial pressures, criminal history, or other concerning factors. Ongoing screenings can detect changes in an employee's circumstances that might increase fraud risk.
                </p>
            </div>
        </div>
    );
}

export default BackgroundChecks;