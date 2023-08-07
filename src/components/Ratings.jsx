import React, { useContext, useEffect, useState } from "react";
import starEmpty from "../assets/star_filled.svg";
import starFilled from "../assets/star_empty.svg";
import { VanApiContext } from "../App";
import { db, postRating } from "../api";
import { doc, onSnapshot } from "firebase/firestore";

export default function Ratings({ ratingAvg, ratingsObj, currentVan }) {
  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);
  const [rating, setRating] = useState(ratingAvg);
  useState;
  const handleMouseOver = (starCount) => {
    setRating(starCount);
  };

  const handleMouseLeave = () => {
    setRating(ratingAvg);
  };

  function submitRating() {
    let ratingsData = {
      ...ratingsObj,
      [currentUser.uid]: rating,
    };
    const data = {
      ...currentVan,
      ratings: ratingsData,
    };
    try {
      postRating(currentVan.id, data);
      setPopupOpen(true);
      setPopupText("Rating sent!");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((starCount) => (
        <svg
          key={starCount}
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill={starCount <= rating ? "gold" : "gray"}
          onMouseOver={() => handleMouseOver(starCount)}
          onClick={submitRating}
          onMouseLeave={handleMouseLeave}
        >
          <path
            fillRule="evenodd"
            d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"
          />
        </svg>
      ))}
    </div>
  );
}
