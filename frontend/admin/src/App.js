import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Course from './pages/Course.js';
import Marksheet from './pages/Marksheet.js';
import AddMarksheet from './pages/AddMarksheet.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<Course />} />
        <Route path="/marksheet" element={<Marksheet />} />
        <Route path="/add-marksheet" element={<AddMarksheet />} />
      </Routes>
    </Router>
  );
}

export default App;
