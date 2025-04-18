import React from "react";
import JordanCard from "../components/JordanCard";
import { Container, Row, Col } from "react-bootstrap";

// Import images from assets folder


import petraImg from "../assets/petra.jpg";
import aqabaImg from "../assets/aqaba.jpg";


const jordan_city = [
    { id: "petra", name: "Petra", image: petraImg },
    { id: "aqaba", name: "Aqaba", image: aqabaImg },

  
  ];



const Jordan = () => {
  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {jordan_city.map((pkg) => (
          <Col md={4} key={pkg.id} className="d-flex justify-content-center">
            <JordanCard id={pkg.id} name={pkg.name} image={pkg.image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Jordan;