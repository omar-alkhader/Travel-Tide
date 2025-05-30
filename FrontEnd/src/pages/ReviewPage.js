// ReviewPage.js
import React, { useState } from "react";
import RatingComponent from "../components/RatingForm";  // Import the correct component

import "../styles/NavBar.css";
import "../styles/global.css";
import "../styles/ReviewPage.css";

function ReviewPage() {
  const [newReviewMode, setNewReviewMode] = useState(false);  // Track "new review" mode

  return (
    <div>
      <RatingComponent newReviewMode={newReviewMode} setNewReviewMode={setNewReviewMode} />
    </div>
  );
}

export default ReviewPage;
