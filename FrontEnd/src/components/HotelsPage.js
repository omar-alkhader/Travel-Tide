import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelSearchBox from "../components/HotelSearchBox";
import HotelCard from "../components/HotelCard";
import "../styles/HotelPage.css";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "../components/PreLoader";
import ErrorPage from "./ErrorPage";

// Sample hotel data (You can remove this once you're fetching from API)
const hotelsData = [
  {
    id: 1,
    name: "Grand Hyatt Amman",
    address: "Hussein Bin Ali Street, Jabal Amman",
    stars: 5,
    price: 150,
    roomType: "Deluxe King Room",
    image: "/hotels/grand-hyatt.jpg",
  },
  {
    id: 2,
    name: "Four Seasons Hotel Amman",
    address: "Al-Kindi Street, 5th Circle, Jabal Amman",
    stars: 5,
    price: 220,
    roomType: "Premier Suite with City View",
    image: "/hotels/four-seasons.jpg",
  },
  // Add more mock data here
];

function HotelsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]); // State for filtered hotels
  const [priceRange, setPriceRange] = useState([100, 250]); // Price range filter state
  const [starRatings, setStarRatings] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  }); // Star ratings filter state

  const [isInitialLoad, setIsInitialLoad] = useState(true); // Initial load state

  // Get search parameters from URL query
  const queryParams = new URLSearchParams(location.search);
  const initialDestination = queryParams.get("destination") || "";
  const initialCheckIn = queryParams.get("checkIn") || "";
  const initialCheckOut = queryParams.get("checkOut") || "";
  const initialTravelers = queryParams.get("travelers") || "1";

  const searchHotel = useSelector((state) => state.searchHotel);
  console.log(searchHotel);
  const { data, isPending, isError } = useQuery({
    queryKey: ["hotels", searchHotel],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/hotels/city/${searchHotel.city}`
      );
      const data = await res.json();
      return data;
    },
  });

  // Store the hotels from the API response in state
  useEffect(() => {
    if (data?.hotels) {
      setHotels(data.hotels);
    }
  }, [data]);

  // Reset filters
  const resetFilters = () => {
    setPriceRange([100, 250]);
    setStarRatings({
      5: false,
      4: false,
      3: false,
      2: false,
      1: false,
    });
    if (data?.hotels) {
      setHotels(data.hotels); // Reset hotels to original fetched data
    }
  };

  // Handle price range filter
  const filterHotels = () => {
    if (!data?.hotels) return;
    let filtered = [...data?.hotels]; // Start with the fetched hotels
    // Apply price range filter
    filtered = filtered.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Apply star rating filter
    const selectedStars = Object.entries(starRatings)
      .filter(([_, selected]) => selected)
      .map(([star]) => parseInt(star));

    if (selectedStars.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedStars.includes(hotel.stars)
      );
    }

    setHotels(filtered); // Update hotels state with filtered results
  };

  // Apply filters when they change
  useEffect(() => {
    filterHotels();
  }, [priceRange, starRatings]);

  if (isPending) {
    return <PreLoader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <PreLoader />
      <div className="hotels-page-container">
        <div className="container mt-4">
          <HotelSearchBox
            initialDestination={initialDestination}
            initialCheckIn={initialCheckIn}
            initialCheckOut={initialCheckOut}
            initialTravelers={initialTravelers}
          />

          <div className="hotels-content-container">
            {/* Filters Section */}
            <div className="hotels-filters">
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
                      min="100"
                      max="250"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="slider min-slider"
                    />
                    <input
                      type="range"
                      min="100"
                      max="250"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="slider max-slider"
                    />
                  </div>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div className="filter-section">
                <h5>Star Rating</h5>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="star-option">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={starRatings[star]}
                        onChange={() => {
                          setStarRatings((prev) => ({
                            ...prev,
                            [star]: !prev[star],
                          }));
                        }}
                      />
                      <span className="checkmark"></span>
                      <div className="star-rating">
                        {Array(star)
                          .fill()
                          .map((_, i) => (
                            <FaStar key={i} className="star-icon" />
                          ))}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Results */}
            <div className="hotels-results">
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))
              ) : (
                <div className="no-hotels">
                  <p>No hotels match your search criteria.</p>
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

export default HotelsPage;
