import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Блок 1: Про компанію */}
        <div className="footer-section about">
          <h3 className="footer-logo">
            Likia<span>Tours</span>
          </h3>
          <p>
            Ваш надійний провідник у світі незабутніх подорожів. Відкриваємо
            горизонти разом з 2025 року.
          </p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-telegram"></i>
            </a>
          </div>
        </div>

        {/* Блок 2: Швидкі посилання */}
        <div className="footer-section links">
          <h4>Навігація</h4>
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/destinations">Напрямки</Link>
            </li>
            <li>
              <Link to="/reviews">Відгуки</Link>
            </li>
            <li>
              <Link to="/faq">Питання та відповіді</Link>
            </li>
          </ul>
        </div>

        {/* Блок 3: Контакти */}
        <div className="footer-section contacts">
          <h4>Контакти</h4>
          <p>
            <i className="fas fa-map-marker-alt"></i> Київ, вул. Центральна, 12
          </p>
          <p>
            <i className="fas fa-phone"></i> +38 (097) 123-45-67
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@likiatours.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 LikiaTours. Всі права захищені.</p>
        <div className="footer-bottom-links">
          <a href="#">Політика конфіденційності</a>
          <a href="#">Умови використання</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
