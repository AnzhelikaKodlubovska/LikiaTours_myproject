import React, { useState } from "react";
import { API_BASE } from "../../constants";
import "../../styles/ContactForm.css";

export default function BookingForm({ tourName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 1. Фільтрація на фронтенді
    if (!token || token === "null" || token === "undefined") {
      alert(
        "На жаль, Ви не можете забронювати цей тур. Будь ласка, зареєструйтесь.",
      );
      return;
    }

    setLoading(true);

    const bookingData = {
      guest_name: name,
      guest_email: email,
      tour_name: tourName || "Назва не визначена",
      persons: parseInt(persons),
      check_in: checkIn,
      check_out: checkOut,
    };

    try {
      const res = await fetch(`${API_BASE}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (res.ok) {
        alert(`Успіх! Ви забронювали тур: ${tourName}`);
        setName("");
        setEmail("");
        setPersons(1);
        setCheckIn("");
        setCheckOut("");
      } else {
        // 2. Обробка помилки, якщо вона все ж прийшла з бекенду
        if (result.error && result.error.includes("segments")) {
          alert(
            "На жаль, Ви не можете забронювати цей тур. Будь ласка, зареєструйтесь.",
          );
        } else {
          alert(`Помилка: ${result.error || "Не вдалося забронювати"}`);
        }
      }
    } catch (err) {
      console.error("Помилка при відправці:", err);
      alert("Сервер не відповідає. Перевірте з'єднання.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-wrapper">
      <h3
        style={{ textAlign: "center", color: "#007bff", marginBottom: "20px" }}
      >
        Бронювання: {tourName}
      </h3>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше ім’я"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш Email"
            required
          />
        </div>

        <div className="form-group">
          <label>Кількість осіб:</label>
          <input
            type="number"
            min="1"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Дата заїзду:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Дата виїзду:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Зачекайте..." : "Забронювати тур"}
        </button>
      </form>
    </div>
  );
}
