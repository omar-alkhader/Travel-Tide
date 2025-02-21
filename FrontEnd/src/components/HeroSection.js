import React, { useState } from "react";

import background from "../assets/dead-sea.jpg";

function HeroSection() {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <div className="HomePage-hero-section" style={{ backgroundImage: `url(${background})` }}>
      <div className=" text-center h-100 d-flex flex-column justify-content-between">
        <div className="HomePage-booking-options w-100">
          <ul className="HomePage-nav-tabs nav justify-content-center mb-3">
            <li className="nav-item">
              <button className={`HomePage-nav-link nav-link ${activeTab === "packages" ? "HomePage-active" : ""}`} onClick={() => setActiveTab("packages")}>Packages</button>
            </li>
            <li className="nav-item">
              <button className={`HomePage-nav-link nav-link ${activeTab === "flights" ? "HomePage-active" : ""}`} onClick={() => setActiveTab("flights")}>Flights</button>
            </li>
            <li className="nav-item">
              <button className={`HomePage-nav-link nav-link ${activeTab === "hotels" ? "HomePage-active" : ""}`} onClick={() => setActiveTab("hotels")}>Hotels</button>
            </li>
            <li className="nav-item">
              <button className={`HomePage-nav-link nav-link ${activeTab === "guide" ? "HomePage-active" : ""}`} onClick={() => setActiveTab("guide")}>Guide</button>
            </li>
          </ul>

          <div className="tab-content">
            {/* Common form structure for all tabs */}
            {(activeTab === "packages" || activeTab === "flights" || activeTab === "hotels") && (
              <form className="HomePage-form-inline form-inline justify-content-center">
                <input type="text" className="HomePage-form-control form-control m-2" placeholder="Departure City" />
                <input type="text" className="HomePage-form-control form-control m-2" placeholder="Arrival City" />
                <input type="date" className="HomePage-form-control form-control m-2" />
                <input type="date" className="HomePage-form-control form-control m-2" />
                <input type="number" className="HomePage-form-control form-control m-2" placeholder="Travellers" />
                <button type="submit" className="HomePage-btn btn btn-primary m-2">Search</button>
              </form>
            )}

            {/* Guide Form */}
            {activeTab === "guide" && (
              <form className="HomePage-form-inline form-inline justify-content-center">
                <input type="text" className="HomePage-form-control form-control m-2" placeholder="Place" />
                <input type="date" className="HomePage-form-control form-control m-2" />
                <button type="submit" className="HomePage-btn btn btn-primary m-2">Search</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;