import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function SqlInjection() {
    return (

        <div className="fraud-container">
            <div className="topbar">
            <div className="topbar-group">
                <Link to="/fraudwiki" className="icon-button" title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
            </div>
            <MoneyBar />
            <div className="topbar-group"></div>
            </div>
            <div className="header">

                <h1>Sql Injection</h1>
                <div></div>
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
                    <p>
                        <a href="https://www.fortinet.com/resources/cyberglossary/sql-injection" target="_blank" rel="noopener noreferrer">
                            Reference: SQL Injection
                        </a>.
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
                        <li>
                            <Link to="/defenses/PrincipleOfLeastPrivilege">Principle Of Least Privilege</Link>
                        </li>
                        <li>
                            <Link to="/defenses/InputValidation">Input Validation</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SqlInjection;