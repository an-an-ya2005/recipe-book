import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/myy.jpg";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#ff6699", // Fallback background color
      }}
    >
      <img
        src={Image}
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(70%)",
        }}
        onError={(e) => {
          console.log("Image failed to load:", e.target.src);
          e.target.style.display = "none";
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "10px" }}>
          Welcome to <span style={{ color: "#ff99cc" }}>Food World</span>
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "30px" }}>
      Discover, cook, and enjoy your favorite recipes 🍳
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 30px",
            border: "none",
            borderRadius: "30px",
            backgroundColor: "#ff6699",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ff3385")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6699")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
