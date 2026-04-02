import { FaUserCircle } from "react-icons/fa";

const TestimonialCard = ({ name, rating, quote }) => {
  return (
    <article className="testimonial-card">
      <p className="testimonial-rating">{"⭐".repeat(rating)}</p>
      <div className="testimonial-header">
        <FaUserCircle className="testimonial-avatar-icon" />
        <p className="testimonial-name">{name}</p>
      </div>
      <p className="testimonial-quote">{quote}</p>
    </article>
  );
};

export default TestimonialCard;
