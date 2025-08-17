import { Link } from 'react-router-dom';

function SqlInjection() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>SQL Injection</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        SQL Injection is a web vulnerability where attackers insert malicious SQL code 
                        into application inputs to manipulate databases and access unauthorized data. 
                        This allows attackers to extract sensitive information, bypass authentication, 
                        modify or delete records, and in some cases execute commands on the database server.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Authentication bypass through manipulated login queries</li>
                        <li>Data extraction with UNION-based injections</li>
                        <li>Blind SQL injection using boolean or time-based techniques</li>
                        <li>Second-order injections stored and executed later</li>
                        <li>NoSQL injection targeting non-relational databases</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        SQL Injection was first documented in 1998 and became infamous after several high-profile 
                        breaches in the early 2000s. Despite being well-understood, it remains a top vulnerability 
                        due to poor input validation and legacy systems.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>Input validation and sanitization</li>
                        <li>Principle of least privilege for database accounts</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SqlInjection;