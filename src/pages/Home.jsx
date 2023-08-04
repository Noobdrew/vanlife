import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <main className="home-main">
        <h1 className="home-title">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="home-filler-text">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Link to="/vans" className="confirm-button">
          Find your van
        </Link>
      </main>
    </div>
  );
}
