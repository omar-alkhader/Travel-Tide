import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightSearchBox from "../components/FlightSearchBox";
import FlightCard from "../components/FlightCard";
import "../styles/FlightsPage.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "../components/PreLoader";
import ErrorPage from "./ErrorPage";

// Sample flight data
const flightsData = [
  {
    id: 1,
    price: 350,
    airline: "Royal Jordanian",
    flightNumber: "RJ507",
    departure: {
      city: "Amman",
      time: "08:30",
      date: "2025-03-15",
    },
    arrival: {
      city: "Dubai",
      time: "12:45",
      date: "2025-03-15",
    },
    stops: 0,
    duration: "4h 15m",
    returnFlight: {
      airline: "Royal Jordanian",
      flightNumber: "RJ508",
      departure: {
        city: "Dubai",
        time: "14:30",
        date: "2025-03-22",
      },
      arrival: {
        city: "Amman",
        time: "16:45",
        date: "2025-03-22",
      },
      stops: 0,
      duration: "2h 15m",
    },
  },
  {
    id: 2,
    price: 425,
    airline: "Emirates",
    flightNumber: "EK908",
    departure: {
      city: "Amman",
      time: "10:15",
      date: "2025-03-15",
    },
    arrival: {
      city: "Dubai",
      time: "15:30",
      date: "2025-03-15",
    },
    stops: 1,
    duration: "5h 15m",
    returnFlight: {
      airline: "Emirates",
      flightNumber: "EK909",
      departure: {
        city: "Dubai",
        time: "09:45",
        date: "2025-03-22",
      },
      arrival: {
        city: "Amman",
        time: "12:00",
        date: "2025-03-22",
      },
      stops: 0,
      duration: "2h 15m",
    },
  },
  {
    id: 3,
    price: 310,
    airline: "FlyDubai",
    flightNumber: "FZ632",
    departure: {
      city: "Amman",
      time: "06:20",
      date: "2025-03-15",
    },
    arrival: {
      city: "Dubai",
      time: "10:40",
      date: "2025-03-15",
    },
    stops: 0,
    duration: "4h 20m",
    returnFlight: {
      airline: "FlyDubai",
      flightNumber: "FZ633",
      departure: {
        city: "Dubai",
        time: "23:55",
        date: "2025-03-22",
      },
      arrival: {
        city: "Amman",
        time: "02:15",
        date: "2025-03-23",
      },
      stops: 0,
      duration: "2h 20m",
    },
  },
];

// Available airlines
const airlines = [
  { name: "Royal Jordanian", code: "RJ", price: "From 350 JOD" },
  { name: "Emirates", code: "EK", price: "From 425 JOD" },
  { name: "FlyDubai", code: "FZ", price: "From 310 JOD" },
  { name: "Qatar Airways", code: "QR", price: "From 390 JOD" },
  { name: "Turkish Airlines", code: "TK", price: "From 380 JOD" },
];
// هاظ الفنكشن اللي برسل للسيرفر عشان يجيب الطيارات
const fetchFlights = async (search) => {
  const { arrivalCity, departureCity, departureDate, returnDate, travelers } =
    search;

  const response = await fetch(
    `http://127.0.0.1:6600/api/flights/roundtrips?departure_city=${departureCity}&arrival_city=${arrivalCity}&departure_date=${departureDate}&return_date=${returnDate}&num_participant=${travelers}`
  );
  const data = await response.json();
  return data;
};

function FlightsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState(flightsData);
  const [priceRange, setPriceRange] = useState([300, 500]);
  const [selectedAirlines, setSelectedAirlines] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [test, setTest] = useState(null);
  // Get search parameters from URL query
  const queryParams = new URLSearchParams(location.search);
  const initialDepartureCity = queryParams.get("departureCity") || "";
  const initialArrivalCity = queryParams.get("arrivalCity") || "";
  const initialDepartureDate = queryParams.get("departureDate") || "";
  const initialReturnDate = queryParams.get("returnDate") || "";
  const initialTravelers = queryParams.get("travelers") || "1";
  const search = useSelector((state) => state.searchFlight);
  const { data, isPending, isError } = useQuery({
    queryKey: ["flights", search],
    queryFn: () => fetchFlights(search),
  });
  // console.log(flightsData);
  useEffect(() => {
    // Check if this is a page refresh by examining the navigation type
    const isPageRefresh =
      window.performance &&
      window.performance.navigation &&
      window.performance.navigation.type === 1;

    // Alternative method for newer browsers
    const navEntries = performance.getEntriesByType("navigation");
    const isRefresh = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isPageRefresh || isRefresh) {
      // This is a page refresh, clear URL parameters
      navigate("/flights", { replace: true });
      setIsInitialLoad(true);
    }
  }, []);
  useEffect(() => {
    setTest(data?.flights);
  }, [data]);
  console.log(test);
  console.log(isPending);
  if (isPending) {
    console.log("HEllo");
  }
  console.log(data);
  // Function to filter flights
  const filterFlights = () => {
    let filtered = [...flightsData];

    // Filter by price
    filtered = filtered.filter(
      (flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );

    // Filter by selected airlines
    const selectedAirlinesList = Object.entries(selectedAirlines)
      .filter(([_, selected]) => selected)
      .map(([airline, _]) => airline);

    if (selectedAirlinesList.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedAirlinesList.includes(flight.airline)
      );
    }

    setFlights(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([300, 500]);
    setSelectedAirlines({});
    setFlights(flightsData);
  };

  // Handle airline selection
  const handleAirlineChange = (airline) => {
    setSelectedAirlines({
      ...selectedAirlines,
      [airline]: !selectedAirlines[airline],
    });
  };

  // Apply filters when they change
  useEffect(() => {
    filterFlights();
  }, [priceRange, selectedAirlines]);
  if (isPending) {
    return <PreLoader />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <>
      <PreLoader />
      <div className="flights-page-container">
        <div className="container mt-4">
          <FlightSearchBox
            initialDepartureCity={`${search.departureCity[0].toUpperCase()}${search.departureCity
              .slice(1)
              .toLowerCase()}`}
            initialArrivalCity={`${search.arrivalCity[0].toUpperCase()}${search.arrivalCity
              .slice(1)
              .toLowerCase()}`}
            initialDepartureDate={search.departureDate}
            initialReturnDate={search.returnDate}
            initialTravelers={search.travelers}
          />

          <div className="flights-content-container">
            {/* Filters Section */}
            <div className="flights-filters">
              <div className="filters-header">
                <h4>Filters</h4>
                <button className="reset-filters" onClick={resetFilters}>
                  Reset All
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <h5>Price Range</h5>
                <div className="price-slider-container">
                  <div className="price-display">
                    <span>{priceRange[0]} JOD</span>
                    <span>{priceRange[1]} JOD</span>
                  </div>
                  <div className="dual-slider">
                    <input
                      type="range"
                      min="300"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="slider min-slider"
                    />
                    <input
                      type="range"
                      min="300"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="slider max-slider"
                    />
                  </div>
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="filter-section">
                <h5>Airlines</h5>
                {airlines.map((airline) => (
                  <div key={airline.code} className="airline-option">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={!!selectedAirlines[airline.name]}
                        onChange={() => handleAirlineChange(airline.name)}
                      />
                      <span className="checkmark"></span>
                      <div className="airline-info">
                        <span className="airline-name">{airline.name}</span>
                        <span className="airline-price">{airline.price}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Flight Results */}
            <div className="flights-results">
              {test?.length > 0 ? (
                test.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))
              ) : (
                <div className="no-flights">
                  <p>No flights match your search criteria.</p>
                  <p>Try adjusting your filters or search parameters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightsPage;
