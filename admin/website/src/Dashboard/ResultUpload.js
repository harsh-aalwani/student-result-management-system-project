import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/ResultUpload.css";
function ResultUpload() {
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [courseYear, setCourseYear] = useState('');
    const [semester, setSemester] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Title:', title);
        console.log('Course:', course);
        console.log('Course Year:', courseYear);
        console.log('Semester:', semester);
        console.log('CSV File:', file);
    };

    return (
        <>
        <Header/>
        <br/>
        <nav>
            <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="">Home</a></li>
                <li className="breadcrumb-item active"><a href="">Course</a></li>
            </ul>
        </nav>
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
                    <input
                        type="text"
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Enter Course"
                        required />
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
                    <small>File should be a CSV and data should be separated by commas.</small>
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Results
                </button>
            </form>
        </div>
        <Footer/>
        </>
    );
}

export default ResultUpload;
