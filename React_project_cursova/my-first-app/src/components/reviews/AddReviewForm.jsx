import React from "react";

function AddReviewForm({ onAdd }) {
  const [text, setText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name: "Анонім", text, rating: 5 });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Залишити відгук</button>
    </form>
  );
}
export default AddReviewForm;
