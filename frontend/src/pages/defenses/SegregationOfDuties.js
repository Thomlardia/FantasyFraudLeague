import { Link } from 'react-router-dom';

function SegregationOfDuties() {
    return (
        <div>
            <h1>SegregationOfDuties</h1>
            <Link to="/defenseshop">BACK</Link>

            <div className="descriptionCard">
                <p>
                   Segregation of duties divides critical processes among multiple individuals to prevent any single person from having complete control over sensitive operations. For example, the person who approves payments should be different from the person who processes them, and the individual who reconciles accounts should be separate from those who handle transactions.
                </p>
            </div>
        </div>
    );
}

export default SegregationOfDuties;