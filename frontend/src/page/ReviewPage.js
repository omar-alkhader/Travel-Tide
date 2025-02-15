import React from 'react';
import RatingForm from '../components/RatingForm';
import "./styles/ReviewPage.css"; 
import "./styles/NavBar.css"; 
import "./styles/global.css"; 

function ReviewPage() {
  return (
    <div>
      <h1>Review Page</h1>
      <RatingForm />
    </div>
  );
}

export default ReviewPage;