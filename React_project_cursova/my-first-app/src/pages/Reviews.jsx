import React, { useState, useEffect } from "react";
import { API_BASE } from "../constants";
import { initialReviews } from "../data/reviews";
import "../styles/ReviewsPage.css"; // Підключаємо наш файл стилів

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewText, setReviewText] = useState("");
  const [cityText, setCityText] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setReviews([...initialReviews, ...data]);
    } catch (err) {
      console.error("Помилка завантаження:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token || token === "null") {
      setShowModal(true);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: reviewText, city: cityText }),
      });
      if (res.ok) {
        setReviewText("");
        setCityText("");
        setMessage("✅ Відгук додано!");
        fetchReviews();
      }
    } catch (err) {
      setMessage("❌ Помилка з'єднання");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ви дійсно хочете видалити цей відгук?")) return;
    try {
      const res = await fetch(`${API_BASE}/review/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage("🗑️ Відгук видалено");
        fetchReviews();
      }
    } catch (err) {
      console.error("Помилка видалення:", err);
    }
  };

  const handleEdit = async (rev) => {
    const newText = prompt("Відредагуйте ваш відгук:", rev.content || rev.text);
    if (!newText || newText === (rev.content || rev.text)) return;

    try {
      const res = await fetch(`${API_BASE}/review/${rev.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newText, city: rev.city }),
      });
      if (res.ok) {
        setMessage("✏️ Відгук оновлено");
        fetchReviews();
      }
    } catch (err) {
      console.error("Помилка редагування:", err);
    }
  };

  return (
    <div className="reviews-page">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="reviews-container">
        <header className="reviews-header-block">
          <span className="overline">Відгуки</span>
          <h2>Наші мандрівники кажуть</h2>
        </header>

        {/* ФОРМА ДОДАВАННЯ */}
        <section className="review-form-section">
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Залишити свій відгук</h3>
            <input
              type="text"
              placeholder="Ваше місто"
              value={cityText}
              onChange={(e) => setCityText(e.target.value)}
            />
            <textarea
              placeholder="Ваші враження від подорожі..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              Надіслати відгук
            </button>
            {message && <p className="status-msg">{message}</p>}
          </form>
        </section>

        {/* СПИСОК ВІДГУКІВ */}
        <section className="reviews-list-section">
          {loading ? (
            <div className="loader">Завантаження...</div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((rev, index) => (
                <div key={index} className="review-card">
                  <div className="review-card-header">
                    <div>
                      <span className="review-name">
                        {rev.name || "Мандрівник"}
                      </span>
                      <span className="review-city">({rev.city})</span>
                    </div>
                    <span className="review-date">{rev.date}</span>
                  </div>
                  <p className="review-text">{rev.content || rev.text}</p>

                  {rev.can_edit && (
                    <div className="review-actions">
                      <button
                        onClick={() => handleEdit(rev)}
                        className="edit-btn"
                      >
                        ✏️ Редагувати
                      </button>
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="delete-btn"
                      >
                        🗑️ Видалити
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* МОДАЛЬНЕ ВІКНО (якщо потрібно) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Ви не зареєстровані! 🌍</h3>
            <p>Тільки авторизовані користувачі можуть залишати відгуки.</p>
            <div className="modal-buttons">
              <button
                className="btn-primary"
                onClick={() => (window.location.href = "/auth")}
              >
                До реєстрації
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
