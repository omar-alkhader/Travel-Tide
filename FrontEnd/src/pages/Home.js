import React from "react";
import HomePage from "../components/HomePage";

import "../styles/global.css";
import "../styles/HomePage.css";

function Home() {
  return (
    <div className="container-fluid p-0 m-0">
      <HomePage />
      <div className="container">
      </div>
    </div>
  );
}

export default Home;