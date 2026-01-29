import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API = import.meta.env.VITE_API_URL || "http://localhost:7000";

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${API}/api/v1/user/register`, values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <Form layout="vertical" onFinish={onFinishHandler} className="auth-form">
          <Form.Item 
            label={<span className="form-label">Name</span>} 
            name="name" 
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input 
              placeholder="Enter your name" 
              className="form-input"
            />
          </Form.Item>
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
            Register
          </button>
        </Form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;