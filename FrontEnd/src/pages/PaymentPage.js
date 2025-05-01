import React from "react";
import PaymentForm from "../components/PaymentForm";
import PreLoader from "../components/PreLoader";

import "../styles/NavBar.css";
import "../styles/global.css";
import "../styles/PaymentPage.css";

function Payment() {
  return (
    <>
      <PreLoader />
      <div>
        <PaymentForm />
      </div>
    </>
  );
}

export default Payment;


