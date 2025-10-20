import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
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
        alert("Welcome back!");
        navigate("/");
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
          background: "rgba(255, 255, 255, 0.95)",
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
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input
              placeholder="Enter your email"
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password
              placeholder="Enter your password"
              style={{ borderRadius: "10px", padding: "10px" }}
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
              padding: "10px 25px",
              fontSize: "16px",
              marginTop: "10px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>
          <p style={{ marginTop: "15px" }}>
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
