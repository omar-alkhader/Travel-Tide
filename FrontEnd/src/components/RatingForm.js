import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch existing review
const fetchReview = async (id) => {
  const response = await fetch(
    `http://127.0.0.1:6600/api/reviews/me?id=${id}`,
    {
      method: "GET",
      credentials: "include", // send cookie
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }

  const data = await response.json();
  return data;
};

// Post new review
const postReview = async ({ review, rating, id }) => {
  const response = await fetch("http://127.0.0.1:6600/api/reviews", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: review, rating, id }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit review");
  }

  return data;
};

function RatingComponent() {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.user); // from Redux

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["review"],
    queryFn: () => {
      console.log(user.id);
      return fetchReview(user?.id);
    },
    enabled: !!user, // skip fetch if not logged in
  });

  const review = data?.review;

  const mutation = useMutation({
    mutationFn: ({ review, rating, id }) => postReview({ review, rating, id }),
    onSuccess: () => {
      toast.success("thank you for your feedback", {
        style: {
          backgroundColor: "#4BB543",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries(["review"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "something went wrong", {
        style: {
          backgroundColor: "#F56260",
          color: "#fff",
        },
      });
    },
  });

  const handleSubmit = (review, rating) => {
    mutation.mutate({ review, rating, id: user?.id });
  };

  if (!user) return <p>Please log in to submit a review.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message || "Error fetching review."}</p>;
  console.log(review);
  return (
    <div className="rating-wrapper">
      {review ? (
        <div className="existing-review">
          <h2>Your Previous Review</h2>
          <p>
            <strong>Rating:</strong> {review.rating} ★
          </p>
          <p>
            <strong>Review:</strong> {review.comment}
          </p>
        </div>
      ) : (
        <RatingForm onSubmit={handleSubmit} isSubmitting={mutation.isLoading} />
      )}
    </div>
  );
}

function RatingForm({ onSubmit, isSubmitting }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!review || rating === 0) {
      alert("Please provide both a review and a rating.");
      return;
    }
    onSubmit(review, rating);
    setReview("");
    setRating(0);
  };

  return (
    <div className="review-page-form">
      <h1>How did you find your trip with us?</h1>
      <textarea
        className="review-page-textarea"
        placeholder="Write what you have experienced."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="review-page-rating">
        <p>How would you rate your experience?</p>
        <div className="review-page-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`review-page-star ${rating >= star ? "selected" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="review-page-submit-container-left">
        <button
          className="review-page-button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default RatingComponent;
