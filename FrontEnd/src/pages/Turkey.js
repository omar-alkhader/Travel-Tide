import React from "react";
import TurkeyCard from "../components/TurkeyCard";
import { Container, Row, Col } from "react-bootstrap";




import { useQuery } from "@tanstack/react-query";

const Turkey = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["city"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:6600/api/cities");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.data?.cities) {
    return <div>Failed to load cities.</div>;
  }

  const turkeyCities = data.data.cities.filter(city => city.country_id === 3);

  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {turkeyCities.map((city) => (
          <Col md={4} key={city.id} className="d-flex justify-content-center">
            <TurkeyCard id={city.id} name={city.name} image={city.photo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Turkey;
