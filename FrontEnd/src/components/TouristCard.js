import React from "react";


const TouristCard = ({ tourist, onChat }) => {
    return (
        <div className="col-md-4">
            <div className="RequestPage-tourist-card">
                <img src={tourist.avatar} alt={tourist.name} />
                <h6>{tourist.name}</h6>
                <button className="btn btn-secondary btn-sm RequestPage-chat-btn" onClick={onChat}>
                    Chat
                </button>
            </div>
        </div>
    );
};

export default TouristCard;
