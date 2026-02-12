import TourCard from "./TourCard";

function TourList({ tours }) {
  return (
    <div className="tour-list">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
export default TourList;
