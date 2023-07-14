import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="home-footer">Ⓒ 2022 #VANLIFE</footer>
    </>
  );
}
