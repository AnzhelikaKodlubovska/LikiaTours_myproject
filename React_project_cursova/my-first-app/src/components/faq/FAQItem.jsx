import React from "react";

function FAQItem({ question, answer }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="faq-item">
      <h4 onClick={() => setOpen(!open)}>{question}</h4>
      {open && <p>{answer}</p>}
    </div>
  );
}
export default FAQItem;
