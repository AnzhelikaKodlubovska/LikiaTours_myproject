import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";
import "../styles//AuthModal.css";

function AuthModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser(loginUsername, loginPassword);
    console.log("LOGIN RESPONSE:", res);

    if (res.message === "Вхід успішний" && res.token && res.user) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setError(false);
      setMessage(res.message);
      navigate("/");
    } else {
      setError(true);
      setMessage(res.error || "Помилка входу");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(
        registerUsername,
        registerPassword,
        registerEmail
      );
      console.log("REGISTER RESPONSE:", res);

      if (res.error) {
        setError(true);
        setMessage(res.error);
      } else if (
        res.message === "Реєстрація успішна" &&
        res.token &&
        res.user
      ) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        setError(false);
        setMessage(res.message);
        navigate("/");
      } else {
        setError(true);
        setMessage("Невідома помилка реєстрації");
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError(true);
      setMessage("Помилка з'єднання з сервером");
    }
  };

  return (
    <div className="auth-page">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Вхід
        </div>
        <div
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Реєстрація
        </div>
      </div>

      {activeTab === "login" && (
        <div className="form">
          <input
            type="text"
            placeholder="Ім'я користувача"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Увійти</button>
        </div>
      )}

      {activeTab === "register" && (
        <div className="form">
          <input
            type="text"
            placeholder="Ім'я користувача"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Зареєструватись</button>
        </div>
      )}

      {message && (
        <div className={`message ${error ? "error" : ""}`}>{message}</div>
      )}
    </div>
  );
}

export default AuthModal;
