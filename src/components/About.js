const imgAbout1 = "/mario-and-adrian-a.jpg";
const imgAbout2 = "/mario-and-adrian-b.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about-text">
        <h2 className="about-title">Little Lemon</h2>
        <h3 className="about-subtitle">Chicago</h3>
        <p className="about-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit.
        </p>
      </div>
      <div className="about-images">
        <img src={imgAbout1} alt="Little Lemon restaurant" className="about-img about-img-back" />
        <img src={imgAbout2} alt="Little Lemon chefs" className="about-img about-img-front" />
      </div>
    </section>
  );
};

export default About;
