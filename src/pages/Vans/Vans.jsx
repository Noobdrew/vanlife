import { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import VanElement from "../../components/VanElement";
export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const simpleFilter = searchParams.get("simple");
  const ruggedFilter = searchParams.get("rugged");
  const luxuryFilter = searchParams.get("luxury");
  const condition = [
    { simple: simpleFilter },
    { rugged: ruggedFilter },
    { luxury: luxuryFilter },
  ];

  const [vanData, setVanData] = useState([]);
  const [filterConditions, setFilterConditions] = useState([
    { simple: simpleFilter },
    { rugged: ruggedFilter },
    { luxury: luxuryFilter },
  ]);

  useEffect(() => {
    fetch("/api/vans")
      .then((reps) => reps.json())
      .then((data) => setVanData(data.vans));
  }, []);

  function filterByConditions(array, conditions) {
    const arr = [];
    array.forEach((item) => {
      // Check each condition for the item
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const key = Object.keys(condition)[0];
        const value = condition[key];
        // Compare the item's property with the condition
        if (item.type == value) {
          arr.push(item);
        }
      }
    });
    if (arr.length == 0) return vanData;
    else return arr;
  }

  const filtered = filterByConditions(vanData, condition);

  const VanElements = filtered.map((van) => {
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

  function handleFilter(key, value) {
    setSearchParams((prevParams) => {
      if (!prevParams.has(key)) {
        prevParams.append(key, value);
      } else {
        prevParams.delete(key);
      }
      return prevParams;
    });
  }

  return (
    <div className="van-page">
      <h1 className="vans-title">Explore our van options</h1>
      <div className="filters">
        <button
          style={
            condition[0].simple
              ? { backgroundColor: "#E17654", color: "#FFEAD0" }
              : {}
          }
          onClick={() => handleFilter("simple", "simple")}
          className="filters-btn simple"
        >
          Simple
        </button>
        <button
          style={
            condition[2].luxury
              ? { backgroundColor: "#161616", color: "#FFEAD0" }
              : {}
          }
          onClick={() => handleFilter("luxury", "luxury")}
          className="filters-btn luxury"
        >
          Luxury
        </button>
        <button
          style={
            condition[1].rugged
              ? { backgroundColor: "#115E59", color: "#FFEAD0" }
              : {}
          }
          onClick={() => handleFilter("rugged", "rugged")}
          className="filters-btn rugged"
        >
          Rugged
        </button>
        <NavLink to="." className="filters-clear">
          Clear filters
        </NavLink>
      </div>
      <main className="vans-container">{VanElements}</main>
    </div>
  );
}
