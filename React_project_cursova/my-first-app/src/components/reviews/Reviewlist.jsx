import ReviewCard from "./ReviewCard";

function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {reviews.map((r, i) => (
        <ReviewCard key={i} review={r} />
      ))}
    </div>
  );
}
export default ReviewList;
