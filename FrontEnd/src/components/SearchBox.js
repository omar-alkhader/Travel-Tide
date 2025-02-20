import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!place || !date) {
      alert("Please enter a place and date.");
      return;
    }
    navigate("/guides");
  };

  return (
    <div className="GuidePage-search-container">
      <div className="GuidePage-search-box">
        <input
          type="text"
          className="GuidePage-input"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Place"
        />
        <input
          type="date"
          className="GuidePage-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="GuidePage-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;

