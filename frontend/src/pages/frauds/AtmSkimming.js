import { Link } from 'react-router-dom';
import iconBackArrow from '../../images/icons/back_arrow.png'
import '../../styles/ui.css';
import '../../styles/shopAndWiki.css';
import MoneyBar from '../../components/MoneyBar';

function AtmSkimming() {
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

                <h1>Atm Skimming</h1>
                <div></div>
            </div>

            <div className="content-container">
                <div className="description-card">
                    <p>
                        ATM skimming involves installing physical devices on ATMs to steal card data 
                        and PINs from unsuspecting users. Skimming devices are designed to blend 
                        seamlessly with ATM hardware. Card skimmers capture magnetic stripe data, 
                        while hidden cameras or overlay keyboards record PIN entry. 
                        Modern variations include contactless card shimming, deep-insert skimmers, 
                        and Bluetooth-enabled devices.
                    </p>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Common Examples:</h3>
                    <ul>
                        <li>Overlay card readers placed over ATM slots</li>
                        <li>Pinhole cameras positioned to capture PIN entry</li>
                        <li>Keyboard overlays that record key presses</li>
                        <li>Bluetooth skimmers transmitting stolen data remotely</li>
                        <li>Shimming devices targeting chip cards</li>
                    </ul>
                    <br />
                </div>

                <div className="description-card">
                    <h3>Historical Context:</h3>
                    <p>
                        ATM skimming emerged in the 1990s as magnetic stripe technology became widespread. 
                        Eastern European criminal organizations pioneered many of the techniques, 
                        which then spread worldwide with the growth of ATM networks.
                    </p>
                </div>

                <div className="description-card">
                    <h3>Primary Defenses:</h3>
                    <ul>
                        <li>
                            <Link to="/defenses/AtmInspections">ATM inspections</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AtmSkimming;