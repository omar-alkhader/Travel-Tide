import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import cyprus from "../assets/cyprus.jpg";
import petra from "../assets/petra.jpg";
import bulgaria from "../assets/bulgaria.jpg";
import alexandria from "../assets/alexandria.jpg";
import antalya from "../assets/antalya.jpg";
import wadirum from "../assets/Wadi-Rum.jpg";
import deadsea from "../assets/dead-sea.jpg";
import aqaba from "../assets/aqaba.jpg";
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
import { setCity, setTraveller } from "../redux/bookingSlice";
import toast from "react-hot-toast";

function validateFlightSearch({
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  travelers,
}) {
  console.log("hello");
  const now = new Date();
  const depDate = new Date(departureDate);
  const retDate = new Date(returnDate);
  const oneDayInMs = 24 * 60 * 60 * 1000;

  if (
    !departureCity ||
    !arrivalCity ||
    !departureDate ||
    !returnDate ||
    !travelers
  ) {
    toast.error("All fields are required.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  if (departureCity === arrivalCity) {
    toast.error("Departure and arrival cities must be different.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  if (depDate <= now) {
    toast.error("Departure date must be in the future.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  if (retDate - depDate < oneDayInMs) {
    toast.error("Return date must be at least one day after departure.", {
      style: {
        backgroundColor: "#F56260",
        color: "#fff",
      },
    });
    return false;
  }

  return true;
}

function HomePage() {
  const { setIsChatOpen } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  // active tab
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    return location.state?.activeTab || "flights";
  });

  // Update the tab when location state changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);
  // Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Image data array with location information
  const carouselImages = [
    {
      id: 1,
      src: aqaba,
      name: "Aqaba",
      info: "Jordan's coastal paradise on the Red Sea, featuring vibrant coral reefs, crystal-clear waters, and world-class diving experiences.",
    },
    {
      id: 2,
      src: alexandria,
      name: "Alexandria",
      info: "Historic Mediterranean gem founded by Alexander the Great, home to ancient wonders, stunning corniche, and rich Greco-Roman heritage.",
    },
    {
      id: 3,
      src: antalya,
      name: "Antalya",
      info: "Turkish Riviera's jewel with pristine beaches, turquoise waters, ancient ruins, and dramatic backdrop of the Taurus Mountains.",
    },
    {
      id: 4,
      src: cyprus,
      name: "Cyprus",
      info: "Mediterranean island known for ancient ruins, beaches and delicious cuisine.",
    },
    {
      id: 5,
      src: bulgaria,
      name: "Bulgaria",
      info: "Rich history, stunning mountains and beautiful Black Sea coastline.",
    },
  ];

  // Set up automatic slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(timer);
  }, [activeSlide]);

  // Navigation functions for carousel
  const nextSlide = () => {
    setIsTransitioning(false);

    // Use requestAnimationFrame to ensure UI updates before starting the transition
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % carouselImages.length);
        setIsTransitioning(false);
      }, 500);
    });
  };

  const prevSlide = () => {
    setIsTransitioning(false);

    // Use requestAnimationFrame to ensure UI updates before starting the transition
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) =>
          prev === 0 ? carouselImages.length - 1 : prev - 1
        );
        setIsTransitioning(false);
      }, 500);
    });
  };

  // flight STATE
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightTravellers, setFlightTravellers] = useState(1);
  // Guide State
  const [guideCity, setGuideCity] = useState("");
  const [guideDate, setGuideDate] = useState("");
  const [guideTravellers, setGuideTravellers] = useState(0);
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
      {/* Hero Section with Carousel */}
      <div className="hero-wrapper">
        <div className="HomePage-hero-section">
          {/* Use a container for both background and content */}
          <div className="carousel-container">
            {/* Active slide serves as background */}
            {carouselImages.map((image, index) => (
              <div
                key={image.id}
                className={`full-slide-background ${
                  index === activeSlide ? "active" : ""
                } ${isTransitioning ? "transitioning" : ""}`}
                style={{
                  backgroundImage: `url(${image.src})`,
                  opacity: index === activeSlide ? 1 : 0,
                }}
              >
                {/* Location Information - only render for active slide */}
                {index === activeSlide && (
                  <div
                    className={`location-info ${
                      index === activeSlide ? "active" : ""
                    } ${
                      isTransitioning && index === activeSlide ? "fade-out" : ""
                    }`}
                  >
                    <h2>{image.name}</h2>
                    <p>{image.info}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Horizontal Stacked Carousel */}
            <div className="stacked-carousel horizontal">
              {carouselImages.map((image, index) => {
                const position =
                  (index - activeSlide + carouselImages.length) %
                  carouselImages.length;
                return (
                  <div
                    key={image.id}
                    className={`carousel-card ${
                      position === 0 ? "active" : ""
                    } ${
                      isTransitioning && index === activeSlide ? "fade-out" : ""
                    }`}
                    style={{
                      transform: `translateX(${position * 80 - 20}px) scale(${
                        position === 0 ? 1 : 0.85 - position * 0.05
                      })`,
                      opacity: position > 4 ? 0 : 1 - position * 0.2,
                      zIndex: carouselImages.length - position,
                    }}
                    onClick={() => {
                      if (position !== 0) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setActiveSlide(index);
                          setIsTransitioning(false);
                        }, 800);
                      }
                    }}
                  >
                    <img src={image.src} alt={image.name} />
                  </div>
                );
              })}

              {/* Carousel Navigation */}
              <div className="carousel-controls">
                <button className="carousel-arrow prev" onClick={prevSlide}>
                  <FaChevronLeft />
                </button>
                <button className="carousel-arrow next" onClick={nextSlide}>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>

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

        {/* Booking options */}
        <div className="HomePage-booking-options ">
          <div className="tab-content">
            {/* Hotel Booking Form */}
            {activeTab === "hotels" && (
              <form
                className="HomePage-form-inline form-inline justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  const today = new Date().setHours(0, 0, 0, 0);
                  const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);

                  if (checkInDate < today) {
                    toast.error(
                      "Check-in date must be today or in the future.",
                      {
                        style: {
                          backgroundColor: "#F56260",
                          color: "#fff",
                        },
                      }
                    );
                    return;
                  }
                  dispatch(
                    setSearchHotel({
                      city: hotelDestination,
                      checkIn,
                      checkOut,
                      nights,
                      travellers: 1,
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

            {/* Flight Booking Form */}
            {activeTab === "flights" && (
              <form
                className="HomePage-form-inline form-inline justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  const isValid = validateFlightSearch({
                    departureCity,
                    arrivalCity,
                    departureDate,
                    returnDate,
                    travelers: flightTravellers,
                  });
                  console.log(isValid);
                  if (!isValid) return;
                  console.log("hello");
                  dispatch(
                    setSearchFlight({
                      departureCity,
                      arrivalCity,
                      departureDate,
                      returnDate,
                      travelers: flightTravellers,
                      city: arrivalCity,
                    })
                  );
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

                  const currentDate = new Date(); // Get the current date and time
                  const guideDateValue = new Date(guideDate); // Convert guideDate to a Date object
                  console.log(guideTravellers);
                  // Check if guideDate is in the future (strictly greater than current date and time)
                  if (
                    guideDateValue <= currentDate ||
                    !guideCity ||
                    !guideDate ||
                    !guideTravellers
                  ) {
                    toast.error("please add propriate data", {
                      style: {
                        backgroundColor: "#F56260",
                        color: "#fff",
                      },
                    });
                    return; // Prevent navigation if the date is invalid
                  }

                  dispatch(
                    setSearchGuide({
                      city: guideCity,
                      date: guideDate,
                      travellers: guideTravellers,
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
              style={{ top: "420px", left: "26%", width: "280px" }}
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
                    <h4>499$</h4>
                  </div>
                  <button
                    className="tour-book-btn"
                    onClick={() => {
                      dispatch(setCity("Alexandria"));
                      navigate("/trip-details");
                    }}
                  >
                    Book Now
                  </button>
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
                    <h4>510$</h4>
                  </div>
                  <button
                    className="tour-book-btn"
                    onClick={() => {
                      dispatch(setCity("Antalya"));
                      navigate("/trip-details");
                    }}
                  >
                    Book Now
                  </button>
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
                  <img src={bulgaria} alt="Bulgaria" />
                </div>
                <div className="tour-details">
                  <h3>Bulgaria</h3>
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
                    <h4>359$</h4>
                  </div>
                  <button
                    className="tour-book-btn"
                    onClick={() => {
                      dispatch(setCity("Bulgaria"));
                      navigate("/trip-details");
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Tour Card 4 */}
            <div className="col-md-6 mb-4">
              <div className="tour-card">
                <div className="tour-image">
                  <img src={aqaba} alt="Aqaba" />
                </div>
                <div className="tour-details">
                  <h3>Aqaba,Jordan</h3>
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
                    <h4>299$</h4>
                  </div>
                  <button
                    className="tour-book-btn"
                    onClick={() => {
                      dispatch(setCity("Aqaba"));
                      navigate("/trip-details");
                    }}
                  >
                    Book Now
                  </button>
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
