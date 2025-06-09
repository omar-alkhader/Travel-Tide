import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FlightSearchBox from "../components/FlightSearchBox";
import FlightCard from "../components/FlightCard";
import PreLoader from "../components/PreLoader";
import ErrorPage from "./ErrorPage";
import "../styles/FlightsPage.css";

// Fetch flights
const fetchFlights = async (search) => {
  const { arrivalCity, departureCity, departureDate, returnDate, travelers } =
    search;
  const response = await fetch(
    `http://127.0.0.1:6600/api/flights/roundtrips?departure_city=${departureCity}&arrival_city=${arrivalCity}&departure_date=${departureDate}&return_date=${returnDate}&num_participant=${travelers}`
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch flights");
  return data;
};

function FlightsPage() {
  const navigate = useNavigate();
  const search = useSelector((state) => state.searchFlight);

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedAirlines, setSelectedAirlines] = useState({});
  const [airlineOptions, setAirlineOptions] = useState([]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["flights", search],
    queryFn: () => fetchFlights(search),
  });

  // Extract airlines and set filters
  useEffect(() => {
    if (!data?.flights) return;

    const flightsData = data.flights;
    setFlights(flightsData);
    setFilteredFlights(flightsData);

    const airlineMap = {};
    flightsData.forEach((flight) => {
      const name = flight.airline;
      const price = parseFloat(flight.totalPrice);
      if (!airlineMap[name] || price < airlineMap[name]) {
        airlineMap[name] = price;
      }
    });
    const options = Object.entries(airlineMap).map(([name, price]) => ({
      name,
      price,
    }));
    setAirlineOptions(options);

    const highestPrice = Math.max(
      ...flightsData.map((f) => parseFloat(f.totalPrice))
    );
    setMaxPrice(highestPrice);
    setPriceRange([0, highestPrice]);
  }, [data]);

  // Apply filters
  useEffect(() => {
    if (!flights.length) return;

    const selectedNames = Object.entries(selectedAirlines)
      .filter(([_, selected]) => selected)
      .map(([name]) => name);

    let filtered = [...flights];

    if (selectedNames.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedNames.includes(flight.airline)
      );
    }

    filtered = filtered.filter((flight) => {
      const price = parseFloat(flight.totalPrice);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredFlights(filtered);
  }, [selectedAirlines, priceRange, flights]);

  const resetFilters = () => {
    setSelectedAirlines({});
    setPriceRange([0, maxPrice]);
    setFilteredFlights(flights);
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirlines((prev) => ({
      ...prev,
      [airline]: !prev[airline],
    }));
  };

  if (isPending) return <PreLoader />;
  if (isError || data?.flights?.length === 0)
    return <ErrorPage message={data?.message || error.message} />;

  return (
    <div className="flights-page-container">
      <div className="container mt-4">
        <FlightSearchBox />

        <div className="flights-content-container">
          <div className="flights-filters">
            <div className="filters-header">
              <h4>Filters</h4>
              <button className="reset-filters" onClick={resetFilters}>
                Reset All
              </button>
            </div>

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
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseFloat(e.target.value), priceRange[1]])
                    }
                    className="slider min-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseFloat(e.target.value)])
                    }
                    className="slider max-slider"
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h5>Airlines</h5>
              {airlineOptions.map((airline) => (
                <div key={airline.name} className="airline-option">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={!!selectedAirlines[airline.name]}
                      onChange={() => handleAirlineChange(airline.name)}
                    />
                    <span className="checkmark"></span>
                    <div className="airline-info">
                      <span className="airline-name">{airline.name}</span>
                      <span className="airline-price">
                        From {airline.price} JOD
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flights-results">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="no-flights">
                <p>No flights match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightsPage;
