import React from "react";
import { useNavigate } from "react-router-dom";
import TouristCard from "../components/TouristCard";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import touristImg from "../assets/tourist.png";

const fetchTourists = async (guideId) => {
  const res = await fetch(
    `http://127.0.0.1:6600/api/guides/${guideId}/bookers`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tourists");
  }
  return res.json();
};

const RequestPage = () => {
  const navigate = useNavigate();

  // Get user role and guideId from Redux store
  const role = useSelector((state) => state.user.role);
  const guideId = useSelector((state) => state.user.user?.id);
  const test = useSelector((state) => state.user);
  console.log(test);

  const isGuide = role === "guide";

  // Use React Query to fetch tourists only if user is a guide
  const { data, error, isLoading } = useQuery({
    queryKey: ["tourists", guideId],
    queryFn: () => fetchTourists(guideId),
    enabled: isGuide && !!guideId, // only run if guide and guideId exist
  });

  if (!isGuide) {
    return <p>You must be a guide to view this page.</p>;
  }

  if (isLoading) return <p>Loading tourists...</p>;

  if (error) {
    toast.error(error.message || "Error fetching tourists");
    return <p>Failed to load tourists</p>;
  }

  const tourists =
    data?.bookers?.map((tourist) => ({
      ...tourist,
      avatar: touristImg,
    })) || [];

  return (
    <div className="container mt-4">
      <h3 className="customization-title">Tourists who booked with you:</h3>
      <div className="row">
        {tourists.map((tourist, index) => (
          <TouristCard key={index} tourist={tourist} />
        ))}
      </div>
    </div>
  );
};

export default RequestPage;
