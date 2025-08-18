import { Link } from 'react-router-dom';

function Vishing() {
    return (
        <div>
            <h1>Vishing</h1>
            <section>
                <h2>How to Defend:</h2>
                <ul>
                    <li>
                        <Link to="/defenses/UserEducation">UserEducation</Link>
                    </li>
                    
                </ul>
            </section>
            <Link to="/fraudwiki">BACK</Link>
        </div>
    );
}

export default Vishing;