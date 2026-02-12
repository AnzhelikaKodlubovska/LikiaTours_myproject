import React, { useState } from "react";
import { API_BASE } from "../constants";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    if (result.message === "Вхід успішний") {
      localStorage.setItem("user_id", username);
    }
    setMessage(result.message || result.error);
  };

  return (
    <div>
      <h2>Вхід</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Ім'я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
