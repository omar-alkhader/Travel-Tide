import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import "../styles/Checkout.css";

function formatDate(dateString) {
  if (!dateString) return "None";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "None" : date.toLocaleDateString();
}

function Booking() {
  const user = useSelector((state) => state.user.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/bookings/user/${user.id}`
      );
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    },
    enabled: !!user?.id,
  });

  if (!user) return <p>Please login to see your bookings.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading bookings.</p>;

  return (
    <div className="booking-page-container">
      <div className="booking-header">
        <h1 className="booking-title">My Booking:</h1>
      </div>

      <div className="booking-details">
        {!data?.booking ? (
          <p>No bookings yet.</p>
        ) : (
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
                  <td>{data.booking.city || "None"}</td>
                  <td>{formatDate(data.booking.departure_date)}</td>
                  <td>{formatDate(data.booking.return_date)}</td>
                  <td>{formatDate(data.booking.checkin)}</td>
                  <td>{formatDate(data.booking.checkout)}</td>
                  <td>{data.booking.travellers || "None"}</td>
                  <td>
                    {data.booking.guides?.length > 0 ? (
                      <ul className="guides-list">
                        {data.booking.guides.map((guide) => (
                          <li key={guide.guide_id}>{guide.name}</li>
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
        )}
      </div>
    </div>
  );
}

export default Booking;
