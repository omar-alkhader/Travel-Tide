import React, { useState } from "react";
import RoomDetails from "./RoomDetails";
import { useNavigate, useLocation } from "react-router-dom";

function TripDetailsForm() {
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { cityName } = location.state || { cityName: "Unknown City" };

  const handleRoomChange = (e) => {
    setRooms(e.target.value);
  };

  const handleSearch = () => {
    
    navigate("/p");
  };

  return (
    <form id="tripForm" className="TripDetails-form">
      <h1>Trip Details</h1>
      <h2>Destination: {cityName}</h2>

      <div className="TripDetails-row">
        <div className="TripDetails-group">
          <label htmlFor="arrivalCity">Arrival City</label>
          <input type="text" id="arrivalCity" defaultValue={cityName} />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input type="date" id="departureDate" defaultValue="2025-01-23" />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="nights">Nights</label>
          <input type="number" id="nights" defaultValue="7" />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="returnDate">Return Date</label>
          <input type="date" id="returnDate" defaultValue="2025-01-30" />
        </div>
      </div>

      <div className="TripDetails-row">
        <div className="TripDetails-group">
          <label htmlFor="guide">Guide</label>
          <select id="guide">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="TripDetails-group">
          <label htmlFor="rating">Rating</label>
          <input type="text" id="rating" defaultValue="Anything" />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="mealType">Meal Type</label>
          <input type="text" id="mealType" defaultValue="Inclusive" />
        </div>
      </div>

      <div className="TripDetails-group">
        <label htmlFor="rooms">Rooms</label>
        <input
          type="number"
          id="rooms"
          min="1"
          max="10"
          defaultValue="1"
          onChange={handleRoomChange}
        />
      </div>

      <RoomDetails roomCount={rooms} />

      <button type="button" className="TripDetails-button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}

export default TripDetailsForm;
