import { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useParams,
  NavLink,
  Link,
  useOutletContext,
} from "react-router-dom";
import { VanApiContext } from "../../App";
import ErrorPage from "../ErrorPage";

export default function HostVansDetails() {
  //placeholder host id
  const hostId = 123;
  const params = useParams();
  const [hostVansData, error] = useOutletContext();

  const vanDetail = hostVansData?.find((item) => item.id == params.id);

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  if (error?.message) return <h1>There was an error: {error.message}</h1>;

  if (vanDetail?.hostId != hostId)
    return <h1>Van not found in current user's vans!</h1>;

  return (
    <>
      <Link relative="path" to=".." className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-details-container">
        <img
          src={vanDetail.imageUrl}
          alt="van"
          className="host-van-details-img"
        />

        <div className="host-van-details-text">
          <div className={`van-type ${vanDetail.type} host-details`}>
            {vanDetail.type[0].toUpperCase() + vanDetail.type.slice(1)}
          </div>
          <h3 className="host-van-details-name">{vanDetail.name}</h3>
          <p className="host-van-details-price">
            <strong>${vanDetail.price}</strong>/day
          </p>
        </div>

        <nav className="host-van-details-nav">
          <NavLink
            end
            to={"."}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Details
          </NavLink>
          <NavLink
            to={"pricing"}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to={"photos"}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={vanDetail} />
      </div>
    </>
  );
}
