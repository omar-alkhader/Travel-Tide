import React, { useState } from "react";

function RatingForm() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (!review || rating === 0) {
      alert("Please provide both a review and a rating.");
      return;
    }

    console.log(`Review Submitted!`);
    console.log(`Review: ${review}`);
    console.log(`Rating: ${rating} stars`);

    // Clear the form
    setReview("");
    setRating(0);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="review-form">
      <textarea
        placeholder="Write what you have experienced."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <div className="rating">
        <p>How would you rate your experience?</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? "selected" : ""}`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}

export default RatingForm;
