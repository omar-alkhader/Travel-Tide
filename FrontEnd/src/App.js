import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProfileForm from "./components/ProfileForm";
import RatingForm from "./components/RatingForm";
import TripDetailsForm from "./components/TripDetailsForm";
import AboutPage from "./pages/AboutPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword"; 
import PaymentPage from "./pages/PaymentPage";
import GuidePage from "./pages/GuidePage";
import Home from "./pages/Home";
import PackagePage from "./pages/PackagePage"; 


import "./styles/NavBar.css";
import "./styles/ProfilePage.css";
import "./styles/ReviewPage.css";
import "./styles/TripDetailsPage.css";
import "./styles/global.css";
import "./styles/PaymentPage.css"; 
import "./styles/GuidePage.css"; 
import "./styles/HomePage.css"; 
import "./styles/PackagePage.css"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/package" element={<PackagePage />} />  
   
        <Route index element={<Home />} />
        <Route path="/guides" element={<GuidePage />} />
          <Route path="/home" element={<ProfileForm />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/review" element={<RatingForm />} />
          <Route path="/trip-details" element={<TripDetailsForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

