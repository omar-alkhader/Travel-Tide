import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSearchPackage } from "../redux/packageSearch";
import { setCity, setGuide, setTraveller } from "../redux/bookingSlice";
import toast from "react-hot-toast";
function validateFlightSearch({
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  travelers,
}) {
  console.log("hello");
  const now = new Date();
  const depDate = new Date(departureDate);
  const retDate = new Date(returnDate);
  const oneDayInMs = 24 * 60 * 60 * 1000;

  if (
    !departureCity ||
    !arrivalCity ||
    !departureDate ||
    !returnDate ||
    !travelers
  ) {
    toast.error("All fields are required.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }
  console.log(returnDate, departureDate);
  if (departureCity === arrivalCity) {
    toast.error("Departure and arrival cities must be different.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  if (depDate <= now) {
    toast.error("Departure date must be in the future.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  if (retDate - depDate < oneDayInMs) {
    toast.error("Return date must be at least one day after departure.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  return true;
}
function TripDetailsForm() {
  const [rooms, setRooms] = useState(1);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [nights, setNights] = useState(0);
  const [arrivalCity, setArrivalCity] = useState("");
  const [hasGuide, setHasGuide] = useState(true);
  const [travellers, setTravellers] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cityName } = location.state || { cityName: "Unknown City" };
  const { city } = useSelector((state) => state.booking);
  const [country, setCountry] = useState(city);
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
      departureCity: country,
      hasGuide,
      travellers,
    };
    const isValid = validateFlightSearch({
      travelers: travellers,
      departureCity: arrivalCity,
      arrivalCity: country,
      returnDate: departureDate,
      departureDate: arrivalDate,
    });
    if (!isValid) return;
    console.log();
    console.log(test);
    dispatch(
      setSearchPackage({
        departureCity: country,
        arrivalCity,
        returnDate: departureDate, // correct now
        departureDate: arrivalDate, // correct now
        nights,
        hasGuide,
        travellers,
        city,
      })
    );
    dispatch(setCity(country));
    navigate("/packages");
  };
  console.log(hasGuide);
  return (
    <form
      id="tripForm"
      className="TripDetails-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1>Trip Details</h1>
      <h2>Destination: {city}</h2>

      <div className="TripDetails-row">
        <div className="TripDetails-group">
          <label htmlFor="arrivalCity">Arrival City</label>
          <input
            type="text"
            id="arrivalCity"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
          />
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
