import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/auth.css"; 

const SignIn = () => {
const [userType, setUserType] = useState("client");
const [rememberMe, setRememberMe] = useState(false);

return (
    <div className="auth-container">
    <h2>Sign in to your account</h2>

    <div className={`toggle-switch ${userType === "guide" ? "guide-active" : ""}`}>
        <button className={userType === "client" ? "active" : ""} onClick={() => setUserType("client")}>Client</button>
        <button className={userType === "guide" ? "active" : ""} onClick={() => setUserType("guide")}>Guide</button>
    </div>

    <form className="auth-form">
        <div className="input-container">
        <FaEnvelope className="icon" />
        <input type="email" placeholder="Mail" required />
        </div>

        <div className="input-container">
        <FaLock className="icon" />
        <input type="password" placeholder="Password" required />
        </div>

        <div className="options">
        <label>
        <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
        Remember Me
        </label>
        </div>

        <div className="signin-options">
        <button type="submit">Sign In</button>
        <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
</div>

    </form>

    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
);
};

export default SignIn;
