import React, { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaPlane } from "react-icons/fa";
import defaultHotelImage from "../assets/hotel-default.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setPackage } from "../redux/bookingSlice";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function TravelPackageCard({ package: pkg, onViewFlight }) {
  const navigator = useNavigate();
  const userType = localStorage.getItem("userType");
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const dispatch = useDispatch();
  const packageSearch = useSelector((state) => state.searchPackage);
  const user = useSelector((state) => state.user.user);
  function handleClick(e, pkg) {
    e.preventDefault();

    if (user === null) {
      navigator("/SignIn");
      return;
    }
    if (userType !== "client") {
      toast.error("you are  not allowed to book", {
        style: {
          backgroundColor: "#F56260",
          color: "#fff",
        },
      });
      return;
    }
    dispatch(
      setPackage({
        flight: pkg.flight,
        hotel: pkg.hotel,
        fromDate: packageSearch.departureDate,
        toDate: packageSearch.returnDate,
        city: packageSearch.departureCity,
        travellers: packageSearch.travellers,
      })
    );

    navigator("/checkout");
  }
  // Function to render star rating
  const renderStars = (stars) => {
    return Array(stars)
      .fill()
      .map((_, i) => <FaStar key={i} className="star-icon" />);
  };

  return (
    <div className="travel-package-card">
      <div className="travel-package-card-image">
        <img
          src={pkg.hotel.image || defaultHotelImage}
          alt={pkg.hotel.name}
          onError={(e) => {
            e.target.src = defaultHotelImage;
          }}
        />
      </div>

      <div className="travel-package-card-details">
        <h3 className="hotel-name">{pkg.hotel.name}</h3>

        <div className="hotel-stars">{renderStars(pkg.hotel.stars)}</div>

        <div className="hotel-address">
          <FaMapMarkerAlt className="address-icon" />
          <span>{pkg.hotel.address}</span>
        </div>

        <div className="room-type">
          <span className="room-label">Room Type:</span>
          <span className="room-value">{pkg.hotel.room_type}</span>
        </div>

        <button
          className="view-flight-btn"
          onClick={() => onViewFlight(pkg.flight)}
        >
          <FaPlane className="flight-btn-icon" /> Flight
        </button>
      </div>

      <div className="travel-package-card-price">
        <div className="trip-dates">{pkg.tripDates}</div>
        <div className="price-amount">{pkg.price} JOD</div>
        {/* <div className="per-person">per person</div> */}
        <button className="book-now-btn" onClick={(e) => handleClick(e, pkg)}>
          Book Now
        </button>
        <button
          className="price-details-btn"
          onClick={() => setShowPriceDetails(true)}
        >
          Price Details
        </button>
      </div>

      {/* Price Details Popup */}
      {showPriceDetails && (
        <div
          className="price-details-overlay"
          onClick={() => setShowPriceDetails(false)}
        >
          <div
            className="price-details-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <h4>Price Details</h4>
              <button
                className="close-popup"
                onClick={() => setShowPriceDetails(false)}
              >
                ×
              </button>
            </div>
            <div className="price-details-content">
              <div className="price-detail-item">
                <span>Hotel ({pkg.totalNights} nights):</span>
                <span>{pkg.hotel.price} JOD</span>
              </div>
              <div className="price-detail-item">
                <span>Flight:</span>
                <span>{pkg.flight.totalPrice} JOD</span>
              </div>
              <div className="price-detail-item total">
                <span>Total per person:</span>
                <span>{pkg.price} JOD</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelPackageCard;
