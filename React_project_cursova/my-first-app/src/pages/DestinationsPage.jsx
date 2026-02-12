import React, { useState } from "react";
import { tours } from "../data/mockTours";
import DestinationFilter from "../components/destinations/DestinationFilter";
import TourList from "../components/destinations/TourList";
import "../styles/DestinationsPage.css";

function DestinationsPage() {
  const [filters, setFilters] = useState({
    country: "",
    type: "",
  });

  const filteredTours = tours.filter((tour) => {
    const countryMatch = !filters.country || tour.country === filters.country;

    const typeMatch = !filters.type || tour.type === filters.type;

    return countryMatch && typeMatch;
  });

  return (
    <main className="destinations-page">
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <header className="destinations-header">
        <div className="destinations-content">
          <span className="subtitle">Наші напрямки</span>
          <h1>Оберіть свою ідеальну подорож</h1>
          <p>
            Відкривайте світ разом з Likiatours: від затишних куточків України
            до екзотичних пляжів
          </p>

          <div className="filter-wrapper">
            <DestinationFilter filters={filters} onChange={setFilters} />
          </div>
        </div>
      </header>

      <section className="tours-section">
        <div className="container">
          {filteredTours.length > 0 ? (
            <TourList tours={filteredTours} />
          ) : (
            <div className="no-results">
              <p>На жаль, за цими фільтрами турів поки немає 😔</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DestinationsPage;
