import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCity } from "../redux/bookingSlice";

const CityCard = ({ id, name, image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    // Navigate to the Trip Details Page
    dispatch(setCity(name));
    navigate("/trip-details", { state: { cityId: id, cityName: name } });
  };

  return (
    <div className="package-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <div className="package-title">{name}</div>
    </div>
  );
};

export default CityCard;
