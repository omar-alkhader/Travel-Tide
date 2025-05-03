import React, { useState, useEffect } from "react";
import { FaSearch, FaCalendar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchGuide } from "../redux/guideSearchReducer";

function SearchBox({ onSearch, initialPlace = "", initialDate = "" }) {
  const [place, setPlace] = useState(initialPlace);
  const [date, setDate] = useState(initialDate);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const searchGuide = useSelector((state) => state.searchGuide);
  const dispatch = useDispatch();
  // Update state when props change
  const handleSearch = () => {
    dispatch(setSearchGuide({ date, city: place }));
    // Close the search form after searching
    setShowSearchForm(false);
  };

  return (
    <div className="guide-search-container">
      {/* Main search info rectangle */}
      <div className="guide-search-info">
        <div className="guide-search-details">
          <div className="guide-info-group">
            <label>Place</label>
            <span>{place || "Not selected"}</span>
          </div>

          <div className="guide-info-group">
            <label>Date</label>
            <span>{date || "Not selected"}</span>
          </div>
        </div>

        <button
          className="guide-modify-btn"
          onClick={() => setShowSearchForm(!showSearchForm)}
        >
          Modify Search
        </button>
      </div>

      {/* Expandable search form - styled to match HomePage */}
      {showSearchForm && (
        <div className="guide-search-form">
          <div className="guide-form-content">
            <div className="guide-input-group">
              <FaSearch className="guide-icon" />
              <input
                type="text"
                className="guide-input"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Enter place"
              />
            </div>

            <div className="guide-input-group">
              <FaCalendar className="guide-icon" />
              <input
                type="date"
                className="guide-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button className="guide-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
