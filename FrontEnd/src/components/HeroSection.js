import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/dead-sea.jpg";

function HeroSection() {
  const [activeTab, setActiveTab] = useState("flights"); 
  const navigate = useNavigate();

  // Hotel State
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [guestsPerRoom, setGuestsPerRoom] = useState([2]);
  const [nationality, setNationality] = useState("Jordanian");

  // Handle Check-in Change
  const handleCheckInChange = (e) => {
    setCheckIn(e.target.value);
    updateCheckOut(e.target.value, nights);
  };

  // Handle Nights Change
  const handleNightsChange = (e) => {
    const newNights = parseInt(e.target.value) || 1;
    setNights(newNights);
    updateCheckOut(checkIn, newNights);
  };

  // Update Check-out Date
  const updateCheckOut = (startDate, numNights) => {
    if (!startDate) return;
    const checkInDate = new Date(startDate);
    checkInDate.setDate(checkInDate.getDate() + numNights);
    setCheckOut(checkInDate.toISOString().split("T")[0]);
  };

  // Handle Room Count Change
  const handleRoomChange = (change) => {
    const newRooms = Math.max(1, rooms + change);
    setRooms(newRooms);
    setGuestsPerRoom((prev) => {
      const updatedGuests = [...prev];
      if (change > 0) {
        updatedGuests.push(2);
      } else {
        updatedGuests.pop();
      }
      return updatedGuests;
    });
  };

  // Handle Guests per Room Change
  const handleGuestChange = (index, value) => {
    const updatedGuests = [...guestsPerRoom];
    updatedGuests[index] = value;
    setGuestsPerRoom(updatedGuests);
  };

  return (
    <div className="full-width-section">
    <div className="HomePage-hero-section w-100" style={{ backgroundImage: `url(${background})` }}>
      <div className="text-center h-100 d-flex flex-column justify-content-">
        <ul className="HomePage-nav-tabs nav justify-content-center mb-3">
          <li className="nav-item">
            <button className={`HomePage-nav-link nav-link ${activeTab === "packages" ? "HomePage-active" : ""}`} 
              onClick={() => { setActiveTab("packages"); navigate("/package"); }}>
              Packages
            </button>
          </li>
          <li className="nav-item">
            <button className={`HomePage-nav-link nav-link ${activeTab === "flights" ? "HomePage-active" : ""}`} 
              onClick={() => setActiveTab("flights")}>
              Flights
            </button>
          </li>
          <li className="nav-item">
            <button className={`HomePage-nav-link nav-link ${activeTab === "hotels" ? "HomePage-active" : ""}`} 
              onClick={() => setActiveTab("hotels")}>
              Hotels
            </button>
          </li>
          <li className="nav-item">
            <button className={`HomePage-nav-link nav-link ${activeTab === "guide" ? "HomePage-active" : ""}`} 
              onClick={() => setActiveTab("guide")}>
              Guide
            </button>
          </li>
        </ul>
        <div className="HomePage-booking-options w-100">
          {/* Tab Content */}
          <div className="tab-content">
            {/* Hotel Booking Form  */}
            {activeTab === "hotels" && (
              <form className="HomePage-form-inline form-inline justify-content-center">
                <input 
                  type="text" 
                  className="HomePage-form-control form-control m-2" 
                  placeholder="Enter Destination" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)} 
                />

                <input 
                  type="date" 
                  className="HomePage-form-control form-control m-2" 
                  value={checkIn} 
                  onChange={handleCheckInChange} 
                />

                <input 
                  type="date" 
                  className="HomePage-form-control form-control m-2" 
                  value={checkOut} 
                  readOnly 
                />

                <input 
                  type="number" 
                  className="HomePage-form-control form-control m-2" 
                  placeholder="Nights" 
                  value={nights} 
                  onChange={handleNightsChange} 
                />

                

                {/* Nationality */}
                <select 
                  className="HomePage-form-control form-control m-2" 
                  value={nationality} 
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option>Jordanian</option>
                  <option>Foreign</option>
                </select>

                <button type="submit" className="HomePage-btn HomePage-btn-custom m-2">Search</button>
              </form>
            )}

            {/* Flight Booking Form */}
            {activeTab === "flights" && (
              <form className="HomePage-form-inline form-inline justify-content-center">
                <input type="text" className="HomePage-form-control form-control m-2" placeholder="Departure City" />
                <input type="text" className="HomePage-form-control form-control m-2" placeholder="Arrival City" />
                <input type="date" className="HomePage-form-control form-control m-2" />
                <input type="date" className="HomePage-form-control form-control m-2" />
                <input type="number" className="HomePage-form-control form-control m-2" placeholder="Travellers" />
                <button type="submit" className="HomePage-btn HomePage-btn-custom m-2">Search</button>
              </form>
            )}

            {/* Guide Form */}
            {activeTab === "guide" && (
              <form className="HomePage-form-inline form-inline justify-content-center">
                <input type="text" className="HomePage-form-control form-control m-2" placeholder="Place" />
                <input type="date" className="HomePage-form-control form-control m-2" />
                <button type="submit" className="HomePage-btn HomePage-btn-custom m-2">Search</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default HeroSection;