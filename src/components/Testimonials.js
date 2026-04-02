import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "John S.",
    rating: 5,
    quote:
      "Finally, a restaurant in the city that understands my schedule! The online booking feature is incredibly smooth.",
  },
  {
    id: 2,
    name: "Maria G.",
    rating: 5,
    quote:
      "We love the Greek Salad here. Being able to see real-time availability and book ahead has made Little Lemon our go-to Friday night spot.",
  },
  {
    id: 3,
    name: "David L.",
    rating: 5,
    quote:
      "The Bruschetta is world-class. I really appreciate the Special Requests section in the booking form — they remembered my anniversary!",
  },
  {
    id: 4,
    name: "Sarah K.",
    rating: 5,
    quote:
      "The Lemon Dessert is absolutely divine. Straight from grandma's recipe book — you can taste the authenticity in every bite.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <h2 className="section-title text-center">Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
