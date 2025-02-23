import React from "react";
import PackageCard from "../components/PackageCard";
import { Container, Row, Col } from "react-bootstrap";

// Import images from assets folder
import egyptImg from "../assets/egypt.jpg";
import jordanImg from "../assets/jordan.jpg";
import bulgariaImg from "../assets/bulgaria.jpg";
import cyprusImg from "../assets/cyprus.jpg";
import turkeyImg from "../assets/turkey.jpg";

const packages = [
  { id: "egypt", name: "Egypt", image: egyptImg },
  { id: "jordan", name: "Jordan", image: jordanImg },
  { id: "bulgaria", name: "Bulgaria", image: bulgariaImg },
  { id: "cyprus", name: "Cyprus", image: cyprusImg },
  { id: "turkey", name: "Turkey", image: turkeyImg },
];

const PackagePage = () => {
  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {packages.map((pkg) => (
          <Col md={4} key={pkg.id} className="d-flex justify-content-center">
            <PackageCard id={pkg.id} name={pkg.name} image={pkg.image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PackagePage;

