import { Link } from 'react-router-dom';

function InsiderFraud() {
    return (
        <div className="fraud-container">
            <div className="header">
                <h1>Insider Fraud</h1>
                <Link to="/fraudwiki" className='back-button'>BACK</Link>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        Insider fraud involves fraudulent activities committed by employees, contractors, 
                        or other trusted individuals with authorized access to an organization's systems 
                        or data. Insiders may act maliciously for personal gain or unintentionally 
                        cause harm through negligence. Their knowledge of security controls 
                        makes their actions particularly difficult to detect.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Data theft and sale to competitors or criminals</li>
                        <li>Embezzlement via financial system manipulation</li>
                        <li>Sabotage of systems or processes</li>
                        <li>Unauthorized access to confidential client information</li>
                        <li>Privilege abuse for personal gain</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        Insider fraud has existed for as long as organizations have had employees. 
                        Digital systems have amplified its impact. 
                        High-profile cases, such as Edward Snowden, highlight the dangers 
                        of insider threats on both organizational and national security levels.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>Background checks and regular employee screenings</li>
                        <li>Principle of least privilege access control</li>
                        <li>Segregation of duties</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InsiderFraud;