import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Dashboard</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="nav-right">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
