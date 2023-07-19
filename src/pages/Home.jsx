import { Link } from "react-router-dom";
import { VanApiContext } from "../App";
import { useContext } from "react";

export default function Home() {
  const context = useContext(VanApiContext);
  console.log(context);
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
        <Link to="/vans" className="home-find-vans">
          Find your van
        </Link>
      </main>
    </div>
  );
}
