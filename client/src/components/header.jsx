import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/userSlice.js';
import '../styles/header.css';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <header>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/profile">Profile</Link></li>
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
          {isAuthenticated && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
