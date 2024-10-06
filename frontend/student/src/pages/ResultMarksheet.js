import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/logo-white.png';
import '../assets/css/ResultMarksheet.css';

const ResultMarksheet = () => {
    const { serialNo } = useParams(); // Get serialNo from the URL
    console.log("Serial Number from URL:", serialNo); // Debugging line
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentData = async () => {
            if (!serialNo) {
                setError('Serial number is missing.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/marksheets/serial/${serialNo}`);
                if (!response.ok) {
                    throw new Error('No data found for this student.');
                }
                const data = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError('Error fetching student data.');
            }
        };

        fetchStudentData();
    }, [serialNo]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!studentData) {
        return <p>Loading...</p>; // Optionally, you can add a spinner here
    }

    const { serialId, studentName, course, year, semester, subjects = [], totalMarks, percentage, grade, marksheet_title } = studentData;

    return (
        <div className="container-fluid px-0">
            <div className="marksheet-wrapper"> 
                <div className="marksheet">
                    <div className='someSpacing'>
                        <div className="header text-center">
                            <img src={logo} className="college-logo" alt="College Logo" />
                            <h1>VIDYABHARTI TRUST COLLEGE BUSINESS & COMPUTER RESEARCH</h1>
                            <h2><b>Result: {marksheet_title}</b></h2>
                        </div>
                        <div className="studentInfo">
                            <h2 className="mt- mb-3">Student Information</h2>
                            <div className="info-row">
                                <strong>Serial ID:</strong>
                                <span className="highlight">{serialId}</span>
                            </div>
                            <div className="info-row">
                                <strong>Name:</strong>
                                <span className="highlight">{studentName}</span>
                            </div>
                            <div className="info-row">
                                <strong>Course:</strong>
                                <span className="highlight">{course}</span>
                            </div>
                            <div className="info-row">
                                <strong>Year:</strong>
                                <span className="highlight">{year}</span>
                            </div>
                            <div className="info-row">
                                <strong>Semester:</strong>
                                <span className="highlight">{semester}</span>
                            </div>
                        </div>
                        <table className="table table-bordered mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks Obtained</th>
                                    <th>Total Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.length > 0 ? (
                                    subjects.map((subject, index) => (
                                        <>
                                        <tr key={index}>
                                            <td>{subject.name}</td>
                                            <td>{subject.marks}</td> {/* Change this line to access marks */}
                                            <td>100</td>
                                        </tr>
                                        </>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No subjects found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="grades">
                            <p><i className="fas fa-star"></i> Grade: <span className="total-highlight">{grade}</span></p>
                            <p><i className="fas fa-check"></i> Total Marks: <span className="total-highlight">{totalMarks}</span></p>
                            <p><i className="fas fa-check"></i> Percentage: <span className="total-highlight">{percentage}%</span></p>
                        </div>
                        <div className="total-section">
                            <div className="signature-area">
                                <p>_________________________</p>
                                <p>Authorized Signature</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultMarksheet;
