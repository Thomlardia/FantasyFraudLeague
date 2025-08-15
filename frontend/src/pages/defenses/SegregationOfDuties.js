import { Link } from 'react-router-dom';

function SegregationOfDuties() {
    return (
        <div>
            <h1>SegregationOfDuties</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/InsiderFraud">Insider Fraud</Link>
                    </li>
                    <li>
                        <Link to="/frauds/AccAndInvFraud">Account and Invoice Fraud</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default SegregationOfDuties;