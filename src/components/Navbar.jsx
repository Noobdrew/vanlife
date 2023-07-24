import { NavLink } from "react-router-dom";
import userIcon from "../assets/user-icon.png";

export default function Navbar() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <header>
      <NavLink className="home-logo" to="/">
        VANLIFE
      </NavLink>

      <NavLink
        to="host/vans"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Host
      </NavLink>

      <NavLink
        to="about"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        About
      </NavLink>

      <NavLink
        to="vans"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Vans
      </NavLink>
      <NavLink
        to="login"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        <img src={userIcon} className="user-icon" />
      </NavLink>
    </header>
  );
}
