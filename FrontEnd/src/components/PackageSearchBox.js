import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

function HotelSearchBox({
    initialDestination = "",
    initialCheckIn = "",
    initialCheckOut = "",
    initialTravelers = "1"
}) {
    const [destination, setDestination] = useState(initialDestination);
    const [checkIn, setCheckIn] = useState(initialCheckIn);
    const [checkOut, setCheckOut] = useState(initialCheckOut);
    const [travelers, setTravelers] = useState(initialTravelers);
    const [showSearchForm, setShowSearchForm] = useState(false);

    const navigate = useNavigate();

    // Update state when props change
    useEffect(() => {
        setDestination(initialDestination);
        setCheckIn(initialCheckIn);
        setCheckOut(initialCheckOut);
        setTravelers(initialTravelers);
    }, [initialDestination, initialCheckIn, initialCheckOut, initialTravelers]);

    const handleSearch = () => {
        if (!destination || !checkIn || !checkOut) {
            alert("Please enter destination, check-in and check-out dates.");
            return;
        }
        // Navigate with updated search parameters
        navigate(
            `/hotels?destination=${encodeURIComponent(destination)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&travelers=${encodeURIComponent(travelers)}`,
            { replace: true }
        );
        // Close the search form after searching
        setShowSearchForm(false);
    };

    return (
        <div className="hotel-search-container">
            {/* Main search info rectangle */}
            

            {/* Expandable search form */}
            {showSearchForm && (
                <div className="hotel-search-form">
                    <div className="hotel-form-content">
                        <div className="hotel-input-group">
                            <FaMapMarkerAlt className="hotel-icon" />
                            <input
                                type="text"
                                className="hotel-input"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="City or Hotel"
                            />
                        </div>

                        <div className="hotel-input-group">
                            <FaCalendarAlt className="hotel-icon" />
                            <input
                                type="date"
                                className="hotel-input"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                placeholder="Check In"
                            />
                        </div>

                        <div className="hotel-input-group">
                            <FaCalendarAlt className="hotel-icon" />
                            <input
                                type="date"
                                className="hotel-input"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                placeholder="Check Out"
                            />
                        </div>

                        <div className="hotel-input-group">
                            <FaUsers className="hotel-icon" />
                            <input
                                type="number"
                                className="hotel-input"
                                min="1"
                                value={travelers}
                                onChange={(e) => setTravelers(e.target.value)}
                                placeholder="Travelers"
                            />
                        </div>

                        <button className="hotel-search-button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HotelSearchBox; 