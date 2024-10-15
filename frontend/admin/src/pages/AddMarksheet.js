import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import SnackbarProvider
import "../assets/css/ResultUpload.css";

function AddMarksheet() {
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [courseYear, setCourseYear] = useState('');
    const [semester, setSemester] = useState('');
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]); // State for courses
    const { enqueueSnackbar } = useSnackbar(); // Hook for Snackbar

    useEffect(() => {
        // Fetch course names from the server
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/courses/names');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('course', course);
        formData.append('courseYear', courseYear);
        formData.append('semester', semester);
    
        try {
            const response = await fetch('http://localhost:5000/marksheets/upload', {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
            console.log(result);
    
            if (response.ok) {
                enqueueSnackbar('File uploaded successfully', { variant: 'success' });
            } else {
                enqueueSnackbar(`Error: ${result.message}`, { variant: 'error' });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            enqueueSnackbar('Error uploading file', { variant: 'error' });
        }
    };

    return (
        <SnackbarProvider maxSnack={3}> {/* Add SnackbarProvider */}
            <Header />
            <div className="pgAddMarksheet" style={{paddingBottom: '80px' , background: '#F1F3F4'}}>
                <br />
                <div className="pgBack">
                    <nav>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/sheets-collection">Sheet</Link></li>
                            <li className="breadcrumb-item active"><Link to="/add-marksheet">Add Marksheet</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="result-upload-container">
                    <h1>Create Marksheet</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Title"
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="course">Course</label>
                            <select
                                id="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                style={{ width: "100%", padding: "5px" }}
                                required>

                                <option value="">Select Course</option>
                                {courses.map((courseItem, index) => (
                                    <option key={index} value={courseItem.courseName}>
                                        {courseItem.courseName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseYear">Course Year</label>
                            <input
                                type="text"
                                id="courseYear"
                                value={courseYear}
                                onChange={(e) => setCourseYear(e.target.value)}
                                placeholder="Enter Course Year"
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="text"
                                id="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                placeholder="Enter Semester"
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="csvFile">Upload CSV File</label>
                            <input
                                type="file"
                                id="csvFile"
                                accept=".csv"
                                onChange={(e) => setFile(e.target.files[0])}
                                required />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add Results
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </SnackbarProvider>
    );
}

export default AddMarksheet;