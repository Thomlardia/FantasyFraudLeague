import { Link } from 'react-router-dom';

function EmailFiltering() {
    return (
        <div>
            <h1>EmailFiltering</h1>
            <section>
                <h2>Defends against:</h2>
                <ul>
                    <li>
                        <Link to="/frauds/Phishing">AtmSkimming</Link>
                    </li>
                </ul>
            </section>
            <Link to="/defenseshop">BACK</Link>
        </div>
    );
}

export default EmailFiltering;