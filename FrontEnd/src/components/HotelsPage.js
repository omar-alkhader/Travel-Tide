import React, { useState, useEffect } from "react";
import HotelSearchBox from "../components/HotelSearchBox";
import HotelCard from "../components/HotelCard";
import "../styles/HotelPage.css";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "../components/PreLoader";
import ErrorPage from "./ErrorPage";

function HotelsPage() {
  const searchHotel = useSelector((state) => state.searchHotel);

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [starRatings, setStarRatings] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["hotels", searchHotel],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/hotels/city/${searchHotel.city}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch hotels");
      return data;
    },
  });

  useEffect(() => {
    if (data?.hotels?.length > 0) {
      const fetchedHotels = data.hotels;
      setHotels(fetchedHotels);
      setFilteredHotels(fetchedHotels);

      const highest = Math.max(...fetchedHotels.map((h) => h.price));
      setMaxPrice(highest);
      setPriceRange([0, highest]);
    }
  }, [data]);

  useEffect(() => {
    if (!hotels.length) return;

    const selectedStars = Object.entries(starRatings)
      .filter(([_, selected]) => selected)
      .map(([star]) => parseInt(star));

    let filtered = [...hotels];

    if (selectedStars.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedStars.includes(hotel.stars)
      );
    }

    filtered = filtered.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    setFilteredHotels(filtered);
  }, [starRatings, priceRange, hotels]);

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setStarRatings({ 5: false, 4: false, 3: false, 2: false, 1: false });
    setFilteredHotels(hotels);
  };

  const handleStarChange = (star) => {
    setStarRatings((prev) => ({
      ...prev,
      [star]: !prev[star],
    }));
  };

  if (isPending) return <PreLoader />;
  if (isError || data?.hotels?.length === 0) {
    return <ErrorPage message={error?.message || "No hotels found."} />;
  }

  return (
    <div className="hotels-page-container">
      <div className="container mt-4">
        <HotelSearchBox
          initialDestination={searchHotel.city}
          initialCheckIn={searchHotel.checkIn}
          initialCheckOut={searchHotel.checkOut}
          initialTravelers={searchHotel.travellers}
        />

        <div className="hotels-content-container">
          {/* Filters */}
          <div className="hotels-filters">
            <div className="filters-header">
              <h4>Filters</h4>
              <button className="reset-filters" onClick={resetFilters}>
                Reset All
              </button>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h5>Price Range</h5>
              <div className="price-slider-container">
                <div className="price-display">
                  <span>{priceRange[0]} JOD</span>
                  <span>1000 JOD</span>
                </div>
                <div className="dual-slider">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="slider min-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="slider max-slider"
                  />
                </div>
              </div>
            </div>

            {/* Star Ratings */}
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
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <div className="no-hotels">
                <p>No hotels match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelsPage;
