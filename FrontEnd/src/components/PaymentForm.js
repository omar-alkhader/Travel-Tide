// ... imports stay the same
import React, { useState } from "react";
import visaLogo from "../assets/visa.png";
import "../styles/PaymentPage.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { loginSuccess } from "../redux/userSlice";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ cardName: "" });
  const bookingDetails = useSelector((state) => state.booking);
  const user = useSelector((state) => state.user.user);
  console.log(bookingDetails);
  const guidesTotalPrice =
    bookingDetails.guides?.reduce(
      (sum, guide) => sum + (guide.guide_price || 0),
      0
    ) || 0;

  const flightPrice = bookingDetails.hasFlight
    ? bookingDetails.flight.totalPrice
    : 0;
  const hotelPrice = bookingDetails.hasHotel ? bookingDetails.hotel.price : 0;
  const basePrice = flightPrice + hotelPrice;
  const tax = parseFloat((basePrice * 0.16).toFixed(2));
  const totalPrice = parseFloat(basePrice + tax + guidesTotalPrice);

  const hasDiscount = user?.points >= 1000;
  const discount = hasDiscount ? Math.floor((-basePrice - tax) * 0.25) : 0;
  const priceAfterDiscount = totalPrice + discount;
  const amount = Math.round(priceAfterDiscount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.cardName) {
      toast.error("please provide name", {
        style: { backgroundColor: "#F56260", color: "#fff" },
      });
      return;
    }
    if (!user?.id || !stripe || !elements) {
      toast.error("You must be logged in and Stripe must be ready.", {
        style: { backgroundColor: "#F56260", color: "#fff" },
      });
      return;
    }

    const bookingPayload = {
      tourist_id: user.id,
      travellers: bookingDetails.travellers,
      total_price: totalPrice,
      hotel_id: bookingDetails.hasHotel ? bookingDetails.hotel?.id : null,
      checkin: bookingDetails.hasHotel ? bookingDetails.checkIn : null,
      checkout: bookingDetails.hasHotel ? bookingDetails.checkOut : null,
      hasDiscount,
      city: bookingDetails.city,
      flight_dep_id: bookingDetails.hasFlight
        ? bookingDetails.flight?.id
        : null,
      flight_ret_id: bookingDetails.hasFlight
        ? bookingDetails.flight?.returnFlight.id
        : null,
      departure_date: bookingDetails.hasFlight
        ? bookingDetails.departureDate
        : null,
      return_date: bookingDetails.hasFlight ? bookingDetails.returnDate : null,
      guide_daily_site_ids: bookingDetails.guides?.map(
        (g) => g.guide_daily_site_id
      ),
    };

    let bookingId = null;

    try {
      const bookingRes = await fetch("http://127.0.0.1:6600/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) throw new Error(bookingData.message);
      bookingId = bookingData.booking.id;

      const paymentIntentRes = await fetch(
        "http://127.0.0.1:6600/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      const { clientSecret } = await paymentIntentRes.json();
      if (!clientSecret) throw new Error("Failed to get client secret.");

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: formData.cardName },
          },
        }
      );

      if (error || paymentIntent.status !== "succeeded") {
        toast.error("Payment failed: " + (error?.message || "Unknown error"), {
          style: { backgroundColor: "#F56260", color: "#fff" },
        });

        if (bookingId) {
          await fetch(`http://127.0.0.1:6600/api/bookings/${bookingId}`, {
            method: "DELETE",
          });
        }

        return;
      }

      await fetch(`http://127.0.0.1:6600/api/bookings/confirm/${bookingId}`, {
        method: "PATCH",
      });

      toast.success("Payment successful!", {
        style: { backgroundColor: "#4BB543", color: "#fff" },
      });

      // ✅ Refresh user points and update Redux
      const userResponse = await fetch(
        `http://127.0.0.1:6600/api/users/${user?.id}`,
        {
          credentials: "include",
        }
      );
      const userData = await userResponse.json();
      if (userData?.user) dispatch(loginSuccess(userData.user));
      console.log(userData);
      await queryClient.invalidateQueries(["guides_daily_sites"]);
      await queryClient.invalidateQueries(["user"]);
      await queryClient.invalidateQueries(["tourists"]);
    } catch (err) {
      console.error("Payment/booking error:", err);

      toast.error("Error: " + err.message, {
        style: { backgroundColor: "#F56260", color: "#fff" },
      });

      if (bookingId) {
        await fetch(`http://127.0.0.1:6600/api/bookings/${bookingId}`, {
          method: "DELETE",
        });
      }
    }
  };

  return (
    <div className="checkout-page-container">
      <h2 className="Checkout-title">Checkout:</h2>
      <div className="checkout-main-layout">
        <div className="checkout-top-section">
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
                    onChange={(e) => setFormData({ cardName: e.target.value })}
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
                            "::placeholder": { color: "#aab7c4" },
                          },
                          invalid: { color: "#9e2146" },
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
          </div>

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
            </div>

            <div className="price-row reward-row">
              <div className="price-label">Reward Points Discount</div>
              <div className="price-amount">-${discount.toFixed(2)}</div>
            </div>

            <div className="price-row final-row">
              <div className="price-label">Final Price</div>
              <div className="price-amount">
                ${priceAfterDiscount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
