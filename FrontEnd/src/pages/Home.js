import React from "react";
import HeroSection from "../components/HeroSection";
import PlacesSection from "../components/PlacesSection";

import "../styles/NavBar.css";
import "../styles/global.css";
import "../styles/HomePage.css";

function Home() {
  return (
    <div className="container-fluid p-0 m-0">
      <HeroSection />
      <div className="container">
        <PlacesSection />
      </div>
    </div>
  );
}

export default Home;