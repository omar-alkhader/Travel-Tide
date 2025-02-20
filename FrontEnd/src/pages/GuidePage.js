import React, { useState } from "react";
import GuideCard from "../components/GuideCard";
import SearchBox from "../components/SearchBox"; // Now used in JSX

import "../styles/NavBar.css";
import "../styles/global.css";
import "../styles/GuidePage.css";

const guidesData = [
  { name: "John Doe", address: "Downtown, City", price: "50 JOD" },
  { name: "Jane Smith", address: "Beachside, City", price: "60 JOD" },
  { name: "Mark Johnson", address: "Mountain View, City", price: "55 JOD" },
  { name: "Emily Davis", address: "Old Town, City", price: "45 JOD" },
  { name: "Michael Brown", address: "City Center, City", price: "70 JOD" }
];

function GuidePage() {
  const [guides, setGuides] = useState(guidesData);

  // Function to filter guides based on user input
  function handleSearch(query) {
    const filteredGuides = guidesData.filter((guide) =>
      guide.name.toLowerCase().includes(query.toLowerCase())
    );
    setGuides(filteredGuides);
  }

  return (
    <div className="container mt-4">
     

      {/* SearchBox component now included and passing search handler */}
      <SearchBox onSearch={handleSearch} />

      {guides.map((guide, index) => (
        <GuideCard key={index} {...guide} />
      ))}
    </div>
  );
}

export default GuidePage;
