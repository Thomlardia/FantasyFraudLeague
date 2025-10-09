import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';

function AtmSkimming() {
    return (
        <FraudDetailPage
            title="ATM Skimming"
            infoContent={
                <>
                    <p>
                        ATM skimming involves installing physical devices on cash machines to capture card data and PINs. Devices
                        are engineered to blend with hardware, while hidden cameras or overlay keyboards record PIN entry.
                    </p>
                    <div className="info-section">
                        <h3>Common Examples</h3>
                        <ul>
                            <li>Overlay card readers placed over ATM slots</li>
                            <li>Pinhole cameras positioned to capture keypad entry</li>
                            <li>Keyboard overlays that log key presses</li>
                            <li>Bluetooth skimmers transmitting stolen data remotely</li>
                            <li>Shimming devices targeting chip-enabled cards</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Historical Context</h3>
                        <p>
                            Skimming emerged in the 1990s as magnetic stripe cards proliferated. Techniques pioneered by organised
                            crime spread globally as ATM networks expanded.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3>Primary Defenses</h3>
                        <ul>
                            <li>
                                <Link to="/defenses/AtmInspections">ATM Inspections</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3>Reference</h3>
                        <p>
                            <a
                                href="https://www.absa.co.za/self-service/safety-security/card-skimming/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ATM Skimming
                            </a>
                        </p>
                    </div>
                </>
            }
        />
    );
}

export default AtmSkimming;
