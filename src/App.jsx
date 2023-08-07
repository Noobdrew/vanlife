import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { auth, db, getAllVans, updateName } from "./api";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import AuthRequired from "./components/AuthRequired";
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
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import UserProfile from "./pages/UserProfile/UserProfile";
import Popup from "./components/Popup";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

const VanApiContext = createContext(null);

function App() {
  //global states
  const [vanData, setVanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState("Unknow error");

  async function getUser(uid) {
    let data = {
      income: [
        {
          id: 1,
          year: 2023,
          month: "January",
          income: 0,
        },
        {
          id: 2,
          year: 2023,
          month: "February",
          income: 0,
        },
        {
          id: 3,
          year: 2023,
          month: "March",
          income: 0,
        },
        {
          id: 4,
          year: 2023,
          month: "April",
          income: 0,
        },
        {
          id: 5,
          year: 2023,
          month: "May",
          income: 0,
        },
        {
          id: 6,
          year: 2023,
          month: "June",
          income: 0,
        },
        {
          id: 7,
          year: 2023,
          month: "July",
          income: 0,
        },
        {
          id: 8,
          year: 2023,
          month: "August",
          income: 0,
        },
      ],
      transactions: [],
    };
    const docRef = doc(db, "users", uid);

    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      await setDoc(docRef, data);
      await updateName(
        auth.currentUser,
        auth.currentUser.uid,
        auth.currentUser.displayName
      );
    }
  }
  useEffect(() => {
    console.log("load vans");
    const unsubscribe = getAllVans((vans) => {
      setVanData(vans);
      setLoading(false);
    });
    return () => {
      console.log("vans unsub");
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("new user");
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const data = await getUser(user?.uid);
        setUserData(data);
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  if (loading)
    return (
      <div className="loader-conteiner">
        <h1>Building app</h1>
        <span className="loader"></span>
      </div>
    );

  return (
    <VanApiContext.Provider
      value={{
        vanData,
        loading,
        error,
        currentUser,
        popupOpen,
        setPopupOpen,
        setPopupText,
        popupText,
        userData,
      }}
    >
      <Popup>{popupText}</Popup>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<ErrorPage />} />
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetails />} />
            {/* login sets loged in as local storange/cookies
                app.jsx fetches hostData after login is true with correct user id
                */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="resetpass" element={<ResetPassword />} />

            <Route element={<AuthRequired />}>
              <Route path="/profile" element={<UserProfile />} />

              <Route path="/host" element={<HostLayout />}>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </VanApiContext.Provider>
  );
}

export default App;
export { VanApiContext };
