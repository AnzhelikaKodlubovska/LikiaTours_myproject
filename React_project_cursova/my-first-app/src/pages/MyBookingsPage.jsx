import React, { useEffect, useState } from "react";
import { API_BASE } from "../constants";
import "../styles/MyBookings.css";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token.length < 50) {
      setError("Сесія завершена. Увійдіть знову.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/my-bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження бронювань:", err);
        setError("Не вдалося завантажити бронювання");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Ви впевнені, що хочете скасувати це бронювання?"))
      return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/booking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Не вдалося видалити бронювання");
    }
  };

  if (loading) return <div className="loader">Завантаження...</div>;
  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div className="bookings-page">
      <h2 className="bookings-title">Мої подорожі</h2>

      <div className="bookings-container">
        {bookings.length === 0 ? (
          <p className="empty-msg">У вас поки немає активних подорожей.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="card-header">
                <span className="booking-id">Бронювання №{b.id}</span>
                <span className="booking-date">{b.booking_date}</span>
              </div>
              <h3>{b.tour_name}</h3>
              <div className="card-body">
                <h3 className="guest-name">
                  <span className="user-icon">👤</span> {b.guest_name}
                </h3>

                <div className="booking-details">
                  <div className="detail-item">
                    <strong>📅 Дати:</strong> {b.check_in} — {b.check_out}
                  </div>
                  <div className="detail-item">
                    <strong>👥 Гості:</strong> {b.persons}{" "}
                    {b.persons === 1 ? "особа" : "особи"}
                  </div>
                  <div className="detail-item">
                    <strong>📧 Пошта:</strong> {b.guest_email}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(b.id)}
                >
                  Скасувати
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
