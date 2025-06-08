import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import defaultHotelImage from "../assets/hotel-default.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setHotel } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booking = useSelector((state) => state.booking);
  const user = useSelector((state) => state.user.user);
  const searchHotel = useSelector((state) => state.searchHotel);
  const newHotel = { ...hotel, price: hotel.price * searchHotel.nights };
  // Function to render star rating
  const renderStars = (stars) => {
    return Array(stars)
      .fill()
      .map((_, i) => <FaStar key={i} className="star-icon" />);
  };
  function handleAddHotel(hotel) {
    dispatch(
      setHotel({
        hotel,
        checkIn: searchHotel.checkIn,
        checkOut: searchHotel.checkOut,
        city: searchHotel.city,
        travellers: searchHotel.travellers,
      })
    );
    if (user === null) {
      navigate("/SignIn");
      return;
    }
    navigate("/checkout");
  }
  return (
    <div className="hotel-card">
      <div className="hotel-card-image">
        <img
          src={hotel.image || defaultHotelImage}
          alt={hotel.name}
          onError={(e) => {
            e.target.src = defaultHotelImage;
          }}
        />
      </div>

      <div className="hotel-card-details">
        <h3 className="hotel-name">{newHotel.name}</h3>

        <div className="hotel-stars">{renderStars(newHotel.stars)}</div>

        <div className="hotel-address">
          <FaMapMarkerAlt className="address-icon" />
          <span>{newHotel.address}</span>
        </div>

        <div className="room-type">
          <span className="room-label">Room Type:</span>
          <span className="room-value">{newHotel.room_type}</span>
        </div>
      </div>

      <div className="hotel-card-price">
        <div className="price-amount">{newHotel.price} JOD</div>
        <button
          className="book-now-btn"
          onClick={() => handleAddHotel(newHotel)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default HotelCard;
