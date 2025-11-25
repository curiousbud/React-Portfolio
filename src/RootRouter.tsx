import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import TerminalPage from './pages/TerminalPage';

const RootRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terminal" element={<TerminalPage />} />
    </Routes>
  </Router>
);

export default RootRouter;
