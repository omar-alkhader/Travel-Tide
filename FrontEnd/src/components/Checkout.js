import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import cancelIcon from "../assets/cancel.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBooking,
  removeAllGuides,
  removeGuide,
} from "../redux/bookingSlice";
import { setSearchGuide } from "../redux/guideSearchReducer";

function Checkout() {
  // Changed from hasGuide boolean to guides array
  // const [guides, setGuides] = useState([
  //   { id: 1, name: "John Doe", price: 50 },
  //   { id: 2, name: "Jane Smith", price: 50 },
  // ]);
  const dispatch = useDispatch();
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
    if (
      e.target.className === "cancel-popup" ||
      e.target.className === "guides-popup"
    ) {
      if (showCancelPopup) closeCancelPopup();
      if (showGuidesPopup) closeGuidesPopup();
    }
  };

  const handleCheckout = () => {
    navigate("/pay");
  };

  const handleRemoveGuide = (id) => {
    dispatch(removeGuide(id));
    // setGuides(guides.filter((guide) => guide.id !== guideId));
  };

  const handleRemoveAllGuides = () => {
    dispatch(removeAllGuides());
    closeGuidesPopup();
  };

  const handleDeleteTrip = () => {
    dispatch(clearBooking());
    navigate("/");
  };

  const navigateToGuidePage = () => {
    navigate("/guides");
  };
  const bookingDetails = useSelector((state) => state.booking);
  console.log(bookingDetails);
  const { guides } = bookingDetails;
  console.log(guides);
  // Calculate total guide price
  const guidesTotalPrice = guides.reduce(
    (sum, guide) => sum + guide.guide_price,
    0
  );
  let basePrice = 0;
  let flightPrice = 0;
  let hotelPrice = 0;
  if (bookingDetails.hasFlight) {
    flightPrice = bookingDetails.flight.totalPrice;
  }
  if (bookingDetails.hasHotel) {
    hotelPrice = bookingDetails.hotel.price;
  }
  basePrice += flightPrice + hotelPrice;
  const tax = parseFloat((basePrice * 0.16).toFixed(2));
  const totalPrice = parseFloat(basePrice + tax + guidesTotalPrice);
  // const totalPrice = basePrice + tax + guidesTotalPrice;

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
                <th>Departure Date</th>
                <th>Return Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Travelers</th>
                <th>Guides</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bookingDetails?.city}</td>
                <td>{bookingDetails.departureDate}</td>
                <td>{bookingDetails.returnDate}</td>
                <td>{bookingDetails.checkIn}</td>
                <td>{bookingDetails.checkOut}</td>
                <td>{bookingDetails.travellers}</td>
                <td>
                  {guides?.length > 0 ? (
                    <ul className="guides-list">
                      {guides?.map((guide) => (
                        <li key={guide.guide_daily_site_id}>{guide.name}</li>
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

            <button className="manage-guides-button" onClick={openGuidesPopup}>
              Manage Guides
            </button>
          </div>
        </div>

        <div className="price-details-box">
          <h3 className="price-details-title">Price Details</h3>
          <div className="price-row">
            <span>Rate:</span>
            <span>{basePrice.toFixed(2)} $</span>
          </div>
          <div className="price-row">
            <span>Tax:</span>
            <span>{tax.toFixed(2)} $</span>
          </div>
          {guides.length > 0 && (
            <>
              {guides.map((guide) => (
                <div key={guide.id} className="price-row guide-price-row">
                  <span>Guide: {guide.name}</span>
                  <span>{guide.guide_price.toFixed(2)} $</span>
                </div>
              ))}
            </>
          )}
          <div className="price-row total">
            <span>Total Price:</span>
            <span>{totalPrice.toFixed(2)} $</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>

      {/* Popups remain unchanged */}
      {showCancelPopup && (
        <div className="cancel-popup" onClick={handleOutsideClick}>
          <div className="popup-content">
            <span className="close-icon" onClick={closeCancelPopup}>
              &times;
            </span>
            <img src={cancelIcon} alt="Cancel" className="popup-cancel-icon" />
            <h3 className="popup-title">Are you sure?</h3>
            <p className="popup-message">
              Do you really want to delete the trip?
            </p>
            <p className="popup-warning">This process can't be undone.</p>
            <div className="popup-buttons">
              <button
                className="popup-cancel-button"
                onClick={closeCancelPopup}
              >
                Cancel
              </button>
              <button
                className="popup-delete-button"
                onClick={handleDeleteTrip}
              >
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
              {guides.map((guide) => (
                <div key={guide.guide_id} className="guide-item">
                  <span>{guide.name}</span>
                  <span>{guide.guide_price.toFixed(2)} $</span>
                  <button
                    className="remove-guide-btn"
                    onClick={() => handleRemoveGuide(guide.guide_daily_site_id)}
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

export default Checkout;
