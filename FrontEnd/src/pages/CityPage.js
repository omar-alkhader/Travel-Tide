import React from "react";
import TurkeyCard from "../components/TurkeyCard";
import { Container, Row, Col } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("country_id"));
  const country_id = searchParams.get("country_id");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["city", country_id],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/cities/country/${country_id}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(isError);
  if (isError || !data.cities) {
    return <div>Failed to load cities.</div>;
  }
  const { cities } = data;
  console.log(data);
  return (
    <>
    <PreLoader/>
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {cities.map((city) => (
          <Col md={4} key={city.id} className="d-flex justify-content-center">
            <TurkeyCard id={city.id} name={city.name} image={city.photo} />
          </Col>
        ))}
      </Row>
    </Container>
  </>
  );
};

export default CityPage;
