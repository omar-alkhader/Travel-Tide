import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css"; 

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Clear any previous errors
    setError("");
    
    // In a real app, you would send this data to your backend API
    // For demo purposes, we'll simulate a successful registration and login
    login({
      name,
      email,
      userType: "client", // Default to client for signup
      // other user info you might store
    });
    
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Sign up to your account</h2>
      
      {error && <p className="error-message">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <FaUser className="icon" />
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>

        <div className="input-container">
          <FaEnvelope className="icon" />
          <input 
            type="email" 
            placeholder="Mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-container">
          <FaLock className="icon" />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div className="input-container">
          <FaLock className="icon" />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <Link to="/signin">Sign in</Link></p>
    </div>
  );
};

export default SignUp;