import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LocalHero from "../assets/myy.jpg";
import "../styles/home.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-subtitle">The Art of Cooking</span>
            <h1 className="hero-title">
              Taste the <br/>
              <span>Extraordinary.</span>
            </h1>
            <p className="hero-description">
              Discover recipes that inspire. From quick weeknight dinners to gourmet masterpieces, elevate your kitchen game today.
            </p>
            
            <div className="hero-buttons">
              <button 
                onClick={() => navigate("/recipes")}
                className="btn btn-primary"
              >
                Start Cooking
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="btn btn-secondary"
              >
                Join Community
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={LocalHero} alt="Delicious Food" className="hero-image" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🍳</span>
            <h3 className="feature-title">Diverse Recipes</h3>
            <p className="feature-text">Explore thousands of recipes from cuisines around the world.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🥗</span>
            <h3 className="feature-title">Healthy Options</h3>
            <p className="feature-text">Find nutritious meals that fit your dietary needs and goals.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👨‍🍳</span>
            <h3 className="feature-title">Community</h3>
            <p className="feature-text">Share your own creations and connect with fellow food lovers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;