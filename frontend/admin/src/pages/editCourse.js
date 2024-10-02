import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from "./Header.js";
import "../assets/css/Home.css";
import courseImg from "../assets/images/course.png";
import Footer from "./Footer.js";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const EditCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [semester, setSemester] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();
    const { id } = useParams(); // Extract course ID from the URL

    // Fetch course details
    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/courses/${id}`);
            const data = await response.json();
            if (response.ok) {
                setCourseName(data.courseName);
                setSemester(data.semester);
                setDescription(data.description);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            setSnackbarMessage('Error fetching course details: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/courses/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseName, semester, description }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setSnackbarMessage('Course updated successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/course'); // Redirect to the course list
        } catch (error) {
            console.error('Error updating course:', error);
            setSnackbarMessage('Error updating course: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Header />
            <div className="pgCourse">
                <div className="container-fluid">
                    <div className="BgColor">
                        <nav>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/course">Course</Link></li>
                                <li className="breadcrumb-item active">Edit Course</li>
                            </ul>
                        </nav>
                        <div className="container">
                            <h1 className="page-title">Edit Course</h1>
                        </div>
                        <div className="container">
                            <h3 className="heading"><img src={courseImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Edit Course</h3>
                            <hr className="separator" />
                            <form onSubmit={handleSubmit} className="container">
                                <div className="row mb-3">
                                    <label htmlFor="courseName" className="col-sm-1 col-form-label">Course</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="cname" placeholder="Enter Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                                    </div>
                                    <label htmlFor="semester" className="col-sm-1 col-form-label">Semester</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="semester" placeholder="Enter Semester" value={semester} onChange={(e) => setSemester(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="description" className="col-sm-1 col-form-label">Description</label>
                                    <div className="col-sm-11">
                                        <textarea className="form-control description" rows="5" maxLength="360" id="description" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-10 offset-sm-2">
                                        <input type="submit" className="btn btn-primary btn-add" value={loading ? 'Loading...' : 'Update'} disabled={loading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default EditCourse;
