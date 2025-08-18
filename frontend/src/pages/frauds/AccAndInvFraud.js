import { Link } from 'react-router-dom';

function AccAndInvFraud() {
    return (
        <div>
            <h1>AccAndInvFraud</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/RegularAudits">Regular Audits</Link>
                    </li>
                    <li>
                        <Link to="/defenses/SegregationOfDuties">Segregation Of Duties</Link>
                    </li>
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>
        </div>
    );
}

export default AccAndInvFraud;