import React from "react";
import CyprusCard from "../components/CyprusCard";
import { Container, Row, Col } from "react-bootstrap";

// Import images from assets folder


import ayianapaImg from "../assets/Ayia Napa.jpg";
import larnacaImg from "../assets/Larnaca.jpg";
import paphosImg from "../assets/Paphos.jpg";
import limassolImg from "../assets/Limassol.jpg";

const cyprus_city = [
    { id: "ayianapa", name: "Ayianapa", image: ayianapaImg },
    { id: "larnaca", name: "Larnaca", image: larnacaImg },
    { id: "paphos", name: "Paphos", image: paphosImg },
    { id: "limassol", name: "Limassol", image: limassolImg },
  
  ];



const Cyprus = () => {
  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {cyprus_city.map((pkg) => (
          <Col md={4} key={pkg.id} className="d-flex justify-content-center">
            <CyprusCard id={pkg.id} name={pkg.name} image={pkg.image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cyprus;