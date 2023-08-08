import { useContext, useEffect, useState } from "react";
import starEmpty from "../assets/star_filled.svg";
import starFilled from "../assets/star_empty.svg";
import { VanApiContext } from "../App";
import { db, postRating } from "../api";
import { doc, onSnapshot } from "firebase/firestore";

export default function Ratings({ ratingsObj, currentVan, disabled }) {
  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);
  const sumOfRatings = Object.values(ratingsObj).reduce(
    (acc, value) => acc + value,
    0
  );
  const ratingAvg = sumOfRatings / Object.keys(ratingsObj).length;

  const [rating, setRating] = useState(ratingAvg);

  const handleMouseOver = (starCount) => {
    if (disabled) return;
    setRating(starCount);
  };
  console.log();
  const handleMouseLeave = () => {
    setRating(ratingAvg);
  };

  function submitRating() {
    if (disabled) return;
    if (!currentUser?.uid) {
      setPopupOpen(true);
      setPopupText("You must login to post a rating!");
      return;
    }
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
    <div className="ratings-outer">
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
      <p>
        {ratingAvg.toFixed(1)}{" "}
        <small>({Object?.keys(ratingsObj)?.length})</small>
      </p>
    </div>
  );
}
