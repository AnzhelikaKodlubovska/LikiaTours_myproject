import React, { useEffect, useState } from "react";
import { API_BASE, ALLOWED_TOURS } from "../constants";
import TourBookingForm from "../components/tourDetails/BookingForm";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [selectedTour, setSelectedTour] = useState(ALLOWED_TOURS[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Функція для отримання списку бронювань (GET)
  const fetchBookings = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        console.error("Не вдалося завантажити список");
      }
    } catch (err) {
      console.error("Помилка мережі:", err);
    } finally {
      setLoading(false);
    }
  };

  // Завантажуємо дані при першому рендері
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    /* Додаємо великий відступ зверху (paddingTop), щоб контент з'явився під хедером */
    /* Також додаємо display: flex та flexDirection: column, щоб заголовок і список були один під одним */
    <div
      style={{
        padding: "120px 20px 40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Бронювання туру
        </h2>

        <div
          style={{
            marginBottom: "15px",
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <label>Оберіть напрямок: </label>
          <select
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            style={{ padding: "5px", borderRadius: "4px" }}
          >
            {ALLOWED_TOURS.map((tour) => (
              <option key={tour} value={tour}>
                {tour}
              </option>
            ))}
          </select>
        </div>

        {/* Тут ваша форма */}
        <TourBookingForm
          selectedTour={selectedTour}
          onBookingSuccess={fetchBookings}
        />

        <hr
          style={{ margin: "30px 0", border: "0", borderTop: "1px solid #eee" }}
        />

        <h3 style={{ margin: "30px", marginBottom: "15px" }}>Мої бронювання</h3>

        {loading ? (
          <p>Завантаження...</p>
        ) : bookings.length === 0 ? (
          <p>У вас поки немає бронювань</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {bookings.map((b) => (
              <li
                key={b.id}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "15px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  borderLeft: "5px solid #00d2ff",
                }}
              >
                <div style={{ marginBottom: "5px", fontSize: "1.1rem" }}>
                  <strong>Гість: {b.guest_name}</strong>
                </div>
                <div style={{ color: "#555" }}>
                  Email: {b.guest_email}
                  <br />
                  Кількість осіб: {b.persons}
                  <br />
                  Період:{" "}
                  <span style={{ color: "#007bff" }}>
                    {b.check_in} — {b.check_out}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    borderTop: "1px solid #f9f9f9",
                    paddingTop: "5px",
                  }}
                >
                  <small style={{ color: "#999" }}>
                    Заброньовано:{" "}
                    {new Date(b.booking_date).toLocaleDateString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
