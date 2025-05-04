import React, { useState } from "react";
import visaLogo from "../assets/visa.png";
import "../styles/PaymentPage.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    cardName: "",
  });

  const priceDetails = {
    rate: 250,
    tax: 35,
    guidePrice: 50,
    totalBeforeDiscount: 335,
    rewardPoints: 15,
    finalPrice: 320,
  };
  const bookingDetails = useSelector((state) => state.booking);
  console.log(bookingDetails);
  const { guides } = bookingDetails;
  // Calculate total guide price
  console.log(guides);
  const guidesTotalPrice = guides.reduce((sum, guide) => sum + guide.price, 0);
  let flightPrice = 0;
  let basePrice = 0;
  let hotelPrice = 0;
  if (bookingDetails.hasFlight) {
    flightPrice = bookingDetails.flight.totalPrice;
  }
  if (bookingDetails.hasHotel) {
    hotelPrice = bookingDetails.hotel.price;
  }
  basePrice += flightPrice;
  basePrice += hotelPrice;
  const tax = parseFloat(basePrice * 0.16);
  const totalPrice = parseFloat(basePrice + tax + guidesTotalPrice);
  const totalPriceAfterDiscount = totalPrice;
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please try again later.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:6600/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalPriceAfterDiscount * 100 }), // Amount in cents
        }
      );

      const { clientSecret } = await response.json();
      if (!clientSecret) {
        throw new Error("Failed to fetch client secret.");
      }

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.cardName,
            },
          },
        }
      );

      if (error) {
        setPaymentStatus("Payment failed: " + error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful! Thank you.");
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("An error occurred during payment processing.");
    }
  };

  return (
    <div className="checkout-page-container">
      <h2 className="Checkout-title">Checkout:</h2>

      <div className="checkout-main-layout">
        <div className="checkout-top-section">
          {/* Left column - Payment Box */}
          <div className="checkout-box payment-box">
            <h3 className="Checkout-section-title">Payment:</h3>

            <div className="checkout-payment-icons">
              <img src={visaLogo} alt="Visa" className="PayPage-logo" />
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-row">
                <div className="form-group full-width">
                  <label className="form-label">Name on card*</label>
                  <input
                    type="text"
                    className="PayPage-control payment-full-width"
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) =>
                      setFormData({ ...formData, cardName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label className="form-label">Card Details*</label>
                  <div className="card-element-wrapper">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            fontFamily: "Poppins, sans-serif",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                      className="card-element"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="PayPage-btn">
                Complete Purchase
              </button>
            </form>

            {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
          </div>

          {/* Right column - Price Details Box */}
          <div className="checkout-box price-details-box">
            <h3 className="Checkout-section-title">Price Details:</h3>
            <div className="price-details">
              <div className="price-row header-row">
                <div className="price-label">Rate</div>
                <div className="price-label">Tax</div>
              </div>

              <div className="price-row">
                <div className="price-amount">${basePrice.toFixed(2)}</div>
                <div className="price-amount">${tax.toFixed(2)}</div>
              </div>

              <div className="price-row guide-row">
                <div className="price-label">Guide Price</div>
                <div className="price-amount">
                  ${guidesTotalPrice.toFixed(2)}
                </div>
              </div>

              <div className="price-row total-row">
                <div className="price-label">Total Price</div>
                <div className="price-amount">${totalPrice.toFixed(2)}</div>
              </div>

              <div className="price-row reward-row">
                <div className="price-label">Reward Points Discount</div>
                <div className="price-amount">
                  -${priceDetails.rewardPoints}.00
                </div>
              </div>

              <div className="price-row final-row">
                <div className="price-label">Final Price</div>
                <div className="price-amount">
                  ${totalPriceAfterDiscount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
