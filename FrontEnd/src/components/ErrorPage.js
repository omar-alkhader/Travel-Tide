import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="error-container d-flex flex-column align-items-center justify-content-center">
      <h1 className="error-title">Oops! Page Not Found</h1>
      <p className="error-message text-center">{message}</p>
      <Button variant="primary" onClick={handleBackHome} className="mt-3">
        Back to Home
      </Button>
    </div>
  );
};

export default ErrorPage;
