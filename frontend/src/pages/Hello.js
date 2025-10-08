import { Link } from 'react-router-dom';
import '../styles/ui.css';
import fflLogo from '../images/ffl_logo_ghost.png';

function Hello() {
  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="splash-scrollable landing-scrollable">
          <div className="splash-header">
            <img src={fflLogo} alt="FFL Shield Logo" className="splash-logo" />
          </div>

          <div className="landing-stack">
            <div className="landing-hero">
              <div className="splash-welcome">WELCOME TO</div>

              <div className="title-section">
                <div className="splash-main-title">
                  <span>FANTASY</span>
                  <span>FRAUD</span>
                  <span>LEAGUE</span>
                </div>
              </div>
            </div>

            <div className="splash-buttons">
              <Link to="login" className="splash-button">Log in</Link>
              <Link to="signup" className="splash-button">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hello;
