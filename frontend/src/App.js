import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProfileForm from "./components/ProfileForm";
import RatingForm from "./components/RatingForm";
import TripDetailsForm from "./components/TripDetailsForm";

import "./styles/NavBar.css";
import "./styles/ProfilePage.css";
import "./styles/ReviewPage.css";
import "./styles/TripDetailsPage.css";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/trip-details" element={<TripDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function ProfilePage() {
  return (
    <div>
      <ProfileForm />
      <footer className="ProfilePage-footer">
      <p>Contact us at: traveltidal@gmail.com</p>
      </footer>
    </div>
  );
}

function ReviewPage() {
  return (
    <div>
      <RatingForm />
      <footer className="review-pag-footer">
      <p>Contact us at: traveltidal@gmail.com</p>
      </footer>
    </div>
  );
}

function TripDetailsPage() {
  return (
    <div>
      <TripDetailsForm />
      <footer className="TripDetails-footer">
        <p>Contact us at: traveltidal@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
