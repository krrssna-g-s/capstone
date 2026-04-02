import { Link } from "react-router-dom";

const heroImage = "/restaurant-chef.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1 className="hero-title">
            Little Lemon <span className="hero-location">Chicago</span>
          </h1>
          <p className="hero-description">
            We are a family owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
          <Link to="/reservations" className="btn btn-dark">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Mediterranean dish" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
