import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PreLoader from "../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import ErrorPage from "../components/ErrorPage";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const country_id = searchParams.get("country_id");

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["city", country_id],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:6600/api/cities/country/${country_id}`
      );
      const json = await res.json();

      if (!res.ok) {
        // Pass custom error to React Query
        throw new Error(json.message || "failed to fetch");
      }

      return json;
    },
  });

  if (isPending) return <PreLoader />;

  if (isError) {
    return (
      <ErrorPage message={error?.message || "An unknown error occurred"} />
    );
  }

  const { cities } = data;

  return (
    <Container className="text-center my-5">
      <h2>Choose Your Package</h2>
      <Row className="mt-4">
        {cities?.map((city) => (
          <Col md={4} key={city.id} className="d-flex justify-content-center">
            <CityCard id={city.id} name={city.name} image={city.photo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CityPage;
