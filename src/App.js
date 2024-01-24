import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CryptoDetails from './components/CryptoDetails';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="header">
        <h1>Crypto Tracker</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;