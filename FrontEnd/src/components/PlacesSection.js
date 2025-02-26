import React from "react";
import cyprus from "../assets/cyprus.jpg";
import petra from "../assets/petra.jpg";
import bulgaria from "../assets/bulgaria.jpg";

function PlacesSection() {
  return (
    <section className="HomePage-places-section py-5">
      <div className="container">
        <div className="row align-items-center position-relative">
          <div className="col-md-4">
            <h2 className="mb-4">Most Beautiful Places in the World</h2>
            <p>There are many gorgeous places to visit and see, and here are some photos of them.</p>
            <button className="HomePage-btn btn btn-outline-dark">➤ Guide</button>
          </div>
          <div className="col-md-8 position-relative" style={{ height: '500px' }}>
            <div className="first-img">
              <img 
                src={cyprus} 
                className="HomePage-img img-fluid rounded shadow-sm" 
                alt="Cyprus" 
                style={{ width: '380px', height: '278px' }} 
              />
            </div>
            <div className="second-img">
              <img 
                src={petra} 
                className="HomePage-img img-fluid rounded shadow-sm" 
                alt="Petra" 
                style={{ width: '354px', height: '457px' }} 
              />
            </div>
            <div className="third-img">
              <img 
                src={bulgaria} 
                className="HomePage-img img-fluid rounded shadow-sm" 
                alt="Bulgaria" 
                style={{ width: '424px', height: '261px' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlacesSection;