import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import guideImage from "../assets/guide.jpg";


function GuideCard({ name, address, price, touristCount }) {
  return (
    <div className="GuidePage-guide-card d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={guideImage} alt="Guide" className="GuidePage-guide-img" />
        <div className="GuidePage-guide-details">
          <h5>{name}</h5>
          <p>
            <FaMapMarkerAlt /> {address}
            {touristCount && (
              <span style={{ marginLeft: "10px", color: "#007bff", fontWeight: "bold" }}>
                {touristCount}
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="GuidePage-guide-price">
        <p>From <strong>{price}</strong></p>
        <button className="GuidePage-btn-reserve">Reserve</button>
      </div>
    </div>
  );
}


export default GuideCard;
