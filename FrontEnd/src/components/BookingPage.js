import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Booking.css";
import cancelIcon from "../assets/cancel.png";

function BookingPage() {
    // Changed from hasGuide boolean to guides array
    const [guides, setGuides] = useState([
        { id: 1, name: "John Doe", price: 50 },
        { id: 2, name: "Jane Smith", price: 50 }
    ]);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [showGuidesPopup, setShowGuidesPopup] = useState(false);
    const navigate = useNavigate();

    const handleCancelTrip = () => {
        setShowCancelPopup(true);
    };

    const closeCancelPopup = () => {
        setShowCancelPopup(false);
    };

    const openGuidesPopup = () => {
        setShowGuidesPopup(true);
    };

    const closeGuidesPopup = () => {
        setShowGuidesPopup(false);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === "cancel-popup" || e.target.className === "guides-popup") {
            if (showCancelPopup) closeCancelPopup();
            if (showGuidesPopup) closeGuidesPopup();
        }
    };

    const handleCheckout = () => {
        navigate("/pay");
    };

    const handleRemoveGuide = (guideId) => {
        setGuides(guides.filter(guide => guide.id !== guideId));
    };

    const handleRemoveAllGuides = () => {
        setGuides([]);
        closeGuidesPopup();
    };

    const handleDeleteTrip = () => {

        navigate("/");
    };

    const navigateToGuidePage = () => {
        navigate("/guides");
    };

    // Calculate total guide price
    const guidesTotalPrice = guides.reduce((sum, guide) => sum + guide.price, 0);
    const basePrice = 250;
    const tax = 35;
    const totalPrice = basePrice + tax + guidesTotalPrice;

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
                                <th>Guides</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Amman</td>
                                <td>2025-03-15</td>
                                <td>2025-03-01</td>
                                <td>2</td>
                                <td>
                                    {guides.length > 0 ? (
                                        <ul className="guides-list">
                                            {guides.map(guide => (
                                                <li key={guide.id}>{guide.name}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "No guides"
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="booking-actions">
                        <button className="cancel-trip-button" onClick={handleCancelTrip}>
                            Cancel Trip
                        </button>
                        {guides.length > 0 && (
                            <button className="manage-guides-button" onClick={openGuidesPopup}>
                                Manage Guides
                            </button>
                        )}
                    </div>
                </div>

                <div className="price-details-box">
                    <h3 className="price-details-title">Price Details</h3>
                    <div className="price-row">
                        <span>Rate:</span>
                        <span>{basePrice} JOD</span>
                    </div>
                    <div className="price-row">
                        <span>Tax:</span>
                        <span>{tax} JOD</span>
                    </div>
                    {guides.length > 0 && (
                        <>
                            {guides.map(guide => (
                                <div key={guide.id} className="price-row guide-price-row">
                                    <span>Guide: {guide.name}</span>
                                    <span>{guide.price} JOD</span>
                                </div>
                            ))}
                        </>
                    )}
                    <div className="price-row total">
                        <span>Total Price:</span>
                        <span>{totalPrice} JOD</span>
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
                            <button className="popup-delete-button" onClick={handleDeleteTrip}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showGuidesPopup && (
                <div className="guides-popup" onClick={handleOutsideClick}>
                    <div className="popup-content">
                        <span className="close-icon" onClick={closeGuidesPopup}>
                            &times;
                        </span>
                        <h3 className="popup-title">Your Guides</h3>
                        <div className="guides-popup-list">
                            {guides.map(guide => (
                                <div key={guide.id} className="guide-item">
                                    <span>{guide.name}</span>
                                    <span>{guide.price} JOD</span>
                                    <button
                                        className="remove-guide-btn"
                                        onClick={() => handleRemoveGuide(guide.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="popup-buttons">
                            <button
                                className="add-guide-button"
                                onClick={() => {
                                    closeGuidesPopup();
                                    navigateToGuidePage();
                                }}
                            >
                                Add Guide
                            </button>
                            <button
                                className="remove-all-guides-btn"
                                onClick={handleRemoveAllGuides}
                            >
                                Remove All Guides
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingPage;