import "../../styles/TourDetails.css";

function DestinationFilter({ filters, onChange }) {
  return (
    <div className="destination-filters">
      {/* Фільтр по країні */}
      <select
        className="destination-filter"
        value={filters.country}
        onChange={(e) => onChange({ ...filters, country: e.target.value })}
      >
        <option value="">Усі країни</option>
        <option value="Україна">Україна</option>
        <option value="Греція">Греція</option>
        <option value="Італія">Італія</option>
        <option value="Іспанія">Іспанія</option>
        <option value="Туреччина">Туреччина</option>
        <option value="Польща">Польща</option>
        <option value="Чехія">Чехія</option>
        <option value="Бразилія">Бразилія</option>
        <option value="Франція">Франція</option>
        <option value="Англія">Англія</option>
      </select>

      {/* Фільтр по типу */}
      <select
        className="destination-filter"
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">Усі типи подорожей</option>
        <option value="sea">Морські</option>
        <option value="land">Неморські</option>
      </select>
    </div>
  );
}

export default DestinationFilter;
