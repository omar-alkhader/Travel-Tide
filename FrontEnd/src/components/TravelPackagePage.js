import React, { useState } from "react";
import TravelPackageCard from "../components/TravelPackageCard";
import FlightDetailsModal from "../components/FlightDetailsModal";
import "../styles/TravelPackagePage.css";

// Sample package data (combining hotels and flights)
const packagesData = [
    {
        id: 1,
        hotel: {
            name: "Grand Hyatt Amman",
            address: "Hussein Bin Ali Street, Jabal Amman",
            stars: 5,
            roomType: "Deluxe King Room",
            image: "/hotels/grand-hyatt.jpg"
        },
        flight: {
            id: 1,
            price: 350,
            airline: "Royal Jordanian",
            flightNumber: "RJ507",
            departure: {
                city: "Amman",
                time: "08:30",
                date: "2025-03-15"
            },
            arrival: {
                city: "Dubai",
                time: "12:45",
                date: "2025-03-15"
            },
            stops: 0,
            duration: "4h 15m",
            returnFlight: {
                airline: "Royal Jordanian",
                flightNumber: "RJ508",
                departure: {
                    city: "Dubai",
                    time: "14:30",
                    date: "2025-03-22"
                },
                arrival: {
                    city: "Amman",
                    time: "16:45",
                    date: "2025-03-22"
                },
                stops: 0,
                duration: "2h 15m"
            }
        },
        price: 450,
        tripDates: "Mar 15 - Mar 22, 2025",
        totalNights: 7
    },
    {
        id: 2,
        hotel: {
            name: "Four Seasons Hotel Amman",
            address: "Al-Kindi Street, 5th Circle, Jabal Amman",
            stars: 5,
            roomType: "Premier Suite with City View",
            image: "/hotels/four-seasons.jpg"
        },
        flight: {
            id: 2,
            price: 425,
            airline: "Emirates",
            flightNumber: "EK908",
            departure: {
                city: "Amman",
                time: "10:15",
                date: "2025-03-15"
            },
            arrival: {
                city: "Dubai",
                time: "15:30",
                date: "2025-03-15"
            },
            stops: 1,
            duration: "5h 15m",
            returnFlight: {
                airline: "Emirates",
                flightNumber: "EK909",
                departure: {
                    city: "Dubai",
                    time: "09:45",
                    date: "2025-03-22"
                },
                arrival: {
                    city: "Amman",
                    time: "12:00",
                    date: "2025-03-22"
                },
                stops: 0,
                duration: "2h 15m"
            }
        },
        price: 625,
        tripDates: "Mar 15 - Mar 22, 2025",
        totalNights: 7
    },
    {
        id: 3,
        hotel: {
            name: "W Amman",
            address: "Rafiq Al Hariri Avenue, Amman",
            stars: 4,
            roomType: "Wonderful Room with Two Twin Beds",
            image: "/hotels/w-hotel.jpg"
        },
        flight: {
            id: 3,
            price: 310,
            airline: "FlyDubai",
            flightNumber: "FZ632",
            departure: {
                city: "Amman",
                time: "06:20",
                date: "2025-03-15"
            },
            arrival: {
                city: "Dubai",
                time: "10:40",
                date: "2025-03-15"
            },
            stops: 0,
            duration: "4h 20m",
            returnFlight: {
                airline: "FlyDubai",
                flightNumber: "FZ633",
                departure: {
                    city: "Dubai",
                    time: "23:55",
                    date: "2025-03-22"
                },
                arrival: {
                    city: "Amman",
                    time: "02:15",
                    date: "2025-03-23"
                },
                stops: 0,
                duration: "2h 20m"
            }
        },
        price: 490,
        tripDates: "Mar 15 - Mar 22, 2025",
        totalNights: 7
    }
];

function TravelPackagePage() {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showFlightModal, setShowFlightModal] = useState(false);
    // Handle flight selection for modal
    const handleViewFlight = (flight) => {
        setSelectedFlight(flight);
        setShowFlightModal(true);
    };

    // Close flight modal
    const handleCloseModal = () => {
        setShowFlightModal(false);
        setSelectedFlight(null);
    };

    return (
        <div className="travel-packages-page-container">
            <div className="container mt-4">
                <h2 className="travel-packages-title">Travel Packages</h2>
                
                <div className="travel-packages-content-container">
                    {/* Package Results - Now full width */}
                    <div className="travel-packages-results">
                        {packagesData.map((pkg) => (
                            <TravelPackageCard 
                                key={pkg.id} 
                                package={pkg} 
                                onViewFlight={handleViewFlight}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Flight Details Modal */}
            {showFlightModal && selectedFlight && (
                <FlightDetailsModal 
                    flight={selectedFlight} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
}

export default TravelPackagePage;