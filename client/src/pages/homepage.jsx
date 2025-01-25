import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/myy.jpg"; // Replace with your image path

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* Background Image */}
      <img
        src={Image}
        alt="Background"
        style={{ width: "100%", height: "100vh", objectFit: "cover" }}
      />

      {/* Text Options */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p
          onClick={() => navigate("/login")}
          style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
        >
          Breakfast
        </p>
        <p
          onClick={() => navigate("/login")}
          style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
        >
          Lunch
        </p>
        <p
          onClick={() => navigate("/login")}
          style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
        >
          Dinner
        </p>
      </div>
    </div>
  );
}

export default HomePage;
