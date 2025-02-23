import React from "react";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/package/${id}`);
  };

  return (
    <div className="package-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <div className="package-title">{name}</div>
    </div>
  );
};

export default PackageCard;
