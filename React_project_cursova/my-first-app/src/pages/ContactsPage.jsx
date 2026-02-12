import React from "react";
import ContactInfo from "../components/contacts/ContactInfo";
import ContactForm from "../components/contacts/ContactForm";
import MapEmbed from "../components/contacts/MapEmbed";
import "../styles/ContactsPage.css";

function ContactsPage() {
  return (
    <div className="contacts-page">
      {/* Декоративні фонові плями */}
      <div className="bg-blob blob-left"></div>
      <div className="bg-blob blob-right"></div>

      <header className="contacts-header">
        <span className="overline">Зв'яжіться з нами</span>
        <h1>Ми завжди на зв'язку</h1>
        <p>Маєте запитання чи готові забронювати тур? Напишіть нам!</p>
      </header>

      <section className="contacts-content">
        <div className="contacts-grid">
          <div className="info-side">
            <ContactInfo />
          </div>
          <div className="form-side">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-wrapper">
          <MapEmbed />
        </div>
      </section>
    </div>
  );
}

export default ContactsPage;
