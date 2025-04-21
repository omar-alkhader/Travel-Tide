import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
// Import the logo
import logo from "../assets/logo.png"; // Adjust the path/filename as needed
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useMutation } from "@tanstack/react-query";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch(`http://127.0.0.1:6600/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      setDropdownOpen(false);
    } catch (err) {
      console.log("Log out failed ", err);
    }
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="Travel Tide Logo" className="navbar-logo" />
          <span>Travel Tide</span>
        </Link>
      </div>
      <nav className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/package">Packages</Link>
          </li>
          <li>
            <Link to="/" state={{ activeTab: "flights" }}>
              Flight
            </Link>
          </li>
          <li>
            <Link to="/" state={{ activeTab: "hotels" }}>
              Hotel
            </Link>
          </li>
          <li>
            <Link to="/">My Booking</Link>
          </li>
        </ul>
      </nav>
      <div className="signin">
        {user ? (
          <div className="profile-menu" ref={dropdownRef}>
            <div
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle size={37} />
            </div>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/home" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
                <Link to="/" onClick={() => setDropdownOpen(false)}>
                  My Booking
                </Link>
                <Link to="/review" onClick={() => setDropdownOpen(false)}>
                  Review
                </Link>
                <button onClick={handleSignOut}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <button className="sign-btn">
            <Link to="/SignIn">Sign in</Link>
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
