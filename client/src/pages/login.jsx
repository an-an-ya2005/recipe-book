import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Homepage from "./Homepage"; // Import Homepage if it's a valid component

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

      console.log(response);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert("Logged in successfully!");
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
      <Homepage/> {/* Ensure that Homepage is correctly imported */}
      <div className="form-container">
        <Form layout="vertical" onFinish={handleLogin} className="login-form">
          <h3 className="text-center">Login</h3>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input type="password" />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <p className="text-center">
            Not a user? <Link to="/register">Register here</Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default Login;
