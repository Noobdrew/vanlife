import { Link } from "react-router-dom";

export default function Vans() {
  return (
    <div className="van-page">
      <h1 className="vans-title">Explore our van options</h1>
      <div className="filters">
        <button className="filters-simple">Simple</button>
        <button className="filters-luxary">Luxury</button>
        <button className="filters-rugged">Rugged</button>
        <button className="filters-clear">Clear filters</button>
      </div>
      <main className="vans-container"></main>
    </div>
  );
}
