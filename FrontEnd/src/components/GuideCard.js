import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import guideImage from "../assets/guide.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addGuide, removeGuide } from "../redux/bookingSlice";

function GuideCard({ guide }) {
  const { name, site_name, max_limit, guide_price: price, travellers } = guide;
  console.log(price);
  console.log(guide);
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const [reserved, setReserved] = useState(false);
  function handleAddGuide(guide) {
    dispatch(addGuide(guide));
    console.log(booking);
    setReserved(true);
  }
  function handleDeleteGuide(guide) {
    dispatch(removeGuide(guide));
    setReserved(false);
  }

  // useEffect(() => {
  //   booking.guides.forEach((el) => {
  //     if (el.id === guide.id) setReserved(true);
  //   });
  // }, [guide.id, booking.guides]);
  return (
    <div className="GuidePage-guide-card d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={guideImage} alt="Guide" className="GuidePage-guide-img" />
        <div className="GuidePage-guide-details">
          <h5>{name}</h5>
          <p>
            <FaMapMarkerAlt /> {site_name}
            <span
              style={{
                marginLeft: "10px",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              {travellers}:{max_limit}
            </span>
          </p>
        </div>
      </div>
      <div className="GuidePage-guide-price">
        <p>
          From <strong>{price}</strong>
        </p>
        {reserved ? (
          <button
            className="GuidePage-btn-reserve"
            onClick={(e) => handleDeleteGuide(guide)}
          >
            Remove
          </button>
        ) : (
          <button
            className="GuidePage-btn-reserve"
            onClick={(e) => handleAddGuide(guide)}
          >
            Reserve
          </button>
        )}
      </div>
    </div>
  );
}

export default GuideCard;
