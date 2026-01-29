import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/userSlice.js';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/header.css';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const API = import.meta.env.VITE_API_URL || "http://localhost:7000";
  const BRAND_NAMES = ["FlavorForge", "TasteTrail", "SpiceCraft", "SavorySphere", "CookCanvas", "YumLedger"];
  const [brandIndex, setBrandIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandIndex((i) => (i + 1) % BRAND_NAMES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="brand" onClick={() => navigate("/")}>
          <AnimatePresence mode="wait">
            <motion.span
              key={BRAND_NAMES[brandIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {BRAND_NAMES[brandIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li>
            <Link to="/addrecipe">
              <button className="btn btn-primary nav-cta-primary">Publish Recipe ✨</button>
            </Link>
          </li>
          <li>
            <Link to="/findrecipes">
              <button className="btn btn-secondary nav-cta-secondary">Discover Dishes 🔍</button>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="user-area">
              <div 
                className="user-avatar" 
                onClick={() => setMenuOpen((prev) => !prev)}
                title={user?.name || 'Account'}
              >
                {user?.avatar ? (
                  <img src={`${API}${user.avatar}`} alt="User Avatar" />
                ) : (
                  <span>{(user?.name || 'U').charAt(0).toUpperCase()}</span>
                )}
              </div>
              {menuOpen && (
                <div className="user-menu" onMouseLeave={() => setMenuOpen(false)}>
                  <div className="user-info">
                    <div className="user-name">{user?.name}</div>
                    <div className="user-email">{user?.email}</div>
                  </div>
                  <button 
                    className="btn btn-secondary logout-btn" 
                    onClick={handleLogout}
                    style={{ borderColor: '#ef4444', color: '#ef4444', width: '100%' }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
