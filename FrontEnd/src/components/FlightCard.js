import React from "react";
import { FaPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFlight, setTraveller } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// function formatDuration(duration) {
//   return `${parseInt(duration.hours)}h ${parseInt(duration?.minutes ? )}m`;
// }
function formatDuration({ hours, minutes }) {
  let durationString = "";

  if (hours > 0) {
    durationString += `${hours}h`;
  }

  if (minutes > 0) {
    durationString += ` ${minutes}m`;
  }

  return durationString.trim(); // Remove extra space if there are no minutes
}

function FlightCard({ flight }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = localStorage.getItem("userType");
  const flightSearch = useSelector((state) => state.searchFlight);
  const user = useSelector((state) => state.user.user);
  function handleAddFlight(flight) {
    if (user === null) {
      navigate("/SignIn");
      return;
    }
    if (userType !== "client") {
      toast.error("you are  not allowed to book", {
        style: {
          backgroundColor: "#F56260",
          color: "#fff",
        },
      });
      return;
    }
    dispatch(
      setFlight({
        flight,
        departureDate: flightSearch.departureDate,
        returnDate: flightSearch.returnDate,
        city: flightSearch.city,
        travellers: flightSearch.travelers,
      })
    );
    navigate("/checkout");
  }
  return (
    <div className="flight-card">
      <div className="flight-card-main">
        <div className="flight-section outbound">
          <div className="flight-airline">
            <FaPlane className="airline-icon" />
            <div className="airline-details">
              <span className="airline-name">{flight.airline}</span>
              <span className="flight-number">{flight.flightNumber}</span>
            </div>
          </div>

          <div className="flight-route">
            <div className="route-point departure">
              <div className="time">{flight.departure.time}</div>
              <div className="city">{flight.departure.city}</div>
              <div className="date">
                {new Date(flight.departure.date).toLocaleDateString()}
              </div>
            </div>

            <div className="route-line">
              <div className="stops">
                {flight.stops === 0
                  ? "Direct"
                  : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
              </div>
              <hr />
              <div className="duration">{formatDuration(flight.duration)}</div>
            </div>

            <div className="route-point arrival">
              <div className="time">{flight.arrival.time}</div>
              <div className="city">{flight.arrival.city}</div>
              <div className="date">
                {new Date(flight.arrival.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flight-divider"></div>

        <div className="flight-section return">
          <div className="flight-airline">
            <FaPlane className="airline-icon return-icon" />
            <div className="airline-details">
              <span className="airline-name">
                {flight.returnFlight.airline}
              </span>
              <span className="flight-number">
                {flight.returnFlight.flightNumber}
              </span>
            </div>
          </div>

          <div className="flight-route">
            <div className="route-point departure">
              <div className="time">{flight.returnFlight.departure.time}</div>
              <div className="city">{flight.returnFlight.departure.city}</div>
              <div className="date">
                {new Date(
                  flight.returnFlight.departure.date
                ).toLocaleDateString()}
              </div>
            </div>

            <div className="route-line">
              <div className="stops">
                {flight.returnFlight.stops === 0
                  ? "Direct"
                  : `${flight.returnFlight.stops} Stop${
                      flight.returnFlight.stops > 1 ? "s" : ""
                    }`}
              </div>
              <hr />
              <div className="duration">
                {formatDuration(flight.returnFlight.duration)}
              </div>
            </div>

            <div className="route-point arrival">
              <div className="time">{flight.returnFlight.arrival.time}</div>
              <div className="city">{flight.returnFlight.arrival.city}</div>
              <div className="date">
                {new Date(
                  flight.returnFlight.arrival.date
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flight-card-price">
        <div className="price-amount">{flight.totalPrice} JOD</div>
        <button
          className="book-now-btn"
          onClick={() => handleAddFlight(flight)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default FlightCard;
