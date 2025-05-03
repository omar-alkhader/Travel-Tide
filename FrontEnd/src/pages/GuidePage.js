import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GuideCard from "../components/GuideCard";
import SearchBox from "../components/SearchBox";
import PreLoader from "../components/PreLoader";

import "../styles/NavBar.css";
import "../styles/global.css";
import "../styles/GuidePage.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const guidesData = [
  {
    id: 1,
    name: "John Doe",
    address: "Downtown, City",
    price: 50,
    touristCount: "14/25",
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "Beachside, City",
    price: 60,
    touristCount: "8/25",
    maxLimit: 25,
  },
  {
    id: 3,
    name: "Mark Johnson",
    address: "Mountain View, City",
    price: 55,
    touristCount: "19/25",
    maxLimit: 25,
  },
  {
    id: 4,
    name: "Emily Davis",
    address: "Old Town, City",
    price: 45,
    touristCount: "4/25",
    maxLimit: 25,
  },
  {
    id: 5,
    name: "Michael Brown",
    address: "City Center, City",
    price: 70,
    touristCount: "20/25",
    maxLimit: 25,
  },
];
function capitalize(str) {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
}
function GuidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [guides, setGuides] = useState(guidesData);
  const { city: citySearch, date } = useSelector((state) => state.searchGuide);
  const { city: cityBooking } = useSelector((state) => state.booking);
  console.log(citySearch);
  const city = citySearch || cityBooking;
  console.log(city);
  const { data, isError, isPending } = useQuery({
    queryKey: ["guides", citySearch, date],
    queryFn: async () => {
      try {
        if (!citySearch || !date) return;
        const res = await fetch(
          `http://127.0.0.1:6600/api/guide-daily-sites/city/${city}/date/${date}`
        );
        const data = await res.json();
        return data;
      } catch (err) {
        throw err;
      }
    },
  });
  console.log(data);
  // Get search parameters from URL query
  const queryParams = new URLSearchParams(location.search);
  const initialPlace = queryParams.get("place") || "";
  const initialDate = queryParams.get("date") || "";

  // Function to filter guides based on user input
  function handleSearch(query) {
    // const filteredGuides = guidesData.filter(
    //   (guide) =>
    //     guide.name.toLowerCase().includes(query.toLowerCase()) ||
    //     guide.address.toLowerCase().includes(query.toLowerCase())
    // );
    // setGuides(filteredGuides);
    // // Update URL query parameters to reflect the current search
    // navigate(
    //   `/guides?place=${encodeURIComponent(query)}&date=${encodeURIComponent(
    //     initialDate
    //   )}`,
    //   { replace: true }
    // );
  }

  // Initial search on component mount if search parameters exist
  useEffect(() => {
    if (initialPlace) {
      handleSearch(initialPlace);
    }
  }, []);
  if (isPending) {
    return <PreLoader />;
  }
  return (
    <div className="container mt-4">
      <SearchBox
        onSearch={handleSearch}
        initialPlace={`${capitalize(city)}`}
        initialDate={date}
      />
      <div className="guides-list mt-4">
        {data?.guides?.length > 0 ? (
          data?.guides.map((guide, index) => (
            <GuideCard key={index} guide={guide} />
          ))
        ) : (
          <p className="text-center">
            No guides found matching your search criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default GuidePage;
