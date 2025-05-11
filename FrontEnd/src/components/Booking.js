import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import "../styles/Checkout.css";

function formatDate(dateString) {
  if (!dateString || dateString === "None") return "None";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "None" : date.toLocaleDateString();
}

function Booking() {
  const user = useSelector((state) => state.user.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/bookings/user/${user.id}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
      return data;
    },
    enabled: Boolean(user?.id), // ✅ Cleaner than !!
  });

  if (!user) return <p>Please login to see your bookings.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>{error.message ? error.message : "Error loading bookings."}</p>;

  const booking = data?.booking || {};
  const guides = data?.guides;
  console.log(booking);
  console.log(guides);
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
                <td>{booking?.city || "None"}</td>
                <td>{formatDate(booking?.departure_date) || "None"}</td>
                <td>{formatDate(booking?.return_date) || "None"}</td>
                <td>{formatDate(booking?.checkin) || "None"}</td>
                <td>{formatDate(booking?.checkout) || "None"}</td>
                <td>{booking?.travellers || "None"}</td>
                <td>
                  {guides?.length > 0 ? (
                    <ul className="guides-list">
                      {guides?.map((guide) => (
                        <li key={guide.guide_id}>{guide.guide_name}</li>
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
