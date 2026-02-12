import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [prices, setPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Додані стани для запитань
  const [questions, setQuestions] = useState([]);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/admin/dashboard-data",
        config
      );
      setBookings(res.data.bookings || []);
      setReviews(res.data.reviews || []);
      setUsers(res.data.users || []);

      // --- ДОДАНО: Завантаження запитань ---
      const resQ = await axios.get(
        "http://127.0.0.1:5000/admin/questions",
        config
      );
      setQuestions(resQ.data || []);
      // ------------------------------------
    } catch (err) {
      console.error("Помилка завантаження:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ДОДАНО: Функція відправки відповіді ---
  const handleSendAnswer = async (id, answerText) => {
    if (!answerText || answerText.trim() === "") {
      return alert("Будь ласка, введіть текст відповіді");
    }

    try {
      await axios.post(
        `http://127.0.0.1:5000/admin/answer-question/${id}`,
        { answer: answerText },
        config
      );
      alert("Відповідь надіслано на email клієнта!");
      fetchData(); // Оновлюємо список
    } catch (err) {
      console.error("Помилка:", err);
      alert("Не вдалося надіслати відповідь");
    }
  };
  // -------------------------------------------

  // ВИДАЛЕННЯ БРОНЮВАННЯ
  const handleDeleteBooking = async (id) => {
    if (window.confirm("Видалити це бронювання назавжди?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:5000/admin/delete_booking/${id}`,
          config
        );
        fetchData();
      } catch (err) {
        alert("Помилка видалення");
      }
    }
  };

  // ВИДАЛЕННЯ КЛІЄНТА
  const handleDeleteUser = async (id) => {
    if (window.confirm("Видалити користувача та всі його дані?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:5000/admin/delete_user/${id}`,
          config
        );
        fetchData();
      } catch (err) {
        alert("Помилка видалення");
      }
    }
  };

  const handleConfirm = async (id) => {
    if (!prices[id]) return alert("Спочатку введіть ціну!");
    try {
      await axios.post(
        `http://127.0.0.1:5000/admin/confirm/${id}`,
        { price: prices[id] },
        config
      );
      alert("Ціну надіслано!");
      fetchData();
    } catch (err) {
      alert("Помилка при відправці ціни");
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Видалити відгук?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:5000/admin/delete_review/${id}`,
          config
        );
        fetchData();
      } catch (err) {
        alert("Помилка видалення");
      }
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.tour_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page-bg">
      <div className="admin-container">
        <h1 className="main-title">Панель керування Likiatours</h1>

        <div className="admin-stats">
          <div className="stat-card">Замовлень: {bookings.length}</div>
          <div className="stat-card">Відгуків: {reviews.length}</div>
          <div className="stat-card">Клієнтів: {users.length}</div>
        </div>

        <div className="divider"></div>

        {/* БРОНЮВАННЯ */}
        <section className="admin-section">
          <div className="section-header-flex">
            <h3>📦 Бронювання та ціни</h3>
            <input
              type="text"
              className="admin-search-bar"
              placeholder="Пошук..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-table-viewport">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Тур / Клієнт</th>
                  <th>Людей</th>
                  <th>Дати</th>
                  <th>Статус</th>
                  <th>Дія</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: "bold", color: "#00d4ff" }}>
                        {b.tour_name}
                      </div>
                      <div style={{ fontSize: "12px" }}>👤 {b.username}</div>
                    </td>
                    <td style={{ textAlign: "center" }}>{b.persons || 1}</td>
                    <td style={{ fontSize: "12px" }}>
                      {b.check_in} — {b.check_out}
                    </td>
                    <td>
                      <span className={`status-tag ${b.status.toLowerCase()}`}>
                        {b.status === "Confirmed" ? "✅ OK" : "⏳ Чекає"}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {b.status !== "Confirmed" && (
                          <div className="price-form">
                            <input
                              type="number"
                              placeholder="грн"
                              onChange={(e) =>
                                setPrices({ ...prices, [b.id]: e.target.value })
                              }
                            />
                            <button onClick={() => handleConfirm(b.id)}>
                              ✓
                            </button>
                          </div>
                        )}
                        <button
                          className="delete-btn-small"
                          onClick={() => handleDeleteBooking(b.id)}
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* КЛІЄНТИ */}
        <section className="admin-section">
          <h3>👥 База клієнтів</h3>
          <div className="admin-table-viewport">
            <div className="users-grid">
              {users.map((u) => (
                <div key={u.id} className="user-card">
                  {!u.is_admin && (
                    <button
                      className="delete-user-x"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      ×
                    </button>
                  )}
                  <div className="user-icon">{u.username[0].toUpperCase()}</div>
                  <div className="user-data">
                    <strong className="client-name">{u.username}</strong>
                    <p className="client-email">{u.email}</p>
                  </div>
                  <div className={`badge ${u.is_admin ? "admin" : "client"}`}>
                    {u.is_admin ? "Адмін" : "Клієнт"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ВІДГУКИ */}
        <section className="admin-section">
          <h3>💬 Керування відгуками</h3>
          <div className="admin-table-viewport">
            <div className="reviews-container">
              {reviews.map((r) => (
                <div key={r.id} className="review-item">
                  <div
                    className="review-header"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="review-author">👤 {r.username}</span>
                    <button
                      className="delete-btn-small"
                      onClick={() => handleDeleteReview(r.id)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="review-text">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПИТАННЯ ВІД КЛІЄНТІВ */}
        <section className="admin-section">
          <h2>📧 Повідомлення від клієнтів</h2>
          <div className="admin-table-viewport">
            {questions.map((q) => (
              <div
                key={q.id}
                className={`question-card ${q.is_answered ? "answered" : ""}`}
              >
                <div className="q-info">
                  <strong>{q.name}</strong> <small>{q.email}</small>
                  <p>"{q.message}"</p>
                </div>
                {!q.is_answered ? (
                  <div className="reply-area">
                    <textarea
                      id={`reply-${q.id}`}
                      placeholder="Текст відповіді..."
                    ></textarea>
                    <button
                      onClick={() =>
                        handleSendAnswer(
                          q.id,
                          document.getElementById(`reply-${q.id}`).value
                        )
                      }
                    >
                      Відповісти
                    </button>
                  </div>
                ) : (
                  <span className="status-ok">✅ Відповідь надіслана</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
