import React from "react";
import "../styles/HomePage.css";

import bannerImg from "../images/my-banner.jpg";
import carpathiansImg from "../images/carpathians.jpg";
import lvivImg from "../images/lviv.webp";
import istambulImg from "../images/istambul.jpg";
import barcelonaImg from "../images/barcelona.jpg";
import partner1 from "../images/partner1.png";
import partner2 from "../images/partner2.png";
import partner3 from "../images/partner3.png";
import partner4 from "../images/partner4.png";
import partner5 from "../images/partner5.png";
import partner6 from "../images/partner6.png";
import partner7 from "../images/partner7.png";

function HomePage() {
  return (
    <div className="home has-mask">
      <div className="home">
        {/* Hero banner */}
        <div
          className="banner"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <div className="banner-content">
            <h1>Відкрий світ із LikiaTours</h1>
            <p>Преміальні подорожі, створені спеціально для вас</p>
            <div className="banner-buttons">
              <a href="/destinations" className="btn">
                Обрати подорож
              </a>
              <a href="/contacts" className="btn btn-outline">
                Консультація
              </a>
            </div>
          </div>
        </div>

        {/* Intro section */}
        <section className="intro">
          <h2>Ласкаво просимо до LikiaTours</h2>
          <p>
            Ми створюємо не просто тури — ми створюємо емоції, що залишаються з
            вами назавжди. LikiaTours — це персоналізовані маршрути, розкішні
            готелі, бездоганний сервіс і увага до кожної деталі.
          </p>
          <p>
            Ми подорожуємо світом разом із нашими клієнтами, відкриваючи нові
            горизонти з комфортом і турботою. Від гірських курортів Карпат до
            середземноморського узбережжя — кожен маршрут продуманий до
            дрібниць.
          </p>
        </section>

        <div className="section-divider"></div>

        {/* Features section */}
        <div className="features">
          <h2>Наші переваги</h2>
          <ul>
            <li>Індивідуальні маршрути під ваш стиль життя</li>
            <li>Преміум готелі та ексклюзивні локації</li>
            <li>Персональний менеджер на кожному етапі подорожі</li>
            <li>Повний супровід — від квитків до трансферів</li>
          </ul>
        </div>

        {/* About section */}
        <section className="about">
          <h2>Про нас</h2>
          <p>
            LikiaTours — українська туристична компанія, яка понад 10 років
            створює незабутні подорожі для клієнтів, які цінують комфорт, стиль
            і якість.
          </p>
          <p>
            Ми співпрацюємо лише з надійними партнерами по всьому світу,
            обираючи лише найкраще: розкішні готелі, професійних гідів,
            унікальні локації та неповторний досвід. Наші клієнти — це друзі,
            для яких ми організовуємо кожну подорож як власну.
          </p>
        </section>

        <div className="section-divider"></div>

        {/* Popular destinations */}
        <section className="popular-destinations">
          <h2>Популярні напрямки</h2>
          <div className="destination-grid">
            <div className="destination-card">
              <img src={carpathiansImg} alt="Карпати" />
              <h3>Карпати</h3>
              <p>Гірські пригоди, гуцульська культура, чисте повітря.</p>
            </div>
            <div className="destination-card">
              <img src={lvivImg} alt="Львів" />
              <h3>Львів</h3>
              <p>Місто ароматної кави та європейської вишуканості.</p>
            </div>
            <div className="destination-card">
              <img src={istambulImg} alt="Стамбул" />
              <h3>Стамбул</h3>
              <p>Місто, де зустрічаються дві цивілізації — Схід і Захід.</p>
            </div>
            <div className="destination-card">
              <img src={barcelonaImg} alt="Барселона" />
              <h3>Барселона</h3>
              <p>Гауді, море та іспанська енергія в одному місці.</p>
            </div>
          </div>
        </section>

        {/* Reviews section */}
        <section className="reviews">
          <h2>Відгуки наших клієнтів</h2>
          <div className="review-list">
            <blockquote>
              “Найкраща подорож у моєму житті! Усе організовано ідеально — від
              трансферу до останнього дня туру.” <span>— Олена, Київ</span>
            </blockquote>
            <blockquote>
              “LikiaTours — це сервіс рівня люкс! Вони врахували всі мої
              побажання та навіть більше.” <span>— Андрій, Львів</span>
            </blockquote>
            <blockquote>
              “Відчуваєш себе VIP-клієнтом з першої хвилини. Рекомендую!”{" "}
              <span>— Марина, Одеса</span>
            </blockquote>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Partners section */}
        <section className="partners">
          <h2>Наші партнери</h2>
          <div className="partner-logos">
            <img src={partner1} alt="GlobeTrek Adventures" />
            <img src={partner2} alt="Azure Stay Hotels" />
            <img src={partner3} alt="Skyline Transport" />
            <img src={partner4} alt="Sunwaves" />
            <img src={partner5} alt="Blue Horizon" />
            <img src={partner6} alt="Urban Escape Hotels" />
            <img src={partner7} alt="Lotte Hotels" />
          </div>
        </section>

        {/* CTA section */}
        <section className="cta">
          <h2>Готові до незабутніх подорожей?</h2>
          <p>
            Оберіть свій напрямок і дозвольте нам організувати усе інше. Ваша
            мрія — наша місія.
          </p>
          <div className="cta-buttons">
            <a href="/destinations" className="btn">
              Переглянути тури
            </a>
            <a href="/contacts" className="btn btn-outline">
              Зв’язатися
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
