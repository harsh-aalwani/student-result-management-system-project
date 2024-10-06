import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header.js";
import Footer from "./Footer.js";

const Marksheet = () => {
    const { title } = useParams(); // Get marksheet title from URL
    const [marksheets, setMarkSheets] = useState([]);

    // Fetch marksheet data based on title
    useEffect(() => {
        const fetchMarkSheets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/marksheets/title/${title}`);
                setMarkSheets(response.data);
            } catch (error) {
                console.error('Error fetching marksheets:', error);
            }
        };

        fetchMarkSheets();
    }, [title]);

    // Function to handle delete action
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this marksheet?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/marksheets/${id}`);
                setMarkSheets(marksheets.filter(marksheet => marksheet._id !== id));
            } catch (error) {
                console.error('Error deleting marksheet:', error);
            }
        }
    };

    return (
        <>
            <Header />
            <div className='pgMarksheet'>
                <div className="container-fluid">
                    <div className="BgColor">
                        <nav>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/dashboard">Sheets</Link></li>
                                <li className="breadcrumb-item active" style={{ color: "#0a58ca" }}>Marksheet</li>
                            </ul>
                        </nav>
                        <h2 className="text-center page-title">{title}</h2>
                    </div>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>SID</th>
                                <th>Student Name</th>
                                <th>Subjects</th>
                                <th>Total Marks</th>
                                <th>Percentage</th>
                                <th>Grade</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marksheets.length > 0 ? (
                                marksheets.map((marksheet) => (
                                    <tr key={marksheet._id}>
                                        <td>{marksheet.serialId}</td>
                                        <td>{marksheet.studentName}</td>
                                        <td>
                                            {marksheet.subjects.map((subject, index) => (
                                                <div key={index}>
                                                    {subject.name}: {subject.marks}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{marksheet.totalMarks}</td>
                                        <td>{marksheet.percentage}</td>
                                        <td>{marksheet.grade}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm btnaction" onClick={() => handleDelete(marksheet._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Marksheet;
