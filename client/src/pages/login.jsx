import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const API = import.meta.env.VITE_API_URL || "http://localhost:7000";

  const handleLogin = async (values) => {
    dispatch(showLoading());
    try {
      const response = await axios.post(`${API}/api/v1/user/login`, {
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        // Store user data in Redux
        const userData = response.data.user || response.data.data;
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
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <Form layout="vertical" onFinish={handleLogin} className="auth-form">
          <Form.Item 
            label={<span className="form-label">Email</span>} 
            name="email" 
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input
              placeholder="Enter your email"
              className="form-input"
            />
          </Form.Item>
          <Form.Item 
            label={<span className="form-label">Password</span>} 
            name="password" 
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="form-input"
            />
          </Form.Item>
          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Login
          </button>
        </Form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;