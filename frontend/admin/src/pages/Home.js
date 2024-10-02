import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // assuming you have a Header component
import Footer from './Footer'; // assuming you have a Footer component
import '../assets/css/Home.css'; // importing your CSS

const Home = () => {
    return (
        <>
            <Header />
            <div className="pgHome">
                <div className="container p-5">
                    <h1 className="page-title">Welcome to the Student Result Management System</h1>
                    <p className="text-center">Track, manage, and view student results with ease.</p>
                    <hr className="separator" />

                    <div className="row justify-content-center">
                        {/* Link: Manage Courses */}
                        <div className="col-md-4 col-sm-6 text-center mb-4">
                            <Link to="/course" className="btn btn-primary btn-lg">
                                Manage Courses
                            </Link>
                        </div>
                        {/* Link: View Marksheet */}
                        <div className="col-md-4 col-sm-6 text-center mb-4">
                            <Link to="/sheets-collection" className="btn btn-primary btn-lg">
                                View Marksheets
                            </Link>
                        </div>
                        {/* Link: Add Student */}
                        <div className="col-md-4 col-sm-6 text-center mb-4">
                            <Link to="/add-admin" className="btn btn-primary btn-lg">
                                Add Admin
                            </Link>
                        </div>
                        {/* Link: Profile */}
                        <div className="col-md-4 col-sm-6 text-center mb-4">
                            <Link to="/profile" className="btn btn-primary btn-lg">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
