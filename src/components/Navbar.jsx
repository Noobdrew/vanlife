import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h2 className="home-logo">
        {" "}
        <Link to="/">VANLIFE</Link>
      </h2>
      <p className="about">
        <Link to="/about">About</Link>
      </p>
      <p className="vans">
        {" "}
        <Link to="/vans">Vans</Link>
      </p>
    </nav>
  );
}
