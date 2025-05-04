import React from "react";
import { useSelector } from "react-redux";
import "../styles/Checkout.css"; // Using the existing CSS for consistent styling

function Booking() {
    // Get booking details from Redux store
    const bookingDetails = useSelector((state) => state.booking);
    const { guides = [] } = bookingDetails;

    return (
        <div className="booking-page-container">
            <div className="booking-header">
                <h1 className="booking-title">My Booking:</h1>
            </div>

            <div className="booking-details">
                <div className="table-container">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Departure Date</th>
                                <th>Return Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Travelers</th>
                                <th>Guides</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{bookingDetails?.city}</td>
                                <td>{bookingDetails.departureDate}</td>
                                <td>{bookingDetails.returnDate}</td>
                                <td>{bookingDetails.checkIn}</td>
                                <td>{bookingDetails.checkOut}</td>
                                <td>{bookingDetails.travellers}</td>
                                <td>
                                    {guides?.length > 0 ? (
                                        <ul className="guides-list">
                                            {guides?.map((guide) => (
                                                <li key={guide.guide_daily_site_id}>{guide.name}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "No guides"
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Booking;