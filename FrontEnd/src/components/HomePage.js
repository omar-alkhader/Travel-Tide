import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import background from "../assets/dead-sea.jpg";
import cyprus from "../assets/cyprus.jpg";
import petra from "../assets/petra.jpg";
import bulgaria from "../assets/bulgaria.jpg";
import alexandria from "../assets/alexandria.jpg";
import antalya from "../assets/antalya.jpg";
import wadirum from "../assets/Wadi-Rum.jpg";
import deadsea from "../assets/dead-sea.jpg";
import {
  FaGlobe,
  FaPlane,
  FaHotel,
  FaMapMarkedAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchFlight } from "../redux/flightSearchReducer";
import { setSearchGuide } from "../redux/guideSearchReducer";
import { setSearchHotel } from "../redux/hotelSearchReducer";
import { setTraveller } from "../redux/bookingSlice";

function HomePage() {
  const { setIsChatOpen } = useOutletContext();
  const [activeTab, setActiveTab] = useState("flights");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  // flight STATE
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightTravellers, setFlightTravellers] = useState(1);
  // Guide State
  const [guideCity, setGuideCity] = useState("");
  const [guideDate, setGuideDate] = useState("");
  const [guideTravellers, setGuideTravellers] = useState(1);
  // Hotel State
  const [hotelDestination, setHotelDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [guestsPerRoom, setGuestsPerRoom] = useState([2]);
  const [nationality, setNationality] = useState("Jordanian");

  // Handle Check-in Change
  const handleCheckInChange = (e) => {
    setCheckIn(e.target.value);
    updateCheckOut(e.target.value, nights);
  };

  // Handle Nights Change
  const handleNightsChange = (e) => {
    const newNights = parseInt(e.target.value) || 1;
    setNights(newNights);
    updateCheckOut(checkIn, newNights);
  };

  // Update Check-out Date
  const updateCheckOut = (startDate, numNights) => {
    if (!startDate) return;
    const checkInDate = new Date(startDate);
    checkInDate.setDate(checkInDate.getDate() + numNights);
    setCheckOut(checkInDate.toISOString().split("T")[0]);
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing experience! The tour guides were knowledgeable and friendly. Will definitely book with Travel Tide again.",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Our family trip to Petra was perfectly organized. Everything from accommodations to local transport was taken care of.",
    },
    {
      id: 3,
      name: "Emma Thompson",
      rating: 4,
      text: "Great service and excellent recommendations for local cuisine. The hotel selection was perfect for our needs.",
    },
    {
      id: 4,
      name: "Ahmed Al-Farsi",
      rating: 5,
      text: "The Dead Sea tour was incredible! Our guide knew all the best spots and provided fascinating historical context.",
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      rating: 4,
      text: "Very professional service. The itinerary was well-planned and gave us plenty of time to enjoy each destination.",
    },
    {
      id: 6,
      name: "David Wilson",
      rating: 5,
      text: "Booking our flights through Travel Tide saved us so much money. The customer service was exceptional when we needed to change dates.",
    },
  ];

  // Navigation functions for testimonials
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => {
      // When we reach the point where showing next one would exceed our testimonials list
      // (considering we show 3 at once on desktop)
      if (prevIndex + 3 >= testimonials.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => {
      if (prevIndex - 1 < 0) {
        // When we're at the beginning and go back, jump to the last valid starting position
        // This ensures we still see 3 testimonials (or whatever fits) at the end
        return Math.max(0, testimonials.length - 3);
      }
      return prevIndex - 1;
    });
  };

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-wrapper">
        <div
          className="HomePage-hero-section"
          style={{ backgroundImage: `url(${background})` }}
        >
          <ul className="HomePage-nav-tabs nav justify-content-center">
            <li className="nav-item">
              <button
                className={`HomePage-nav-link nav-link ${
                  activeTab === "packages" ? "HomePage-active" : ""
                }`}
                onClick={() => {
                  setActiveTab("packages");
                  navigate("/package");
                }}
              >
                Packages
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`HomePage-nav-link nav-link ${
                  activeTab === "flights" ? "HomePage-active" : ""
                }`}
                onClick={() => setActiveTab("flights")}
              >
                Flights
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`HomePage-nav-link nav-link ${
                  activeTab === "hotels" ? "HomePage-active" : ""
                }`}
                onClick={() => setActiveTab("hotels")}
              >
                Hotels
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`HomePage-nav-link nav-link ${
                  activeTab === "guide" ? "HomePage-active" : ""
                }`}
                onClick={() => setActiveTab("guide")}
              >
                Guide
              </button>
            </li>
          </ul>
        </div>

        {/*
          const [hotelDestination, setHotelDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(1);
         */}
        {/* Booking options */}
        <div className="HomePage-booking-options ">
          <div className="tab-content">
            {/* Hotel Booking Form */}
            {activeTab === "hotels" && (
              <form
                className="HomePage-form-inline form-inline justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(
                    setSearchHotel({
                      city: hotelDestination,
                      checkIn,
                      checkOut,
                      nights,
                    })
                  );
                  navigate("/hotels");
                }}
              >
                <input
                  type="text"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Enter Destination"
                  value={hotelDestination}
                  onChange={(e) => setHotelDestination(e.target.value)}
                />
                <input
                  type="date"
                  className="HomePage-form-control form-control m-2"
                  value={checkIn}
                  onChange={handleCheckInChange}
                />
                <input
                  type="date"
                  className="HomePage-form-control form-control m-2"
                  value={checkOut}
                  readOnly
                />
                <input
                  type="number"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Nights"
                  value={nights}
                  onChange={handleNightsChange}
                />
                <select
                  className="HomePage-form-control form-control m-2"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option>Jordanian</option>
                  <option>Foreign</option>
                </select>
                <button
                  type="submit"
                  className="HomePage-btn HomePage-btn-custom m-2"
                >
                  Search
                </button>
              </form>
            )}

            {/* Flight Booking Form */}
            {activeTab === "flights" && (
              <form
                className="HomePage-form-inline form-inline justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(
                    setSearchFlight({
                      departureCity,
                      arrivalCity,
                      departureDate,
                      returnDate,
                      travelers: flightTravellers,
                    })
                  );
                  console.log(flightTravellers);
                  dispatch(setTraveller(flightTravellers));
                  navigate("/flights");
                }}
              >
                <input
                  type="text"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Departure City"
                  onChange={(e) => setDepartureCity(e.target.value)}
                />
                <input
                  type="text"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Arrival City"
                  onChange={(e) => setArrivalCity(e.target.value)}
                />
                <input
                  type="date"
                  className="HomePage-form-control form-control m-2"
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                <input
                  type="date"
                  className="HomePage-form-control form-control m-2"
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <input
                  type="number"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Travellers"
                  onChange={(e) => setFlightTravellers(+e.target.value)}
                />
                <button
                  type="submit"
                  className="HomePage-btn HomePage-btn-custom m-2"
                >
                  Search
                </button>
              </form>
            )}

            {/* Guide Form */}
            {activeTab === "guide" && (
              <form
                className="HomePage-form-inline form-inline justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(
                    setSearchGuide({
                      city: guideCity,
                      date: guideDate,
                    })
                  );
                  dispatch(setTraveller(guideTravellers));
                  navigate("/guides");
                }}
              >
                <input
                  type="text"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Place"
                  onChange={(e) => setGuideCity(e.target.value)}
                />
                <input
                  type="date"
                  className="HomePage-form-control form-control m-2"
                  onChange={(e) => setGuideDate(e.target.value)}
                />
                <input
                  type="number"
                  className="HomePage-form-control form-control m-2"
                  placeholder="Travellers"
                  onChange={(e) => setGuideTravellers(e.target.value)}
                />
                <button
                  type="submit"
                  className="HomePage-btn HomePage-btn-custom m-2"
                >
                  Search
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Places Section */}
      <section className="HomePage-places-section py-5">
        <div className="container-fluid px-md-5">
          <div className="row align-items-center position-relative mb-5">
            <div
              className="col-md-3 offset-md-1"
              style={{ marginTop: "-200px" }}
            >
              <h2 className="mb-4">Most Beautiful Places in the World</h2>
              <p>
                There are many gorgeous places to visit and see, and here are
                some photos of them.
              </p>
              <button
                className="HomePage-btn btn btn-outline-dark"
                onClick={() => setIsChatOpen((prevState) => !prevState)}
              >
                ➤ Guide
              </button>
            </div>
            <div
              className="col-md-7 position-relative"
              style={{ height: "850px" }}
            >
              <div className="first-img">
                <img
                  src={cyprus}
                  className="HomePage-img img-fluid rounded shadow-sm"
                  alt="Cyprus"
                  style={{ width: "380px", height: "278px" }}
                />
              </div>
              <div className="second-img">
                <img
                  src={petra}
                  className="HomePage-img img-fluid rounded shadow-sm"
                  alt="Petra"
                  style={{ width: "354px", height: "457px" }}
                />
              </div>
              <div className="third-img">
                <img
                  src={bulgaria}
                  className="HomePage-img img-fluid rounded shadow-sm"
                  alt="Bulgaria"
                  style={{ width: "424px", height: "261px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Four Rectangles Section*/}
        <div className="container-fluid px-md-5 mt-5 pt-5">
          <div className="position-relative" style={{ height: "800px" }}>
            {/* Heading positioned on the right side */}
            <div
              className="position-absolute"
              style={{
                top: "300px",
                right: "5%",
                width: "40%",
                textAlign: "left",
              }}
            >
              <div className="why-us">
                <h2 className="mb-4">Why with us?</h2>
                <p>
                  Because we have a variety of packages and we got a tour guide
                  that can help you in your trip
                </p>
              </div>
            </div>

            {/* First rectangle */}
            <div
              className="position-absolute"
              style={{ top: "0", left: "5%", width: "295px" }}
            >
              <div className="rectangle first-rectangle">
                <div className="icon">
                  <FaGlobe size={50} />
                </div>
                <div className="text">
                  <h4>Worldwide Tours</h4>
                  <p>
                    There is a variety of packages and plans, choose the that
                    suits you the best.
                  </p>
                </div>
              </div>
            </div>

            {/* Second rectangle */}
            <div
              className="position-absolute"
              style={{ top: "20px", left: "25%", width: "295px" }}
            >
              <div className="rectangle second-rectangle">
                <div className="icon">
                  <FaPlane size={50} />
                </div>
                <div className="text">
                  <h4>Flight Booking</h4>
                  <p>
                    Find the best deals on flights to any destination worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Third rectangle */}
            <div
              className="position-absolute"
              style={{ top: "400px", left: "5%", width: "295px" }}
            >
              <div className="rectangle third-rectangle">
                <div className="icon">
                  <FaHotel size={50} />
                </div>
                <div className="text">
                  <h4>Hotel Accommodations</h4>
                  <p>
                    There are various hotels that you can choose from the
                    country that you want to visit.
                  </p>
                </div>
              </div>
            </div>

            {/* Fourth rectangle */}
            <div
              className="position-absolute"
              style={{ top: "420px", left: "25%", width: "295px" }}
            >
              <div className="rectangle fourth-rectangle">
                <div className="icon">
                  <FaMapMarkedAlt size={50} />
                </div>
                <div className="text">
                  <h4>Local Guides</h4>
                  <p>
                    Connect with experienced local guides for an authentic
                    experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Tours Section */}
      <section className="HomePage-popular-tours py-5">
        <div className="container-fluid px-md-5">
          {/* Section Heading */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-heading">Most Popular Tours</h2>
            </div>
          </div>

          {/* Tours Grid - First Row */}
          <div className="row justify-content-center mb-4">
            {/* Tour Card 1 */}
            <div className="col-md-6 mb-4">
              <div className="tour-card">
                <div className="tour-image">
                  <img src={alexandria} alt="Alexandria" />
                </div>
                <div className="tour-details">
                  <h3>Alexandria, Egypt</h3>
                  <br />
                  <br />
                  <div className="tour-meta">
                    <div className="meta-column">
                      <div className="meta-item">
                        <i className="fa fa-clock-o"></i>
                        <span>5 days</span>
                      </div>
                      <div className="meta-item">
                        <i className="fa fa-user"></i>
                        <span>10 people</span>
                      </div>
                    </div>
                  </div>
                  <div className="tour-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">5 </span>
                  </div>
                  <div className="tour-price">
                    <p>Starts from</p>
                    <h4>499 JOD</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="col-md-6 mb-4">
              <div className="tour-card">
                <div className="tour-image">
                  <img src={antalya} alt="Antalya" />
                </div>
                <div className="tour-details">
                  <h3>Antalya, Turkey</h3>
                  <br />
                  <br />
                  <div className="tour-meta">
                    <div className="meta-column">
                      <div className="meta-item">
                        <i className="fa fa-clock-o"></i>
                        <span>7 days</span>
                      </div>
                      <div className="meta-item">
                        <i className="fa fa-user"></i>
                        <span>12 people</span>
                      </div>
                    </div>
                  </div>
                  <div className="tour-rating">
                    <span className="stars">★★★★☆</span>
                    <span className="rating">4</span>
                  </div>
                  <div className="tour-price">
                    <p>Starts from</p>
                    <h4>510 JOD</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tours Grid - Second Row */}
          <div className="row justify-content-center">
            {/* Tour Card 3 */}
            <div className="col-md-6 mb-4">
              <div className="tour-card">
                <div className="tour-image">
                  <img src={wadirum} alt="Wadi Rum" />
                </div>
                <div className="tour-details">
                  <h3>Wadi Rum,Jordan</h3>
                  <br />
                  <br />
                  <div className="tour-meta">
                    <div className="meta-column">
                      <div className="meta-item">
                        <i className="fa fa-clock-o"></i>
                        <span>4 days</span>
                      </div>
                      <div className="meta-item">
                        <i className="fa fa-user"></i>
                        <span>8 people</span>
                      </div>
                    </div>
                  </div>
                  <div className="tour-rating">
                    <span className="stars">★★★★☆</span>
                    <span className="rating">4</span>
                  </div>
                  <div className="tour-price">
                    <p>Starts from</p>
                    <h4>359 JOD</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Card 4 */}
            <div className="col-md-6 mb-4">
              <div className="tour-card">
                <div className="tour-image">
                  <img src={deadsea} alt="Dead Sea" />
                </div>
                <div className="tour-details">
                  <h3>Dead Sea,Jordan</h3>
                  <br />
                  <br />
                  <div className="tour-meta">
                    <div className="meta-column">
                      <div className="meta-item">
                        <i className="fa fa-clock-o"></i>
                        <span>3 days</span>
                      </div>
                      <div className="meta-item">
                        <i className="fa fa-user"></i>
                        <span>6 people</span>
                      </div>
                    </div>
                  </div>
                  <div className="tour-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">5</span>
                  </div>
                  <div className="tour-price">
                    <p>Starts from</p>
                    <h4>299 JOD</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="HomePage-testimonials py-5">
        <div className="container-fluid px-md-5">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-heading">What Our Clients Say About Us</h2>
            </div>
          </div>

          <div className="testimonials-slider-container">
            <div className="testimonials-slider">
              <div
                className="testimonials-track"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 396}px)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div className="testimonial-slide" key={testimonial.id}>
                    <div className="testimonial-card">
                      <div className="testimonial-user-info">
                        <div className="user-icon">
                          <FaUser size={36} />
                        </div>
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < testimonial.rating ? "star filled" : "star"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="testimonial-name">
                          {testimonial.name}
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p>"{testimonial.text}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="testimonial-nav prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <button
              className="testimonial-nav next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
