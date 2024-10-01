import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/images/logo-white.png';
import '../assets/css/Header.css';

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top me-2" />
            Student Result Management System
          </a>
          <button className="btn btn-outline-light" onClick={toggleSidebar}>
            Menu
          </button>
          <div className="profile-dropdown d-flex ms-auto align-items-center">
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown">
                <i className="bi bi-person"></i> Profile
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">My Profile</a></li>
                <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/course">Course</Link></li>
        <li><Link to="/adduser">Add User</Link></li>
        <li><Link to="/guide">Guide</Link></li>
      </ul>
    </div>
    </div>
  );
}

export default Header;
