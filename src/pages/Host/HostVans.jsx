import { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import HostVanElement from "../../components/HostVanElement";
import { VanApiContext } from "../../App";
import { collectionGroup } from "firebase/firestore";

export default function HostVans() {
  const [hostVans, setHostVans] = useState([]);

  const [hostVansData, error] = useOutletContext();

  const hostVanElements = hostVansData?.map((van) => {
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
  if (error?.message) return <h1>There was an error: {error.message}</h1>;
  return (
    <>
      <h1 className="host-van-title host-title">Your listed vans</h1>
      <div className="host-van-container">
        {" "}
        {hostVansData?.length > 0 ? (
          hostVanElements
        ) : (
          <div>
            <h2>You have no vans!</h2>
            <button className="confirm-button">Add one +</button>
          </div>
        )}
      </div>
    </>
  );
}
