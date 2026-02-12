function SimilarTours({ tours }) {
  return (
    <div className="similar-tours">
      <h3>Схожі тури</h3>
      <TourList tours={tours} />
    </div>
  );
}
export default SimilarTours;
