import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import defaultHotelImage from "../assets/hotel-default.jpg";

function HotelCard({ hotel }) {
    // Function to render star rating
    const renderStars = (stars) => {
        return Array(stars).fill().map((_, i) => (
            <FaStar key={i} className="star-icon" />
        ));
    };

    return (
        <div className="hotel-card">
            <div className="hotel-card-image">
                <img 
                    src={hotel.image || defaultHotelImage} 
                    alt={hotel.name} 
                    onError={(e) => { e.target.src = defaultHotelImage }}
                />
            </div>
            
            <div className="hotel-card-details">
                <h3 className="hotel-name">{hotel.name}</h3>
                
                <div className="hotel-stars">
                    {renderStars(hotel.stars)}
                </div>
                
                <div className="hotel-address">
                    <FaMapMarkerAlt className="address-icon" />
                    <span>{hotel.address}</span>
                </div>
                
                <div className="room-type">
                    <span className="room-label">Room Type:</span>
                    <span className="room-value">{hotel.roomType}</span>
                </div>
            </div>
            
            <div className="hotel-card-price">
                <div className="price-amount">{hotel.price} JOD</div>
                <button className="book-now-btn">Book Now</button>
            </div>
        </div>
    );
}

export default HotelCard;