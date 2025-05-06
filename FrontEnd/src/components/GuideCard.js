import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import guideImage from "../assets/guide.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addGuide, removeGuide } from "../redux/bookingSlice";
import { toast } from "react-hot-toast";

function GuideCard({ guide }) {
  const {
    name,
    site_name,
    max_limit,
    guide_price: price,
    travellers: currentTravellers,
  } = guide;

  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const travellersFromSearch = useSelector(
    (state) => state.searchGuide.travellers
  );
  const [reserved, setReserved] = useState(false);

  function handleAddGuide(guide) {
    const totalAfterBooking = currentTravellers + travellersFromSearch;

    if (totalAfterBooking > max_limit) {
      toast.error("Cannot reserve: maximum guide capacity exceeded", {
        style: { backgroundColor: "#F56260", color: "#fff" },
      });
      return;
    }

    dispatch(addGuide(guide));
    setReserved(true);
    toast.success("Guide reserved successfully", {
      style: { backgroundColor: "#4BB543", color: "#fff" },
    });
  }

  function handleDeleteGuide(guide) {
    dispatch(removeGuide(guide));
    setReserved(false);
    toast("Guide reservation removed", {
      icon: "🗑️",
      style: { backgroundColor: "#999", color: "#fff" },
    });
  }

  useEffect(() => {
    booking.guides.forEach((el) => {
      if (el.id === guide.id) setReserved(true);
    });
  }, [guide.id, booking.guides]);

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
              {currentTravellers}:{max_limit}
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
            onClick={() => handleDeleteGuide(guide)}
          >
            Remove
          </button>
        ) : (
          <button
            className="GuidePage-btn-reserve"
            onClick={() => handleAddGuide(guide)}
          >
            Reserve
          </button>
        )}
      </div>
    </div>
  );
}

export default GuideCard;
