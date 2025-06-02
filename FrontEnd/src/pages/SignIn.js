import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import toast from "react-hot-toast";
const loginUser = async (data, type) => {
  console.log(type);
  console.log(data);
  const res = await fetch(
    `http://127.0.0.1:6600/api/${type === "client" ? "users" : "guides"}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "login failed");
  }
  return res.json();
};
const SignIn = () => {
  const [userType, setUserType] = useState("client");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ data, type }) => loginUser(data, type),
    onSuccess: (data, { type }) => {
      toast.success("Login successful", {
        style: {
          backgroundColor: "#4BB543",
          color: "#fff",
        },
      });
      dispatch(
        loginSuccess({
          user: data.user,
          role: type === "client" ? "client" : "guide",
        })
      );
      if (userType === "client") {
        navigate(-1, {
          replace: false,
        });
      } else {
        navigate("/request");
      }
    },
    onError: (err) => {
      console.log("hello");
      toast.error(err.message || "login failed", {
        style: {
          backgroundColor: "#F56260",
          color: "#fff",
        },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(userType);
    mutation.mutate({ data, type: userType });
    //simulation
    // login({
    //   name: email.split("@")[0],
    //   email,
    //   userType,
    // });
  };

  return (
    <div className="auth-container">
      <h2>Sign in to your account</h2>

      <div
        className={`toggle-switch ${
          userType === "guide" ? "guide-active" : ""
        }`}
      >
        <button
          className={userType === "client" ? "active" : ""}
          onClick={() => setUserType("client")}
        >
          Client
        </button>
        <button
          className={userType === "guide" ? "active" : ""}
          onClick={() => setUserType("guide")}
        >
          Guide
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
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

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
        </div>

        <div className="signin-options">
          <button type="submit">Sign In</button>
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;
