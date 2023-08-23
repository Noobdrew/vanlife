import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import VanElement from "../../components/VanElement";

import { VanApiContext } from "../../App";

export default function Vans() {
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("low-high");
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

  function removeHiddenVans(array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.visibility === "public") arr.push(element);
    }
    return arr;
  }
  const visibleVans = removeHiddenVans(vanData);

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

    if (arr.length == 0) return visibleVans;
    else return arr;
  }
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
  const filtered = filterByConditions(visibleVans, condition);

  const sortedData = [...filtered];

  const calculateAverageRating = (ratings) => {
    const ratingValues = Object.values(ratings);
    if (ratingValues.length === 0) {
      return 0;
    }

    const sum = ratingValues.reduce((total, rating) => total + rating, 0);
    return sum / ratingValues.length;
  };

  const sortVans = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "high-low" || selectedValue === "low-high") {
      setSortBy("price");
      setSortOrder(selectedValue);
    } else if (selectedValue === "rating") {
      setSortBy("rating");
      setSortOrder("high-low");
    }
  };

  sortedData.sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "low-high" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "rating") {
      const avgRatingA = calculateAverageRating(a.ratings);
      const avgRatingB = calculateAverageRating(b.ratings);
      return sortOrder === "low-high"
        ? avgRatingA - avgRatingB
        : avgRatingB - avgRatingA;
    }
  });

  const VanElements = sortedData.map((van) => {
    return (
      <Link
        state={{ search: `?${searchParams.toString()}` }}
        to={`${van.id}`}
        key={van.id}
      >
        <VanElement
          currentVan={van}
          img={van.imageUrl}
          name={van.name}
          price={van.price}
          type={van.type}
          ratings={van.ratings}
        />
      </Link>
    );
  });
  console.log(vanData);
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
      <div className="sorting-container">
        <h3>Sort vans</h3>
        <select name="sort-vans" id="sort-vans" onChange={(e) => sortVans(e)}>
          <option value="low-high">Price Low-High</option>
          <option value="high-low">Price High-Low</option>

          <option value="rating">By Rating</option>
        </select>
      </div>

      <main className="vans-container">{VanElements}</main>
    </div>
  );
}
