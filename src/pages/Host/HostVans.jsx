import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HostVanElement from "../../components/HostVanElement";
import { VanApiContext } from "../../App";

export default function HostVans() {
  //placeholder host id
  const hostId = 123;
  const [hostVans, setHostVans] = useState([]);
  const { vanData, error } = useContext(VanApiContext);
  useEffect(() => {
    setHostVans(vanData.filter((item) => item.hostId == hostId));
  }, []);

  //const [hostVans, setHostVans] = useState([]);
  // useEffect(() => {
  //   fetch("/api/host/vans")
  //     .then((resp) => resp.json())
  //     .then((data) => setHostVans(data.vans));
  // }, []);

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
