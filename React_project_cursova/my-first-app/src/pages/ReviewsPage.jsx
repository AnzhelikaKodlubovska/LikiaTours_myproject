import React, { useState } from "react";
import { initialReviews } from "../data/reviews";
import "../styles/ReviewsPage.css";

function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !text.trim()) return;
    const newReview = { id: Date.now(), name, city, text };
    setReviews([...reviews, newReview]);
    setName("");
    setCity("");
    setText("");
  };

  return (
    <div className="reviews-page">
      {/* Декоративні плями прямо в коді, щоб вони точно з'явилися */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="reviews-container">
        <div className="reviews-header-block">
          <span className="overline">Відгуки</span>
          <h2>Що про нас кажуть мандрівники</h2>
        </div>

        <ul className="reviews-list">
          {reviews.map((item) => (
            <li key={item.id} className="review-card">
              <div className="review-header">
                <span className="review-name">{item.name}</span>
                <span className="review-city">{item.city}</span>
              </div>
              <p className="review-text">"{item.text}"</p>
            </li>
          ))}
        </ul>

        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Поділіться враженнями</h3>
          <input
            type="text"
            placeholder="Ваше імʼя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Місто"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <textarea
            placeholder="Ваш коментар"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button type="submit">Надіслати відгук</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewsPage;
