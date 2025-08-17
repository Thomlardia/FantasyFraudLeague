import { Link } from 'react-router-dom';
import '../styles/shopAndWiki.css';

function FraudWiki() {
    return (
        <div className='wikiContainer'>
            <h1 className='shopTitle'>Fraud Wiki</h1>
            <Link to="/home" className='backButton'>BACK</Link>

            <div className='shopGrid'>
                <Link to="/frauds/Phishing" className="wikiCard">Phishing</Link>
                <Link to="/frauds/Ransomware" className="wikiCard">Ransomware</Link>
                <Link to="/frauds/Ddos" className="wikiCard">Ddos</Link>
                <Link to="/frauds/Deepfake" className="wikiCard">Deepfake</Link>
                <Link to="/frauds/AtmSkimming" className="wikiCard">Atm Skimming</Link>
                <Link to="/frauds/InsiderFraud" className="wikiCard">Insider Fraud</Link>
                <Link to="/frauds/ManInTheMiddle" className="wikiCard">Man-In-The-Middle</Link>
                <Link to="/frauds/SqlInjection" className="wikiCard">Sql Injection</Link>
                <Link to="/frauds/BusinessEmailCompromise" className="wikiCard">Business Email Compromise</Link>
                <Link to="/frauds/ZeroDayExploit" className="wikiCard">Zero Day Exploit</Link>
                <Link to="/frauds/Vishing" className="wikiCard">Vishing</Link>
                <Link to="/frauds/Xss" className="wikiCard">Xss</Link>
                <Link to="/frauds/AccountTakeover" className="wikiCard">Account Takeover</Link>
                <Link to="/frauds/InvestmentScam" className="wikiCard">Investment Scam</Link>
                <Link to="/frauds/SimSwap" className="wikiCard">Sim Swap</Link>
                <Link to="/frauds/AuthPushPayments" className="wikiCard">Authorized Push Payments</Link>
                <Link to="/frauds/CryptoJacking" className="wikiCard">CryptoJacking</Link>
                <Link to="/frauds/BruteForce" className="wikiCard">Brute Force</Link>
                <Link to="/frauds/SyntIdentityTheft" className="wikiCard">Synthetic Identity Theft</Link>
                <Link to="/frauds/AccAndInvFraud" className="wikiCard">Account And Invoice Fraud</Link>
            </div>
        </div>
    );
}

export default FraudWiki;