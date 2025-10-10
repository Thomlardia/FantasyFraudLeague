import { Link } from 'react-router-dom';
import FraudDetailPage from '../../components/FraudDetailPage';
import FraudProtectionChart from '../../components/FraudProtectionChart';
import '../../styles/charts.css';

function AtmSkimming() {
    return (
        <FraudDetailPage
            title="ATM Skimming"
            secondaryCardContent={<FraudProtectionChart attackId="skimming" variant="horizontal" />}
            infoContent={
                <>
                    <p className="info-paragraph">
                        ATM skimming involves installing physical devices on cash machines to capture card data and PINs. Devices
                        are engineered to blend with hardware, while hidden cameras or overlay keyboards record PIN entry.
                    </p>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">list</span>
                            Common Examples
                        </h3>
                        <ul className="info-list">
                            <li>Overlay card readers placed over ATM slots</li>
                            <li>Pinhole cameras positioned to capture keypad entry</li>
                            <li>Keyboard overlays that log key presses</li>
                            <li>Bluetooth skimmers transmitting stolen data remotely</li>
                            <li>Shimming devices targeting chip-enabled cards</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">history_edu</span>
                            Historical Context
                        </h3>
                        <p className="info-paragraph">
                            Skimming emerged in the 1990s as magnetic stripe cards proliferated. Techniques pioneered by organised
                            crime spread globally as ATM networks expanded.
                        </p>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">security</span>
                            Primary Defenses
                        </h3>
                        <ul className="info-list">
                            <li>
                                <Link to="/defenses/AtmInspections" className="info-link">ATM Inspections</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h3 className="info-section-heading">
                            <span className="material-symbols-outlined">link</span>
                            Reference
                        </h3>
                        <ul className="info-list">
                            <li>
                                <a
                                    href="https://www.absa.co.za/self-service/safety-security/card-skimming/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="info-external-link"
                                >
                                    ATM Skimming
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            }
        />
    );
}

export default AtmSkimming;
