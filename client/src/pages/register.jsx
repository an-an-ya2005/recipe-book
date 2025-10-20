import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import HomePage from "./Homepage";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:7000/api/v1/user/register", values);
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
    <>
      <HomePage />
      <div
        className="form-container"
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          width: "380px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#ff6699", marginBottom: "20px" }}>Register</h2>
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <Form.Item 
            label={<span style={{ color: "white", fontWeight: "bold" }}>Name</span>} 
            name="name" 
            rules={[{ required: true }]}
          >
            <Input 
              placeholder="Enter your name" 
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
            Register
          </button>
          <p style={{ marginTop: "20px", color: "white", fontSize: "14px" }}>
            Already a user?{" "}
            <Link 
              to="/login" 
              style={{ 
                color: "#ff3385", 
                textDecoration: "none",
                fontWeight: "bold",
                transition: "color 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.color = "#ff6699"}
              onMouseOut={(e) => e.target.style.color = "#ff3385"}
            >
              Login here
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Register;
