import "./App.css";
import "./server";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetails from "./pages/Vans/VanDetails";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";
import HostVansDetails from "./pages/Host/HostVansDetails";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import { createContext, useState, useEffect } from "react";
import { getVans } from "./api";

const VanApiContext = createContext(null);
function App() {
  const [vanData, setVanData] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVans() {
      try {
        const data = await getVans();
        setVanData(data);
      } catch (err) {
        setError(err);
      }
    }

    loadVans();
  }, []);

  return (
    <VanApiContext.Provider value={{ vanData, error }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<ErrorPage />} />
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetails />} />

            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVansDetails />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </VanApiContext.Provider>
  );
}

export default App;
export { VanApiContext };
