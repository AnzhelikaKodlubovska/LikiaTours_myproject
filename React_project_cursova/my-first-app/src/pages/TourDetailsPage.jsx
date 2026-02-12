import React from "react";
import { useParams } from "react-router-dom";
import { tours } from "../data/mockTours";
import TourDetails from "../components/tourDetails/TourDetails";
import "../styles/TourDetails.css";

function TourDetailsPage() {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === parseInt(id));

  if (!tour) {
    return (
      <main className="tour-details-page">
        <p className="not-found">Тур не знайдено</p>
      </main>
    );
  }

  return (
    <main className="tour-details-page">
      <TourDetails tour={tour} />
    </main>
  );
}

export default TourDetailsPage;
