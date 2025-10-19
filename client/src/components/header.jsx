import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header({ setShowLogin }) {
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
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    background: "pink",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px"
                  }}
                >
                  Share Your Recipe
                </button>
              </Link>
            </li>
            <li>
              <Link to="/findrecipes">
                <button className="submit-btn">Find Recipes Online</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
