import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "../styles/auth.css"; 

const SignUp = () => {
return (
    <div className="auth-container">
    <h2>Sign up to your account</h2>

    <form className="auth-form">
        <div className="input-container">
        <FaUser className="icon" />
        <input type="text" placeholder="Name" required />
        </div>

        <div className="input-container">
        <FaEnvelope className="icon" />
        <input type="email" placeholder="Mail" required />
        </div>

        <div className="input-container">
        <FaLock className="icon" />
        <input type="password" placeholder="Password" required />
        </div>

        <div className="input-container">
        <FaLock className="icon" />
        <input type="password" placeholder="Confirm Password" required />
        </div>

        <button type="submit">Sign Up</button>
    </form>

    <p>Already have an account? <Link to="/signin">Sign in</Link></p>
    </div>
);
};

export default SignUp;
