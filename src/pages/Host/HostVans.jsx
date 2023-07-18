import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HostVanElement from "../../components/HostVanElement";

export default function HostVans() {
  const [hostVans, setHostVans] = useState([]);
  useEffect(() => {
    fetch("/api/host/vans")
      .then((resp) => resp.json())
      .then((data) => setHostVans(data.vans));
  }, []);

  const hostVanElements = hostVans.map((van) => {
    return (
      <Link
        key={van.id}
        className="host-van-element"
        to={`/host/vans/${van.id}`}
      >
        <HostVanElement
          img={van.imageUrl}
          name={van.name}
          price={van.price}
          type={van.type}
        />
      </Link>
    );
  });

  return (
    <>
      <h1 className="host-van-title">Your listed vans</h1>
      <div className="host-van-container">
        {" "}
        {hostVans.length > 0 ? hostVanElements : <h2>Loading...</h2>}
      </div>
    </>
  );
}
