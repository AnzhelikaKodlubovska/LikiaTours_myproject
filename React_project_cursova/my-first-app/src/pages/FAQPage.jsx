import React, { useState } from "react";
import "../styles/FAQPage.css";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Як забронювати тур?",
    a: "Заповніть форму на сторінці туру або зв’яжіться з оператором через Telegram/Viber.",
    icon: "🗺️",
  },
  {
    q: "Чи можна змінити дату?",
    a: "Так, за умови наявності місць. Зв’яжіться з нами не пізніше ніж за 3 дні до виїзду.",
    icon: "📅",
  },
  {
    q: "Які способи оплати доступні?",
    a: "Ми приймаємо оплату картками Visa/Mastercard, Apple Pay, а також готівкою в офісі.",
    icon: "💳",
  },
  {
    q: "Страхування входить у вартість?",
    a: "Так, кожен тур включає базове медичне страхування на весь період подорожі.",
    icon: "🛡️",
  },
];

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-page">
      {/* 1. Декоративні фігури на фоні */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <section className="faq-hero">
        <div className="hero-content">
          <span className="badge">Допомога</span>
          <h1>Центр підтримки</h1>
          <p>Все, що вам потрібно знати для ідеальної подорожі</p>
        </div>
      </section>

      <section className="faq-list-section">
        <div className="faq-container">
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-card-modern ${
                  openIndex === index ? "open" : ""
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="faq-q-box">
                  <span className="q-icon">{faq.icon}</span>
                  <h3>{faq.q}</h3>
                  <div className="arrow"></div>
                </div>
                <div className="faq-a-box">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Новий блок "Залишилися питання?" */}
          <div className="contact-cta">
            <div className="cta-info">
              <h4>Не знайшли потрібної інформації?</h4>
              <p>Наші менеджери готові допомогти вам 24/7</p>
            </div>
            <Link to="/contacts" className="support-link">
              Написати в підтримку
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;
