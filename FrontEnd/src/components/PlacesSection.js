import React from "react";

import cyprus from "../assets/cyprus.jpg";
import petra from "../assets/petra.jpg";

function PlacesSection() {
  return (
    <section className="HomePage-places-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">Most Beautiful Places in the World</h2>
            <p>There are many gorgeous places to visit and see, and here are some photos of them.</p>
            <button className="HomePage-btn btn btn-outline-dark">Guide</button>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 mb-3">
                <img src={cyprus} className="HomePage-img img-fluid rounded shadow-sm" alt="Beautiful Place" />
              </div>
              <div className="col-md-6 mb-3">
                <img src={petra} className="HomePage-img img-fluid rounded shadow-sm" alt="Beautiful Place" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlacesSection;