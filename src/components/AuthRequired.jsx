import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { VanApiContext } from "../App";

export default function AuthRequired() {
  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);

  const { pathname } = useLocation();
  useEffect(() => {
    if (!currentUser) {
      setPopupText("You must login to view your vans!");
      setPopupOpen(true);
    }
  }, [currentUser, setPopupOpen, setPopupText]);

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", prevLocation: pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
