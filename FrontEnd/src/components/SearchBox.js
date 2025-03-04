import React, { useState, useEffect } from "react";
import { FaSearch, FaCalendar } from "react-icons/fa";

function SearchBox({ onSearch, initialPlace = "", initialDate = "" }) {
  const [place, setPlace] = useState(initialPlace);
  const [date, setDate] = useState(initialDate);
  const [showSearchForm, setShowSearchForm] = useState(false);

  // Update state when props change
  useEffect(() => {
    setPlace(initialPlace);
    setDate(initialDate);
  }, [initialPlace, initialDate]);

  const handleSearch = () => {
    if (!place || !date) {
      alert("Please enter a place and date.");
      return;
    }
    
    // Call the onSearch function with search parameters
    if (onSearch) {
      onSearch(place);
    }
    
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