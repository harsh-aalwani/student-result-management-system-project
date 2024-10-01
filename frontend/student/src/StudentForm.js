import React, { useState } from 'react';
import './StudentForm.css';
import logo from './logo.jpg'; 

const StudentForm = () => {
    const [studentData, setStudentData] = useState({
        id: '',
        year: '',
        course: '',
        semester: ''
    });

    const handleChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Student Data:', studentData);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="student-form">
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" /> 
                </div>

                <div className="form-group">
                    <label htmlFor="id">Student ID:</label>
                    <input type="text" name="id" value={studentData.id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input type="text" name="year" value={studentData.year} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="course">Course:</label>
                    <input type="text" name="course" value={studentData.course} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="semester">Semester:</label>
                    <input type="text" name="semester" value={studentData.semester} onChange={handleChange} required />
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default StudentForm;
