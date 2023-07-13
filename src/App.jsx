import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import "./App.css";
import Navbar from "./components/Navbar";
import "./server";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
      </Routes>
      <footer className="home-footer">Ⓒ 2022 #VANLIFE</footer>
    </BrowserRouter>
  );
}

export default App;
