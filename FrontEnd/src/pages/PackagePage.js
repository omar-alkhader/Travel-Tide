import React from "react";
import PackageCard from "../components/PackageCard";
import { Container, Row, Col } from "react-bootstrap";
import PreLoader from "../components/PreLoader";


// Import images from assets folder
import egyptImg from "../assets/egypt.jpg";
import jordanImg from "../assets/jordan.jpg";
import bulgariaImg from "../assets/bulgaria.jpg";
import cyprusImg from "../assets/cyprus.jpg";
import turkeyImg from "../assets/turkey.jpg";
import { useQuery } from "@tanstack/react-query";

const packages = [
  { id: "egypt", name: "Egypt", image: egyptImg },
  { id: "jordan", name: "Jordan", image: jordanImg },
  { id: "bulgaria", name: "Bulgaria", image: bulgariaImg },
  { id: "cyprus", name: "Cyprus", image: cyprusImg },
  { id: "turkey", name: "Turkey", image: turkeyImg },
];

const PackagePage = () => {
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:6600/api/countries");
      const data = await res.json();
      return data;
    },
  });
  if (!data) {
    return;
  }
  const { countries } = data;
  console.log(countries);
  return (
    <>
    <PreLoader/>
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {countries.map((pkg) => (
          <Col md={4} key={pkg.id} className="d-flex justify-content-center">
            <PackageCard id={pkg.id} name={pkg.name} image={pkg.photo} />
          </Col>
        ))}
      </Row>
    </Container>
  </>
  );
};

export default PackagePage;
