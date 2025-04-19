import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaCalendar, FaUsers } from "react-icons/fa";

function FlightSearchBox({
  initialDepartureCity = "",
  initialArrivalCity = "",
  initialDepartureDate = "",
  initialReturnDate = "",
  initialTravelers = "1",
}) {
  const [departureCity, setDepartureCity] = useState(initialDepartureCity);
  const [arrivalCity, setArrivalCity] = useState(initialArrivalCity);
  const [departureDate, setDepartureDate] = useState(initialDepartureDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [travelers, setTravelers] = useState(initialTravelers);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const navigate = useNavigate();

  // Update state when props change
  useEffect(() => {
    setDepartureCity(initialDepartureCity);
    setArrivalCity(initialArrivalCity);
    setDepartureDate(initialDepartureDate);
    setReturnDate(initialReturnDate);
    setTravelers(initialTravelers);
  }, [
    initialDepartureCity,
    initialArrivalCity,
    initialDepartureDate,
    initialReturnDate,
    initialTravelers,
  ]);

  const handleSearch = () => {
    if (!departureCity || !arrivalCity || !departureDate || !returnDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Navigate with updated search parameters
    navigate(
      `/flights?departureCity=${encodeURIComponent(
        departureCity
      )}&arrivalCity=${encodeURIComponent(
        arrivalCity
      )}&departureDate=${encodeURIComponent(
        departureDate
      )}&returnDate=${encodeURIComponent(
        returnDate
      )}&travelers=${encodeURIComponent(travelers)}`,
      { replace: true }
    );

    // Close the search form after searching
    setShowSearchForm(false);
  };

  return (
    <div className="flight-search-container">
      {/* Main search info rectangle */}
      <div className="flight-search-info">
        <div className="flight-search-details">
          <div className="flight-info-group">
            <label>Destination</label>
            <span>
              {departureCity && arrivalCity
                ? `${departureCity} - ${arrivalCity}`
                : "Not selected"}
            </span>
          </div>

          <div className="flight-info-group">
            <label>Dates</label>
            <span>
              {departureDate && returnDate
                ? `${new Date(departureDate).toLocaleDateString()} - ${new Date(
                    returnDate
                  ).toLocaleDateString()}`
                : "Not selected"}
            </span>
          </div>

          <div className="flight-info-group">
            <label>Travelers</label>
            <span>
              {travelers} {parseInt(travelers) === 1 ? "Traveler" : "Travelers"}
            </span>
          </div>
        </div>

        <button
          className="flight-modify-btn"
          onClick={() => setShowSearchForm(!showSearchForm)}
        >
          Modify Search
        </button>
      </div>

      {/* Expandable search form */}
      {showSearchForm && (
        <div className="flight-search-form">
          <div className="flight-form-content">
            <div className="flight-input-group">
              <FaPlane className="flight-icon departure-icon" />
              <input
                type="text"
                className="flight-input"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                placeholder="Departure City"
              />
            </div>

            <div className="flight-input-group">
              <FaPlane className="flight-icon arrival-icon" />
              <input
                type="text"
                className="flight-input"
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                placeholder="Arrival City"
              />
            </div>

            <div className="flight-input-group">
              <FaCalendar className="flight-icon" />
              <input
                type="date"
                className="flight-input"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                placeholder="Departure Date"
              />
            </div>

            <div className="flight-input-group">
              <FaCalendar className="flight-icon" />
              <input
                type="date"
                className="flight-input"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                placeholder="Return Date"
              />
            </div>

            <div className="flight-input-group">
              <FaUsers className="flight-icon" />
              <input
                type="number"
                className="flight-input"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                placeholder="Travelers"
              />
            </div>

            <button className="flight-search-button" onClick={handleSearch}>
              Searchss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightSearchBox;
