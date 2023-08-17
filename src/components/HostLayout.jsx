import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { VanApiContext } from "../App";
import { getHostVans } from "../api";

export default function HostLayout() {
  const { currentUser } = useContext(VanApiContext);
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const hostId = currentUser.uid;

  const [hostVansData, setHostVansData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = getHostVans(hostId, (vans) => {
      setHostVansData(vans);
      setLoading(false);
    });

    return () => {
      console.log("host vans unsub");
      unsubscribe();
    };
  }, [hostId]);

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
      </nav>
      <Outlet context={[hostVansData, setHostVansData, error]} />
    </>
  );
}
