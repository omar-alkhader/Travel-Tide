import React, { useState } from "react";
import visaLogo from "../assets/visa.png";
import "../styles/PaymentPage.css";

function PaymentForm() {
  // Payment form state
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  // Traveler information state
  const [travelerData, setTravelerData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    passport: "",
    birthDay: "",
    birthMonth: "",
    birthYear: ""
  });

  // Price details (mock data)
  const priceDetails = {
    rate: 250,
    tax: 35,
    guidePrice: 50,
    totalBeforeDiscount: 335,
    rewardPoints: 15,
    finalPrice: 320
  };

  const handlePaymentChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTravelerChange = (e) => {
    setTravelerData({ ...travelerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    alert("Payment successful!");
  };

  return (
    <div className="checkout-page-container">
      <h2 className="Checkout-title">Checkout:</h2>

      <div className="checkout-main-layout">
        {/* Top Section: Two Columns */}
        <div className="checkout-top-section">
          {/* Left column - Traveler Box */}
          <div className="checkout-box traveler-box">
            <h3 className="Checkout-section-title">Traveler 1:</h3>

            <div className="traveler-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name*</label>
                  <input
                    type="text"
                    className="Checkout-input"
                    id="firstName"
                    value={travelerData.firstName}
                    onChange={handleTravelerChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    className="Checkout-input"
                    id="middleName"
                    value={travelerData.middleName}
                    onChange={handleTravelerChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name*</label>
                  <input
                    type="text"
                    className="Checkout-input"
                    id="lastName"
                    value={travelerData.lastName}
                    onChange={handleTravelerChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Country/Territory Code*</label>
                  <select
                    className="Checkout-select"
                    id="countryCode"
                    value={travelerData.countryCode}
                    onChange={handleTravelerChange}
                    required
                  >
                    <option value="">Select Country Code</option>
                    <option value="+962">Jordan (+962)</option>
                    <option value="+20">Egypt (+20)</option>
                    <option value="+90">Turkey (+90)</option>
                    <option value="+357">Cyprus (+357)</option>
                    <option value="+359">Bulgaria (+359)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number*</label>
                  <input
                    type="text"
                    className="Checkout-input"
                    id="phoneNumber"
                    value={travelerData.phoneNumber}
                    onChange={handleTravelerChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Passport Number*</label>
                  <input
                    type="text"
                    className="Checkout-input"
                    id="passport"
                    value={travelerData.passport}
                    onChange={handleTravelerChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group dob-group">
                  <label className="form-label">Date of Birth*</label>
                  <div className="dob-inputs">
                    <select
                      className="Checkout-select birth-select"
                      id="birthDay"
                      value={travelerData.birthDay}
                      onChange={handleTravelerChange}
                      required
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>

                    <select
                      className="Checkout-select birth-select"
                      id="birthMonth"
                      value={travelerData.birthMonth}
                      onChange={handleTravelerChange}
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>

                    <select
                      className="Checkout-select birth-select"
                      id="birthYear"
                      value={travelerData.birthYear}
                      onChange={handleTravelerChange}
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="price-amount">${priceDetails.rate}.00</div>
                <div className="price-amount">${priceDetails.tax}.00</div>
              </div>

              <div className="price-row guide-row">
                <div className="price-label">Guide Price</div>
                <div className="price-amount">${priceDetails.guidePrice}.00</div>
              </div>

              <div className="price-row total-row">
                <div className="price-label">Total Price</div>
                <div className="price-amount">${priceDetails.totalBeforeDiscount}.00</div>
              </div>

              <div className="price-row reward-row">
                <div className="price-label">Reward Points Discount</div>
                <div className="price-amount">-${priceDetails.rewardPoints}.00</div>
              </div>

              <div className="price-row final-row">
                <div className="price-label">Final Price</div>
                <div className="price-amount">${priceDetails.finalPrice}.00</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <button type="submit" className="PayPage-btn">
                Complete Purchase
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Payment */}
        <div className="checkout-box payment-box">
          <h3 className="Checkout-section-title">Payment:</h3>

          <div className="checkout-payment-icons">
            <img src={visaLogo} alt="Visa" className="PayPage-logo" />
          </div>

          <div className="payment-form">
            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Name on card*</label>
                <input
                  type="text"
                  className="PayPage-control payment-full-width"
                  id="cardName"
                  value={formData.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Debit/Credit card number*</label>
                <input
                  type="text"
                  className="PayPage-control payment-full-width"
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={handlePaymentChange}
                  maxLength="16"
                  required
                />
              </div>
            </div>


            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Expiration date*</label>
                <div className="expiry-inputs">
                  <select
                    className="PayPage-select payment-half-width"
                    id="expMonth"
                    value={formData.expMonth}
                    onChange={handlePaymentChange}
                    required
                  >
                    <option value="" disabled>Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select
                    className="PayPage-select payment-half-width"
                    id="expYear"
                    value={formData.expYear}
                    onChange={handlePaymentChange}
                    required
                  >
                    <option value="" disabled>Year</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={2025 + i}>{2025 + i}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Security code*</label>
                <input
                  type="password"
                  className="cvv-input"
                  id="cvv"
                  value={formData.cvv}
                  onChange={handlePaymentChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;