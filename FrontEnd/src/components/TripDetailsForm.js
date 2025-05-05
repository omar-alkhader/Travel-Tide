import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSearchPackage } from "../redux/packageSearch";
import { setCity, setGuide, setTraveller } from "../redux/bookingSlice";

function TripDetailsForm() {
  const [rooms, setRooms] = useState(1);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [nights, setNights] = useState(0);
  const [arrivalCity, setArrivalCity] = useState("");
  // const [departureCity, setDepartureCity] = useState("");
  const [hasGuide, setHasGuide] = useState(true);
  const [travellers, setTravellers] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cityName } = location.state || { cityName: "Unknown City" };
  // const handleRoomChange = (e) => {
  //   setRooms(e.target.value);
  // };

  const handleDateChange = (e, type) => {
    const value = e.target.value;
    if (type === "arrival") {
      setArrivalDate(value);
    } else {
      setDepartureDate(value);
    }

    const startDate =
      type === "arrival" ? new Date(value) : new Date(arrivalDate);
    const endDate =
      type === "departure" ? new Date(value) : new Date(departureDate);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const diffTime = endDate - startDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
    }
  };

  const handleSearch = () => {
    const test = {
      retrunDate: departureDate,
      arrivalCity,
      arrivalDate,
      nights,
      departureCity: cityName,
      hasGuide,
      travellers,
    };
    console.log(test);
    dispatch(
      setSearchPackage({
        departureCity: cityName,
        arrivalCity,
        returnDate: departureDate, // correct now
        departureDate: arrivalDate, // correct now
        nights,
        hasGuide,
        travellers,
        city: cityName,
      })
    );
    dispatch(setCity(cityName));
    navigate("/packages");
  };
  console.log(hasGuide);
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
          <label htmlFor="departureCity">Departure City</label>
          <input
            type="text"
            id="departureCity"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
          />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            type="date"
            id="arrivalDate"
            value={arrivalDate}
            onChange={(e) => handleDateChange(e, "arrival")}
          />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => handleDateChange(e, "departure")}
          />
        </div>
        <div className="TripDetails-group">
          <label htmlFor="nights">Nights</label>
          <input type="number" id="nights" value={nights} readOnly />
        </div>
      </div>

      <div className="TripDetails-row">
        <div className="TripDetails-group">
          <label htmlFor="guide">Guide</label>
          <select
            id="guide"
            onChange={(e) => setHasGuide(e.target.value === "true")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="TripDetails-group">
          <label htmlFor="traveller">Traveller</label>
          <input
            type="number"
            id="traveller"
            value={travellers}
            onChange={(e) => setTravellers(+e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        className="TripDetails-button"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
}

export default TripDetailsForm;
