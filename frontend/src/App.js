import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProfileForm from "./components/ProfileForm";
import RatingForm from "./components/RatingForm";
import TripDetailsForm from "./components/TripDetailsForm";
import AboutPage from "./page/AboutPage";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";

import "./styles/NavBar.css";
import "./styles/ProfilePage.css";
import "./styles/ReviewPage.css";
import "./styles/TripDetailsPage.css";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProfileForm />} />
          <Route path="/review" element={<RatingForm />} />
          <Route path="/trip-details" element={<TripDetailsForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route >
      </Routes>
    </Router>
  );
}

export default App;
