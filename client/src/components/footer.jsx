import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ flex: "1 1 300px" }}>
          <div className="footer-brand">RecipeBook</div>
          <p className="footer-desc">
            Discover, share, and enjoy delicious recipes from around the world. Join our community of food lovers today.
          </p>
        </div>
        
        <div className="footer-links-container">
          <div className="footer-section">
            <h4>Explore</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/recipes">Browse Recipes</Link>
              <Link to="/findrecipes">Find Ingredients</Link>
              <Link to="/suggestions">AI Suggestions</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4>Account</h4>
            <div className="footer-links">
              <Link to="/profile">My Profile</Link>
              <Link to="/addrecipe">Share Recipe</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          &copy; {new Date().getFullYear()} RecipeBook. Made with ❤️ for foodies.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
