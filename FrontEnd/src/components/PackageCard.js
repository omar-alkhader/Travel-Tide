import React from "react";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id === "turkey") {
      navigate("/turkey");
    } 
    
  else  if (id === "egypt") {
      navigate("/egypt");
    } 
    
    else  if (id === "cyprus") {
      navigate("/cyprus");
    } 

    else  if (id === "jordan") {
      navigate("/jordan");
    } 
  
    else {
      navigate(`/package/${id}`);
    }
  };

  return (
    <div className="package-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <div className="package-title">{name}</div>
    </div>
  );
};

export default PackageCard;
