import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import TripDetailsForm from "./components/TripDetailsForm";

function App() {
  return (
    <div className="container">
      <Navbar />
      <main className="trip-details">
        <h1>Trip Details</h1>
        <TripDetailsForm />
      </main>
      <footer>
        <p>About Us</p>
        <p>Contact us at: traveltide@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
