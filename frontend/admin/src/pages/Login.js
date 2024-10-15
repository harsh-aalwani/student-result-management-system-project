import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import logo from '../assets/images/logo-white.png';
import '../assets/css/ReLogin.css'; // New CSS file for Login form
import Footer from "./Footer.js";
import Header from "./SimpleHeader.js";

const Login = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/admin/login', {
                username,
                password,
            }, { withCredentials: true });

            enqueueSnackbar('Login successful!', { variant: 'success' });
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Server error';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <div className="login-form-container" style={{marginTop: '0px'}}> {/* Updated class name */}
                <form className="login-form" onSubmit={handleSubmit}> {/* Updated class name */}
                    <div className="login-logo-container"> {/* Updated class name */}
                        <img src={logo} alt="Logo" className="login-logo" /> {/* Updated class name */}
                    </div>
                    <div className="login-form-group"> {/* Updated class name */}
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-form-group"> {/* Updated class name */}
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {loading && <p className="loading">Loading...</p>}
                    <button type="submit" className="login-button"> {/* Updated class name */}
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
