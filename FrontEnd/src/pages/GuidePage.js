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
  { name: "John Doe", address: "Downtown, City", price: "50 JOD" },
  { name: "Jane Smith", address: "Beachside, City", price: "60 JOD" },
  { name: "Mark Johnson", address: "Mountain View, City", price: "55 JOD" },
  { name: "Emily Davis", address: "Old Town, City", price: "45 JOD" },
  { name: "Michael Brown", address: "City Center, City", price: "70 JOD" },
];

function GuidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [guides, setGuides] = useState(guidesData);
  const { city, date } = useSelector((state) => state.searchGuide);
  const { data } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/guide-daily-sites/city/${city}/date/${date}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(data);
  // Get search parameters from URL query
  const queryParams = new URLSearchParams(location.search);
  const initialPlace = queryParams.get("place") || "";
  const initialDate = queryParams.get("date") || "";

  // Function to filter guides based on user input
  function handleSearch(query) {
    const filteredGuides = guidesData.filter(
      (guide) =>
        guide.name.toLowerCase().includes(query.toLowerCase()) ||
        guide.address.toLowerCase().includes(query.toLowerCase())
    );
    setGuides(filteredGuides);

    // Update URL query parameters to reflect the current search
    navigate(
      `/guide?place=${encodeURIComponent(query)}&date=${encodeURIComponent(
        initialDate
      )}`,
      { replace: true }
    );
  }

  // Initial search on component mount if search parameters exist
  useEffect(() => {
    if (initialPlace) {
      handleSearch(initialPlace);
    }
  }, []);

  return (
    <>
    <PreLoader/>
    <div className="container mt-4">
      <SearchBox
        onSearch={handleSearch}
        initialPlace={initialPlace}
        initialDate={initialDate}
      />

      <div className="guides-list mt-4">
        {guides.length > 0 ? (
          guides.map((guide, index) => <GuideCard key={index} {...guide} />)
        ) : (
          <p className="text-center">
            No guides found matching your search criteria.
          </p>
        )}
      </div>
    </div>
   </>
   );
}

export default GuidePage;
