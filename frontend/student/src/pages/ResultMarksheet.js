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

                        {/* Student Information Table */}
                        <h2 className="mt- mb-3 text-center">Student Information</h2>
                        <table className="table table-bordered mt-4">
                            <tbody>
                                <tr>
                                    <th><strong>Serial ID:</strong></th>
                                    <th><strong>Name:</strong></th>
                                    <th><strong>Course:</strong></th>
                                    <th><strong>Semester:</strong></th>
                                    <th><strong>Year:</strong></th>
                                </tr>
                                <tr>
                                    <td className="highlight">{serialId}</td>
                                    <td className="highlight">{studentName}</td>
                                    <td className="highlight">{course}</td>
                                    <td className="highlight">{semester}</td>
                                    <td className="highlight">{year}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Subjects Table */}
                        <table className="table table-bordered mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <td className="table-title">Subject</td>
                                    <td className="table-title">Marks Obtained</td>
                                    <td className="table-title">Total Marks</td>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.length > 0 ? (
                                    <>
                                        {subjects.map((subject, index) => (
                                            <tr key={index}>
                                                <td>{subject.name}</td>
                                                <td>{subject.marks}</td> {/* Access subject marks */}
                                                <td>100</td> {/* Assuming 100 is the full marks for each subject */}
                                            </tr>
                                        ))}

                                        {/* Total Marks Row */}
                                        <tr>
                                            <td><strong>Total Marks</strong></td>
                                            <td><strong>{subjects.reduce((acc, subject) => acc + subject.marks, 0)}</strong></td> {/* Sum of all marks */}
                                            <td><strong>{subjects.length * 100}</strong></td> {/* Assuming 100 marks per subject */}
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No subjects found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="grades">
                            <p><i className="fas fa-star"></i> Grade: <span className="total-highlight">{grade}</span></p>
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
