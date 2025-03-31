import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Accounting from './pages/Accounting';
import Toys from './pages/Toys';
import Diary from './pages/Diary';
import Wishlist from './pages/Wishlist';
import Reminders from './pages/Reminders';

const App = () => {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>J50 04 App</h1>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/">記帳</Link> | <Link to="/toys">玩具</Link> | <Link to="/diary">日記</Link> | <Link to="/wishlist">願望</Link> | <Link to="/reminders">提醒</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Accounting />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;