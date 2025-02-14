import React from "react";
import RatingForm from "./components/RatingForm";
import "./App.css";

function App() {
  return (
    <div>
      <header className="nav-bar">
        <div className="logo">Travel Tide</div>
        <nav className="nav-center">
          <a href="#">Packages</a>
          <a href="#">Flight</a>
          <a href="#">Hotel</a>
          <a href="#">My Booking</a>
        </nav>
      </header>
      <main>
        <h1>How did you find your trip with us?</h1>
        <RatingForm />
      </main>
      <footer>
        <p>About Us</p>
        <p>Contact us at: traveltidal@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
