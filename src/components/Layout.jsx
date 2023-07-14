import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main>
        <Outlet />
      </main>

      <footer className="home-footer">Ⓒ 2022 #VANLIFE</footer>
    </div>
  );
}
