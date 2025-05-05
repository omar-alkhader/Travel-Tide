import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFlight } from "../redux/flightSearchReducer";
import { FaPlane, FaCalendar, FaUsers } from "react-icons/fa";

function FlightSearchBox() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchFlight);

  const [localSearch, setLocalSearch] = useState(search);
  const [showSearchForm, setShowSearchForm] = useState(false);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearch = () => {
    const { departureCity, arrivalCity, departureDate, returnDate, travelers } =
      localSearch;
    if (!departureCity || !arrivalCity || !departureDate || !returnDate) {
      alert("Please fill in all required fields.");
      return;
    }

    dispatch(setSearchFlight(localSearch)); // Triggers React Query refetch
    setShowSearchForm(false);
  };

  return (
    <div className="flight-search-container">
      <div className="flight-search-info">
        <div className="flight-search-details">
          <div className="flight-info-group">
            <label>Destination</label>
            <span>
              {localSearch.departureCity && localSearch.arrivalCity
                ? `${localSearch.departureCity} - ${localSearch.arrivalCity}`
                : "Not selected"}
            </span>
          </div>

          <div className="flight-info-group">
            <label>Dates</label>
            <span>
              {localSearch.departureDate && localSearch.returnDate
                ? `${new Date(
                    localSearch.departureDate
                  ).toLocaleDateString()} - ${new Date(
                    localSearch.returnDate
                  ).toLocaleDateString()}`
                : "Not selected"}
            </span>
          </div>

          <div className="flight-info-group">
            <label>Travelers</label>
            <span>
              {localSearch.travelers}{" "}
              {parseInt(localSearch.travelers) === 1 ? "Traveler" : "Travelers"}
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

      {showSearchForm && (
        <div className="flight-search-form">
          <div className="flight-form-content">
            <div className="flight-input-group">
              <FaPlane className="flight-icon departure-icon" />
              <input
                type="text"
                className="flight-input"
                value={localSearch.departureCity}
                onChange={(e) =>
                  setLocalSearch({
                    ...localSearch,
                    departureCity: e.target.value,
                  })
                }
                placeholder="Departure City"
              />
            </div>

            <div className="flight-input-group">
              <FaPlane className="flight-icon arrival-icon" />
              <input
                type="text"
                className="flight-input"
                value={localSearch.arrivalCity}
                onChange={(e) =>
                  setLocalSearch({
                    ...localSearch,
                    arrivalCity: e.target.value,
                  })
                }
                placeholder="Arrival City"
              />
            </div>

            <div className="flight-input-group">
              <FaCalendar className="flight-icon" />
              <input
                type="date"
                className="flight-input"
                value={localSearch.departureDate}
                onChange={(e) =>
                  setLocalSearch({
                    ...localSearch,
                    departureDate: e.target.value,
                  })
                }
                placeholder="Departure Date"
              />
            </div>

            <div className="flight-input-group">
              <FaCalendar className="flight-icon" />
              <input
                type="date"
                className="flight-input"
                value={localSearch.returnDate}
                onChange={(e) =>
                  setLocalSearch({ ...localSearch, returnDate: e.target.value })
                }
                placeholder="Return Date"
              />
            </div>

            <div className="flight-input-group">
              <FaUsers className="flight-icon" />
              <input
                type="number"
                className="flight-input"
                min="1"
                value={localSearch.travelers}
                onChange={(e) =>
                  setLocalSearch({ ...localSearch, travelers: e.target.value })
                }
                placeholder="Travelers"
              />
            </div>

            <button className="flight-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightSearchBox;
