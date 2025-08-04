import { Link } from 'react-router-dom';

function Hello() {
  return (
    <div>
      <h1>Fantasy Fraud League</h1>
      <p>Welcome to the game.</p>
      <Link to="login">LOGIN</Link>
      <br />
      <Link to="signup">SIGN UP</Link>
      <br />
      <Link to="adminlogin">ADMIN LOGIN</Link>
    </div>
  );
}

export default Hello;