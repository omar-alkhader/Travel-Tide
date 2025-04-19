import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelSearchBox from "../components/HotelSearchBox";
import HotelCard from "../components/HotelCard";
import "../styles/HotelPage.css";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// Sample hotel data
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
  {
    id: 3,
    name: "W Amman",
    address: "Rafiq Al Hariri Avenue, Amman",
    stars: 4,
    price: 180,
    roomType: "Wonderful Room with Two Twin Beds",
    image: "/hotels/w-hotel.jpg",
  },
  {
    id: 4,
    name: "Kempinski Hotel Amman",
    address: "Abdul Hamid Shouman Street, Shmeisani",
    stars: 5,
    price: 190,
    roomType: "Superior Room",
    image: "/hotels/kempinski.jpg",
  },
  {
    id: 5,
    name: "The House Boutique Suites",
    address: "Al-Hussein Bin Ali Street, Jabal Amman",
    stars: 3,
    price: 120,
    roomType: "Junior Suite",
    image: "/hotels/house-boutique.jpg",
  },
];

function HotelsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState(hotelsData);
  const [priceRange, setPriceRange] = useState([100, 250]);
  const [starRatings, setStarRatings] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Get search parameters from URL query
  const queryParams = new URLSearchParams(location.search);
  const initialDestination = queryParams.get("destination") || "";
  const initialCheckIn = queryParams.get("checkIn") || "";
  const initialCheckOut = queryParams.get("checkOut") || "";
  const initialTravelers = queryParams.get("travelers") || "1";
  const searchHotel = useSelector((state) => state.searchHotel);
  const { data } = useQuery({
    queryKey: ["hotels", searchHotel],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/hotels/city/${searchHotel.city}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(data);
  useEffect(() => {
    const isPageRefresh =
      window.performance &&
      window.performance.navigation &&
      window.performance.navigation.type === 1;

    const navEntries = performance.getEntriesByType("navigation");
    const isRefresh = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isPageRefresh || isRefresh) {
      navigate("/hotels", { replace: true });
      setIsInitialLoad(true);
    }
  }, []);

  // Filter hotels
  const filterHotels = () => {
    let filtered = [...hotelsData];

    // Filter by price range
    filtered = filtered.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Filter by star rating if any are selected
    const selectedStars = Object.entries(starRatings)
      .filter(([_, selected]) => selected)
      .map(([star, _]) => parseInt(star));

    if (selectedStars.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedStars.includes(hotel.stars)
      );
    }

    setHotels(filtered);
  };

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
    setHotels(hotelsData);
  };

  // Handle star rating selection
  const handleStarChange = (star) => {
    setStarRatings((prev) => ({
      ...prev,
      [star]: !prev[star],
    }));
  };

  // Apply filters when they change
  useEffect(() => {
    filterHotels();
  }, [priceRange, starRatings]);

  return (
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
                      onChange={() => handleStarChange(star)}
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
              hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
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
  );
}

export default HotelsPage;
