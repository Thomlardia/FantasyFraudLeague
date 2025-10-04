import { Link } from 'react-router-dom';
import '../styles/ui.css';
import fflLogo from '../images/ffl_logo_ghost.png';

function Hello() {
  return (
    <div className="splash">
      <div className="splash-header">
        <img src={fflLogo} alt="FFL Shield Logo" className="splash-logo" />
      </div>
      
      <div className="splash-welcome">WELCOME TO</div>
      
      <div className="title-section">
        <div className="spacer"></div>
        <div className="splash-main-title">
          <span>FANTASY</span>
          <span>FRAUD</span>
          <span>LEAGUE</span>
        </div>
        <div className="spacer"></div>
      </div>
      
      <div className="splash-buttons">
        <Link to="login" className="splash-button primary">LOGIN</Link>
        <Link to="signup" className="splash-button secondary">SIGN UP</Link>
      </div>
    </div>
  );
}

export default Hello;
