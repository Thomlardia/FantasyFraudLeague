import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>HOME PAGE</h1>
            <Link to="/">LOG OUT</Link>

            <br />

            <Link to="/defenseshop">DEFENSE SHOP</Link>
            <br />
            <Link to="/fraudwiki">FRAUD WIKI</Link>
            <br />
            <Link to="/leaderboard">LEADERBOARD</Link>
            <br />
            <Link to="/settings">SETTINGS</Link>
            <br />
            <Link to="/help">HELP</Link>
        </div>

        
    );
}

export default Home;