import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { useSnackbar } from 'notistack'; // Import the hook
import logo from './../assets/images/logo-white.png';
import '../assets/css/Header.css';

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Initialize the hook
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/admin/logout', {}, { withCredentials: true });
      enqueueSnackbar('Logged out successfully!', { variant: 'success' });
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      enqueueSnackbar('Error logging out. Please try again.', { variant: 'error' });
    }
  };

  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
            <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top me-2" />
            Student Result Management System
          </Link>
        </div>
      </nav>

    </div>
  );
}

export default Header;
