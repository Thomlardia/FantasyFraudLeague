import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';
import iconBackArrow from '../images/icons/back_arrow.png'

function FraudWiki() {
    return (
        <div className='page'>
            <h1 className='shop-title'>Fraud Wiki</h1>
            <Link to="/home" className='icon-button' title="Back">
                <img src={iconBackArrow} alt="Back" className="icon-img" />
            </Link>

            <div className='shop-grid'>
                <Link to="/frauds/Phishing" className="wiki-card">Phishing</Link>
                <Link to="/frauds/Ransomware" className="wiki-card">Ransomware</Link>
                <Link to="/frauds/Ddos" className="wiki-card">Ddos</Link>
                <Link to="/frauds/Deepfake" className="wiki-card">Deepfake</Link>
                <Link to="/frauds/AtmSkimming" className="wiki-card">Atm Skimming</Link>
                <Link to="/frauds/InsiderFraud" className="wiki-card">Insider Fraud</Link>
                <Link to="/frauds/ManInTheMiddle" className="wiki-card">Man-In-The-Middle</Link>
                <Link to="/frauds/SqlInjection" className="wiki-card">Sql Injection</Link>
                <Link to="/frauds/BusinessEmailCompromise" className="wiki-card">Business Email Compromise</Link>
                <Link to="/frauds/ZeroDayExploit" className="wiki-card">Zero Day Exploit</Link>
                <Link to="/frauds/Vishing" className="wiki-card">Vishing</Link>
                <Link to="/frauds/Xss" className="wiki-card">Xss</Link>
                <Link to="/frauds/AccountTakeover" className="wiki-card">Account Takeover</Link>
                <Link to="/frauds/InvestmentScam" className="wiki-card">Investment Scam</Link>
                <Link to="/frauds/SimSwap" className="wiki-card">Sim Swap</Link>
                <Link to="/frauds/AuthPushPayments" className="wiki-card">Authorized Push Payments</Link>
                <Link to="/frauds/CryptoJacking" className="wiki-card">CryptoJacking</Link>
                <Link to="/frauds/BruteForce" className="wiki-card">Brute Force</Link>
                <Link to="/frauds/SyntIdentityTheft" className="wiki-card">Synthetic Identity Theft</Link>
                <Link to="/frauds/AccAndInvFraud" className="wiki-card">Account And Invoice Fraud</Link>
            </div>
        </div>
    );
}

export default FraudWiki;