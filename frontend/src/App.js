import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hello from './pages/Hello';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import DefenseShop from './pages/DefenseShop';
import FraudWiki from './pages/FraudWiki';
import Help from './pages/Help';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/defenseshop" element={<DefenseShop />} />
        <Route path="/fraudwiki" element={<FraudWiki />} />
        <Route path="/help" element={<Help />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;

