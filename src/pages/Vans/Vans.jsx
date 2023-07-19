import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import VanElement from "../../components/VanElement";
import { getVans } from "../../api";
import { VanApiContext } from "../../App";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const simpleFilter = searchParams.get("t1");
  const luxuryFilter = searchParams.get("t2");
  const ruggedFilter = searchParams.get("t3");

  const condition = [
    { t1: simpleFilter },
    { t2: luxuryFilter },
    { t3: ruggedFilter },
  ];

  const { vanData, error } = useContext(VanApiContext);

  // const [vanData, setVanData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function loadVans() {
  //     setLoading(true);
  //     try {
  //       const data = await getVans();
  //       setVanData(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadVans();
  // }, []);

  function filterByConditions(array, conditions) {
    const arr = [];
    array.forEach((item) => {
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const key = Object.keys(condition)[0];
        const value = condition[key];
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
      <Link
        state={{ search: `?${searchParams.toString()}` }}
        to={`${van.id}`}
        key={van.id}
      >
        <VanElement
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
  if (error) return <h1>There was an error: {error.message}</h1>;
  return (
    <div className="van-page">
      <h1 className="vans-title">Explore our van options</h1>
      <div className="filters">
        <button
          style={
            condition[0].t1
              ? { backgroundColor: "#E17654", color: "#FFEAD0" }
              : {}
          }
          onClick={() => handleFilter("t1", "simple")}
          className="filters-btn simple"
        >
          Simple
        </button>
        <button
          style={
            condition[1].t2
              ? { backgroundColor: "#161616", color: "#FFEAD0" }
              : {}
          }
          onClick={() => handleFilter("t2", "luxury")}
          className="filters-btn luxury"
        >
          Luxury
        </button>
        <button
          style={
            condition[2].t3
              ? { backgroundColor: "#115E59", color: "#FFEAD0" }
              : {}
          }
          onClick={() => handleFilter("t3", "rugged")}
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
