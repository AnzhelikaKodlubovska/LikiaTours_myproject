import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || token.length < 50) {
      setError("Сесія завершена. Увійдіть знову.");
      return;
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setName(parsed.name || "");
      } catch {
        setError("Помилка даних користувача");
      }
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  if (error) {
    return <p style={{ color: "red", padding: 40 }}>{error}</p>;
  }

  if (!user) {
    return <p style={{ padding: 40 }}>Завантаження профілю...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "120px", // Відступ, щоб не було наїзду хедера
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          /* ДОДАЄМО ЦІ ДВА РЯДКИ НИЖЧЕ */
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Центруємо все по горизонталі
        }}
      >
        {/* Avatar */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              backgroundColor: "#1a2b3c", // Змінив на колір бренду для стилю
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              margin: "0 auto",
            }}
          >
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          {!isEditing ? (
            <h2 style={{ marginTop: "15px", color: "#1a2b3c" }}>{user.name}</h2>
          ) : (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginTop: "15px",
                padding: "8px",
                fontSize: "16px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          )}

          <p style={{ color: "#777", fontSize: "16px" }}>Ласкаво просимо!</p>
        </div>

        <hr
          style={{
            width: "100%",
            border: "0",
            borderTop: "1px solid #eee",
            marginBottom: "20px",
          }}
        />

        {/* Info */}
        <div style={{ marginBottom: "20px", fontSize: "16px" }}>
          <strong style={{ color: "#1a2b3c" }}>Email:</strong>{" "}
          {user.email || "—"}
        </div>

        {/* Actions */}
        <div
          style={{
            width: "100%", // Щоб кнопки були на всю ширину картки
            display: "flex",
            gap: "12px",
            flexDirection: "column",
          }}
        >
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={buttonStyle}>
              Редагувати профіль
            </button>
          ) : (
            <button
              onClick={handleSave}
              style={{ ...buttonStyle, backgroundColor: "#28a745" }}
            >
              Зберегти зміни
            </button>
          )}

          <button
            onClick={() => navigate("/my-bookings")}
            style={{
              ...buttonStyle,
              backgroundColor: "transparent",
              color: "#007bff",
              border: "1px solid #007bff",
            }}
          >
            Мої бронювання
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#007bff",
  border: "none",
  color: "white",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
};
