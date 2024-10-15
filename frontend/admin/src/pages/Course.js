import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import "../assets/css/Home.css";
import listImg from "../assets/images/list.png";
import courseImg from "../assets/images/course.png";
import Footer from "./Footer.js";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [semester, setSemester] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch('http://localhost:5000/courses', { // Ensure the URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseName, semester, description }),
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
    
            setCourseName('');
            setSemester('');
            setDescription('');
            fetchCourses();
            setSnackbarMessage('Course added successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding course:', error);
            setSnackbarMessage('Error adding course: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };
    
    
    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await fetch(`http://localhost:5000/courses/${courseId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) throw new Error('Error deleting course');
    
                fetchCourses(); // Refresh the course list after deletion
                setSnackbarMessage('Course deleted successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error deleting course:', error);
                setSnackbarMessage('Error deleting course: ' + error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
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
                                <li className="breadcrumb-item active"><Link to="/course">Course</Link></li>
                            </ul>
                        </nav>
                        <div className="container">
                            <h1 className="page-title">Course</h1>
                        </div>
                        <div className="container">
                            <h3 className="heading"><img src={courseImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Add Course</h3>
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
                                        <input type="submit" className="btn btn-primary btn-add" value={loading ? 'Loading...' : 'ADD'} disabled={loading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="container mt-5" style={{paddingBottom: '80px'}}>
                        <h3 className="heading"><img src={listImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Course List</h3>
                        <hr className="separator" />
                        <div className="table-responsive container">
                            <table className="table table-striped table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Semester</th>
                                        <th>Description</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course.courseName}</td>
                                            <td>{course.semester}</td>
                                            <td>{course.description}</td>
                                            <td>
                                                <button onClick={() => navigate(`/edit-course/${course._id}`)} className="btn btn-warning btn-md btnaction">Edit</button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(course._id)} className="btn btn-danger btn-md btnaction">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default Course;
