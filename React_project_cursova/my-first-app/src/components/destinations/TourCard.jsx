import "../../styles/components/TourCard.css";

function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.title} />
      <h3>{tour.title}</h3>
      <p>{tour.country}</p>
      <p>{tour.price}</p>
      <a href={`/tour/${tour.id}`}>Детальніше</a>
    </div>
  );
}
export default TourCard;
