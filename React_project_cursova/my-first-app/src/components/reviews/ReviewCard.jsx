import React from "react";

function ReviewCard({ name, text, rating }) {
  return (
    <div className="review-card">
      <h4>{name}</h4>
      <p>{text}</p>
      <div>Оцінка: {rating} / 5</div>
    </div>
  );
}

export default ReviewCard;
