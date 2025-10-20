import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import HomePage from "./Homepage";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    dispatch(showLoading());
    try {
      const response = await axios.post("http://localhost:7000/api/v1/user/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        // Store user data in Redux
        const userData = response.data.user || response.data.data;
        console.log('Login successful, user data:', userData);
        dispatch(setUser(userData));
        alert("Welcome back!");
        navigate("/profile/me");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <HomePage />
      <div
        className="form-container"
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          width: "350px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#ff6699", marginBottom: "20px" }}>Login</h2>
        <Form layout="vertical" onFinish={handleLogin} className="login-form">
          <Form.Item 
            label={<span style={{ color: "white", fontWeight: "bold" }}>Email</span>} 
            name="email" 
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter your email"
              style={{ 
                borderRadius: "10px", 
                padding: "12px 15px",
                backgroundColor: "white",
                color: "black",
                border: "2px solid #ff6699",
                fontSize: "16px"
              }}
            />
          </Form.Item>
          <Form.Item 
            label={<span style={{ color: "white", fontWeight: "bold" }}>Password</span>} 
            name="password" 
            rules={[{ required: true }]}
          >
            <Input.Password
              placeholder="Enter your password"
              style={{ 
                borderRadius: "10px", 
                padding: "12px 15px",
                backgroundColor: "white",
                color: "black",
                border: "2px solid #ff6699",
                fontSize: "16px"
              }}
            />
          </Form.Item>
          <button
            className="btn btn-primary"
            type="submit"
            style={{
              backgroundColor: "#ff6699",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "12px 30px",
              fontSize: "16px",
              marginTop: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: "bold",
              width: "100%",
              boxShadow: "0 4px 15px rgba(255, 102, 153, 0.3)"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#ff3385";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 102, 153, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ff6699";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 102, 153, 0.3)";
            }}
          >
            Login
          </button>
          <p style={{ marginTop: "15px", color: "white", fontSize: "14px" }}>
            Not a user?{" "}
            <Link to="/register" style={{ color: "#ff3385" }}>
              Register here
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default Login;
