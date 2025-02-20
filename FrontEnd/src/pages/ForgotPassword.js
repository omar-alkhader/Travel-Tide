import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; 
import "../styles/auth.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Password reset link sent to ${email}`);
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password?</h2>
            <p>Enter your email and we'll send you a reset link.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>

            <p>
                Remembered your password? <Link to="/signin">Sign in</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
