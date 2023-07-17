import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VanElement from "../../components/VanElement";
export default function Vans() {
  const [vanData, setVanData] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((reps) => reps.json())
      .then((data) => setVanData(data.vans));
  }, []);

  const VanElements = vanData.map((van) => {
    return (
      <Link to={`/vans/${van.id}`}>
        <VanElement
          key={van.id}
          img={van.imageUrl}
          name={van.name}
          price={van.price}
          type={van.type}
        />
      </Link>
    );
  });

  return (
    <div className="van-page">
      <h1 className="vans-title">Explore our van options</h1>
      <div className="filters">
        <button className="filters-btn simple">Simple</button>
        <button className="filters-btn luxary">Luxury</button>
        <button className="filters-btn rugged">Rugged</button>
        <button className="filters-clear">Clear filters</button>
      </div>
      <main className="vans-container">{VanElements}</main>
    </div>
  );
}
