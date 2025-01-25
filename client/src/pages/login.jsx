import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:7000/api/v1/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        alert("Logged in successfully!");
        // Example: Save token to localStorage and navigate to dashboard
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Change this route as per your app
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
        onSubmit={handleLogin}
      >
        <h3>Login</h3>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ marginTop: "10px" }}>
          Not a user? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
