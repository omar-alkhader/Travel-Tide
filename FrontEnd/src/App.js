import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import GuidePage from "./pages/GuidePage";

import "./styles/NavBar.css";
import "./styles/ProfilePage.css";
import "./styles/ReviewPage.css";
import "./styles/TripDetailsPage.css";
import "./styles/global.css";
import "./styles/PaymentPage.css"; 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/guides" element={<GuidePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/trip-details" element={<TripDetailsPage />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/layout" element={<Layout />}/>
      </Routes>
    </Router>
  );
}


export default App;
