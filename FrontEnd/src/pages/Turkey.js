import React from "react";
import TurkeyCard from "../components/TurkeyCard";
import { Container, Row, Col } from "react-bootstrap";

// Import images from assets folder


import bodrumImg from "../assets/BODRUM.jpg";
import bursaImg from "../assets/BURSA.jpg";
import marmarisImg from "../assets/MARMARIS.jpg";
import istanbulImg from "../assets/Istanbul.jpg";

const turkey_city = [
    { id: "bodrum", name: "Bodrum", image: bodrumImg },
    { id: "bursa", name: "Bursa", image: bursaImg },
    { id: "marmaris", name: "Marmaris", image: marmarisImg },
    { id: "istanbul", name: "Istanbul", image: istanbulImg },
  
  ];



const Turkey = () => {
  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {turkey_city.map((pkg) => (
          <Col md={4} key={pkg.id} className="d-flex justify-content-center">
            <TurkeyCard id={pkg.id} name={pkg.name} image={pkg.image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Turkey;