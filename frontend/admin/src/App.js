import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Course from './Dashboard/Course.js';
import Marksheet from './Dashboard/Marksheet.js';
import AddMarksheet from './Dashboard/AddMarksheet.js';

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
