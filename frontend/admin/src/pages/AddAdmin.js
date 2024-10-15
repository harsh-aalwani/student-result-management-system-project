import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import "../assets/css/Home.css";
import { useSnackbar } from 'notistack'; // Import the hook
import Footer from "./Footer.js";

const AddAdmin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); // Initialize the hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            console.log(data);
            enqueueSnackbar('Admin added successfully!', { variant: 'success' }); // Show success alert
            navigate('/dashboard'); // Redirect to the dashboard after successful registration
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
            enqueueSnackbar(error.message || 'An error occurred while adding admin', { variant: 'error' }); // Show error alert
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="pgAdmin">
                <div className="container-fluid" style={{paddingBottom: '150px'}}>
                    <div className="BgColor">
                        <nav>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item active"><Link to="/add-admin">Add Admin</Link></li>
                            </ul>
                        </nav>
                        <div className="container">
                            <h1 className="page-title">Add Admin</h1>
                        </div>
                        <div className="container">
                            <h3 className="heading">Add Admin</h3>
                            <hr className="separator" />
                            <form onSubmit={handleSubmit} className="container">
                                <div className="row mb-3">
                                    <label htmlFor="username" className="col-sm-1 col-form-label">Username</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    </div>
                                    <label htmlFor="email" className="col-sm-1 col-form-label">Email</label>
                                    <div className="col-sm-6">
                                        <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-sm-1 col-form-label">Password</label>
                                    <div className="col-sm-11">
                                        <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button type="submit" className="btn btn-primary btn-add" disabled={loading}>
                                            {loading ? 'Loading...' : 'Add Admin'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AddAdmin;
