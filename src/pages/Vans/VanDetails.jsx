import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { VanApiContext } from "../../App";

export default function VanDetails() {
  const params = useParams();

  const location = useLocation();

  const { vanData, error } = useContext(VanApiContext);

  const currentVanArr = vanData.filter((item) => item.id == params.id);
  const currentVan = currentVanArr[0];

  return (
    <div className="van-detail-container">
      {currentVan ? (
        <>
          <Link
            relative="path"
            to={location.state?.search ? `..${location.state.search}` : ".."}
            className="back-button"
            style={{ margin: 0 }}
          >
            &larr; <span>Back to all vans</span>
          </Link>
          <div className="van-detail">
            <img src={currentVan.imageUrl} className="van-details-img" />
            <div className="van-details-text">
              <i className={`van-type ${currentVan.type} selected`}>
                {currentVan.type[0].toUpperCase() + currentVan.type.slice(1)}
              </i>
              <h2>{currentVan.name}</h2>
              <p className="van-price">
                <span>${currentVan.price}</span>/day
              </p>
              <p className="van-description">{currentVan.description}</p>
              <button className="confirm-button big">Rent this van</button>
            </div>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
