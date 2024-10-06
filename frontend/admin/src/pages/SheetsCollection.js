import "../assets/css/Home.css";
import Header from './Header.js';
import addSheetImg from "../assets/images/addSheetImg.svg";
import manageSheet from "../assets/images/paper-sheet.png";
import Footer from './Footer.js';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SheetCollection() {
    const [marksheetTitles, setMarksheetTitles] = useState([]);

    useEffect(() => {
        // Fetch marksheet titles from the server
        const fetchMarksheetTitles = async () => {
            try {
                const response = await fetch('http://localhost:5000/marksheets/titles'); // Update this endpoint as needed
                const data = await response.json();
                setMarksheetTitles(data);
            } catch (error) {
                console.error('Error fetching marksheet titles:', error);
            }
        };

        fetchMarksheetTitles();
    }, []);

    return (
        <>
            <Header />
            <div className="pgHome">
                <div className="container-fluid">
                    <div className="BgColor">
                        <nav>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item active"><Link to="/sheets-collection">Sheets</Link></li>
                            </ul>
                        </nav>
                        <div className="container">
                            <h1 className="page-title">Sheets</h1>
                        </div>
                        <div className="container">
                            <h3 className="heading">
                                <img src={addSheetImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Add Sheet
                            </h3>
                            <hr className="separator" />
                            <Link className="card card-custom bg-white" to="/add-marksheet">
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <span className="plus-sign">+</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="container">
                        <h3 className="heading">
                            <img src={manageSheet} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Manage Sheet
                        </h3>
                        <hr className="separator" />
                        <div className="row">
                            {marksheetTitles.length > 0 ? (
                                marksheetTitles.map((title, index) => (
                                    <div key={index} className="col-6 col-md-3 mb-1"> 
                                        <Link className="card card-custom bg-white" to={`/marksheet/${title}`}>
                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                <span className="sheet-label">{title}</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No marksheets available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SheetCollection;
