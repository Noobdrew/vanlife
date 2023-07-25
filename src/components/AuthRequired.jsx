import { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { VanApiContext } from "../App";

export default function AuthRequired() {
  const { currentUser } = useContext(VanApiContext);

  const { pathname } = useLocation();

  if (!currentUser)
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", prevLocation: pathname }}
        replace
      />
    );
  //send host data to this outliet
  return <Outlet />;
}
