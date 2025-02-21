import React from "react";
import HeroSection from "../components/HeroSection";
import PlacesSection from "../components/PlacesSection";

import "../styles/NavBar.css";
import "../styles/global.css";
import "../styles/HomePage.css";


function Home() {
  return (
    <div>
      <HeroSection />
      <PlacesSection />
    </div>
  );
}

export default Home;
