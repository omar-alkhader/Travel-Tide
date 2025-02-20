import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RatingForm() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const handleStarClick = (value) => setRating(value);

    const handleSubmit = () => {
        if (!review || rating === 0) {
            alert("Please provide both a review and a rating.");
            return;
        }
        setReview("");
        setRating(0);
        alert("Thank you for your feedback!");
        navigate("/trip-details");
    };

    return (
        <div className="review-page-form">
            <h1 className="review-page-title">How did you find your trip with us?</h1>
            <textarea
                className="review-page-textarea"
                placeholder="Write what you have experienced."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="review-page-rating">
            <p>How would you rate your experience?</p>
                <div className="review-page-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`review-page-star ${rating >= star ? "selected" : ""}`}
                            onClick={() => handleStarClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <div className="review-page-submit-container-left">
                <button className="review-page-button" onClick={handleSubmit}>Submit Review</button>
            </div>
        </div>
    );
}

export default RatingForm;