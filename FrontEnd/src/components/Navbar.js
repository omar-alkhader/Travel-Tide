import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png"; 
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import "../styles/NavBar.css";

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
            <Link to={user == null ? "/SignIn" : "/booking"}>My Booking</Link>
          </li>
        </ul>
      </nav>
      <div className="signin">
        {user ? (
          <div className="user-controls">
            <div className="reward-points-container">
              <div className="reward-points">
                Reward Point({user.rewardPoints || 0})
                <div className="reward-tooltip">
                  Earn points on completed trips. Use points for discounts on future bookings!
                </div>
              </div>
            </div>
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
                  <Link to="/booking" onClick={() => setDropdownOpen(false)}>
                    Booking
                  </Link>
                  <Link to="/rewards" onClick={() => setDropdownOpen(false)}>
                    My Rewards
                  </Link>
                  <button onClick={handleSignOut}>Sign out</button>
                </div>
              )}
            </div>
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