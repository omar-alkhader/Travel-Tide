import React from "react";

function PriceDetailsModal({ pkg, onClose }) {
    return (
        <div className="price-details-overlay" onClick={onClose}>
            <div className="price-details-popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h4>Price Details</h4>
                    <button className="close-popup" onClick={onClose}>×</button>
                </div>
                <div className="price-details-content">
                    <div className="price-detail-item">
                        <span>Hotel ({pkg.totalNights} nights):</span>
                        <span>{pkg.price - pkg.flight.price} JOD</span>
                    </div>
                    <div className="price-detail-item">
                        <span>Flight:</span>
                        <span>{pkg.flight.price} JOD</span>
                    </div>
                    <div className="price-detail-item total">
                        <span>Total per person:</span>
                        <span>{pkg.price} JOD</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PriceDetailsModal;