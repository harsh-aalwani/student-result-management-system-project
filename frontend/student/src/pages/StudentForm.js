import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation
import '../assets/css/StudentForm.css';
import logo from '../assets/images/logo-white.png';
import Footer from "../components/Footer.js";

const StudentForm = () => {
    const [serialNo, setSerialNo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate for page redirection

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!serialNo) {
            setError('Please enter a valid Serial ID');
            return;
        }

        try {
            // Check if serial ID exists in the database
            const response = await fetch(`http://localhost:5000/marksheets/serial/${serialNo}`);
            const data = await response.json();

            if (response.ok && data) {
                // Navigate to ResultMarksheet page if serialId exists
                navigate(`/result/${serialNo}`);
            } else {
                setError('No student found with this Serial ID');
            }
        } catch (error) {
            console.error('Error fetching serial ID:', error);
            setError('Error connecting to server.');
        }
    };

    return (
        <>
            <div className="form-container">
                <form className="student-form" onSubmit={handleSubmit}>
                    <div className="logo-container">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id">Student ID:</label>
                        <input 
                            type="text" 
                            name="id" 
                            value={serialNo} 
                            onChange={(e) => setSerialNo(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Search</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default StudentForm;
