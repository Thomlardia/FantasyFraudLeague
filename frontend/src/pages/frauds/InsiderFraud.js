import { Link } from 'react-router-dom';

function InsiderFraud() {
    return (
        <div>
            <h1>InsiderFraud</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/BackgroundChecks">Background Checks</Link>
                    </li>
                    <li>
                        <Link to="/defenses/PrincipleOfLeastPrivilege">Principle Of Least Privilege</Link>
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

export default InsiderFraud;