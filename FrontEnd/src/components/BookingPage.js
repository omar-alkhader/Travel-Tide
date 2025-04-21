import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Booking.css";
import cancelIcon from "../assets/cancel.png";

function BookingPage() {
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const navigate = useNavigate();

    const handleCancelTrip = () => {
        setShowCancelPopup(true);
    };

    const closeCancelPopup = () => {
        setShowCancelPopup(false);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === "cancel-popup") {
            closeCancelPopup();
        }
    };

    const handleCheckout = () => {
        navigate("/pay");
    };

    return (
        <div className="booking-page-container">
            <div className="booking-header">
                <h1 className="booking-title">My Booking:</h1>
            </div>

            <div className="booking-details">
                <div className="table-container">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Travel Date</th>
                                <th>Booking Date</th>
                                <th>Travelers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Amman</td>
                                <td>2025-03-15</td>
                                <td>2025-03-01</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="cancel-trip-button" onClick={handleCancelTrip}>
                        Cancel Trip
                    </button>
                </div>

                <div className="price-details-box">
                    <h3 className="price-details-title">Price Details</h3>
                    <div className="price-row">
                        <span>Rate:</span>
                        <span>250 JOD</span>
                    </div>
                    <div className="price-row">
                        <span>Tax:</span>
                        <span>35 JOD</span>
                    </div>
                    <div className="price-row">
                        <span>Guide Price:</span>
                        <span>50 JOD</span>
                    </div>
                    <div className="price-row total">
                        <span>Total Price:</span>
                        <span>335 JOD</span>
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>

            {showCancelPopup && (
                <div className="cancel-popup" onClick={handleOutsideClick}>
                    <div className="popup-content">
                        <span className="close-icon" onClick={closeCancelPopup}>
                            &times;
                        </span>
                        <img src={cancelIcon} alt="Cancel" className="popup-cancel-icon" />
                        <h3 className="popup-title">Are you sure?</h3>
                        <p className="popup-message">Do you really want to delete the trip?</p>
                        <p className="popup-warning">This process can't be undone.</p>
                        <div className="popup-buttons">
                            <button className="popup-cancel-button" onClick={closeCancelPopup}>
                                Cancel
                            </button>
                            <button className="popup-delete-button">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingPage;