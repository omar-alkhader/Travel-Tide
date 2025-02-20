import React, { useState } from "react";
import visaLogo from "../assets/visa.png";


function PaymentForm() {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cardName, cardNumber, expMonth, expYear, cvv } = formData;

    if (!cardName || !cardNumber || !expMonth || !expYear || !cvv) {
      alert("Please fill in all fields.");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Invalid card number. It must be 16 digits.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Invalid security code. It must be 3 digits.");
      return;
    }

    alert("Payment successful!");
    setFormData({ cardName: "", cardNumber: "", expMonth: "", expYear: "", cvv: "" });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="PayPage-card">
        <h4 className="text-muted text-center">Payment</h4>
        <div className="PayPage-icons">
    
          <img src={visaLogo} alt="Visa" className="PayPage-logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name on card*</label>
            <input
              type="text"
              className="PayPage-control"
              id="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Debit/Credit card number*</label>
            <input
              type="text"
              className="PayPage-control"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="16"
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Expiration date*</label>
              <div className="d-flex">
                <select
                  className="PayPage-select me-2"
                  id="expMonth"
                  value={formData.expMonth}
                  onChange={handleChange}
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
                  className="PayPage-select"
                  id="expYear"
                  value={formData.expYear}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Year</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={2025 + i}>{2025 + i}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Security code*</label>
              <input
                type="password"
                className="PayPage-control"
                id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
                required
              />
            </div>
          </div>

          <button type="submit" className="PayPage-btn">
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
