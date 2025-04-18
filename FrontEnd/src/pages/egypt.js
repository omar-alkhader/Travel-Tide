import React from "react";
import EgyptCard from "../components/EgyptCard";
import { Container, Row, Col } from "react-bootstrap";

// Import images from assets folder


import alexandariaImg from "../assets/ALEXANDARIA.jpg";

const egypt_city = [
    { id: "alexandaria", name: "Alexandaria", image: alexandariaImg },

  ];



const Egypt = () => {
  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {egypt_city.map((pkg) => (
          <Col md={4} key={pkg.id} className="d-flex justify-content-center">
            <EgyptCard id={pkg.id} name={pkg.name} image={pkg.image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Egypt;