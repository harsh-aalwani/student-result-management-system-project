import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import SheetsCollection from './pages/SheetsCollection.js';
import Course from './pages/Course.js';
import Marksheet from './pages/Marksheet.js';
import AddMarksheet from './pages/AddMarksheet.js';
import AddAdmin from './pages/AddAdmin.js';
import EditCourse from './pages/editCourse.js';
import Home from './pages/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/sheets-collection" element={<SheetsCollection />} />
        <Route path="/course" element={<Course />} />
        <Route path="/marksheet/:title" element={<Marksheet />} /> {/* Update made here */}
        <Route path="/add-marksheet" element={<AddMarksheet />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
