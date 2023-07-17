import { useEffect, useState } from "react";
import { Outlet, useParams, NavLink, Link } from "react-router-dom";

export default function HostVansDetails() {
  const params = useParams();
  const [vanDetail, setVanDetail] = useState(null);

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((resp) => resp.json())
      .then((data) => setVanDetail(data.vans[0]));
  }, [params.id]);

  if (!vanDetail) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Link to=".." relative="path" className="back-button">
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
        <Outlet context={{ vanDetail }} />
      </div>
    </>
  );
}
