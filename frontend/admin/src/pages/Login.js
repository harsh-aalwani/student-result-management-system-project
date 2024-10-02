import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import the hook
import logo from '../assets/images/logo.png';
import '../assets/css/Login.css';
import Footer from "../pages/Footer";

function Login() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); // Initialize the hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/admin/login', {
                username,
                password,
            });
            console.log(response.data);
            enqueueSnackbar('Login successful!', { variant: 'success' }); // Show success alert
            navigate('/dashboard');
            // Redirect or perform additional actions here
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response ? error.response.data.message : 'Server error';
            setError(errorMessage);
            enqueueSnackbar(errorMessage, { variant: 'error' }); // Show error alert
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="pgLogin">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card my-5 shadow-lg rounded">
                                <div className="card-body cardbody-color p-lg-5">
                                    <div className="text-center">
                                        <img src={logo} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="150px" alt="profile" />
                                    </div>
                                    <h2 className="text-dark text-center mb-4">Login</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                placeholder="User Name"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                                                {loading ? 'Loading...' : 'Login'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
