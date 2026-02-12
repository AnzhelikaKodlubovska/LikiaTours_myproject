import BookingForm from "./BookingForm";
import React from "react";
import "../../styles/TourDetails.css";

function TourDetails({ tour }) {
  return (
    <div className="tour-details-page">
      <div className="tour-details-container">
        <div className="tour-image-block">
          <img src={tour.image} alt={tour.title} />
        </div>

        <div className="tour-info-block">
          <h1>
            {tour.title}, ({tour.nights} ночей)
          </h1>
          <p className="tour-description">{tour.description}</p>
          <p className="price">
            <strong>Ціна:</strong> {tour.price} грн
          </p>

          <div className="booking-section">
            <BookingForm tourName={tour.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
