import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

function Header({ setShowLogin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear user session
    alert("Logged out successfully!");
    navigate("/login"); // redirect to login page
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/profile/1">Profile</Link></li>
            <li>
              <Link to="/addrecipe">
                <button className="pink-btn">Share Your Recipe</button>
              </Link>
            </li>
            <li>
              <Link to="/findrecipes">
                <button className="submit-btn">Find Recipes Online</button>
              </Link>
            </li>
            {localStorage.getItem("token") && (
              <li>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
