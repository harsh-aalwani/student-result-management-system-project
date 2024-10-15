import React, { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Header from "./Header.js";
import Footer from "./Footer.js";
import "../assets/css/Home.css";
import { Link } from 'react-router-dom';

const QuickCSVFormatter = () => {
    const [file, setFile] = useState(null);
    const [formattedData, setFormattedData] = useState('');
    const { enqueueSnackbar } = useSnackbar(); // Add this line to use the snackbar

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCSVProcessing = () => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const csvContent = e.target.result;
                processCsvContent(csvContent);
                enqueueSnackbar('CSV file processed successfully!', { variant: 'success' }); // Show success message
            };

            reader.readAsText(file);
        } else {
            enqueueSnackbar("Please upload a CSV file first.", { variant: 'error' }); // Show error message
        }
    };

    const processCsvContent = (csvContent) => {
        const lines = csvContent.split('\n').map(line => line.trim());
        let subjectStartIndex = -1;
        let subjectNames = [];
        const csvData = [];
        let headerAdded = false;

        lines.forEach((line, index) => {
            const row = line.split(',').map(item => item.trim());

            // Skip empty lines
            if (row.length === 1 && row[0] === '') return;

            // Find the 'Subjects' start index from the first line
            if (subjectStartIndex === -1 && row.includes('Subjects')) {
                subjectStartIndex = row.findIndex(item => item === 'Subjects') + 1;
                return;
            }

            // Get subject names from the second line until 'totalMarks'
            if (index === 1 && row.includes("totalMarks")) {
                const subjectEndIndex = row.findIndex(item => item === "totalMarks");
                subjectNames = row.slice(subjectStartIndex, subjectEndIndex);
                return;
            }

            // Add student data rows and format
            if (row.length > 0 && row[0]) {
                if (!headerAdded) {
                    csvData.push('serialId,studentName,subjects,totalMarks,percentage,grade,course,semester,year,marksheet_title');
                    headerAdded = true;
                }
                csvData.push(formatCsvRow(subjectNames, row));
            }
        });

        // Set the formatted CSV data for download
        setFormattedData(csvData.join('\n'));
    };

    const formatCsvRow = (subjectNames, row) => {
        const serialId = row[0];
        const studentName = row[1];
        const subjects = subjectNames.map((subject, index) => ({
            name: subject,
            marks: Number(row[index + 2])
        }));
        const subjectsJson = JSON.stringify(subjects).replace(/"/g, '""');
        const totalMarks = Number(row[row.length - 3]);
        const percentage = Number(row[row.length - 2]);
        const grade = row[row.length - 1];

        return `${serialId},${studentName},"${subjectsJson}",${totalMarks},${percentage},${grade}`;
    };

    const handleDownload = () => {
        const blob = new Blob([formattedData], { type: 'text/csv' });
        const link = document.createElement('a');
        const prefix = 'NEW_'; // Change the prefix as needed

        // Create the download file name using the prefix and original file name
        const originalFileName = file ? file.name : 'output.csv';
        const downloadFileName = `${prefix}${originalFileName}`;
        
        link.href = URL.createObjectURL(blob);
        link.download = downloadFileName; // Set the new file name
        link.click();
        enqueueSnackbar('Formatted CSV downloaded successfully!', { variant: 'success' }); // Show success message
    };

    return (
        <SnackbarProvider maxSnack={3}>
            <Header />
            <div className="pgCSVFormatter" style={{marginBottom: '80px'}}>
                <div className="container-fluid" style={{ paddingBottom: '150px' }}>
                    <div className="BgColor">
                        <nav>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item active"><Link to="/qcf-page">Quick CSV Formatter</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="BgColor">
                        <div className="container">
                            <h1 className="page-title">Quick CSV Formatter</h1>
                        </div>
                        <div className="container">
                            <h3 className="heading">Upload CSV File</h3>
                            <hr className="separator" />
                            <form className="container">
                                <div className="row mb-3">
                                    <label htmlFor="csvFile" className="col-sm-2 col-form-label">Upload File (.csv only)</label>
                                    <div className="col-sm-10">
                                        <input type="file" className="form-control" id="csvFile" accept=".csv" onChange={handleFileChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button type="button" className="btn btn-primary" style={{marginTop: '5px'}} onClick={handleCSVProcessing}>Format CSV</button>
                                    </div>
                                </div>
                                {formattedData && (
                                    <div className="row mb-3">
                                        <div className="col-sm-10 offset-sm-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-success" 
                                                onClick={handleDownload} 
                                                style={{
                                                    backgroundColor: '#28a745',
                                                    border: '2px solid #155724',
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    padding: '10px 20px',
                                                    marginTop: '20px',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                    transition: 'transform 0.2s ease-in-out',
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.transform = 'scale(1.02)';
                                                    e.target.style.backgroundColor = '#218838';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                    e.target.style.backgroundColor = '#28a745';
                                                }}
                                            >
                                                Download Formatted CSV
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </SnackbarProvider>
    );
};

export default QuickCSVFormatter;
