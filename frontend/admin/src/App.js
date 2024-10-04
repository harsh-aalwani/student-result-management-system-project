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
import NotFound from './pages/NotFound'; // Import NotFound component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/sheets-collection" element={<SheetsCollection />} />
                <Route path="/course" element={<Course />} />
                <Route path="/marksheet/:title" element={<Marksheet />} />
                <Route path="/add-marksheet" element={<AddMarksheet />} />
                <Route path="/add-admin" element={<AddAdmin />} />
                <Route path="/edit-course/:id" element={<EditCourse />} />
                
                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
