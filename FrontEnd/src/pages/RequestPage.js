import React from "react";
import { useNavigate } from "react-router-dom";
import TouristCard from "../components/TouristCard";
import touristImg from "../assets/tourist.png";


const tourists = [
    { name: "John Doe", avatar: touristImg },
    { name: "Jane Smith", avatar: touristImg },
    { name: "Michael Brown", avatar: touristImg },
    { name: "Emily White", avatar: touristImg },
    { name: "Chris Green", avatar: touristImg },
    { name: "Sarah Black", avatar: touristImg }
];

const RequestPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
<h3 className="customization-title">Customization:</h3>
<div className="row">
                {tourists.map((tourist, index) => (
                    <TouristCard
                        key={index}
                        tourist={tourist}
                        onChat={() => navigate(`/chat/${tourist.name}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RequestPage;

