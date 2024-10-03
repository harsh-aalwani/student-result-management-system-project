import logo from './logo-white.png'; // Ensure this path is correct
import "./ResultMarksheet.css";

const ResultMarksheet = () => {
    return (
        <div className="container-fluid px-0"> {/* Full-width container, no padding */}
            <div className="marksheet">
                <div className="header text-center">
                    <img 
                        src={logo} 
                        className="d-inline-block align-text-top me-2" 
                        alt="College Logo" 
                    />
                    <h1>College Name</h1>
                    <h2>Result Marksheet</h2>
                </div>

                <h2 className="mt-4">Student Information</h2>
                <div className="info-row">
                    <strong>Serial ID:</strong>
                    <span>123456</span>
                </div>
                <div className="info-row">
                    <strong>Name:</strong>
                    <span>John Doe</span>
                </div>
                <div className="info-row">
                    <strong>Course:</strong>
                    <span>Computer Science</span>
                </div>
                <div className="info-row">
                    <strong>Year:</strong>
                    <span>2024</span>
                </div>
                <div className="info-row">
                    <strong>Semester:</strong>
                    <span>1</span>
                </div>

                <table className="table table-bordered mt-4">
                    <thead className="thead-light">
                        <tr>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                            <th>Total Marks</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mathematics</td>
                            <td>85</td>
                            <td>100</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <td>Physics</td>
                            <td>78</td>
                            <td>100</td>
                            <td>B</td>
                        </tr>
                        <tr>
                            <td>Chemistry</td>
                            <td>90</td>
                            <td>100</td>
                            <td>A+</td>
                        </tr>
                        <tr>
                            <td>Computer Science</td>
                            <td>95</td>
                            <td>100</td>
                            <td>A+</td>
                        </tr>
                    </tbody>
                </table>

                <div className="total-section text-right">
                    <p>Total Marks: 348</p>
                    <p>Percentage: 87%</p>
                    <p>Grade: A</p>
                </div>

                {/* Signature Area */}
                <div className="signature-area">
                    <p>_________________________</p>
                    <p>Signature</p>
                </div>
            </div>
        </div>
    );
}

export default ResultMarksheet;
