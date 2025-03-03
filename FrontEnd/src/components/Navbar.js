import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
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

  const handleSignOut = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Travel Tide</Link>
      </div>
      <nav className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/package">Packages</Link>
          </li>
          <li>
            <Link to="/" state={{ activeTab: "flights" }}>Flight</Link>
          </li>
          <li>
            <Link to="/" state={{ activeTab: "hotels" }}>Hotel</Link>
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
                <Link to="/home" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <Link to="/" onClick={() => setDropdownOpen(false)}>My Booking</Link>
                <Link to="/review" onClick={() => setDropdownOpen(false)}>Review</Link>
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