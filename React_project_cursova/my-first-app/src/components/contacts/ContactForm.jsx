import React, { useState } from "react";
import "../../styles/ContactForm.css";

function ContactForm() {
  // Стан для полів форми
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Обробка зміни значень в інпутах
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Дякуємо! Ваше питання успішно надіслано.");
        // Очищення форми після успішної відправки
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(
          "Помилка: " + (result.error || "Не вдалося надіслати повідомлення")
        );
      }
    } catch (err) {
      console.error("Помилка відправки:", err);
      alert("Сервер недоступний. Спробуйте пізніше.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Ваше ім’я"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Ваше повідомлення"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Надіслати</button>
    </form>
  );
}

export default ContactForm;
