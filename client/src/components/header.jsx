import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'; // Make sure the path is correct

function Header({ setShowLogin }) {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/profile/1">Profile</Link></li>
          </ul>
        </div>

        
      </nav>
    </header>
  );
}

export default Header;
