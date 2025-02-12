import React, { useState } from "react";
import RoomDetails from "./RoomDetails";

function TripDetailsForm() {
  const [rooms, setRooms] = useState(0);

  const handleRoomChange = (e) => {
    setRooms(e.target.value);
  };

  const handleSearch = () => {
    alert("Search button clicked! Implement your search logic here.");
  };

  return (
    <form id="tripForm">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="arrivalCity">Arrival City</label>
          <input type="text" id="arrivalCity" defaultValue="Varna, Bulgaria" />
        </div>
        <div className="form-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input type="date" id="departureDate" defaultValue="2025-01-23" />
        </div>
        <div className="form-group">
          <label htmlFor="nights">Nights</label>
          <input type="number" id="nights" defaultValue="7" />
        </div>
        <div className="form-group">
          <label htmlFor="returnDate">Return Date</label>
          <input type="date" id="returnDate" defaultValue="2025-01-30" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="guide">Guide</label>
          <select id="guide">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input type="text" id="rating" defaultValue="Anything" />
        </div>
        <div className="form-group">
          <label htmlFor="mealType">Meal Type</label>
          <input type="text" id="mealType" defaultValue="Inclusive" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="rooms">Rooms</label>
        <input
          type="number"
          id="rooms"
          min="1"
          max="10"
          placeholder="Enter number of rooms"
          onChange={handleRoomChange}
        />
      </div>

      <RoomDetails roomCount={rooms} />

      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}

export default TripDetailsForm;
