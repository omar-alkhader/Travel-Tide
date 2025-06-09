import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
async function signUp(data) {
  console.log(data);
  try {
    const res = await fetch(`http://127.0.0.1:6600/api/users/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
    return await res.json();
  } catch (err) {
    alert("password or email is wrong");
    throw err;
  }
}
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    
    mutation.mutate({ name, email, password, confirmPassword });

    //simulation

    navigate("/");
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

      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
