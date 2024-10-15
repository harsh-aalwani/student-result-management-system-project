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
import QuickCSVFormatter from './pages/QCFPage.js';
import NotFound from './pages/NotFound'; // Import NotFound component
import ProtectedRoute from './pages/ProtectedRoute'; // Import ProtectedRoute

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/sheets-collection" element={<ProtectedRoute element={<SheetsCollection />} />} />
                <Route path="/course" element={<ProtectedRoute element={<Course />} />} />
                <Route path="/marksheet/:title" element={<ProtectedRoute element={<Marksheet />} />} />
                <Route path="/add-marksheet" element={<ProtectedRoute element={<AddMarksheet />} />} />
                <Route path="/add-admin" element={<ProtectedRoute element={<AddAdmin />} />} />
                <Route path="/edit-course/:id" element={<ProtectedRoute element={<EditCourse />} />} />
                <Route path="/qcf-page" element={<ProtectedRoute element={<QuickCSVFormatter />} />} />
                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
