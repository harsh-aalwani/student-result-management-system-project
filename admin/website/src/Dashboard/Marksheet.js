import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "./Header.js"
import Footer from "./Footer.js"
const Marksheet = () => {
    const [students, setStudents] = useState([
        {
          id: 1,
          name: 'John Doe',
          subjects: { math: 80, science: 85, english: 78, history: 92, art: 88 },
        },
        {
          id: 2,
          name: 'Jane Smith',
          subjects: { math: 75, science: 88, english: 91, history: 85, art: 90 },
        },
        {
          id: 3,
          name: 'Sam Wilson',
          subjects: { math: 90, science: 82, english: 87, history: 80, art: 84 },
        },
      ]);
    
      const calculateTotalMarks = (subjects) => {
        return Object.values(subjects).reduce((total, mark) => total + mark, 0);
      };
    
      const calculatePercentage = (totalMarks) => {
        return (totalMarks / (5 * 100)) * 100;
      };
    
      const getGrade = (percentage) => {
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
      };
    
      const deleteStudent = (id) => {
        const updatedStudents = students.filter((student) => student.id !== id);
        setStudents(updatedStudents);
      };
    
      const generateStudentCSV = (student) => {
        const header = [
          'SID',
          'Student Name',
          'Math',
          'Science',
          'English',
          'History',
          'Art',
          'Total Marks',
          'Percentage',
          'Grade'
        ];
        const totalMarks = calculateTotalMarks(student.subjects);
        const percentage = calculatePercentage(totalMarks).toFixed(2);
        const grade = getGrade(parseFloat(percentage));
        const row = [
          student.id,
          student.name,
          student.subjects.math,
          student.subjects.science,
          student.subjects.english,
          student.subjects.history,
          student.subjects.art,
          totalMarks,
          `${percentage}%`,
          grade
        ];
    
        let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n" + row.join(",");
        return encodeURI(csvContent);
      };
    
    return (
        <>
            <Header/>
            <div className='pgMarksheet'>
                <div className="container-fluid">
                    <div className="BgColor">
                        <nav>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/dashboard">Sheets</Link></li>
                                <li className="breadcrumb-item active"><Link to="/marksheet">Marksheet</Link></li>
                            </ul>
                        </nav>
                    <h2 className="text-center page-title">Marksheet</h2>
                    </div>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                        <tr>
                            <th>SID</th>
                            <th>Student Name</th>
                            <th>Math</th>
                            <th>Science</th>
                            <th>English</th>
                            <th>History</th>
                            <th>Art</th>
                            <th>Total Marks</th>
                            <th>Percentage</th>
                            <th>Grade</th>
                            <th>Delete</th>
                            <th>Download</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((student) => {
                            const totalMarks = calculateTotalMarks(student.subjects);
                            const percentage = calculatePercentage(totalMarks).toFixed(2);
                            const grade = getGrade(parseFloat(percentage));
                            return (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.subjects.math}</td>
                                <td>{student.subjects.science}</td>
                                <td>{student.subjects.english}</td>
                                <td>{student.subjects.history}</td>
                                <td>{student.subjects.art}</td>
                                <td>{totalMarks}</td>
                                <td>{percentage}%</td>
                                <td>{grade}</td>
                                <td>
                                <button className="btn btn-danger btn-sm btnaction" onClick={() => deleteStudent(student.id)}>Delete</button>
                                </td>
                                <td>
                                <a href={generateStudentCSV(student)} download={`student_${student.id}_marksheet.csv`} className="btn btn-success btn-sm">Download</a>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </>
    );
}
 
export default Marksheet;