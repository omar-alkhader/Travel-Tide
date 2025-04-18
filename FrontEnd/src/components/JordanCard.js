import React from "react";
import { useNavigate } from "react-router-dom";

const JordanCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the Trip Details Page
    navigate("/trip-details", { state: { cityId: id, cityName: name } });
  };

  return (
    <div className="package-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <div className="package-title">{name}</div>
    </div>
  );
};

export default JordanCard;
