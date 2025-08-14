import { Link } from 'react-router-dom';

function FraudWiki() {
    return (
        <div>
            <h1>FraudWiki</h1>
            <Link to="/home">BACK</Link>
            
            <br />
            <Link to="/frauds/Phishing">Phishing</Link>
            <br />
            <Link to="/frauds/Ransomware">Ransomware</Link>
            <br />
            <Link to="/frauds/Ddos">Ddos</Link>
            <br />
            <Link to="/frauds/Deepfake">Deepfake</Link>
            <br />
            <Link to="/frauds/AtmSkimming">AtmSkimming</Link>
            <br />
            <Link to="/frauds/InsiderFraud">InsiderFraud</Link>
            <br />
            <Link to="/frauds/ManInTheMiddle">ManInTheMiddle</Link>
            <br />
            <Link to="/frauds/SqlInjection">SqlInjection</Link>
            <br />
            <Link to="/frauds/BusinessEmailCompromise">BusinessEmailCompromise</Link>
            <br />
            <Link to="/frauds/ZeroDayExploit">ZeroDayExploit</Link>
            <br />
            <Link to="/frauds/Vishing">Vishing</Link>
            <br />
            <Link to="/frauds/Xss">Xss</Link>
            <br />
            <Link to="/frauds/AccountTakeover">AccountTakeover</Link>
            <br />
            <Link to="/frauds/InvestmentScam">InvestmentScam</Link>
            <br />
            <Link to="/frauds/SimSwap">SimSwap</Link>
            <br />
            <Link to="/frauds/AuthPushPayments">AuthPushPayments</Link>
            <br />
            <Link to="/frauds/CryptoJacking">CryptoJacking</Link>
            <br />
            <Link to="/frauds/BruteForce">BruteForce</Link>
            <br />
            <Link to="/frauds/SyntIdentityTheft">SyntIdentityTheft</Link>
            <br />
            <Link to="/frauds/AccAndInvFraud">AccAndInvFraud</Link>
            <br />
        </div>
    );
}

export default FraudWiki;