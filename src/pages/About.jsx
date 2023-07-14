import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-conteiner">
      <div className="about-img"></div>
      <main className="about-main">
        <h1 className="about-title">
          Don’t squeeze in a sedan when you could relax in a van.
        </h1>
        <p className="about-filler-text">
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
          <br /> <br />
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
        <div className="about-button-conteiner">
          <h3 className="about-button-title">
            Your destination is waiting. Your van is ready.
          </h3>
          <Link to="/vans" className="about-vans">
            Explore our vans
          </Link>
        </div>
      </main>
    </div>
  );
}
